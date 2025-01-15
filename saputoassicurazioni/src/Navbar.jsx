export function Navbar() {
    return (
      <div className="fixed top-0 left-0 w-full bg-blue-900 h-24 z-50 shadow-lg flex justify-center items-center">
        {/* Logo e Scritta */}
        <div className="flex items-center space-x-4 h-full px-4 sm:px-6">
          {/* Logo */}
          <img
            src="images/WhatsApp Image 2025-01-13 at 16.22.16.jpeg"
            alt="Logo"
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl"
          />

          {/* Scritta */}
          <div className="flex flex-col justify-center items-start sm:items-center">
            <h1 className="text-white text-lg sm:text-5xl">SAPUTO ASSICURAZIONI</h1>
            <h3 className="text-white text-sm ml-6 sm:text-2xl lg:ml-0">coltiviamo i tuoi interessi</h3>
          </div>
        </div>
      </div>
    );
  }
