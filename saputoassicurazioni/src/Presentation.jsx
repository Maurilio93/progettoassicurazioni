import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function Presentation() {
  return (
    <Card className="w-full max-w-full flex flex-col md:flex-row mt-16">
      {/* Immagine Responsiva */}
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full md:w-2/5 shrink-0 md:rounded-r-none"
      >
        <img
          src="images/1517065210373.jpg"
          alt="card-image"
          className="h-64 md:h-full w-full object-cover"
        />
      </CardHeader>

      {/* Corpo del Testo */}
      <CardBody className="p-4 md:p-6">
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-4 text-lg md:text-2xl font-semibold"
        >
          Mi presento, mi chiamo Walter Saputo
        </Typography>

        <Typography
          color="gray"
          className="mb-4 text-base md:text-lg leading-relaxed"
        >
          Opero nel settore assicurativo da oltre 10 anni, specializzandomi in
          polizze auto e moto. Collaboro con partner di prestigio come AXA, 24h
          Assistance e Prima.it per garantirti le migliori soluzioni
          assicurative sul mercato.
        </Typography>

        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 text-md md:text-xl font-semibold"
        >
          Cosa Offro
        </Typography>

        <ul className="list-disc pl-4 text-base md:text-lg leading-relaxed">
          <li className="mb-2">
            <strong>Polizze Auto e Moto Personalizzate:</strong> ti aiuto a
            scegliere la copertura più adatta alle tue esigenze, sia che tu
            cerchi la sicurezza di una polizza completa sia che desideri
            un’opzione più essenziale.
          </li>
          <li className="mb-2">
            <strong>Servizio Affidabile:</strong> con oltre un decennio di
            esperienza, garantisco competenza, trasparenza e assistenza
            continua.
          </li>
          <li>
            <strong>Collaborazioni con i Migliori:</strong> grazie ai miei
            partner, posso offrirti tariffe competitive e servizi innovativi.
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
