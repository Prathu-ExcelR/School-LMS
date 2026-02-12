import { supabase } from '../lib/supabaseClient'

// Teachers
export const getTeachers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'teacher')
  if (error) throw error
  return data
}

export const addTeacher = async (teacher) => {
  // First create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: teacher.email,
    password: 'teacher@123',
    options: {
      data: {
        name: teacher.name,
        role: 'teacher'
      }
    }
  })
  
  if (authError) throw authError
  
  // Then create user record with the auth user's ID
  const { data, error } = await supabase
    .from('users')
    .insert([{ 
      id: authData.user.id,
      ...teacher, 
      role: 'teacher' 
    }])
    .select()
  
  if (error) throw error
  return data[0]
}

export const updateTeacher = async (id, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
  if (error) throw error
  return data[0]
}

export const deleteTeacher = async (id) => {
  // First delete teacher assignments (foreign key constraint)
  const { error: assignError } = await supabase
    .from('teacher_assignments')
    .delete()
    .eq('teacher_id', id)
  
  if (assignError) throw assignError
  
  // Then delete from users table
  const { error: userError } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
  
  if (userError) throw userError
  
  // Finally delete from auth (requires admin privileges)
  // Note: This requires service role key, not anon key
  // For now, we'll just delete from users table
  // Auth user will remain but won't be able to access anything
}

// Classes
export const getClasses = async () => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
  if (error) throw error
  return data
}

export const addClass = async (className) => {
  const { data, error } = await supabase
    .from('classes')
    .insert([{ name: className }])
    .select()
  if (error) throw error
  return data[0]
}

export const updateClass = async (id, name) => {
  const { data, error } = await supabase
    .from('classes')
    .update({ name })
    .eq('id', id)
    .select()
  if (error) throw error
  return data[0]
}

export const deleteClass = async (id) => {
  const { error } = await supabase
    .from('classes')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Subjects
export const getSubjects = async () => {
  const { data, error } = await supabase
    .from('subjects')
    .select(`
      *,
      class:classes(name),
      teacher:users(name)
    `)
  if (error) throw error
  return data
}

export const addSubject = async (subject) => {
  const { data, error } = await supabase
    .from('subjects')
    .insert([subject])
    .select()
  if (error) throw error
  return data[0]
}

export const updateSubject = async (id, updates) => {
  const { data, error } = await supabase
    .from('subjects')
    .update(updates)
    .eq('id', id)
    .select()
  if (error) throw error
  return data[0]
}

export const deleteSubject = async (id) => {
  const { error } = await supabase
    .from('subjects')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Students
export const getStudents = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'student')
  if (error) throw error
  return data
}

// Enrollments
export const getEnrollments = async () => {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      student:users!enrollments_student_id_fkey(name),
      subject:subjects(name, class:classes(name))
    `)
  if (error) throw error
  return data
}

export const addEnrollment = async (enrollment) => {
  const { data, error } = await supabase
    .from('enrollments')
    .insert([enrollment])
    .select()
  if (error) throw error
  return data[0]
}

// Teacher Assignments
export const assignTeacherToSubjects = async (teacherId, assignments) => {
  const { data, error } = await supabase
    .from('teacher_assignments')
    .insert(assignments.map(a => ({ teacher_id: teacherId, subject_id: a.subject_id, class_id: a.class_id })))
    .select()
  if (error) throw error
  return data
}

export const getTeacherAssignments = async (teacherId) => {
  const { data, error } = await supabase
    .from('teacher_assignments')
    .select(`
      *,
      subject:subjects(name),
      class:classes(name)
    `)
    .eq('teacher_id', teacherId)
  if (error) throw error
  return data
}

// Dashboard Stats
export const getDashboardStats = async () => {
  const [teachers, students, classes, subjects, enrollments] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact' }).eq('role', 'teacher'),
    supabase.from('users').select('id', { count: 'exact' }).eq('role', 'student'),
    supabase.from('classes').select('id', { count: 'exact' }),
    supabase.from('subjects').select('id', { count: 'exact' }),
    supabase.from('enrollments').select('id', { count: 'exact' })
  ])

  return {
    totalTeachers: teachers.count || 0,
    totalStudents: students.count || 0,
    totalClasses: classes.count || 0,
    totalSubjects: subjects.count || 0,
    totalEnrollments: enrollments.count || 0
  }
}
