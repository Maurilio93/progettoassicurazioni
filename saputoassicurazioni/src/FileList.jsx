import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export function FileList({ token }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!token) return;

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

  const downloadFile = (filename) => {
    setIsDownloading(true);
    window.location.href = `http://localhost:3000/download/${filename}`;
    setIsDownloading(false);
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
                onClick={() => downloadFile(file.libretto_veicolo_path)}>
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
