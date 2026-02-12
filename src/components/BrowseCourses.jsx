import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

function BrowseCourses() {
  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] text-slate-800 dark:text-slate-100 font-display min-h-screen flex overflow-hidden">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-64 flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header / Search Area */}
        <header className="h-20 bg-white dark:bg-[#1c2a38] border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 flex-shrink-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Explore New Learning Paths</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">Find the perfect course to expand your knowledge.</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-64 lg:w-96">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-slate-400">search</span>
              </span>
              <input className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg leading-5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-[#137fec] focus:border-[#137fec] sm:text-sm transition duration-150 ease-in-out" placeholder="Search for python, calculus, history..." type="text"/>
            </div>
            {/* Notification Bell */}
            <button className="relative p-2 text-slate-400 hover:text-[#137fec] transition-colors">
              <span className="material-icons">notifications_none</span>
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Filters and Categories */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            {/* Category Tabs */}
            <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg self-start">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-white dark:bg-slate-700 text-[#137fec] shadow-sm ring-1 ring-slate-200 dark:ring-slate-600">All</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors">Math</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors">Science</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors">Languages</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors">Arts</button>
            </div>
            {/* Sort Dropdown */}
            <div className="relative inline-block text-left self-start sm:self-auto">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">Sort by:</span>
                <select className="form-select block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-[#137fec] focus:border-[#137fec] sm:text-sm rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Promotional Banner (Optional for marketplace feel) */}
          <div className="bg-gradient-to-r from-[#137fec] to-blue-500 rounded-xl p-6 mb-8 text-white relative overflow-hidden shadow-lg">
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Summer Learning Spree!</h2>
                <p className="text-blue-100 max-w-md">Get 20% off all Advanced Calculus and Physics courses until the end of the month. Use code: SUMMER20.</p>
              </div>
              <button className="mt-4 md:mt-0 bg-white text-[#137fec] px-5 py-2.5 rounded-lg font-semibold shadow hover:bg-blue-50 transition-colors">
                View Offer
              </button>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Card 1 */}
            <article className="bg-white dark:bg-[#1c2a38] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img alt="Mathematics graph and calculus equations" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWLR9G1QJSmJNoWXj28Ewz0QlOf5gADUGvxdKgdQhgnHZJKe7tgvNuz77BULNO562EoebNxAtI-X_dUiFrph5aGn65aVK_DHrK80aJdiNoF9COj5KKwvDi5b1o4Ah7JGhkwU_rz16xBIWS-dXuTyETkJheKuSqQS-k6vF9tp-4C7zdUOIJNQH_WScwMekgKa6ElDzzbmR30vrA1104sdUNZkiwIRs1EXjxo_GuwYrhJRUET8tT3Mmnd42f5U8caOYWHg8sIF54Hhg"/>
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-2.5 py-1 rounded text-slate-700 dark:text-slate-200 shadow-sm">Math</span>
                <button className="absolute top-3 right-3 p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors">
                  <span className="material-icons text-base block">favorite_border</span>
                </button>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">Best Seller</span>
                  <div className="flex items-center text-amber-400 text-sm font-bold">
                    4.9 <span className="material-icons text-sm ml-0.5">star</span>
                    <span className="text-slate-400 font-normal ml-1 text-xs">(1.2k)</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">Advanced Calculus II: Multivariate Integration</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Prof. Alan Turing</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">$49.99</span>
                  <button className="px-4 py-2 bg-[#137fec] hover:bg-[#0f6bd0] text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-[#137fec]/30">
                    Enroll Now
                  </button>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="bg-white dark:bg-[#1c2a38] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img alt="Students studying together in a group" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATwy_2nuDj7U3fj2RqxhloYdXqBDn-h6mvRABUARtWB31wgfACtiw66Ei-AfMnmWsoW3SPiXc_-cTnikyHjPQEw6Ag75asTwY3vOZ8vwvOPwJmYnG4YVRrleklJe11VARIGweVIdmA8MJFUO__PXvUubdM2x-zb19Qdodmoajw0M7QOjOUH7xHdDqK5VU4dpxi5TWOlul-clCyth2iQin2MxiWYbuWJ7eIhxh1Z69gL5Nx1nnGQKjMjv9L4OguX2nIMfLl7HsVUg8"/>
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-2.5 py-1 rounded text-slate-700 dark:text-slate-200 shadow-sm">Languages</span>
                <button className="absolute top-3 right-3 p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors">
                  <span className="material-icons text-base block">favorite_border</span>
                </button>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">Beginner</span>
                  <div className="flex items-center text-amber-400 text-sm font-bold">
                    4.5 <span class="material-icons text-sm ml-0.5">star</span>
                    <span className="text-slate-400 font-normal ml-1 text-xs">(850)</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">Intro to Conversational French</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Marie Curie</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">$29.99</span>
                  <button className="px-4 py-2 bg-[#137fec] hover:bg-[#0f6bd0] text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-[#137fec]/30">
                    Enroll Now
                  </button>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="bg-white dark:bg-[#1c2a38] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img alt="Chemistry lab equipment glassware" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDetLrWSjvPG0YsoTxnglwKlwadsiyyz9DLJePPVOl5uk0KCIKx5AR5-Y0jwLuwt2pw2E3gmR94GZxDG5JaUmrnJY4fNCcay8tE6E98t-zJH5bnNFEqqpzcELxumhYippNv3y72Yr-HuI8krUqH0I6keDYzCIPBxoWztXUJDPYjGRGZLhIUVcWaj9SlV5xEBd1IxT8bLK_zJiBR-fs1co5HUYFyy0oTpXhCD3_1LXFuqvwmW4tuXZPIPnGvbFpOxYsKk7S6IAwaOuY"/>
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-2.5 py-1 rounded text-slate-700 dark:text-slate-200 shadow-sm">Science</span>
                <button className="absolute top-3 right-3 p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors">
                  <span className="material-icons text-base block">favorite_border</span>
                </button>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded-full">New</span>
                  <div className="flex items-center text-amber-400 text-sm font-bold">
                    4.8 <span className="material-icons text-sm ml-0.5">star</span>
                    <span className="text-slate-400 font-normal ml-1 text-xs">(56)</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">Organic Chemistry Basics: Molecules</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Dr. Rosalind Franklin</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">$55.00</span>
                  <button className="px-4 py-2 bg-[#137fec] hover:bg-[#0f6bd0] text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-[#137fec]/30">
                    Enroll Now
                  </button>
                </div>
              </div>
            </article>

            {/* Card 4 */}
            <article className="bg-white dark:bg-[#1c2a38] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img alt="Matrix computer code screen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuU2EWyMxvcliH1aUMNkSRalx4SIf12pYQ4oK49CilrLN4DbsGpbU1w1pb7kGDpWg6mBSbVMucvyE9M6Pkhhbq7pARXUAXlPM6tRuHCuY7n_1y1CFmjO2xR5huNTBD4D1B0ZJ-p_WJxRlKK916Jz4nSxiR-lREzWtPzmTFpdO8VVY1u2i_MB7jkBoj3G59MioS7XGrm5EScUvgE4BOADSqal_hMLOlrNjckWCdkjGfP-beoq3Qp45neytuheq8TKY9_a-kQNBin90"/>
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-2.5 py-1 rounded text-slate-700 dark:text-slate-200 shadow-sm">Comp Sci</span>
                <button className="absolute top-3 right-3 p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors">
                  <span className="material-icons text-base block">favorite_border</span>
                </button>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-0.5 rounded-full">Intermediate</span>
                  <div className="flex items-center text-amber-400 text-sm font-bold">
                    4.7 <span className="material-icons text-sm ml-0.5">star</span>
                    <span className="text-slate-400 font-normal ml-1 text-xs">(320)</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">Python for Data Analysis</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Ada Lovelace</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">$34.99</span>
                  <button className="px-4 py-2 bg-[#137fec] hover:bg-[#0f6bd0] text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-[#137fec]/30">
                    Enroll Now
                  </button>
                </div>
              </div>
            </article>

            {/* Card 5 */}
            <article className="bg-white dark:bg-[#1c2a38] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img alt="Old vintage history book open" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBehPm1fFgowG6cEGTsnpvRmpr0XJIMeEcJEweaZZOI8RtmlrDaJ8__9lx60q_NKpctU-blywYCLMomVaeOO3bEArAk-TCQs8QBIizQVzwdcJpu8SezhGAElefSZpLDLJ-G8yIRSSlD33kWTIEEQE9a-1Nntf8YE0JqUYC5921ok93Z6zAbV8fEYJVX-5w_wsdjmmUPaRn3lp9io_C3jtwrCqeCqGvz_p63nd3PQeWwV7Bo5jDrWOAqJgiwVYdv5IqGUdKFtwBqBOY"/>
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-2.5 py-1 rounded text-slate-700 dark:text-slate-200 shadow-sm">History</span>
                <button className="absolute top-3 right-3 p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors">
                  <span className="material-icons text-base block">favorite_border</span>
                </button>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full">All Levels</span>
                  <div className="flex items-center text-amber-400 text-sm font-bold">
                    4.6 <span className="material-icons text-sm ml-0.5">star</span>
                    <span className="text-slate-400 font-normal ml-1 text-xs">(98)</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">The Renaissance: Art & Culture</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Leonardo Da Vinci</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">$39.99</span>
                  <button className="px-4 py-2 bg-[#137fec] hover:bg-[#0f6bd0] text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-[#137fec]/30">
                    Enroll Now
                  </button>
                </div>
              </div>
            </article>

            {/* Card 6 */}
            <article className="bg-white dark:bg-[#1c2a38] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img alt="Paint brushes and palette" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAmOpf0z5VRjV5bM6IZy3yZ6t8SiKEmhKQSem-JvX3WhPZojKRWB19Qt0QjM9eeW5Dr1-lOjW6-IiQv9AG-V9hbH5iGpXm4Ud1wKw9H_Xq9eAhsTNpRBdxIBeqHYzDZm2bt0cO3uiIXNtdc08ggi2KAkhuF4vXFO9iQZEATzvXb72UXFYVAOG9AQK7XOFrv9nCeYI2ZpIkfusWwNbvo2FXMrSNwU1_CCL34fDri8TZx_CdQwdQ30I0J7g2QJbmcAZfd-jW7f1NW6Y"/>
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-2.5 py-1 rounded text-slate-700 dark:text-slate-200 shadow-sm">Arts</span>
                <button className="absolute top-3 right-3 p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors">
                  <span className="material-icons text-base block">favorite_border</span>
                </button>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">Beginner</span>
                  <div className="flex items-center text-amber-400 text-sm font-bold">
                    4.9 <span className="material-icons text-sm ml-0.5">star</span>
                    <span className="text-slate-400 font-normal ml-1 text-xs">(210)</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">Modern Art Techniques 101</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Pablo Picasso</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">$45.00</span>
                  <button className="px-4 py-2 bg-[#137fec] hover:bg-[#0f6bd0] text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-[#137fec]/30">
                    Enroll Now
                  </button>
                </div>
              </div>
            </article>
          </div>
          
          {/* Pagination */}
          <div className="mt-12 mb-8 flex flex-col items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400 mb-4">Showing 6 of 42 courses</span>
            <button className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[#137fec] font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              Load More Courses
            </button>
          </div>
          
          {/* Footer Stub */}
          <footer className="border-t border-slate-200 dark:border-slate-700 pt-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
              <p>© 2023 EduLearn LMS. All rights reserved.</p>
              <div className="flex space-x-4 mt-2 md:mt-0">
                <a className="hover:text-[#137fec]" href="#">Privacy Policy</a>
                <a className="hover:text-[#137fec]" href="#">Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default BrowseCourses
