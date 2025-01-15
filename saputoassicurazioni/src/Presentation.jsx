import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
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
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-64 md:h-full w-full object-cover"
          />
        </CardHeader>

        {/* Corpo del Testo */}
        <CardBody className="p-4 md:p-6">
          <Typography
            variant="h6"
            color="gray"
            className="mb-2 uppercase text-sm md:text-base"
          >
            startups
          </Typography>
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 text-lg md:text-2xl"
          >
            Lyft launching cross-platform service this week
          </Typography>
          <Typography color="gray" className="mb-6 font-normal text-sm md:text-base">
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software company
            selling licenses. Yet its own business model disruption is only part of
            the story
          </Typography>
          <a href="#" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>
    );
  }
