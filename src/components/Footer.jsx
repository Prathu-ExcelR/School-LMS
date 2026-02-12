function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-sm">school</span>
              </div>
              <span className="font-bold text-xl text-gray-900">EduPulse</span>
            </div>
            <p className="text-gray-500 mb-6 max-w-xs">
              Making education accessible, engaging, and effective for the digital generation.
            </p>
            <div className="flex space-x-4">
              <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                <span className="material-icons">facebook</span>
              </a>
              <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                <span className="material-icons">public</span>
              </a>
              <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                <span className="material-icons">photo_camera</span>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Updates</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2023 EduPulse LMS. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
