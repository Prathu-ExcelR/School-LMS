import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import { supabase } from '../lib/supabaseClient'
import { getEnrolledSubjects, getSubjectUnits, getUnitMaterials } from '../services/studentService'

function MyCourses() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState([])
  const [expandedSubject, setExpandedSubject] = useState(null)
  const [units, setUnits] = useState([])
  const [unitsLoading, setUnitsLoading] = useState(false)
  const [expandedUnit, setExpandedUnit] = useState(null)
  const [materials, setMaterials] = useState([])
  const [materialsLoading, setMaterialsLoading] = useState(false)

  useEffect(() => {
    loadSubjects()
  }, [])

  const loadSubjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }
      const data = await getEnrolledSubjects(user.id)
      setSubjects(data)
    } catch (err) {
      console.error('Error loading subjects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubjectClick = async (subjectId) => {
    if (expandedSubject === subjectId) {
      setExpandedSubject(null)
      setUnits([])
      setExpandedUnit(null)
      setMaterials([])
      return
    }
    setExpandedSubject(subjectId)
    setExpandedUnit(null)
    setMaterials([])
    setUnitsLoading(true)
    try {
      const data = await getSubjectUnits(subjectId)
      setUnits(data)
    } catch (err) {
      console.error('Error loading units:', err)
    } finally {
      setUnitsLoading(false)
    }
  }

  const handleUnitClick = async (unitId) => {
    if (expandedUnit === unitId) {
      setExpandedUnit(null)
      setMaterials([])
      return
    }
    setExpandedUnit(unitId)
    setMaterialsLoading(true)
    try {
      const data = await getUnitMaterials(unitId)
      setMaterials(data)
    } catch (err) {
      console.error('Error loading materials:', err)
    } finally {
      setMaterialsLoading(false)
    }
  }

  // Get a viewable URL for the material
  const getMaterialUrl = (mat) => {
    // If file_url exists (external link / already public URL), use it directly
    if (mat.file_url) return mat.file_url
    // If file_path exists (uploaded to Supabase Storage), get public URL
    if (mat.file_path) {
      const { data } = supabase.storage.from('materials').getPublicUrl(mat.file_path)
      return data?.publicUrl || '#'
    }
    return '#'
  }

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'picture_as_pdf'
      case 'video': return 'play_circle'
      case 'link': return 'link'
      case 'document': return 'description'
      default: return 'insert_drive_file'
    }
  }

  const getFileColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'text-red-500 bg-red-50'
      case 'video': return 'text-purple-500 bg-purple-50'
      case 'link': return 'text-blue-500 bg-blue-50'
      case 'document': return 'text-emerald-500 bg-emerald-50'
      default: return 'text-slate-500 bg-slate-50'
    }
  }

  const subjectIcons = ['functions', 'science', 'history_edu', 'palette', 'language', 'computer', 'psychology', 'biotech']
  const subjectColors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500', 'bg-cyan-500', 'bg-purple-500', 'bg-teal-500', 'bg-orange-500']

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f6f6f8]">
        <StudentSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5048e5] mx-auto"></div>
            <p className="mt-4 text-slate-500">Loading your subjects...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
      <StudentSidebar />

      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Enrolled Subjects</h1>
            <p className="text-sm text-slate-500">Click a subject to explore its units and materials</p>
          </div>
          <Link to="/student/browse" className="px-4 py-2 bg-[#5048e5] text-white rounded-lg font-medium hover:bg-[#5048e5]/90 transition-colors flex items-center gap-2">
            <span className="material-icons-round text-sm">add</span>
            Browse More
          </Link>
        </header>

        <div className="p-8 flex-1 overflow-y-auto">
          {subjects.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
              <span className="material-icons-round text-7xl text-slate-300 mb-4">menu_book</span>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No Enrolled Subjects</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">You haven't enrolled in any subjects yet. Browse available courses to get started.</p>
              <Link to="/student/browse" className="px-8 py-3 bg-[#5048e5] text-white font-bold rounded-lg hover:bg-[#5048e5]/90 transition-colors inline-flex items-center gap-2">
                <span className="material-icons-round">explore</span>
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {subjects.map((enrollment, idx) => (
                <div key={enrollment.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* Subject Card Header */}
                  <button
                    onClick={() => handleSubjectClick(enrollment.subject?.id)}
                    className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className={`w-14 h-14 ${subjectColors[idx % subjectColors.length]} rounded-xl flex items-center justify-center text-white shadow-md`}>
                      <span className="material-icons-round text-2xl">{subjectIcons[idx % subjectIcons.length]}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">{enrollment.subject?.name}</h3>
                      <p className="text-sm text-slate-500">{enrollment.subject?.class?.name || 'General'} • {enrollment.subject?.description || 'No description'}</p>
                    </div>
                    <span className={`material-icons-round text-slate-400 transition-transform ${expandedSubject === enrollment.subject?.id ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {/* Units Panel */}
                  {expandedSubject === enrollment.subject?.id && (
                    <div className="border-t border-slate-100 bg-slate-50/50">
                      {unitsLoading ? (
                        <div className="p-6 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5048e5] mx-auto"></div>
                          <p className="mt-2 text-sm text-slate-500">Loading units...</p>
                        </div>
                      ) : units.length === 0 ? (
                        <div className="p-6 text-center text-slate-500">
                          <span className="material-icons-round text-3xl text-slate-300">folder_off</span>
                          <p className="mt-2 text-sm">No units available for this subject yet</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-100">
                          {units.map((unit, uidx) => (
                            <div key={unit.id}>
                              <button
                                onClick={() => handleUnitClick(unit.id)}
                                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white transition-colors text-left"
                              >
                                <div className="w-8 h-8 bg-[#5048e5]/10 rounded-lg flex items-center justify-center text-[#5048e5] text-sm font-bold">
                                  {uidx + 1}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-slate-800">{unit.name}</h4>
                                  {unit.description && <p className="text-xs text-slate-500 mt-0.5">{unit.description}</p>}
                                </div>
                                <span className={`material-icons-round text-sm text-slate-400 transition-transform ${expandedUnit === unit.id ? 'rotate-180' : ''}`}>
                                  expand_more
                                </span>
                              </button>

                              {/* Materials Panel */}
                              {expandedUnit === unit.id && (
                                <div className="bg-white border-t border-slate-100 pl-14 pr-6 py-3">
                                  {materialsLoading ? (
                                    <p className="text-sm text-slate-500 py-2">Loading materials...</p>
                                  ) : materials.length === 0 ? (
                                    <p className="text-sm text-slate-400 py-2">No materials uploaded yet</p>
                                  ) : (
                                    <div className="space-y-2">
                                      {materials.map((mat) => (
                                        <a
                                          key={mat.id}
                                          href={getMaterialUrl(mat)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                                        >
                                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileColor(mat.material_type)}`}>
                                            <span className="material-icons-round">{getFileIcon(mat.material_type)}</span>
                                          </div>
                                          <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-800 group-hover:text-[#5048e5] transition-colors">{mat.title}</p>
                                            <p className="text-xs text-slate-400 capitalize">{mat.material_type || 'File'}</p>
                                          </div>
                                          <span className="material-icons-round text-slate-300 group-hover:text-[#5048e5] transition-colors text-sm">open_in_new</span>
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default MyCourses

