import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export function FileList({ token }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // per la barra di ricerca

  // Funzione per recuperare i file dal server (con o senza parametro di ricerca)
  const fetchFiles = async (search = "") => {
    try {
      // Costruisce l'URL con la query di ricerca (se esiste)
      const url = `http://localhost:3000/files${search ? `?search=${encodeURIComponent(search)}` : ""}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Accesso negato o errore nella chiamata");
      }

      const data = await response.json();
      setFiles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Al primo caricamento (o quando cambia il token), carichiamo tutti i file
  useEffect(() => {
    if (!token) return;
    fetchFiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Questo useEffect si attiva ogni volta che cambia searchTerm:
  // ricarichiamo la lista con il termine di ricerca
  useEffect(() => {
    if (!token) return;
    const timeoutId = setTimeout(() => {
      fetchFiles(searchTerm);
    }, 500); // Aggiunto un debounce di 500ms
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchTerm, token]);

  // Funzione per il download di un file
  const downloadFile = async (filename) => {
    if (!filename) {
      setError("Il file non è disponibile.");
      return;
    }

    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/download/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Errore nel download: ${response.status}`);
      }

      const blob = await response.blob();

      // Creiamo un link temporaneo per far partire il download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download error:", err);
      setError(err.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Elenco dei file</h1>

      {/* Barra di ricerca */}
      <div className="flex justify-center items-center mt-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Aggiorna in automatico
          placeholder="Cerca per email o tel..."
          className="px-5 py-3 mx-2 border rounded-lg focus:outline-none"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!error && files.length === 0 && <p>Nessun file disponibile.</p>}

      <ul className="space-y-4 mt-8">
        {files.map((file) => (
          <li key={file.id} className="border p-4 rounded-lg shadow-md">
            <p className="font-semibold">Email: {file.email}</p>
            <p>Telefono: {file.telefono}</p>

            <div className="mt-4 space-x-2">
              {file.carta_identita_path ? (
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
                  onClick={() => downloadFile(file.carta_identita_path)}
                >
                  Scarica Carta d&apos;Identità
                </button>
              ) : (
                <p className="text-gray-500">Nessuna carta d&apos;identità disponibile</p>
              )}
            </div>
            <div className="mt-4 space-x-2">
              {file.libretto_veicolo_path ? (
                <button
                  className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
                  onClick={() => downloadFile(file.libretto_veicolo_path)}
                >
                  Scarica Libretto Veicolo
                </button>
              ) : (
                <p className="text-gray-500">Nessun libretto veicolo disponibile</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {isDownloading && <p>Download in corso...</p>}
    </div>
  );
}
