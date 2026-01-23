
import React from "react";
import { Timeline } from "./ui/Timeline";

export function StoryJourney() {
  const data = [
    {
      title: "LONDRES 2018",
      content: (
        <div className="font-body">
          <p className="text-secondary dark:text-neutral-200 text-lg font-hand mb-8 italic leading-tight">
            "El frío de Camden Town me obligó a buscar refugio en la cocina. Aquí nació la idea de la Gigi Hadid; 
            quería una burger que supiera a Barranquilla pero con la mística del West End."
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop" 
              className="rounded-lg object-cover h-32 md:h-44 w-full shadow-heavy rotate-1 border-2 border-black grayscale hover:grayscale-0 transition-all" 
              alt="Londres"
            />
            <img 
              src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop" 
              className="rounded-lg object-cover h-32 md:h-44 w-full shadow-heavy -rotate-2 border-2 border-black grayscale hover:grayscale-0 transition-all" 
              alt="Sketch"
            />
          </div>
        </div>
      ),
    },
    {
      title: "MADRID 2021",
      content: (
        <div className="font-body">
          <p className="text-secondary dark:text-neutral-200 text-lg font-hand mb-8 italic leading-tight">
            "Malasaña nos dio la rebeldía. Aprendimos que un cocktail puede ser un poema y que 
            el 'Cielo Tinto' debía llevar el fuego de la noche española."
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1534430480872-3498386e7a56?q=80&w=600&auto=format&fit=crop" 
              className="rounded-lg object-cover h-32 md:h-44 w-full shadow-heavy -rotate-1 border-2 border-black grayscale hover:grayscale-0 transition-all" 
              alt="Madrid"
            />
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop" 
              className="rounded-lg object-cover h-32 md:h-44 w-full shadow-heavy rotate-2 border-2 border-black grayscale hover:grayscale-0 transition-all" 
              alt="Cocktail"
            />
          </div>
        </div>
      ),
    },
    {
      title: "EL REGRESO",
      content: (
        <div className="font-body">
          <p className="text-secondary dark:text-neutral-200 text-lg font-hand mb-4 italic leading-tight">
            "Finalmente, la maleta se abrió en la Calle 92. Barranquilla, el destino final de este exilio."
          </p>
          <div className="bg-primary text-white p-4 font-punk text-xl mb-6 shadow-heavy border-2 border-black transform rotate-1">
            ✓ 70K Guapxs unidos <br/>
            ✓ El Diario se vuelve público <br/>
            ✓ Sabor que rompe esquemas
          </div>
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" 
            className="rounded-lg object-cover h-60 w-full shadow-heavy border-4 border-black" 
            alt="La Guapa Opening"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-accent pb-20">
      <Timeline data={data} />
    </div>
  );
}
