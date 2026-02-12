import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { HeroScrollDemo } from './components/HeroScrollDemo'
import TrustedBy from './components/TrustedBy'
import Features from './components/Features'
import InfoSection from './components/InfoSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import MyCourses from './components/MyCourses'
import BrowseCourses from './components/BrowseCourses'
import Quizzes from './components/Quizzes'
import Progress from './components/Progress'
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

function App() {
  return (
    <Router>
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/browse-courses" element={<BrowseCourses />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/teachers" element={<AdminTeachers />} />
        <Route path="/admin/classes" element={<AdminClasses />} />
        <Route path="/admin/subjects" element={<AdminSubjects />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/enrollments" element={<AdminEnrollments />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/subjects" element={<TeacherSubjects />} />
        <Route path="/teacher/units" element={<TeacherUnits />} />
        <Route path="/teacher/materials" element={<TeacherMaterials />} />
        <Route path="/teacher/quizzes" element={<TeacherQuizzes />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
      </Routes>
    </Router>
  )
}

export default App
