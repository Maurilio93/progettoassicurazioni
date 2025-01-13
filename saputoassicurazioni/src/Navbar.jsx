export function Navbar() {
    return (
        <div className="w-full">
            {/* Navbar */}
            <div className="bg-blue-900 h-24 w-full flex items-center justify-center">
                {/* Logo e Scritta */}
                <div className="flex items-center space-x-4">
                    <img
                        src="images/WhatsApp Image 2025-01-13 at 16.22.16.jpeg"
                        alt="Logo"
                        className="h-20 w-20 rounded-xl"
                    />
                    <div className="flex flex-col items-start pl-8">
                        <h1 className="text-white text-5xl">SAPUTO ASSICURAZIONI</h1>
                        <h3 className="text-white text-2xl pl-28">coltiviamo i tuoi interessi</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
