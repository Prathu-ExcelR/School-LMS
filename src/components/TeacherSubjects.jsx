import { Link } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'

function TeacherSubjects() {
  const subjects = [
    { id: 1, name: 'Mathematics', class: 'Class 3', students: 45, units: 8, materials: 24, quizzes: 8, avgScore: '72%', color: 'bg-blue-500' },
    { id: 2, name: 'Science', class: 'Class 10', students: 52, units: 6, materials: 18, quizzes: 6, avgScore: '85%', color: 'bg-green-500' },
    { id: 3, name: 'Physics', class: 'Class 10', students: 30, units: 4, materials: 12, quizzes: 4, avgScore: '80%', color: 'bg-purple-500' }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">My Subjects</h1>
          <p className="text-slate-500 text-sm mt-1">Subjects assigned to you by admin</p>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div key={subject.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-32 ${subject.color} relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{subject.name}</h3>
                    <p className="text-sm opacity-90">{subject.class}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Students</p>
                      <p className="text-lg font-bold text-slate-800">{subject.students}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Units</p>
                      <p className="text-lg font-bold text-slate-800">{subject.units}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Materials</p>
                      <p className="text-lg font-bold text-slate-800">{subject.materials}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Quizzes</p>
                      <p className="text-lg font-bold text-slate-800">{subject.quizzes}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Avg Score</span>
                      <span className="text-lg font-bold text-green-600">{subject.avgScore}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/teacher/units" className="px-3 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors text-center">
                      View Units
                    </Link>
                    <Link to="/teacher/students" className="px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors text-center">
                      Students
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default TeacherSubjects
