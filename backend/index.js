require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");

app.use(cors());
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per il parsing del corpo delle richieste
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurazione Multer per la gestione dei file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Cartella in cui salvare i file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Tipo di file non supportato!"));
    }
  },
});

// Configurazione del database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test della connessione al database
db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err.message);
  } else {
    console.log("Connesso al database!");
  }
});

app.post(
  "/upload",
  upload.fields([
    { name: "cartaIdentita", maxCount: 1 },
    { name: "librettoVeicolo", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("FILES RICEVUTI:", req.files);
    console.log("BODY RICEVUTO:", req.body);

    if (!req.files || !req.files.cartaIdentita || !req.files.librettoVeicolo) {
      return res.status(400).send("Tutti i file sono obbligatori!");
    }

    const cartaIdentitaPath = req.files.cartaIdentita[0].path;
    const librettoVeicoloPath = req.files.librettoVeicolo[0].path;
    const { email, telefono } = req.body;

    // Query per inserire i dati nel database
    const query = `INSERT INTO preventivi (carta_identita_path, libretto_veicolo_path, email, telefono)
                     VALUES (?, ?, ?, ?)`;

    db.query(
      query,
      [cartaIdentitaPath, librettoVeicoloPath, email || null, telefono],
      (err) => {
        if (err) {
          console.error(
            "Errore durante il salvataggio nel database:",
            err.message
          );
          return res.status(500).send("Errore del server!");
        }
        res.send("Dati salvati con successo!");
      }
    );
  }
);

app.get("/files", (req, res) => {
    const query = "SELECT carta_identita_path, libretto_veicolo_path, email, telefono FROM preventivi";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Errore durante il recupero dei file:", err.message);
        return res.status(500).send("Errore durante il recupero dei file!");
      }

      // Invia i risultati come JSON
      res.json(results);
    });
  });


// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
