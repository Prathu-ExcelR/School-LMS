import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import { HeroScrollDemo } from './components/HeroScrollDemo'
import TrustedBy from './components/TrustedBy'
import Features from './components/Features'
import InfoSection from './components/InfoSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import MyCourses from './components/MyCourses'
import BrowseCourses from './components/BrowseCourses'
import Quizzes from './components/Quizzes'
import Progress from './components/Progress'
import StudentResults from './components/StudentResults'
import StudentProfile from './components/StudentProfile'
import AdminDashboard from './components/AdminDashboard'
import AdminTeachers from './components/AdminTeachers'
import AdminClasses from './components/AdminClasses'
import AdminSubjects from './components/AdminSubjects'
import AdminStudents from './components/AdminStudents'
import AdminEnrollments from './components/AdminEnrollments'
import AdminReports from './components/AdminReports'
import TeacherDashboard from './components/TeacherDashboard'
import TeacherSubjects from './components/TeacherSubjects'
import TeacherUnits from './components/TeacherUnits'
import TeacherMaterials from './components/TeacherMaterials'
import TeacherQuizzes from './components/TeacherQuizzes'
import TeacherStudents from './components/TeacherStudents'
import TeacherAttendance from './components/TeacherAttendance'
import TeacherAnalytics from './components/TeacherAnalytics'
import ParentDashboard from './components/parent/ParentDashboard'
import ParentProgress from './components/parent/ParentProgress'
import ParentResults from './components/parent/ParentResults'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HeroScrollDemo />
                <TrustedBy />
                <Features />
                <InfoSection />
                <CTASection />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/student/my-subjects" element={<MyCourses />} />
          <Route path="/student/browse" element={<BrowseCourses />} />
          <Route path="/student/quizzes" element={<Quizzes />} />
          <Route path="/student/progress" element={<Progress />} />
          <Route path="/student/results" element={<StudentResults />} />
          <Route path="/student/profile" element={<StudentProfile />} />

          {/* Legacy student routes — redirect to new paths */}
          <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
          <Route path="/my-courses" element={<Navigate to="/student/my-subjects" replace />} />
          <Route path="/browse-courses" element={<Navigate to="/student/browse" replace />} />
          <Route path="/quizzes" element={<Navigate to="/student/quizzes" replace />} />
          <Route path="/progress" element={<Navigate to="/student/progress" replace />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/teachers" element={<AdminTeachers />} />
          <Route path="/admin/classes" element={<AdminClasses />} />
          <Route path="/admin/subjects" element={<AdminSubjects />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/enrollments" element={<AdminEnrollments />} />
          <Route path="/admin/reports" element={<AdminReports />} />

          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/subjects" element={<TeacherSubjects />} />
          <Route path="/teacher/units" element={<TeacherUnits />} />
          <Route path="/teacher/materials" element={<TeacherMaterials />} />
          <Route path="/teacher/quizzes" element={<TeacherQuizzes />} />
          <Route path="/teacher/students" element={<TeacherStudents />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/analytics" element={<TeacherAnalytics />} />

          {/* Parent Routes */}
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/parent/progress" element={<ParentProgress />} />
          <Route path="/parent/results" element={<ParentResults />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
