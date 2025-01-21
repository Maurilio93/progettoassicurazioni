import { ButtonWithLink } from "./Button";
import { Form } from "./Form";
import { Presentation } from "./Presentation";

// Se hai bisogno di handleLogin dentro la LandingPage:
export function LandingPage() {
  return (
    <div className="w-full">
      {/* Sezione immagini affiancate */}
      <div className="pt-24 mt-10 flex flex-col mobile:flex-col tablet:flex-col desktop:flex-row justify-center items-center gap-4 px-4 tablet:px-6 tablet:mt-8 desktop:px-8">
        {/* Prima immagine con didascalia */}
        <div className="relative h-72 mobile:h-80 mobile:w-96 tablet:h-96 w-full tablet:w-full desktop:w-1/2 p-2 smalltablet:w-full">
          <img
            className="h-full w-full object-cover rounded-2xl"
            src="images/pexels-lexovertoom-1109543.jpg"
            alt="nature image"
          />
          <figcaption className="absolute bottom-4 left-2 tablet:bottom-6 tablet:left-4 flex items-start rounded-lg tablet:rounded-xl border border-white bg-white/40 py-2 px-3 tablet:py-3 tablet:px-4 shadow-lg shadow-black/25 saturate-200 backdrop-blur-sm">
            <div className="mb-2 tablet:mb-4">
              <ButtonWithLink />
            </div>
          </figcaption>
        </div>

        {/* Seconda immagine */}
        <div className="h-72 mobile:h-80 mobile:w-96 mobile:-mt-6 tablet:h-96 w-full tablet:w-full tablet:mt-8 desktop:w-4/6 p-2 desktop:-mt-6 smalltablet:w-full smalltablet:mt-8">
          <img
            className="h-full w-full object-contain rounded-2xl"
            src="images/Blue Illustrated We're Hiring LinkedIn LinkedIn Sponsored Content.png"
            alt="nature image"
          />
        </div>
      </div>

      {/* Sezione Presentation */}
      <div className="flex flex-col justify-center items-center mt-10 px-4 tablet:px-6 desktop:px-0 mobile:-mt-8 tablet:mt-8 smalltablet:mt-8">
        <Presentation />
      </div>

      {/* Sezione form e immagine accanto */}
      <div className="flex flex-col tablet:flex-row items-center justify-center gap-8 mt-10 px-4 tablet:px-6 desktop:px-0">
        {/* Immagine accanto alla form */}
        <div className="tablet:w-1/2 w-full h-auto mobile:mt-8">
          <img
            className="w-full h-full object-contain rounded-lg"
            src="images/Blue Illustrated We're Hiring LinkedIn LinkedIn Sponsored Content (1).png"
            alt="partner logos"
          />
        </div>

        {/* Form accanto all'immagine */}
        <div className="tablet:w-1/2 w-full">
          <Form />
        </div>
      </div>
    </div>
  );
}
