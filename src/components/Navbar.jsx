import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-icons text-white">school</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">EduPulse</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <a className="text-base font-medium text-gray-600 hover:text-primary transition-colors" href="#features">Features</a>
            <a className="text-base font-medium text-gray-600 hover:text-primary transition-colors" href="#about">About Us</a>
            <a className="text-base font-medium text-gray-600 hover:text-primary transition-colors" href="#">Resources</a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-primary font-medium hover:text-primary-dark transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link
              to="/login"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-primary/30 hover:shadow-primary/40"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-icons text-3xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3 pt-4">
              <a className="text-base font-medium text-gray-600 hover:text-primary transition-colors px-2 py-2" href="#features">Features</a>
              <a className="text-base font-medium text-gray-600 hover:text-primary transition-colors px-2 py-2" href="#about">About Us</a>
              <a className="text-base font-medium text-gray-600 hover:text-primary transition-colors px-2 py-2" href="#">Resources</a>
              <hr className="border-gray-100" />
              <Link to="/login" className="text-primary font-medium hover:text-primary-dark transition-colors px-2 py-2">
                Sign In
              </Link>
              <Link
                to="/login"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-primary/30 text-center"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
