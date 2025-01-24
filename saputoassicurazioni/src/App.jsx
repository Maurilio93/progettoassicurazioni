import { useState } from "react";
import { LandingPage } from "./LandingPage";
import { Navbar } from "./Navbar";
import { FileList } from "./FileList";

function App() {
  // Stato per memorizzare il token
  const [token, setToken] = useState(null);

  // Funzione per gestire il login e salvare il token
  const handleLogin = (receivedToken) => {
    console.log("Token ricevuto in App:", receivedToken);
    setToken(receivedToken);
  };

  // Funzione per gestire il logout (azzerare token)
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
          se hai un token, mostra la lista dei file */}
      {!token ? (
        <LandingPage handleLogin={handleLogin} token={token} />
      ) : (
        <FileList token={token} />
      )}
    </div>
  );
}

export default App;
