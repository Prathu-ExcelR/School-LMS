import { supabase } from '../lib/supabaseClient'

// Get teacher's assigned subjects and classes
export const getTeacherAssignedData = async (teacherId) => {
  const { data, error } = await supabase
    .from('teacher_assignments')
    .select(`
      *,
      class:classes(id, name),
      subject:subjects(id, name, class_id)
    `)
    .eq('teacher_id', teacherId)
  if (error) throw error
  return data
}

// Get teacher's subjects only
export const getTeacherSubjects = async (teacherId) => {
  const { data, error } = await supabase
    .from('teacher_assignments')
    .select(`
      subject:subjects(*)
    `)
    .eq('teacher_id', teacherId)
  if (error) throw error
  return data.map(item => item.subject)
}

// Get teacher's classes only
export const getTeacherClasses = async (teacherId) => {
  const { data, error } = await supabase
    .from('teacher_assignments')
    .select(`
      class:classes(*)
    `)
    .eq('teacher_id', teacherId)
  if (error) throw error
  // Remove duplicates
  const uniqueClasses = [...new Map(data.map(item => [item.class.id, item.class])).values()]
  return uniqueClasses
}

// Get students enrolled in teacher's subjects
export const getTeacherStudents = async (teacherId) => {
  // First get teacher's subject IDs
  const { data: assignments } = await supabase
    .from('teacher_assignments')
    .select('subject_id')
    .eq('teacher_id', teacherId)
  
  const subjectIds = assignments.map(a => a.subject_id)
  
  // Get students enrolled in these subjects
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      student:users!enrollments_student_id_fkey(id, name, email, grade),
      subject:subjects(id, name)
    `)
    .in('subject_id', subjectIds)
  
  if (error) throw error
  return data
}

// Get detailed subject information with counts
export const getTeacherSubjectDetails = async (teacherId) => {
  // First get teacher's assigned subjects
  const { data: assignments, error: assignError } = await supabase
    .from('teacher_assignments')
    .select(`
      *,
      subject:subjects(id, name, class_id),
      class:classes(id, name)
    `)
    .eq('teacher_id', teacherId)
  
  if (assignError) throw assignError
  
  // Get unique subjects with their class names
  const subjectMap = new Map()
  assignments.forEach(assignment => {
    if (assignment.subject && assignment.class) {
      const key = assignment.subject.id
      if (!subjectMap.has(key)) {
        subjectMap.set(key, {
          id: assignment.subject.id,
          name: assignment.subject.name,
          class: assignment.class.name,
          class_id: assignment.class.id,
          subject_id: assignment.subject.id,
          students: 0,
          units: 0,
          materials: 0,
          quizzes: 0,
          avgScore: '0%'
        })
      }
    }
  })
  
  const subjects = Array.from(subjectMap.values())
  
  // Get student counts for each subject
  if (subjects.length > 0) {
    const subjectIds = subjects.map(s => s.subject_id)
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('subject_id')
      .in('subject_id', subjectIds)
    
    // Count students per subject
    const enrollmentCount = {}
    enrollments?.forEach(enrollment => {
      enrollmentCount[enrollment.subject_id] = (enrollmentCount[enrollment.subject_id] || 0) + 1
    })
    
    subjects.forEach(subject => {
      subject.students = enrollmentCount[subject.subject_id] || 0
    })
  }
  
  // Add color coding
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500']
  subjects.forEach((subject, index) => {
    subject.color = colors[index % colors.length]
  })
  
  return subjects
}

// Get teacher's units with subject information
export const getTeacherUnits = async (teacherId, subjectId = null) => {
  let query = supabase
    .from('units')
    .select(`
      *,
      subject:subjects(id, name),
      materials(count),
      quizzes(count)
    `)
    .eq('teacher_id', teacherId)
    .order('order_number', { ascending: true })
  
  if (subjectId) {
    query = query.eq('subject_id', parseInt(subjectId))
  }
  
  const { data, error } = await query
  
  if (error) throw error
  
  // Process the data to match the expected format
  return data.map(unit => ({
    id: unit.id,
    name: unit.name,
    subject: unit.subject?.name || 'Unknown Subject',
    order: unit.order_number,
    materials: unit.materials?.[0]?.count || 0,
    quiz: unit.quizzes?.[0]?.count > 0,
    students: 0, // Will be calculated based on enrollments
    avgScore: '0%' // Will be calculated from quiz attempts
  }))
}

// Get unit details with materials and quizzes
export const getUnitDetails = async (unitId) => {
  const { data, error } = await supabase
    .from('units')
    .select(`
      *,
      subject:subjects(name),
      materials(*),
      quizzes(*)
    `)
    .eq('id', unitId)
    .single()
  
  if (error) throw error
  return data
}

// Create new unit
export const createUnit = async (unitData) => {
  const { data, error } = await supabase
    .from('units')
    .insert([unitData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Update unit
export const updateUnit = async (unitId, updates) => {
  const { data, error } = await supabase
    .from('units')
    .update(updates)
    .eq('id', unitId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Delete unit
export const deleteUnit = async (unitId) => {
  const { error } = await supabase
    .from('units')
    .delete()
    .eq('id', unitId)
  
  if (error) throw error
}

// Get teacher's materials
export const getTeacherMaterials = async (teacherId, unitId = null) => {
  try {
    // First get teacher's units
    const { data: units, error: unitsError } = await supabase
      .from('units')
      .select('id, name, subject_id')
      .eq('teacher_id', teacherId)
    
    if (unitsError) {
      console.error('Units query error:', unitsError)
      // If units table doesn't exist, return empty array
      if (unitsError.code === '42P01') { // undefined_table error
        return []
      }
      throw unitsError
    }
    
    if (!units || units.length === 0) {
      return []
    }
    
    // Get subject names for the units
    const subjectIds = [...new Set(units.map(unit => unit.subject_id))].filter(Boolean)
    let subjects = []
    
    if (subjectIds.length > 0) {
      const { data: subjectData } = await supabase
        .from('subjects')
        .select('id, name')
        .in('id', subjectIds)
      subjects = subjectData || []
    }
    
    // Create a map for quick lookup
    const subjectMap = new Map(subjects.map(s => [s.id, s.name]))
    const unitMap = new Map(units.map(u => [u.id, { name: u.name, subject_id: u.subject_id }]))
    
    // Then get materials for those units
    let query = supabase
      .from('materials')
      .select('*')
      
    const unitIds = units.map(unit => unit.id)
    query = query.in('unit_id', unitIds)
    
    if (unitId) {
      query = query.eq('unit_id', unitId)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Materials query error:', error)
      // If materials table doesn't exist, return empty array
      if (error.code === '42P01') { // undefined_table error
        return []
      }
      throw error
    }
    
    return data.map(material => {
      const unitInfo = unitMap.get(material.unit_id)
      return {
        id: material.id,
        title: material.title,
        type: material.material_type || 'link',
        unit: unitInfo?.name || 'Unknown Unit',
        subject: unitInfo?.subject_id ? subjectMap.get(unitInfo.subject_id) || 'Unknown Subject' : 'Unknown Subject',
        url: material.file_url || '',
        filePath: material.file_path || '',
        uploadedDate: new Date(material.created_at).toLocaleDateString()
      }
    })
  } catch (error) {
    console.error('Error in getTeacherMaterials:', error)
    // Return empty array instead of throwing for better UX
    return []
  }
}

// Create new material
export const createMaterial = async (materialData) => {
  const { data, error } = await supabase
    .from('materials')
    .insert([materialData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Upload file to Supabase Storage
export const uploadFile = async (file, bucketName = 'materials') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
  
  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .upload(fileName, file)
  
  if (error) throw error
  return data.path
}

// Get public URL for uploaded file
export const getFileUrl = (filePath, bucketName = 'materials') => {
  const { data } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(filePath)
  
  return data.publicUrl
}

// Update material
export const updateMaterial = async (materialId, updates) => {
  const { data, error } = await supabase
    .from('materials')
    .update(updates)
    .eq('id', materialId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Delete material
export const deleteMaterial = async (materialId) => {
  const { error } = await supabase
    .from('materials')
    .delete()
    .eq('id', materialId)
  
  if (error) throw error
}

// Teacher login verification
export const verifyTeacherLogin = async (email, password) => {
  // For now, check if teacher exists and password matches default
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('role', 'teacher')
    .single()
  
  if (error || !data) {
    throw new Error('Invalid credentials')
  }
  
  // Check default password (in production, use bcrypt)
  if (password !== 'teacher@123') {
    throw new Error('Invalid credentials')
  }
  
  return data
}
