import { Button } from "@material-tailwind/react";

export function ButtonWithLink() {
  const scrollToSection = () => {
    setTimeout(() => {
      const section = document.getElementById("preventivo-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };
  return (
    <div className="flex items-center gap-4">
      <a href="#buttons-with-link" className="flex items-center gap-2">
        <h1 className="text-left font-bold -mb-2">RICHIEDI UN PREVENTIVO GRATUITO!</h1>
        <Button className="-mb-2 bg-blue-900 text-white hover:bg-blue-800" onClick={scrollToSection}>Clicca Qui</Button>
      </a>
    </div>
  );
}
