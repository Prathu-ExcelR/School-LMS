import { useState } from 'react'
import TeacherSidebar from './TeacherSidebar'

function TeacherQuizzes() {
  const [showModal, setShowModal] = useState(false)
  const [quizzes] = useState([
    { id: 1, title: 'Numbers Quiz', unit: 'Numbers', subject: 'Mathematics', questions: 10, passingMarks: 60, attempted: 45, passed: 35, avgScore: '75%' },
    { id: 2, title: 'Addition Test', unit: 'Addition', subject: 'Mathematics', questions: 8, passingMarks: 60, attempted: 45, passed: 38, avgScore: '82%' },
    { id: 3, title: 'Cell Structure Quiz', unit: 'Cell Structure', subject: 'Science', questions: 12, passingMarks: 70, attempted: 52, passed: 46, avgScore: '88%' }
  ])

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
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <span className="material-icons-round">visibility</span>
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                      <span className="material-icons-round">edit</span>
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(quiz.passed / quiz.attempted) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {Math.round((quiz.passed / quiz.attempted) * 100)}% Pass Rate
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl m-4">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Create New Quiz</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option>Numbers - Mathematics</option>
                    <option>Addition - Mathematics</option>
                    <option>Cell Structure - Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quiz Title</label>
                  <input type="text" placeholder="e.g., Numbers Quiz" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Passing Marks (%)</label>
                <input type="number" placeholder="60" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-slate-800 mb-3">Add Questions</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Question 1</label>
                    <input type="text" placeholder="Enter question" className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-3" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Option A" className="px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      <input type="text" placeholder="Option B" className="px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      <input type="text" placeholder="Option C" className="px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      <input type="text" placeholder="Option D" className="px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                    </div>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg mt-2 text-sm">
                      <option>Select Correct Answer</option>
                      <option>Option A</option>
                      <option>Option B</option>
                      <option>Option C</option>
                      <option>Option D</option>
                    </select>
                  </div>
                </div>
                <button type="button" className="mt-3 px-4 py-2 border-2 border-dashed border-slate-300 text-slate-600 rounded-lg hover:border-green-500 hover:text-green-600 w-full">
                  + Add Another Question
                </button>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeacherQuizzes
