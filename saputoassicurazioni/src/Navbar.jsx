// eslint-disable-next-line react/prop-types
export function Navbar({ token, setToken, handleLogin, handleLogout }) {
  console.log('Navbar props:', { token, setToken }); // Debug

  const handleLoginClick = async () => {
    const username = prompt("Inserisci username:");
    const password = prompt("Inserisci password:");
    console.log("Username inviato:", username);  // Debugging
    console.log("Password inviata:", password);  // Debugging

    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Credenziali non valide");

      const data = await response.json();
      console.log("Token ricevuto:", data.token); // Debugging
      setToken(data.token);  // Usa la funzione setToken passata dal componente App
      handleLogin(data.token);  // Passa il token a LandingPage
      alert("Accesso effettuato con successo!");
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Login fallito. Riprova.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-900 h-24 z-50 shadow-lg flex justify-between items-center px-4">
      <div className="flex items-center space-x-4">
        <img
          src="images/WhatsApp Image 2025-01-13 at 16.22.16.jpeg"
          alt="Logo"
          className="h-16 w-16 rounded-xl"
        />
        <h1 className="text-white text-lg sm:text-5xl">SAPUTO ASSICURAZIONI</h1>
      </div>
      <div>
        {token ? (
          <button
            onClick={handleLogout}  // Gestione del logout con la funzione handleLogout
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
          >
            Admin
          </button>
        )}
      </div>
    </div>
  );
}
