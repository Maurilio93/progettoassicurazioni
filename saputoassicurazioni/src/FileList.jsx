import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export function FileList({ token }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Quando il componente si monta o cambia il token, recuperiamo la lista di file
  useEffect(() => {
    if (!token) return; // Se non c’è token, non facciamo la fetch

    fetch("http://localhost:3000/files", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Accesso negato");
        return response.json();
      })
      .then((data) => setFiles(data))
      .catch((err) => setError(err.message));
  }, [token]);

  // Funzione per scaricare il file tramite fetch + Blob
  const downloadFile = async (filename) => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/download/${filename}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Errore nel download: ${response.status}`);
      }

      const blob = await response.blob();

      // Crea un link temporaneo per scaricare il file
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

      {error && <p style={{ color: "red" }}>{error}</p>}
      {files.length === 0 && <p>Nessun file disponibile.</p>}

      <ul className="space-y-4">
        {files.map((file) => (
          <li key={file.id} className="border p-4 rounded-lg shadow-md">
            <p className="font-semibold">Email: {file.email}</p>
            <p>Telefono: {file.telefono}</p>

            <div className="mt-4 space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
                onClick={() => downloadFile(file.carta_identita_path)}
              >
                Scarica Carta d&apos;Identità
              </button>
              <button
                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
                onClick={() => downloadFile(file.libretto_veicolo_path)}
              >
                Scarica Libretto Veicolo
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isDownloading && <p>Download in corso...</p>}
    </div>
  );
}
