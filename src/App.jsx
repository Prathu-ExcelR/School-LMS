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
      </Routes>
    </Router>
  )
}

export default App
