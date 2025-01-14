import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

export function Form() {
    return (
        <Card
            color="transparent"
            shadow={false}
            className="flex flex-col justify-center items-center bg-white bg-opacity-5 p-6 rounded-lg mt-14"
        >
            <Typography variant="h4" color="blue-gray">
                OTTIENI IL TUO PREVENTIVO GRATUITO
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Inserisci i dati richiesti
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Carta d&#39;identità
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-900 file:text-white hover:file:bg-blue-800"
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Libretto Veicolo
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-900 file:text-white hover:file:bg-blue-800"
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Email
                    </Typography>
                    <Input
                        type="email"
                        size="lg"
                        placeholder="name@mail.com"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Numero di telefono
                    </Typography>
                    <Input
                        type=""
                        size="lg"
                        placeholder="Es. 123-456-7890"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <Button className="mt-6 bg-blue-900 hover:bg-blue-800" fullWidth>
                    Invia
                </Button>
            </form>
        </Card>
    );
}
