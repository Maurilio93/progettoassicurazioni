import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";

export function Form() {
  // Stato per i dati
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  // Stato per i file
  const [cartaIdentita, setCartaIdentita] = useState(null);
  const [librettoVeicolo, setLibrettoVeicolo] = useState(null);

  // Chiave per forzare la ricostruzione degli input file e svuotarli visivamente
  const [fileKey, setFileKey] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica che i file siano selezionati
    if (!cartaIdentita || !librettoVeicolo) {
      Swal.fire({
        title: "Errore",
        text: "Tutti i file sono obbligatori!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();
    formData.append("cartaIdentita", cartaIdentita);
    formData.append("librettoVeicolo", librettoVeicolo);
    formData.append("email", email);
    formData.append("telefono", telefono);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio dei dati");
      }

      // Se tutto va a buon fine, mostra un alert di successo
      Swal.fire({
        title: "Successo",
        text: "Dati inviati con successo!",
        icon: "success",
        confirmButtonText: "Ok",
      });

      // Resetta i campi di stato
      setEmail("");
      setTelefono("");
      setCartaIdentita(null);
      setLibrettoVeicolo(null);

      // Incrementa la chiave per forzare il "remount" degli input file
      setFileKey((prev) => prev + 1);

    } catch (error) {
      console.error("Errore:", error);

      // Mostra un alert di errore
      Swal.fire({
        title: "Errore",
        text: "Errore durante l'invio dei dati. Riprova più tardi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Card
      id="preventivo-section"
      color="transparent"
      shadow={false}
      className="flex flex-col justify-center items-center bg-white bg-opacity-5 p-6 rounded-lg mt-8"
    >
      <Typography
        variant="h4"
        color="blue-gray"
        className="text-xl sm:text-2xl lg:text-3xl text-center"
      >
        OTTIENI IL TUO PREVENTIVO GRATUITO
      </Typography>
      <Typography
        color="gray"
        className="mt-1 font-normal text-sm sm:text-base lg:text-lg text-center"
      >
        Inserisci i dati richiesti
      </Typography>

      <form
        className="mt-8 mb-2 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 text-sm sm:text-base lg:text-lg"
          >
            Carta d&apos;identità
          </Typography>
          <input
            key={`${fileKey}-carta`}
            type="file"
            accept="image/*"
            className="block w-full text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-900 file:text-white hover:file:bg-blue-800"
            onChange={(e) => setCartaIdentita(e.target.files[0])}
          />

          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 text-sm sm:text-base lg:text-lg"
          >
            Libretto Veicolo
          </Typography>
          <input
            key={`${fileKey}-libretto`}
            type="file"
            accept="image/*"
            className="block w-full text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-900 file:text-white hover:file:bg-blue-800"
            onChange={(e) => setLibrettoVeicolo(e.target.files[0])}
          />

          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 text-sm sm:text-base lg:text-lg"
          >
            Email
          </Typography>
          <Input
            type="email"
            size="lg"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 text-sm sm:text-base lg:text-lg"
          >
            Numero di telefono
          </Typography>
          <Input
            type="tel"
            size="lg"
            placeholder="Es. 123-456-7890"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button
          type="submit"
          className="mt-6 bg-blue-900 hover:bg-blue-800 text-sm sm:text-base lg:text-lg"
          fullWidth
        >
          Invia
        </Button>
      </form>
    </Card>
  );
}
