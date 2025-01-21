import { useState } from "react";
import { LandingPage } from "./LandingPage";
import { Navbar } from "./Navbar";
import { FileList } from "./FileList";

function App() {
  const [token, setToken] = useState(null);

  // Funzione per gestire il login
  const handleLogin = (token) => {
    console.log("Token ricevuto in App:", token);
    setToken(token);
  };

  // Funzione per gestire il logout
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      {/* Navbar con tutte le props necessarie */}
      <Navbar
        token={token}
        setToken={setToken}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      {/* Se NON sei loggato, mostra la LandingPage;
          se hai un token, mostra la lista dei file. */}
      {!token ? (
        <LandingPage handleLogin={handleLogin} />
      ) : (
        <FileList token={token} />
      )}
    </div>
  );
}

export default App;
