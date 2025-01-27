import Swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
export function Navbar({ token, setToken, handleLogin, handleLogout }) {
  console.log("Navbar props:", { token, setToken });

  const handleLoginClick = async () => {
    // Prompt personalizzato con SweetAlert2
    const { value: formValues } = await Swal.fire({
      title: "Login Admin",
      html: `
        <input type="text" id="swal-username" class="swal2-input" placeholder="Username">
        <input type="password" id="swal-password" class="swal2-input" placeholder="Password">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Login",
      cancelButtonText: "Annulla",
      preConfirm: () => {
        const username = document.getElementById("swal-username").value;
        const password = document.getElementById("swal-password").value;

        if (!username || !password) {
          Swal.showValidationMessage("Entrambi i campi sono obbligatori!");
        }

        return { username, password };
      },
    });

    if (!formValues) {
      // Utente ha cliccato "Annulla"
      return;
    }

    const { username, password } = formValues;
    console.log("Username inviato:", username);
    console.log("Password inviata:", password);

    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenziali non valide");
      }

      const data = await response.json();
      console.log("Token ricevuto:", data.token);
      setToken(data.token); // Aggiorna lo stato in App
      handleLogin(data.token); // Avvisa App che abbiamo un token

      // SweetAlert2: Accesso riuscito
      Swal.fire({
        title: "Accesso effettuato!",
        text: "Login avvenuto con successo!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Errore durante il login:", error);

      // SweetAlert2: Login fallito
      Swal.fire({
        title: "Errore!",
        text: "Login fallito. Riprova.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-900 h-24 z-50 shadow-lg flex justify-between items-center px-4">
      {/* Scritta principale con il logo accanto */}
      <div className="flex items-center justify-center mx-auto space-x-4">
        <img
          src="images/WhatsApp Image 2025-01-13 at 16.22.16.jpeg"
          alt="Logo"
          className="h-16 w-16 rounded-xl"
        />
        <div className="flex flex-col items-center">
          <h1 className="text-white text-md sm:text-5xl">SAPUTO ASSICURAZIONI</h1>
          <h2 className="text-white text-sm sm:text-2xl">
            coltiviamo i tuoi interessi
          </h2>
        </div>
      </div>

      {/* Pulsante Login/Logout */}
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
