import { useEffect,useState } from "react";

export function FileList () {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Recupera l'elenco dei file dal server
    fetch("http://localhost:3000/files")
      .then((response) => response.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error("Errore durante il recupero dei file:", error));
  }, []);

  const downloadFile = (filename) => {
    window.location.href = `http://localhost:3000/download/${filename}`;
  };

  return (
    <div>
      <h1>Elenco dei file</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <p>Email: {file.email}</p>
            <p>Telefono: {file.telefono}</p>
            <button onClick={() => downloadFile(file.carta_identita_path.split("/").pop())}>
              Scarica Carta d&apos;Identità
            </button>
            <button onClick={() => downloadFile(file.libretto_veicolo_path.split("/").pop())}>
              Scarica Libretto Veicolo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


