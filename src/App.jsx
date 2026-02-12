import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

// Placeholder pages for role-based redirects
function ComingSoon({ role }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-icons text-blue-500 text-4xl">construction</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{role} Dashboard</h1>
        <p className="text-gray-500 text-lg">Coming Soon</p>
      </div>
    </div>
  )
}

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/browse-courses" element={<BrowseCourses />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/progress" element={<Progress />} />
          {/* Role-based placeholder routes */}
          <Route path="/teacher" element={<ComingSoon role="Teacher" />} />
          <Route path="/parent" element={<ComingSoon role="Parent" />} />
          <Route path="/admin" element={<ComingSoon role="Admin" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
