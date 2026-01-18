import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/constants/faq";

export default function Faq() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-sky-200/40 via-sky-100/50 to-pink-200/40 relative">
      
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />

      {/* Header */}
      <div className="flex flex-col items-center justify-center px-4 mb-12 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 pb-2">
          FAQ
        </h1>
        <p className="text-slate-600 font-medium mt-3 text-center max-w-[600px] text-base md:text-lg">
          Pertanyaan yang sering ditanyakan
        </p>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl mx-auto px-4 relative z-10">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
        >
          {faq.map((item, index) => (
            <AccordionItem 
              key={item.answer} 
              value={`item-${index + 1}`}
              className="bg-white border border-sky-100 rounded-xl px-4 md:px-6 shadow-sm hover:shadow-md hover:shadow-pink-100 hover:border-pink-300 transition-all duration-300"
            >
              <AccordionTrigger
                className="text-left text-base md:text-lg font-semibold text-slate-800 hover:text-pink-600 hover:no-underline py-4"
              >
                {item.question}
              </AccordionTrigger>
              
              <AccordionContent 
                className="text-slate-600 text-sm md:text-base leading-relaxed pb-4 font-medium"
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}