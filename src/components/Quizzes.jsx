import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import { supabase } from '../lib/supabaseClient'
import { getStudentQuizzes, getQuizWithQuestions, submitQuizAttempt, getQuizAttempts } from '../services/studentService'

function Quizzes() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [quizzes, setQuizzes] = useState([])
  const [userId, setUserId] = useState(null)

  // Quiz attempt state
  const [attemptQuiz, setAttemptQuiz] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Results state
  const [result, setResult] = useState(null)
  const [pastAttempts, setPastAttempts] = useState({})

  const timerRef = useRef(null)

  useEffect(() => {
    loadQuizzes()
    return () => clearInterval(timerRef.current)
  }, [])

  const loadQuizzes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }
      setUserId(user.id)

      const data = await getStudentQuizzes(user.id)
      setQuizzes(data)

      // Load past attempts for each quiz
      const attemptsMap = {}
      for (const quiz of data) {
        const attempts = await getQuizAttempts(user.id, quiz.id)
        if (attempts.length > 0) {
          attemptsMap[quiz.id] = attempts
        }
      }
      setPastAttempts(attemptsMap)
    } catch (err) {
      console.error('Error loading quizzes:', err)
    } finally {
      setLoading(false)
    }
  }

  const startQuiz = async (quizId) => {
    try {
      const quizData = await getQuizWithQuestions(quizId)
      if (!quizData.questions || quizData.questions.length === 0) {
        alert('This quiz has no questions yet.')
        return
      }
      setAttemptQuiz(quizData)
      setQuestions(quizData.questions)
      setCurrentQ(0)
      setAnswers({})
      setResult(null)
      setTimeLeft((quizData.time_limit || 30) * 60) // convert minutes to seconds
      setQuizStarted(true)

      // Start timer
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            handleAutoSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      console.error('Error starting quiz:', err)
      alert('Failed to load quiz.')
    }
  }

  const handleAutoSubmit = useCallback(() => {
    // This is called when time runs out
    handleSubmit(true)
  }, [])

  const selectAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmit = async (autoSubmit = false) => {
    if (!autoSubmit && !confirm('Are you sure you want to submit? You cannot change your answers after submission.')) return
    clearInterval(timerRef.current)
    setSubmitting(true)

    try {
      // Calculate score
      let score = 0
      const answerDetails = {}

      questions.forEach(q => {
        const studentAnswer = answers[q.id] || null
        const isCorrect = studentAnswer === q.correct_answer
        if (isCorrect) score++
        answerDetails[q.id] = {
          selected: studentAnswer,
          correct: q.correct_answer,
          isCorrect
        }
      })

      const totalQs = questions.length
      const percentage = totalQs > 0 ? Math.round((score / totalQs) * 100) : 0
      const passed = percentage >= (attemptQuiz.passing_score || 50)
      const timeTaken = (attemptQuiz.time_limit || 30) * 60 - timeLeft

      const attemptData = {
        student_id: userId,
        quiz_id: attemptQuiz.id,
        score,
        total_questions: totalQs,
        passed,
        answers: answerDetails
      }

      await submitQuizAttempt(attemptData)

      setResult({
        score,
        totalQs,
        percentage,
        passed,
        passingScore: attemptQuiz.passing_score || 50,
        answerDetails,
        timeTaken
      })
      setQuizStarted(false)
    } catch (err) {
      console.error('Submit error:', err)
      alert('Failed to submit quiz. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const closeQuiz = () => {
    clearInterval(timerRef.current)
    setAttemptQuiz(null)
    setQuizStarted(false)
    setResult(null)
    setQuestions([])
    setAnswers({})
    loadQuizzes()
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f6f6f8]">
        <StudentSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5048e5] mx-auto"></div>
            <p className="mt-4 text-slate-500">Loading quizzes...</p>
          </div>
        </main>
      </div>
    )
  }

  // ─── QUIZ ATTEMPT VIEW ──────────────────────────────────
  if (attemptQuiz && quizStarted) {
    const q = questions[currentQ]
    const progress = ((currentQ + 1) / questions.length) * 100
    const answeredCount = Object.keys(answers).length

    return (
      <div className="min-h-screen bg-[#f6f6f8] flex flex-col">
        {/* Quiz Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => { if(confirm('Are you sure? Your progress will be lost.')) closeQuiz() }} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <span className="material-icons-round text-slate-500">close</span>
            </button>
            <div>
              <h2 className="font-bold text-slate-800">{attemptQuiz.title}</h2>
              <p className="text-xs text-slate-500">{attemptQuiz.unit?.subject?.name} • {attemptQuiz.unit?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-slate-500">
              <span className="font-bold text-slate-800">{answeredCount}</span>/{questions.length} answered
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg ${timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : timeLeft < 300 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-700'}`}>
              <span className="material-icons-round text-sm">timer</span>
              {formatTime(timeLeft)}
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1">
          <div className="bg-[#5048e5] h-1 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex-1 flex">
          {/* Question Panel */}
          <div className="flex-1 max-w-3xl mx-auto p-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#5048e5] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">{currentQ + 1}</span>
                <span className="text-sm text-slate-500">of {questions.length}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">{q.question_text}</h3>

              <div className="space-y-3">
                {(q.options || []).map((optionText, optIdx) => {
                  const optLabel = String.fromCharCode(65 + optIdx) // A, B, C, D...
                  if (!optionText) return null
                  const isSelected = answers[q.id] === optionText
                  return (
                    <button
                      key={optIdx}
                      onClick={() => selectAnswer(q.id, optionText)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                        isSelected
                          ? 'border-[#5048e5] bg-[#5048e5]/5 shadow-md'
                          : 'border-slate-200 hover:border-[#5048e5]/40 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        isSelected
                          ? 'bg-[#5048e5] text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-[#5048e5]/10 group-hover:text-[#5048e5]'
                      }`}>
                        {optLabel}
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-[#5048e5]' : 'text-slate-700'}`}>{optionText}</span>
                    </button>
                  )
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                  disabled={currentQ === 0}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 flex items-center gap-2"
                >
                  <span className="material-icons-round text-sm">chevron_left</span>
                  Previous
                </button>

                {currentQ < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQ(currentQ + 1)}
                    className="px-5 py-2.5 bg-[#5048e5] text-white rounded-lg hover:bg-[#5048e5]/90 transition-colors flex items-center gap-2"
                  >
                    Next
                    <span className="material-icons-round text-sm">chevron_right</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={submitting}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 font-bold disabled:opacity-50"
                  >
                    {submitting ? (
                      <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Submitting...</>
                    ) : (
                      <><span className="material-icons-round text-sm">check_circle</span> Submit Quiz</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="w-64 bg-white border-l border-slate-200 p-4 overflow-y-auto hidden lg:block">
            <h4 className="text-sm font-bold text-slate-700 mb-3">Questions</h4>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQ(idx)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                    currentQ === idx
                      ? 'bg-[#5048e5] text-white shadow-md'
                      : answers[q.id]
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200"></div> Answered
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-slate-100"></div> Unanswered
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#5048e5]"></div> Current
              </div>
            </div>

            <button
              onClick={() => handleSubmit(false)}
              disabled={submitting}
              className="mt-6 w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-bold disabled:opacity-50"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── RESULT VIEW ────────────────────────────────────────
  if (result) {
    return (
      <div className="min-h-screen bg-[#f6f6f8] flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-8 text-center">
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 ${result.passed ? 'bg-emerald-100' : 'bg-red-100'}`}>
            <span className={`material-icons-round text-4xl ${result.passed ? 'text-emerald-600' : 'text-red-600'}`}>
              {result.passed ? 'emoji_events' : 'sentiment_dissatisfied'}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {result.passed ? '🎉 Congratulations!' : 'Better Luck Next Time'}
          </h2>
          <p className="text-slate-500 mb-6">
            {result.passed ? 'You passed the quiz!' : `You need ${result.passingScore}% to pass.`}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-[#5048e5]">{result.percentage}%</p>
              <p className="text-xs text-slate-500 mt-1">Score</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-slate-800">{result.score}/{result.totalQs}</p>
              <p className="text-xs text-slate-500 mt-1">Correct</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-slate-800">{formatTime(result.timeTaken)}</p>
              <p className="text-xs text-slate-500 mt-1">Time</p>
            </div>
          </div>

          {/* Answer Review */}
          <div className="text-left mb-6">
            <h4 className="font-bold text-slate-700 mb-3">Answer Review</h4>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {questions.map((q, idx) => {
                const detail = result.answerDetails[q.id]
                return (
                  <div key={q.id} className={`p-3 rounded-lg border text-sm ${detail?.isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-start gap-2">
                      <span className={`material-icons-round text-sm mt-0.5 ${detail?.isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                        {detail?.isCorrect ? 'check_circle' : 'cancel'}
                      </span>
                      <div>
                        <p className="font-medium text-slate-800">Q{idx + 1}: {q.question_text}</p>
                        {!detail?.isCorrect && (
                          <p className="text-xs mt-1">
                            <span className="text-red-600">Your answer: {detail?.selected || 'Skipped'}</span>
                            {' • '}
                            <span className="text-emerald-600">Correct: {detail?.correct}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            onClick={closeQuiz}
            className="w-full py-3 bg-[#5048e5] text-white rounded-lg font-bold hover:bg-[#5048e5]/90 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    )
  }

  // ─── QUIZ LIST VIEW ─────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
      <StudentSidebar />

      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <nav className="flex text-sm text-slate-500 mb-2">
            <Link to="/student/dashboard" className="hover:text-[#5048e5] transition-colors">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800 font-medium">Quizzes</span>
          </nav>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Your Assessments</h1>
          <p className="mt-2 text-slate-500">Take quizzes to test your knowledge and track progress.</p>
        </header>

        {quizzes.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <span className="material-icons-round text-7xl text-slate-300 mb-4">quiz</span>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No Quizzes Available</h3>
            <p className="text-slate-500 mb-6">Enroll in subjects to access their quizzes.</p>
            <Link to="/student/browse" className="px-6 py-3 bg-[#5048e5] text-white font-bold rounded-lg hover:bg-[#5048e5]/90 transition-colors">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {quizzes.map((quiz) => {
              const hasAttempts = pastAttempts[quiz.id]?.length > 0
              const bestAttempt = hasAttempts ? pastAttempts[quiz.id].reduce((best, a) => a.score > best.score ? a : best, pastAttempts[quiz.id][0]) : null
              const bestPercent = bestAttempt ? Math.round((bestAttempt.score / (bestAttempt.total_points || bestAttempt.total_questions || 1)) * 100) : 0

              return (
                <div key={quiz.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-icons-round text-8xl text-[#5048e5]">quiz</span>
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-[#5048e5]/10 text-[#5048e5] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {quiz.unit?.subject?.name || 'Subject'}
                      </div>
                      {hasAttempts && (
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${bestAttempt.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          Best: {bestPercent}%
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-slate-800">{quiz.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">
                      {quiz.unit?.name} • {quiz.total_questions || 0} questions
                      {quiz.passing_score && ` • ${quiz.passing_score}% to pass`}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <span className="material-icons-round text-base">timer</span>
                          {quiz.time_limit || 30}m
                        </span>
                        {hasAttempts && (
                          <span className="flex items-center gap-1">
                            <span className="material-icons-round text-base">replay</span>
                            {pastAttempts[quiz.id].length} attempts
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => startQuiz(quiz.id)}
                        className="bg-[#5048e5] hover:bg-[#5048e5]/90 text-white px-5 py-2.5 rounded-lg font-medium shadow-md shadow-[#5048e5]/20 transition-all flex items-center gap-2"
                      >
                        {hasAttempts ? 'Retake' : 'Start Quiz'}
                        <span className="material-icons-round text-sm">play_arrow</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default Quizzes
