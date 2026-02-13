import { supabase } from '../lib/supabaseClient'

// ─── HELPERS ───────────────────────────────────────────────

// Get the student's class_id from the users table
export async function getStudentClassId(studentId) {
  const { data, error } = await supabase
    .from('users')
    .select('class_id')
    .eq('id', studentId)
    .single()

  if (error) throw error
  return data?.class_id || null
}

// ─── ENROLLMENT ────────────────────────────────────────────

// Get student's enrolled subjects
export async function getEnrolledSubjects(studentId) {
  // 1. Get enrollments (column is enrolled_date, not created_at)
  const { data: enrollments, error: enrollErr } = await supabase
    .from('enrollments')
    .select('id, enrolled_date, subject_id')
    .eq('student_id', studentId)
    .order('enrolled_date', { ascending: false })

  if (enrollErr) throw enrollErr
  if (!enrollments || enrollments.length === 0) return []

  // 2. Get unique subject IDs and fetch subjects (no description column)
  const subjectIds = [...new Set(enrollments.map(e => e.subject_id))]
  const { data: subjects, error: subErr } = await supabase
    .from('subjects')
    .select('id, name, class_id')
    .in('id', subjectIds)

  if (subErr) throw subErr

  // 3. Get classes for those subjects
  const classIds = [...new Set((subjects || []).map(s => s.class_id).filter(Boolean))]
  let classesMap = {}
  if (classIds.length > 0) {
    const { data: classes } = await supabase
      .from('classes')
      .select('id, name')
      .in('id', classIds)
    ;(classes || []).forEach(c => { classesMap[c.id] = c })
  }

  // 4. Build subject map with class info
  const subjectMap = {}
  ;(subjects || []).forEach(s => {
    subjectMap[s.id] = { ...s, class: classesMap[s.class_id] || null }
  })

  // 5. Combine — map enrolled_date to created_at for component compatibility
  return enrollments.map(e => ({
    id: e.id,
    created_at: e.enrolled_date,
    enrolled_at: e.enrolled_date,
    subject: subjectMap[e.subject_id] || null
  }))
}

// Get all available subjects (for browse/enroll), optionally filtered by class
export async function getAllSubjects(classId = null) {
  // subjects table has: id, name, class_id, teacher_id, price, status, created_at
  // NO description column
  let query = supabase
    .from('subjects')
    .select('id, name, class_id, price, status')
    .order('name')

  if (classId) {
    query = query.eq('class_id', classId)
  }

  const { data: subjects, error } = await query
  if (error) throw error

  // Fetch classes separately
  const classIds = [...new Set((subjects || []).map(s => s.class_id).filter(Boolean))]
  let classesMap = {}
  if (classIds.length > 0) {
    const { data: classes } = await supabase
      .from('classes')
      .select('id, name')
      .in('id', classIds)
    ;(classes || []).forEach(c => { classesMap[c.id] = c })
  }

  return (subjects || []).map(s => ({
    ...s,
    description: null, // subjects table has no description column
    class: classesMap[s.class_id] || null
  }))
}

// Enroll student in a subject
export async function enrollInSubject(studentId, subjectId) {
  const { data, error } = await supabase
    .from('enrollments')
    .insert({ student_id: studentId, subject_id: subjectId })
    .select()
    .single()

  if (error) throw error
  return data
}

// Check if student is enrolled in a subject
export async function checkEnrollment(studentId, subjectId) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('id')
    .eq('student_id', studentId)
    .eq('subject_id', subjectId)
    .maybeSingle()

  if (error) throw error
  return !!data
}

// Unenroll from a subject
export async function unenrollFromSubject(enrollmentId) {
  const { error } = await supabase
    .from('enrollments')
    .delete()
    .eq('id', enrollmentId)

  if (error) throw error
}

// ─── UNITS & MATERIALS ─────────────────────────────────────

// Get units for a subject
export async function getSubjectUnits(subjectId) {
  const { data, error } = await supabase
    .from('units')
    .select('id, name, description, order_number, subject_id')
    .eq('subject_id', subjectId)
    .order('order_number', { ascending: true })

  if (error) throw error
  return data || []
}

// Get materials for a unit
export async function getUnitMaterials(unitId) {
  const { data, error } = await supabase
    .from('materials')
    .select('id, title, description, material_type, file_url, file_path, created_at, unit_id')
    .eq('unit_id', unitId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

// ─── QUIZZES ───────────────────────────────────────────────

// Get available quizzes for a student (from enrolled subjects)
export async function getStudentQuizzes(studentId) {
  // First get enrolled subject IDs
  const { data: enrollments, error: enrollError } = await supabase
    .from('enrollments')
    .select('subject_id')
    .eq('student_id', studentId)

  if (enrollError) throw enrollError

  const subjectIds = (enrollments || []).map(e => e.subject_id)
  console.log('Quiz chain - Step 1 - Enrolled subjectIds:', subjectIds)
  if (subjectIds.length === 0) return []

  // Get subjects info
  const { data: subjects } = await supabase
    .from('subjects')
    .select('id, name')
    .in('id', subjectIds)
  const subjectMap = {}
  ;(subjects || []).forEach(s => { subjectMap[s.id] = s })

  // Get units for those subjects
  const { data: units, error: unitError } = await supabase
    .from('units')
    .select('id, name, subject_id')
    .in('subject_id', subjectIds)

  if (unitError) throw unitError

  const unitIds = (units || []).map(u => u.id)
  console.log('Quiz chain - Step 2 - Units found:', units?.length, 'unitIds:', unitIds)
  if (unitIds.length === 0) return []

  const unitMap = {}
  ;(units || []).forEach(u => {
    unitMap[u.id] = { ...u, subject: subjectMap[u.subject_id] || null }
  })

  // Get quizzes for those units
  const { data: quizzes, error: quizError } = await supabase
    .from('quizzes')
    .select('id, title, total_questions, passing_score, time_limit, created_at, unit_id')
    .in('unit_id', unitIds)
    .order('created_at', { ascending: false })

  if (quizError) throw quizError

  console.log('Quiz chain - Step 3 - Quizzes found:', quizzes?.length, quizzes)

  return (quizzes || []).map(q => ({
    ...q,
    unit: unitMap[q.unit_id] || null
  }))
}

// Get quiz details with questions
export async function getQuizWithQuestions(quizId) {
  // Get quiz info
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('id, title, total_questions, passing_score, time_limit, unit_id')
    .eq('id', quizId)
    .single()

  if (quizError) throw quizError

  // Get unit & subject info separately
  if (quiz.unit_id) {
    const { data: unit } = await supabase
      .from('units')
      .select('id, name, subject_id')
      .eq('id', quiz.unit_id)
      .single()

    if (unit) {
      const { data: subject } = await supabase
        .from('subjects')
        .select('id, name')
        .eq('id', unit.subject_id)
        .single()

      quiz.unit = { ...unit, subject: subject || null }
    }
  }

  // Get questions
  const { data: questions, error: qError } = await supabase
    .from('quiz_questions')
    .select('id, question_text, options, correct_answer, points, order_number')
    .eq('quiz_id', quizId)
    .order('order_number')

  if (qError) throw qError

  return { ...quiz, questions: questions || [] }
}

// ─── QUIZ ATTEMPTS ─────────────────────────────────────────

// Submit a quiz attempt
export async function submitQuizAttempt(attemptData) {
  const { data, error } = await supabase
    .from('student_quiz_attempts')
    .insert({
      student_id: attemptData.student_id,
      quiz_id: attemptData.quiz_id,
      score: attemptData.score,
      total_points: attemptData.total_questions,
      percentage: attemptData.total_questions > 0
        ? ((attemptData.score / attemptData.total_questions) * 100).toFixed(2)
        : 0,
      passed: attemptData.passed,
      answers: attemptData.answers,
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Get student's quiz attempts
export async function getStudentAttempts(studentId) {
  // 1. Get attempts
  const { data: attempts, error } = await supabase
    .from('student_quiz_attempts')
    .select('id, score, total_points, percentage, passed, started_at, completed_at, answers, quiz_id')
    .eq('student_id', studentId)
    .order('completed_at', { ascending: false })

  if (error) throw error
  if (!attempts || attempts.length === 0) return []

  // 2. Get quiz info
  const quizIds = [...new Set(attempts.map(a => a.quiz_id))]
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id, title, passing_score, time_limit, unit_id')
    .in('id', quizIds)

  // 3. Get unit info
  const unitIds = [...new Set((quizzes || []).map(q => q.unit_id).filter(Boolean))]
  let unitMap = {}
  if (unitIds.length > 0) {
    const { data: units } = await supabase
      .from('units')
      .select('id, name, subject_id')
      .in('id', unitIds)

    // 4. Get subject info
    const subjectIds = [...new Set((units || []).map(u => u.subject_id).filter(Boolean))]
    let subjectMap = {}
    if (subjectIds.length > 0) {
      const { data: subjects } = await supabase
        .from('subjects')
        .select('id, name')
        .in('id', subjectIds)
      ;(subjects || []).forEach(s => { subjectMap[s.id] = s })
    }

    ;(units || []).forEach(u => {
      unitMap[u.id] = { ...u, subject: subjectMap[u.subject_id] || null }
    })
  }

  // 5. Build quiz map
  const quizMap = {}
  ;(quizzes || []).forEach(q => {
    quizMap[q.id] = { ...q, unit: unitMap[q.unit_id] || null }
  })

  // 6. Combine
  return attempts.map(a => ({
    ...a,
    quiz: quizMap[a.quiz_id] || null
  }))
}

// Get attempts for a specific quiz
export async function getQuizAttempts(studentId, quizId) {
  const { data, error } = await supabase
    .from('student_quiz_attempts')
    .select('id, score, total_points, percentage, passed, started_at, completed_at, answers')
    .eq('student_id', studentId)
    .eq('quiz_id', quizId)
    .order('completed_at', { ascending: false })

  if (error) throw error
  return data || []
}

// ─── DASHBOARD STATS ───────────────────────────────────────

export async function getStudentDashboardStats(studentId) {
  // Enrolled subjects count
  const { count: enrolledCount, error: enrollErr } = await supabase
    .from('enrollments')
    .select('id', { count: 'exact', head: true })
    .eq('student_id', studentId)

  if (enrollErr) console.warn('Enrollment count error:', enrollErr.message)

  // Quiz attempts
  const { data: attempts, error: attErr } = await supabase
    .from('student_quiz_attempts')
    .select('score, total_points, passed')
    .eq('student_id', studentId)

  if (attErr) console.warn('Quiz attempts error:', attErr.message)

  const attemptList = attempts || []
  const completedQuizzes = attemptList.length
  const passedQuizzes = attemptList.filter(a => a.passed).length

  // Average score
  let avgScore = 0
  if (completedQuizzes > 0) {
    const totalPercent = attemptList.reduce((sum, a) => {
      const total = a.total_points || 1
      return sum + (total > 0 ? (a.score / total) * 100 : 0)
    }, 0)
    avgScore = Math.round(totalPercent / completedQuizzes)
  }

  return {
    enrolledSubjects: enrolledCount || 0,
    completedQuizzes,
    passedQuizzes,
    avgScore
  }
}

// ─── PROFILE ───────────────────────────────────────────────

export async function getStudentProfile(studentId) {
  // users table: id, email, name, role, phone, grade, created_at, password_hash, class_id
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, role, class_id, phone, grade, created_at')
    .eq('id', studentId)
    .single()

  if (error) throw error

  // Fetch class info separately
  if (data?.class_id) {
    const { data: classData } = await supabase
      .from('classes')
      .select('id, name')
      .eq('id', data.class_id)
      .single()
    data.class = classData || null
  }

  return data
}

export async function updateStudentProfile(studentId, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', studentId)
    .select()
    .single()

  if (error) throw error
  return data
}
