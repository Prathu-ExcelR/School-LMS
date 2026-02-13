import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import { supabase } from '../lib/supabaseClient'
import { getStudentProfile, updateStudentProfile } from '../services/studentService'

function StudentProfile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState(null)
  const [authUser, setAuthUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ name: '' })
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }
      setAuthUser(user)

      try {
        const profileData = await getStudentProfile(user.id)
        setProfile(profileData)
        setFormData({ name: profileData?.name || '' })
      } catch {
        // Student profile might not exist in students table. Use auth user data instead.
        setProfile(null)
        setFormData({ name: user.user_metadata?.name || '' })
      }
    } catch (err) {
      console.error('Error loading profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage({ text: '', type: '' })
    try {
      // Update Supabase auth metadata
      const { error: metaError } = await supabase.auth.updateUser({
        data: { name: formData.name }
      })
      if (metaError) throw metaError

      // Try to update student table if profile exists
      if (profile) {
        await updateStudentProfile(profile.id, { name: formData.name })
      }

      setMessage({ text: 'Profile updated successfully!', type: 'success' })
      setEditMode(false)
      await loadProfile()
    } catch (err) {
      console.error('Save error:', err)
      setMessage({ text: 'Failed to update profile.', type: 'error' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  const displayName = profile?.name || authUser?.user_metadata?.name || authUser?.email?.split('@')[0] || 'Student'
  const displayEmail = profile?.email || authUser?.email || ''

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f6f6f8]">
        <StudentSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5048e5] mx-auto"></div>
            <p className="mt-4 text-slate-500">Loading profile...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
      <StudentSidebar />

      <main className="ml-64 flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-6">
          <nav className="flex text-sm text-slate-500 mb-2">
            <Link to="/student/dashboard" className="hover:text-[#5048e5] transition-colors">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800 font-medium">Profile</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your personal information</p>
        </header>

        <div className="p-8 max-w-3xl">
          {/* Toast */}
          {message.text && (
            <div className={`mb-6 p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <span className="material-icons-round text-sm">{message.type === 'success' ? 'check_circle' : 'error'}</span>
              {message.text}
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-[#5048e5] to-blue-500 relative">
              <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#5048e5]">{displayName.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="pt-16 px-8 pb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{displayName}</h2>
                  <p className="text-slate-500 flex items-center gap-1 mt-1">
                    <span className="material-icons-round text-sm">email</span>
                    {displayEmail}
                  </p>
                  {profile?.class?.name && (
                    <p className="text-slate-500 flex items-center gap-1 mt-1">
                      <span className="material-icons-round text-sm">class</span>
                      {profile.class.name}
                    </p>
                  )}
                  {profile?.roll_number && (
                    <p className="text-slate-500 flex items-center gap-1 mt-1">
                      <span className="material-icons-round text-sm">badge</span>
                      Roll No: {profile.roll_number}
                    </p>
                  )}
                </div>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-[#5048e5] text-white rounded-lg font-medium hover:bg-[#5048e5]/90 transition-colors flex items-center gap-2"
                  >
                    <span className="material-icons-round text-sm">edit</span>
                    Edit Profile
                  </button>
                )}
              </div>

              {editMode && (
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5048e5] focus:border-[#5048e5] transition"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={displayEmail}
                      disabled
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-6 py-2.5 bg-[#5048e5] text-white rounded-lg font-medium hover:bg-[#5048e5]/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving ? (
                        <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Saving...</>
                      ) : (
                        <><span className="material-icons-round text-sm">save</span> Save Changes</>
                      )}
                    </button>
                    <button
                      onClick={() => { setEditMode(false); setFormData({ name: displayName }) }}
                      className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-6">
            <h3 className="font-bold text-slate-800 mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-500">Role</span>
                <span className="px-3 py-1 bg-[#5048e5]/10 text-[#5048e5] text-xs font-bold uppercase rounded-full">Student</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-500">Account Created</span>
                <span className="text-sm font-medium text-slate-700">
                  {authUser?.created_at ? new Date(authUser.created_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-500">Last Sign In</span>
                <span className="text-sm font-medium text-slate-700">
                  {authUser?.last_sign_in_at ? new Date(authUser.last_sign_in_at).toLocaleDateString() : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentProfile
