import { supabase } from '../lib/supabaseClient'

// ─── PARENT-STUDENT RELATIONSHIP ─────────────────────────────────

// Get all students (for dropdown in signup)
export async function getAllStudents() {
    const { data, error } = await supabase
        .from('users')
        .select('id, name, email, class_id')
        .eq('role', 'student')
        .order('name')

    if (error) throw error

    // Fetch class info for each student
    const classIds = [...new Set((data || []).map(s => s.class_id).filter(Boolean))]
    let classMap = {}
    if (classIds.length > 0) {
        const { data: classes } = await supabase
            .from('classes')
            .select('id, name')
            .in('id', classIds)
            ; (classes || []).forEach(c => { classMap[c.id] = c })
    }

    return (data || []).map(s => ({
        ...s,
        class: classMap[s.class_id] || null
    }))
}

// Create parent-student relationship
export async function createParentStudentRelation(parentId, studentId) {
    const { data, error } = await supabase
        .from('parent_students')
        .insert({ parent_id: parentId, student_id: studentId })
        .select()
        .single()

    if (error) throw error
    return data
}

// Get parent's linked children
export async function getParentChildren(parentId) {
    console.log('getParentChildren called with parentId:', parentId)

    const { data: relations, error } = await supabase
        .from('parent_students')
        .select('id, student_id, created_at')
        .eq('parent_id', parentId)

    if (error) {
        console.error('Error fetching parent_children:', error)
        throw error
    }

    console.log('Parent-student relations:', relations)

    if (!relations || relations.length === 0) return []

    // Get student details
    const studentIds = relations.map(r => r.student_id)
    console.log('Student IDs to fetch:', studentIds)

    const { data: students } = await supabase
        .from('users')
        .select('id, name, email, class_id')
        .in('id', studentIds)

    console.log('Fetched students:', students)

    // Get class info
    const classIds = [...new Set((students || []).map(s => s.class_id).filter(Boolean))]
    let classMap = {}
    if (classIds.length > 0) {
        const { data: classes } = await supabase
            .from('classes')
            .select('id, name')
            .in('id', classIds)
            ; (classes || []).forEach(c => { classMap[c.id] = c })
    }

    const studentMap = {}
        ; (students || []).forEach(s => {
            studentMap[s.id] = { ...s, class: classMap[s.class_id] || null }
        })

    const result = relations.map(r => ({
        ...r,
        student: studentMap[r.student_id] || null
    }))

    console.log('Final children data:', result)
    return result
}

// ─── CHILD PROGRESS DATA ─────────────────────────────────────────

// Get child's dashboard stats
export async function getChildDashboardStats(studentId) {
    console.log('getChildDashboardStats called with studentId:', studentId)

    try {
        // Enrolled subjects count
        const enrollResult = await supabase
            .from('enrollments')
            .select('id', { count: 'exact', head: true })
            .eq('student_id', studentId)

        console.log('Enrollment query result:', enrollResult)

        if (enrollResult.error) {
            console.warn('Enrollment count error:', enrollResult.error.message)
        }

        const enrolledCount = enrollResult.count

        // Quiz attempts
        const attemptsResult = await supabase
            .from('student_quiz_attempts')
            .select('score, total_points, passed')
            .eq('student_id', studentId)

        console.log('Quiz attempts query result:', attemptsResult)

        if (attemptsResult.error) {
            console.warn('Quiz attempts error:', attemptsResult.error.message)
        }

        const attempts = attemptsResult.data || []
        const completedQuizzes = attempts.length
        const passedQuizzes = attempts.filter(a => a.passed).length

        // Average score
        let avgScore = 0
        if (completedQuizzes > 0) {
            const totalPercent = attempts.reduce((sum, a) => {
                const total = a.total_points || 1
                return sum + (total > 0 ? (a.score / total) * 100 : 0)
            }, 0)
            avgScore = Math.round(totalPercent / completedQuizzes)
        }

        const stats = {
            enrolledSubjects: enrolledCount || 0,
            completedQuizzes,
            passedQuizzes,
            avgScore
        }

        console.log('Stats calculated:', stats)

        return stats
    } catch (error) {
        console.error('Error in getChildDashboardStats:', error)
        return {
            enrolledSubjects: 0,
            completedQuizzes: 0,
            passedQuizzes: 0,
            avgScore: 0
        }
    }
}

// Get child's enrolled subjects
export async function getChildEnrolledSubjects(studentId) {
    const { data: enrollments, error: enrollErr } = await supabase
        .from('enrollments')
        .select('id, enrolled_date, subject_id')
        .eq('student_id', studentId)
        .order('enrolled_date', { ascending: false })

    if (enrollErr) throw enrollErr
    if (!enrollments || enrollments.length === 0) return []

    const subjectIds = [...new Set(enrollments.map(e => e.subject_id))]
    const { data: subjects, error: subErr } = await supabase
        .from('subjects')
        .select('id, name, class_id')
        .in('id', subjectIds)

    if (subErr) throw subErr

    const classIds = [...new Set((subjects || []).map(s => s.class_id).filter(Boolean))]
    let classesMap = {}
    if (classIds.length > 0) {
        const { data: classes } = await supabase
            .from('classes')
            .select('id, name')
            .in('id', classIds)
            ; (classes || []).forEach(c => { classesMap[c.id] = c })
    }

    const subjectMap = {}
        ; (subjects || []).forEach(s => {
            subjectMap[s.id] = { ...s, class: classesMap[s.class_id] || null }
        })

    return enrollments.map(e => ({
        id: e.id,
        created_at: e.enrolled_date,
        enrolled_at: e.enrolled_date,
        subject: subjectMap[e.subject_id] || null
    }))
}

// Get child's quiz attempts
export async function getChildAttempts(studentId) {
    console.log('getChildAttempts called with studentId:', studentId)

    const { data: attempts, error, status, statusText } = await supabase
        .from('student_quiz_attempts')
        .select('id, score, total_points, percentage, passed, started_at, completed_at, answers, quiz_id')
        .eq('student_id', studentId)
        .order('completed_at', { ascending: false })

    console.log('Query status:', status, statusText)
    console.log('Query error:', error)
    console.log('Raw attempts data:', attempts)

    if (error) {
        console.error('Error fetching child attempts:', error)
        throw error
    }

    if (!attempts || attempts.length === 0) return []

    const quizIds = [...new Set(attempts.map(a => a.quiz_id))]
    const { data: quizzes } = await supabase
        .from('quizzes')
        .select('id, title, passing_score, time_limit, unit_id')
        .in('id', quizIds)

    const unitIds = [...new Set((quizzes || []).map(q => q.unit_id).filter(Boolean))]
    let unitMap = {}
    if (unitIds.length > 0) {
        const { data: units } = await supabase
            .from('units')
            .select('id, name, subject_id')
            .in('id', unitIds)

        const subjectIds = [...new Set((units || []).map(u => u.subject_id).filter(Boolean))]
        let subjectMap = {}
        if (subjectIds.length > 0) {
            const { data: subjects } = await supabase
                .from('subjects')
                .select('id, name')
                .in('id', subjectIds)
                ; (subjects || []).forEach(s => { subjectMap[s.id] = s })
        }

        ; (units || []).forEach(u => {
            unitMap[u.id] = { ...u, subject: subjectMap[u.subject_id] || null }
        })
    }

    const quizMap = {}
        ; (quizzes || []).forEach(q => {
            quizMap[q.id] = { ...q, unit: unitMap[q.unit_id] || null }
        })

    return attempts.map(a => ({
        ...a,
        quiz: quizMap[a.quiz_id] || null
    }))
}

// Get comprehensive child progress data
export async function getChildProgressData(studentId) {
    console.log('getChildProgressData called with studentId:', studentId)

    try {
        const [stats, subjects, attempts] = await Promise.all([
            getChildDashboardStats(studentId),
            getChildEnrolledSubjects(studentId),
            getChildAttempts(studentId)
        ])

        console.log('Progress data fetched:', { stats, subjects, attempts })

        // Calculate per-subject performance
        const subjectMap = {}
        subjects.forEach(enrollment => {
            const subj = enrollment.subject
            if (subj) {
                subjectMap[subj.id] = { name: subj.name, attempts: 0, passed: 0, totalScore: 0 }
            }
        })

        attempts.forEach(attempt => {
            const subjId = attempt.quiz?.unit?.subject?.id
            console.log('Processing attempt:', attempt.id, 'subjectId:', subjId)
            if (subjId && subjectMap[subjId]) {
                subjectMap[subjId].attempts++
                if (attempt.passed) subjectMap[subjId].passed++
                if ((attempt.total_points || attempt.total_questions) > 0) {
                    subjectMap[subjId].totalScore += (attempt.score / (attempt.total_points || attempt.total_questions)) * 100
                }
            }
        })

        const subjectPerformance = Object.entries(subjectMap).map(([id, data]) => ({
            id,
            name: data.name,
            attempts: data.attempts,
            passed: data.passed,
            avg: data.attempts > 0 ? Math.round(data.totalScore / data.attempts) : 0
        }))

        console.log('Final progress data:', { stats, subjects, attempts, subjectPerformance })

        return {
            stats,
            subjects,
            attempts,
            subjectPerformance
        }
    } catch (error) {
        console.error('Error in getChildProgressData:', error)
        throw error
    }
}

// Get parent profile
export async function getParentProfile(parentId) {
    const { data, error } = await supabase
        .from('users')
        .select('id, name, email, role, phone, created_at')
        .eq('id', parentId)
        .single()

    if (error) throw error
    return data
}

// Update parent profile
export async function updateParentProfile(parentId, updates) {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', parentId)
        .select()
        .single()

    if (error) throw error
    return data
}
