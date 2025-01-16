import { Button } from "@material-tailwind/react";

export function ButtonWithLink() {
  const scrollToSection = () => {
    const section = document.getElementById("preventivo-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Sezione non trovata");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <a className="flex items-center gap-2" onClick={scrollToSection}>
        <h1 className="text-left font-bold -mb-2">
          RICHIEDI UN PREVENTIVO GRATUITO!
        </h1>
        <Button className="-mb-2 bg-blue-900 text-white hover:bg-blue-800">
          Clicca Qui
        </Button>
      </a>
    </div>
  );
}
