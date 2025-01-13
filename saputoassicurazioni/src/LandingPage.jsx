import { ButtonWithLink } from "./Button";

export function LandingPage() {
    return (
      <div className="w-full">
        {/* Sezione immagini affiancate */}
        <div className="flex justify-center items-center gap-4 pt-6">
          {/* Prima immagine con didascalia */}
          <div className="relative h-96 w-1/2 p-2">
            <img
              className="h-full w-full object-cover rounded-2xl"
              src="images/pexels-lexovertoom-1109543.jpg"
              alt="nature image"
            />
            <figcaption className="absolute bottom-4 left-4 flex items-start rounded-xl border border-white bg-blue-900/65 py-3 px-4 shadow-lg shadow-black/25 saturate-200 backdrop-blur-sm">
              <div className="mb-4">
                <ButtonWithLink />
              </div>
            </figcaption>
          </div>

          {/* Seconda immagine */}
          <div className="h-96 w-1/2 p-2">
            <img
              className="h-full w-full object-cover rounded-2xl"
              src="images/Blu e Rosso Casual Aziendale Assicurazione Finanza Inserzione a Immagine Singola di LinkedIn (1).png"
              alt="nature image"
            />
          </div>
        </div>
      </div>
    );
  }
