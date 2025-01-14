import { ButtonWithLink } from "./Button";
import { Form } from "./Form";
import { Presentation } from "./Presentation";

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
          <figcaption className="absolute bottom-6 left-4 flex items-start rounded-xl border border-white bg-white/40 py-3 px-4 shadow-lg shadow-black/25 saturate-200 backdrop-blur-sm">
            <div className="mb-4">
              <ButtonWithLink />
            </div>
          </figcaption>
        </div>

        {/* Seconda immagine */}
        <div className="h-96 w-1/2 p-2">
          <img
            className="h-full w-full object-cover rounded-2xl"
            src="images/Blue Illustrated We're Hiring LinkedIn LinkedIn Sponsored Content.png"
            alt="nature image"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <Presentation></Presentation>
      </div>
      {/* Sezione form e immagine accanto */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10">
        {/* Immagine accanto alla form */}
        <div className="md:w-1/2 w-full">
          <img
            className="w-full h-screen object-contain"
            src="images/Blue Illustrated We're Hiring LinkedIn LinkedIn Sponsored Content (1).png"
            alt="partner logos"
          />
        </div>

        {/* Form accanto all'immagine */}
        <div className="md:w-1/2 w-full">
          <Form />
        </div>
        <div id="preventivo-section" style={{ scrollMarginTop: "70px" }}>
        </div>
      </div>
    </div>
  );
}
