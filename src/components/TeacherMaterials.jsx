import { useState } from 'react'
import TeacherSidebar from './TeacherSidebar'

function TeacherMaterials() {
  const [showModal, setShowModal] = useState(false)
  const [materials] = useState([
    { id: 1, title: 'Introduction to Numbers', type: 'Video', unit: 'Numbers', subject: 'Mathematics', url: 'youtube.com/...', uploadedDate: '2024-01-15' },
    { id: 2, title: 'Number System PDF', type: 'PDF', unit: 'Numbers', subject: 'Mathematics', url: 'file.pdf', uploadedDate: '2024-01-16' },
    { id: 3, title: 'Addition Basics', type: 'Video', unit: 'Addition', subject: 'Mathematics', url: 'youtube.com/...', uploadedDate: '2024-01-20' },
    { id: 4, title: 'Cell Structure Diagram', type: 'PDF', unit: 'Cell Structure', subject: 'Science', url: 'file.pdf', uploadedDate: '2024-02-01' },
    { id: 5, title: 'Photosynthesis Process', type: 'Video', unit: 'Photosynthesis', subject: 'Science', url: 'youtube.com/...', uploadedDate: '2024-02-05' }
  ])

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Video': return 'play_circle'
      case 'PDF': return 'picture_as_pdf'
      case 'Notes': return 'description'
      case 'Link': return 'link'
      default: return 'folder'
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'Video': return 'bg-red-100 text-red-700'
      case 'PDF': return 'bg-blue-100 text-blue-700'
      case 'Notes': return 'bg-green-100 text-green-700'
      case 'Link': return 'bg-purple-100 text-purple-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Study Materials</h1>
            <p className="text-slate-500 text-sm mt-1">Upload and manage learning resources</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="material-icons-round">upload</span>
            Add Material
          </button>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subject</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Uploaded</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {materials.map((material) => (
                  <tr key={material.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${getTypeColor(material.type)} rounded-lg flex items-center justify-center`}>
                          <span className="material-icons-round text-lg">{getTypeIcon(material.type)}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-800">{material.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 ${getTypeColor(material.type)} text-xs font-semibold rounded-full`}>
                        {material.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{material.unit}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{material.subject}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{material.uploadedDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <span className="material-icons-round text-sm">visibility</span>
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <span className="material-icons-round text-sm">edit</span>
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <span className="material-icons-round text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Add Study Material</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>Numbers - Mathematics</option>
                  <option>Addition - Mathematics</option>
                  <option>Cell Structure - Science</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" placeholder="Material title" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>Video (YouTube)</option>
                  <option>PDF</option>
                  <option>Notes</option>
                  <option>External Link</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL / Upload</label>
                <input type="text" placeholder="https://youtube.com/..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea rows="2" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeacherMaterials
