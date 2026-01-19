"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/constants/faq";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/lib/motion"; 

export default function Faq() {
  return (
    <section className="w-full py-20 relative overflow-hidden">

      {/* Header */}
      <div className="flex flex-col items-center justify-center px-4 mb-12 relative z-10">
        <motion.h1 
            variants={slideInFromTop}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 pb-2"
        >
          FAQ
        </motion.h1>
        
        <motion.p 
            variants={slideInFromTop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 font-medium mt-3 text-center max-w-[600px] text-base md:text-lg"
        >
          Pertanyaan yang sering ditanyakan
        </motion.p>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl mx-auto px-4 relative z-10 mb-10">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
        >
          {faq.map((item, index) => (
            <motion.div
                key={item.question}
                variants={slideInFromTop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
            >
                <AccordionItem 
                  value={`item-${index + 1}`}
                  className="bg-white/80 backdrop-blur-sm border border-sky-100 rounded-xl px-4 md:px-6 shadow-sm hover:shadow-md hover:shadow-pink-100 hover:border-pink-300 transition-all duration-300"
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
            </motion.div>
          ))}
        </Accordion>
      </div>

    </section>
  );
}