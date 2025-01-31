require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql2");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/download", express.static(path.join(__dirname, "uploads")));

// Configurazione multer per il caricamento dei file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

// Configurazione database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    process.exit(1);
  }
  console.log("Connesso al database!");
});

// Middleware per proteggere le rotte
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token mancante" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token non valido" });
    req.user = user;
    next();
  });
};

// Rotta per il download di file (protetta)
app.get("/download/:filename",authenticateToken, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error("Errore durante il download del file:", err);
      return res.status(404).send("File non trovato!");
    }
  });
});



// API per ricevere dati dalla form
app.post(
  "/upload",
  upload.fields([{ name: "cartaIdentita" }, { name: "librettoVeicolo" }]),
  (req, res) => {
    // Ricava i campi dal body
    let { email, telefono } = req.body;

    // Se email è vuota o assente, la mettiamo a NULL (se il DB lo consente)
    if (!email || email.trim() === "") {
      email = null;
    }

    // Ricava i file
    const cartaIdentitaFilename = req.files["cartaIdentita"][0].filename;
    const librettoVeicoloFilename = req.files["librettoVeicolo"][0].filename;

    // Query di INSERT
    const query = `
      INSERT INTO user_data (
        email,
        telefono,
        carta_identita_path,
        libretto_veicolo_path
      )
      VALUES (?, ?, ?, ?)
    `;
    db.query(
      query,
      [email, telefono, cartaIdentitaFilename, librettoVeicoloFilename],
      (err) => {
        if (err) {
          console.error("Errore durante l'inserimento dei dati:", err);
          return res
            .status(500)
            .json({ message: "Errore durante il salvataggio dei dati" });
        }
        res.status(200).json({ message: "Dati inviati con successo!" });
      }
    );
  }
);



// API per autenticare l'admin
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Sostituisci con credenziali configurate nel file .env
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  res.status(401).json({ message: "Credenziali non valide" });
});

// Rotta per ottenere i file (protetta), con supporto al parametro ?search
app.get("/files", authenticateToken, (req, res) => {
  const search = req.query.search || "";

  // Se searchTerm è vuoto, ritorniamo tutti i record
  if (!search) {
    const query = "SELECT * FROM user_data";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Errore durante il recupero dei dati:", err);
        return res
          .status(500)
          .json({ message: "Errore durante il recupero dei dati" });
      }
      res.json(results);
    });
  } else {
    // Altrimenti filtriamo nel DB usando LIKE
    const query =
      "SELECT * FROM user_data WHERE email LIKE ? OR telefono LIKE ?";
    const likeSearch = `%${search}%`;

    db.query(query, [likeSearch, likeSearch], (err, results) => {
      if (err) {
        console.error("Errore durante il recupero dei dati:", err);
        return res
          .status(500)
          .json({ message: "Errore durante il recupero dei dati" });
      }
      res.json(results);
    });
  }
});



// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
