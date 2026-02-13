import { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { getEnrollments } from '../services/adminService'

function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadEnrollments()
  }, [])

  const loadEnrollments = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await getEnrollments()
      setEnrollments(data || [])
    } catch (err) {
      console.error('Error loading enrollments:', err)
      setError('Failed to load enrollments')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Enrollment Management</h1>
          <p className="text-slate-500 text-sm mt-1">Track student enrollments and payments</p>
        </header>

        <div className="p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <span className="material-icons-round text-sm">error</span>
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-slate-200">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-500">Loading enrollments...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">All Enrollments ({enrollments.length})</h2>
                <button 
                  onClick={loadEnrollments}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span className="material-icons-round text-sm">refresh</span>
                  Refresh
                </button>
              </div>
              
              {enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons-round text-slate-400 text-2xl">assignment</span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No enrollments found</h3>
                  <p className="text-slate-500">Enrollments will appear here once students register for subjects.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Class</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Enrolled Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {enrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{enrollment.student?.name || 'Unknown Student'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{enrollment.subject?.name || 'Unknown Subject'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{enrollment.subject?.class?.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {enrollment.enrolled_date ? new Date(enrollment.enrolled_date).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            enrollment.payment_status === 'paid' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {enrollment.payment_status === 'paid' ? 'Paid' : 'Not Paid'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminEnrollments
