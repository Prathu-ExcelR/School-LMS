function TrustedBy() {
  const partners = [
    { icon: 'school', name: 'UniTech' },
    { icon: 'menu_book', name: 'EduGlobal' },
    { icon: 'science', name: 'SciAcademy' },
    { icon: 'history_edu', name: 'BrightPath' },
  ]

  return (
    <div className="pt-32 lg:pt-56 pb-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
          Trusted by leading institutions worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center gap-2 font-bold text-xl text-gray-600">
              <span className="material-icons">{partner.icon}</span> {partner.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrustedBy
