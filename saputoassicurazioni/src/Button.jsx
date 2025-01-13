import { Button } from "@material-tailwind/react";

export function ButtonWithLink() {
    return (
      <div className="flex items-center gap-4">
        <a href="#buttons-with-link" className="flex items-center gap-2">
          <h1 className="text-left font-bold -mb-2">RICHIEDI UN PREVENTIVO GRATUITO!</h1>
          <Button variant="gradient" className="-mb-2">Clicca Qui</Button>
        </a>
      </div>
    );
  }
