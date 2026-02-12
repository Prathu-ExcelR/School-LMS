import { useState, useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { getTeacherMaterials, createMaterial, updateMaterial, deleteMaterial, uploadFile, getFileUrl } from '../services/teacherService'
import { supabase } from '../lib/supabaseClient'

function TeacherMaterials() {
  const [showModal, setShowModal] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState(null)
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [units, setUnits] = useState([])
  const [selectedType, setSelectedType] = useState('pdf')

  useEffect(() => {
    loadMaterials()
    loadUnits()
  }, [])

  const loadMaterials = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('User not authenticated')
        setLoading(false)
        return
      }
      
      const materialsData = await getTeacherMaterials(user.id)
      setMaterials(materialsData)
      
    } catch (err) {
      console.error('Error loading materials:', err)
      setError('Failed to load materials')
    } finally {
      setLoading(false)
    }
  }

  const loadUnits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      
      // Get teacher's units with subject information
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

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return 'play_circle'
      case 'pdf': return 'picture_as_pdf'
      case 'link': return 'link'
      default: return 'folder'
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'video': return 'bg-red-100 text-red-700'
      case 'pdf': return 'bg-blue-100 text-blue-700'
      case 'link': return 'bg-purple-100 text-purple-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  const getTypeLabel = (type) => {
    switch(type) {
      case 'video': return 'Video (MP4)'
      case 'pdf': return 'PDF Document'
      case 'link': return 'External Link'
      default: return 'Unknown'
    }
  }

  const handleAddMaterial = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      let materialData = {
        title: formData.get('title'),
        description: formData.get('description'),
        unit_id: formData.get('unit_id'),
        material_type: selectedType
      }
      
      // Handle different material types
      if (selectedType === 'pdf') {
        const pdfFile = formData.get('pdf_file')
        if (pdfFile && pdfFile.size > 0) {
          const filePath = await uploadFile(pdfFile, 'materials')
          materialData.file_path = filePath
        }
      } else if (selectedType === 'video') {
        const videoFile = formData.get('video_file')
        if (videoFile && videoFile.size > 0) {
          const filePath = await uploadFile(videoFile, 'materials')
          materialData.file_path = filePath
        }
      } else if (selectedType === 'link') {
        materialData.file_url = formData.get('link_url')
      }
      
      if (editingMaterial) {
        // Update existing material
        await updateMaterial(editingMaterial.id, materialData)
      } else {
        // Create new material
        await createMaterial(materialData)
      }
      
      setShowModal(false)
      setEditingMaterial(null)
      setSelectedType('pdf')
      loadMaterials()
      
      // Reset form
      e.target.reset()
    } catch (err) {
      console.error('Error saving material:', err)
      alert('Failed to save material: ' + err.message)
    }
  }

  const handleEditMaterial = (material) => {
    setEditingMaterial(material)
    setShowModal(true)
  }

  const handleDeleteMaterial = async (materialId) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        await deleteMaterial(materialId)
        loadMaterials()
      } catch (err) {
        console.error('Error deleting material:', err)
        alert('Failed to delete material')
      }
    }
  }

  const handleViewMaterial = (material) => {
    if (material.type === 'link' && material.url) {
      window.open(material.url, '_blank')
    } else if ((material.type === 'pdf' || material.type === 'video') && material.filePath) {
      const fileUrl = getFileUrl(material.filePath, 'materials')
      window.open(fileUrl, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-50">
        <TeacherSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading materials...</p>
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
            <h3 className="text-xl font-bold text-slate-800 mb-2">Error Loading Materials</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button 
              onClick={loadMaterials}
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
          {materials.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <div className="text-slate-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Materials Found</h3>
              <p className="text-slate-500 mb-6">
                {units.length === 0 
                  ? 'You need to create units first before adding materials.' 
                  : "You haven't uploaded any study materials yet."}
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Note: Make sure the database tables (units, materials) are created.
              </p>
              {units.length > 0 && (
                <button 
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Upload Your First Material
                </button>
              )}
            </div>
          ) : (
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
                          {getTypeLabel(material.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{material.unit}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{material.subject}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{material.uploadedDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleViewMaterial(material)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View material"
                            disabled={!(material.url || material.filePath)}
                          >
                            <span className="material-icons-round text-sm">visibility</span>
                          </button>
                          <button 
                            onClick={() => handleEditMaterial(material)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            title="Edit material"
                          >
                            <span className="material-icons-round text-sm">edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteMaterial(material.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete material"
                          >
                            <span className="material-icons-round text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-4">{editingMaterial ? 'Edit Material' : 'Add Study Material'}</h2>
            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                <select 
                  name="unit_id" 
                  required
                  defaultValue={editingMaterial?.unit_id || ''}
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  defaultValue={editingMaterial?.title || ''}
                  placeholder="Material title" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Material Type</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="video">Video (MP4)</option>
                  <option value="link">External Link</option>
                </select>
              </div>
              
              {/* Dynamic fields based on type */}
              {selectedType === 'pdf' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Upload PDF File</label>
                  <input 
                    type="file" 
                    name="pdf_file"
                    accept=".pdf"
                    required={!editingMaterial}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  />
                  {editingMaterial?.filePath && (
                    <p className="text-sm text-slate-500 mt-1">Current file: {editingMaterial.filePath.split('/').pop()}</p>
                  )}
                </div>
              )}
              
              {selectedType === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Upload MP4 Video</label>
                  <input 
                    type="file" 
                    name="video_file"
                    accept="video/mp4"
                    required={!editingMaterial}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  />
                  {editingMaterial?.filePath && (
                    <p className="text-sm text-slate-500 mt-1">Current file: {editingMaterial.filePath.split('/').pop()}</p>
                  )}
                </div>
              )}
              
              {selectedType === 'link' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">External Link</label>
                  <input 
                    type="url" 
                    name="link_url"
                    required
                    defaultValue={editingMaterial?.url || ''}
                    placeholder="https://example.com/..." 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  rows="2" 
                  defaultValue={editingMaterial?.description || ''}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowModal(false)
                    setEditingMaterial(null)
                  }} 
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {editingMaterial ? 'Update Material' : 'Add Material'}
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
