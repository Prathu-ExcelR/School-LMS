import { useState, useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { getTeacherQuizzes, createQuiz, createQuizQuestion, getQuizQuestions, updateQuiz, deleteQuiz } from '../services/teacherService'
import { supabase } from '../lib/supabaseClient'

function TeacherQuizzes() {
  const [showModal, setShowModal] = useState(false)
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [units, setUnits] = useState([])
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }])

  // View modal state
  const [viewQuiz, setViewQuiz] = useState(null)
  const [viewQuestions, setViewQuestions] = useState([])
  const [viewLoading, setViewLoading] = useState(false)

  // Edit modal state
  const [editQuiz, setEditQuiz] = useState(null)
  const [editQuestions, setEditQuestions] = useState([])
  const [editLoading, setEditLoading] = useState(false)
  const [editForm, setEditForm] = useState({ title: '', unit_id: '', passing_score: 70, time_limit: '' })

  // Delete state
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    loadQuizzes()
    loadUnits()
  }, [])

  const loadQuizzes = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('User not authenticated')
        setLoading(false)
        return
      }
      
      const quizzesData = await getTeacherQuizzes(user.id)
      setQuizzes(quizzesData)
      
    } catch (err) {
      console.error('Error loading quizzes:', err)
      setError('Failed to load quizzes')
    } finally {
      setLoading(false)
    }
  }

  const loadUnits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      
      const { data, error } = await supabase
        .from('units')
        .select(`
          id, 
          name,
          subject:subjects(id, name)
        `)
        .eq('teacher_id', user.id)
      
      if (!error && data) {
        setUnits(data)
      }
    } catch (err) {
      console.error('Error loading units:', err)
    }
  }

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }])
  }

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions]
    if (field === 'options') {
      newQuestions[index].options = value
    } else {
      newQuestions[index][field] = value
    }
    setQuestions(newQuestions)
  }

  const handleCreateQuiz = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Validate questions first before creating the quiz
      const validQuestions = questions.filter(q => q.question.trim() && q.correctAnswer.trim())
      
      if (validQuestions.length === 0) {
        throw new Error('Please add at least one valid question with a correct answer')
      }
      
      // Create quiz with total_questions included upfront
      const quizData = {
        title: formData.get('title'),
        unit_id: formData.get('unit_id'),
        passing_score: parseInt(formData.get('passing_score')),
        time_limit: parseInt(formData.get('time_limit')) || null,
        total_questions: validQuestions.length
      }
      
      const newQuiz = await createQuiz(quizData)
      
      // Create questions
      for (let i = 0; i < validQuestions.length; i++) {
        const question = validQuestions[i]
        const questionData = {
          quiz_id: newQuiz.id,
          question_text: question.question,
          options: question.options.filter(opt => opt.trim() !== ''),
          correct_answer: question.correctAnswer,
          order_number: i + 1
        }
        
        await createQuizQuestion(questionData)
      }
      
      setShowModal(false)
      setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }])
      loadQuizzes()
      
      e.target.reset()
      
      alert('Quiz created successfully!')
    } catch (err) {
      console.error('Error creating quiz:', err)
      let errorMessage = err.message
      
      if (err.message.includes('row-level security policy')) {
        errorMessage = 'You don\'t have permission to create quizzes in this unit. Make sure you\'re assigned to teach this subject.'
      } else if (err.message.includes('foreign key constraint')) {
        errorMessage = 'Invalid unit selected. Please select a valid unit.'
      }
      
      alert('Failed to create quiz: ' + errorMessage)
    }
  }

  // ─── VIEW QUIZ ───
  const handleViewQuiz = async (quiz) => {
    setViewQuiz(quiz)
    setViewLoading(true)
    try {
      const questionsData = await getQuizQuestions(quiz.id)
      setViewQuestions(questionsData || [])
    } catch (err) {
      console.error('Error loading quiz questions:', err)
      setViewQuestions([])
    } finally {
      setViewLoading(false)
    }
  }

  // ─── EDIT QUIZ ───
  const handleEditQuiz = async (quiz) => {
    setEditForm({
      title: quiz.title,
      unit_id: quiz.unit_id || '',
      passing_score: quiz.passingMarks || 70,
      time_limit: quiz.timeLimit || ''
    })
    setEditQuiz(quiz)
    setEditLoading(true)
    try {
      const questionsData = await getQuizQuestions(quiz.id)
      const mapped = (questionsData || []).map(q => ({
        id: q.id,
        question: q.question_text,
        options: q.options || ['', '', '', ''],
        correctAnswer: q.correct_answer || ''
      }))
      setEditQuestions(mapped.length > 0 ? mapped : [{ question: '', options: ['', '', '', ''], correctAnswer: '' }])
    } catch (err) {
      console.error('Error loading quiz questions for edit:', err)
      setEditQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }])
    } finally {
      setEditLoading(false)
    }
  }

  const handleEditQuestionChange = (index, field, value) => {
    const newQuestions = [...editQuestions]
    if (field === 'options') {
      newQuestions[index].options = value
    } else {
      newQuestions[index][field] = value
    }
    setEditQuestions(newQuestions)
  }

  const handleAddEditQuestion = () => {
    setEditQuestions([...editQuestions, { question: '', options: ['', '', '', ''], correctAnswer: '' }])
  }

  const handleRemoveEditQuestion = (index) => {
    if (editQuestions.length <= 1) return
    setEditQuestions(editQuestions.filter((_, i) => i !== index))
  }

  const handleSaveEdit = async () => {
    try {
      const validQuestions = editQuestions.filter(q => q.question.trim() && q.correctAnswer.trim())
      if (validQuestions.length === 0) {
        alert('Please add at least one valid question with a correct answer')
        return
      }

      // Update quiz details
      await updateQuiz(editQuiz.id, {
        title: editForm.title,
        passing_score: parseInt(editForm.passing_score),
        time_limit: parseInt(editForm.time_limit) || null,
        total_questions: validQuestions.length
      })

      // Delete old questions and re-create
      const { error: delError } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('quiz_id', editQuiz.id)

      if (delError) {
        console.error('Error deleting old questions:', delError)
      }

      // Create updated questions
      for (let i = 0; i < validQuestions.length; i++) {
        const question = validQuestions[i]
        await createQuizQuestion({
          quiz_id: editQuiz.id,
          question_text: question.question,
          options: question.options.filter(opt => opt.trim() !== ''),
          correct_answer: question.correctAnswer,
          order_number: i + 1
        })
      }

      setEditQuiz(null)
      setEditQuestions([])
      loadQuizzes()
      alert('Quiz updated successfully!')
    } catch (err) {
      console.error('Error updating quiz:', err)
      alert('Failed to update quiz: ' + err.message)
    }
  }

  // ─── DELETE QUIZ ───
  const handleDeleteQuiz = async (quizId) => {
    setDeleteLoading(true)
    try {
      // Delete questions first
      const { error: qError } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('quiz_id', quizId)

      if (qError) console.error('Error deleting quiz questions:', qError)

      // Delete quiz attempts
      const { error: aError } = await supabase
        .from('student_quiz_attempts')
        .delete()
        .eq('quiz_id', quizId)

      if (aError) console.error('Error deleting quiz attempts:', aError)

      // Delete the quiz
      await deleteQuiz(quizId)

      setDeleteConfirm(null)
      loadQuizzes()
      alert('Quiz deleted successfully!')
    } catch (err) {
      console.error('Error deleting quiz:', err)
      alert('Failed to delete quiz: ' + err.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  // ─── QUESTION FORM (shared between Create and Edit) ───
  const renderQuestionForm = (questionsArr, onChangeHandler, onAddHandler, onRemoveHandler) => (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Questions</h3>
        <button 
          type="button" 
          onClick={onAddHandler}
          className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
        >
          <span className="material-icons-round text-sm">add</span>
          Add Question
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {questionsArr.map((q, index) => (
          <div key={index} className="p-4 bg-slate-50 rounded-lg relative">
            {onRemoveHandler && questionsArr.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveHandler(index)}
                className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                title="Remove question"
              >
                <span className="material-icons-round text-sm">close</span>
              </button>
            )}
            <label className="block text-sm font-medium text-slate-700 mb-2">Question {index + 1}</label>
            <input 
              type="text" 
              value={q.question}
              onChange={(e) => onChangeHandler(index, 'question', e.target.value)}
              placeholder="Enter question" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-3" 
            />
            <div className="grid grid-cols-2 gap-2 mb-3">
              {['A', 'B', 'C', 'D'].map((option, optIndex) => (
                <input 
                  key={optIndex}
                  type="text" 
                  value={q.options[optIndex] || ''}
                  onChange={(e) => {
                    const newOptions = [...q.options]
                    newOptions[optIndex] = e.target.value
                    onChangeHandler(index, 'options', newOptions)
                  }}
                  placeholder={`Option ${option}`} 
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm" 
                />
              ))}
            </div>
            <select 
              value={q.correctAnswer}
              onChange={(e) => onChangeHandler(index, 'correctAnswer', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="">Select Correct Answer</option>
              {q.options.map((option, optIndex) => (
                option && (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                )
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-50">
        <TeacherSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading quizzes...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-slate-50">
        <TeacherSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center p-8">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Error Loading Quizzes</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button 
              onClick={loadQuizzes}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Quiz Management</h1>
            <p className="text-slate-500 text-sm mt-1">Create and manage unit quizzes</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="material-icons-round">add</span>
            Create Quiz
          </button>
        </header>

        <div className="p-8">
          {quizzes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <div className="text-slate-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Quizzes Found</h3>
              <p className="text-slate-500 mb-6">{units.length === 0 
                ? 'You need to create units first before adding quizzes.' 
                : 'You haven\'t created any quizzes yet.'}
              </p>
              {units.length > 0 && (
                <button 
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Your First Quiz
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                        <span className="material-icons-round text-purple-600 text-2xl">quiz</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{quiz.title}</h3>
                        <p className="text-sm text-slate-500">{quiz.unit} • {quiz.subject}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewQuiz(quiz)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" 
                        title="View Quiz"
                      >
                        <span className="material-icons-round">visibility</span>
                      </button>
                      <button 
                        onClick={() => handleEditQuiz(quiz)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg" 
                        title="Edit Quiz"
                      >
                        <span className="material-icons-round">edit</span>
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(quiz)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg" 
                        title="Delete Quiz"
                      >
                        <span className="material-icons-round">delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Questions</p>
                      <p className="text-lg font-bold text-slate-800">{quiz.questions}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Passing %</p>
                      <p className="text-lg font-bold text-slate-800">{quiz.passingMarks}%</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Attempted</p>
                      <p className="text-lg font-bold text-slate-800">{quiz.attempted}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600 mb-1">Passed</p>
                      <p className="text-lg font-bold text-green-700">{quiz.passed}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600 mb-1">Avg Score</p>
                      <p className="text-lg font-bold text-blue-700">{quiz.avgScore}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: quiz.attempted > 0 ? `${(quiz.passed / quiz.attempted) * 100}%` : '0%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {quiz.attempted > 0 ? Math.round((quiz.passed / quiz.attempted) * 100) : 0}% Pass Rate
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ─── CREATE QUIZ MODAL ─── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Create New Quiz</h2>
            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                  <select 
                    name="unit_id" 
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select a unit</option>
                    {units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name} - {unit.subject?.name || 'Unknown Subject'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quiz Title</label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    placeholder="e.g., Numbers Quiz" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Passing Marks (%)</label>
                  <input 
                    type="number" 
                    name="passing_score"
                    required
                    min="0"
                    max="100"
                    defaultValue="70"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Time Limit (minutes)</label>
                  <input 
                    type="number" 
                    name="time_limit"
                    min="1"
                    placeholder="Optional"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  />
                </div>
              </div>

              {renderQuestionForm(questions, handleQuestionChange, handleAddQuestion, null)}

              <div className="flex gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowModal(false)
                    setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }])
                  }} 
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── VIEW QUIZ MODAL ─── */}
      {viewQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{viewQuiz.title}</h2>
                <p className="text-sm text-slate-500 mt-1">{viewQuiz.unit} • {viewQuiz.subject}</p>
              </div>
              <button onClick={() => { setViewQuiz(null); setViewQuestions([]) }} className="p-2 hover:bg-slate-100 rounded-lg">
                <span className="material-icons-round text-slate-500">close</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <p className="text-xs text-purple-600 mb-1">Questions</p>
                <p className="text-lg font-bold text-purple-700">{viewQuiz.questions}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <p className="text-xs text-green-600 mb-1">Passing %</p>
                <p className="text-lg font-bold text-green-700">{viewQuiz.passingMarks}%</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-xs text-blue-600 mb-1">Time Limit</p>
                <p className="text-lg font-bold text-blue-700">{viewQuiz.timeLimit ? `${viewQuiz.timeLimit} min` : 'None'}</p>
              </div>
            </div>

            {viewLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : viewQuestions.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No questions found for this quiz.</p>
            ) : (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Questions ({viewQuestions.length})</h3>
                {viewQuestions.map((q, index) => (
                  <div key={q.id || index} className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-medium text-slate-800 mb-3">
                      <span className="text-green-600 font-bold mr-2">Q{index + 1}.</span>
                      {q.question_text}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {(q.options || []).map((option, optIndex) => (
                        <div 
                          key={optIndex} 
                          className={`px-3 py-2 rounded-lg text-sm border ${
                            option === q.correct_answer
                              ? 'bg-green-100 border-green-300 text-green-800 font-semibold'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                          {option}
                          {option === q.correct_answer && (
                            <span className="material-icons-round text-green-600 text-sm ml-1 align-middle">check_circle</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => { setViewQuiz(null); setViewQuestions([]) }} 
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Close
              </button>
              <button 
                onClick={() => { setViewQuiz(null); setViewQuestions([]); handleEditQuiz(viewQuiz) }} 
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Edit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── EDIT QUIZ MODAL ─── */}
      {editQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">Edit Quiz</h2>
              <button onClick={() => { setEditQuiz(null); setEditQuestions([]) }} className="p-2 hover:bg-slate-100 rounded-lg">
                <span className="material-icons-round text-slate-500">close</span>
              </button>
            </div>

            {editLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                    <select 
                      value={editForm.unit_id}
                      disabled
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100 cursor-not-allowed"
                    >
                      <option value="">Select a unit</option>
                      {units.map(unit => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name} - {unit.subject?.name || 'Unknown Subject'}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-400 mt-1">Unit cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Quiz Title</label>
                    <input 
                      type="text" 
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Passing Marks (%)</label>
                    <input 
                      type="number" 
                      value={editForm.passing_score}
                      onChange={(e) => setEditForm({ ...editForm, passing_score: e.target.value })}
                      min="0"
                      max="100"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time Limit (minutes)</label>
                    <input 
                      type="number" 
                      value={editForm.time_limit}
                      onChange={(e) => setEditForm({ ...editForm, time_limit: e.target.value })}
                      min="1"
                      placeholder="Optional"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    />
                  </div>
                </div>

                {renderQuestionForm(editQuestions, handleEditQuestionChange, handleAddEditQuestion, handleRemoveEditQuestion)}

                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={() => { setEditQuiz(null); setEditQuestions([]) }} 
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveEdit}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRMATION MODAL ─── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md m-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons-round text-red-600 text-3xl">delete_forever</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Quiz</h2>
              <p className="text-slate-500">
                Are you sure you want to delete <strong>"{deleteConfirm.title}"</strong>? 
                This will also delete all questions and student attempts. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteConfirm(null)} 
                disabled={deleteLoading}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDeleteQuiz(deleteConfirm.id)}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleteLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Quiz'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeacherQuizzes
