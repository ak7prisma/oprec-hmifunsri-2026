"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselImg,
  CarouselItem,
} from "../ui/carousel";
import { dinas } from "@/constants/dinas";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

export default function Dinas() {
  return (
    <section
      id="dinas"
      className="w-full py-24 bg-gradient-to-b from-sky-300/40 via-purple-200/50 to-pink-300/50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />

      {/* Header */}
      <div className="text-center relative z-10 px-4">
        <motion.h1
          initial="hidden"
          viewport={{once: true}}
          whileInView="visible"
          variants={slideInFromTop}
          className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 pb-2"
        >
          Dinas
        </motion.h1>
        <motion.p 
          className="text-slate-500 mt-4 text-base md:text-lg max-w-2xl mx-auto"
          initial="hidden"
          viewport={{once: true}}
          whileInView="visible"
          variants={slideInFromTop}
          >
          Dinas - dinas yang berada di bawah HMIF Unsri 2026.
        </motion.p>
      </div>

      <div className="flex z-[20] h-fit justify-center px-0 lg:px-20 lg:mt-5 relative">
        <Carousel className="flex flex-col items-center justify-center w-full max-w-6xl">
          <CarouselContent>
            {dinas.map((item: any) => (
              <CarouselItem className="flex items-center justify-center" key={item.id}>
                <div className="flex flex-row justify-center w-full max-w-full">
                  
                  {/* Container */}
                  <div className="w-full h-fit flex flex-col lg:flex-row items-center justify-center lg:gap-12">
                    
                    {/* Image */}
                    <motion.div 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{once: true}}
                      className="relative shrink-0"
                      variants={slideInFromLeft(0.5)}
                      >
                        <Image
                        src={item.navicon}
                        alt={item.name}
                        width={500}
                        height={500}
                        className="w-40 h-40 md:w-full md:h-auto md:max-w-xs object-contain drop-shadow-xl"
                        />
                    </motion.div>

                    {/* Text Container */}
                    <div className="w-1/3 min-h-fit min-w-0 flex flex-col gap-4 my-4 lg:my-10 md:px-0 text-center lg:text-left items-center lg:items-start">
                      
                      {/* Title */}
                      <motion.h1
                        initial="hidden"
                        whileInView="visible" 
                        viewport={{once: true}}
                        className="text-slate-800 text-3xl md:text-4xl font-bold capitalize break-words w-full"
                        variants={slideInFromRight(0.8)}
                        >
                        Dinas <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">{item.name}</span>
                      </motion.h1>

                      {/* Description */}
                      <motion.p
                        initial="hidden"
                        whileInView="visible" 
                        viewport={{once: true}}
                        className="text-slate-600 text-sm md:text-base lg:text-lg leading-relaxed font-medium whitespace-normal"
                        variants={slideInFromRight(0.9)}
                        >
                        {item.desc}
                      </motion.p>

                       {/* Badges */}
                      <motion.div
                        initial="hidden"
                        whileInView="visible" 
                        viewport={{once: true}}
                        className="flex gap-2 flex-wrap justify-center lg:justify-start w-full"
                        variants={slideInFromRight(1)}
                      >
                        {item.division?.map((divName: any) => (
                          <div className="w-fit px-3 py-1 rounded-full bg-pink-100 border border-pink-200 shadow-sm" key={divName.id || divName}>
                            <p className="text-[10px] md:text-xs font-bold text-pink-600 tracking-wider uppercase">
                              {typeof divName === 'object' ? divName.name : divName}
                            </p>
                          </div>
                        ))}
                      </motion.div>

                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation */}
          <motion.div 
          className="scrollbar embla__dots relative mt-4 lg:mt-6 w-full flex items-center justify-center gap-1 self-center py-4 overflow-hidden"
            initial="hidden"
            whileInView="visible" 
            viewport={{once: true}}
            variants={slideInFromTop}
          >
            {dinas.map((item: any) => (
              <div key={item.id} className="shrink-0">
                 <CarouselImg 
                    index={item.id} 
                    src={item.content} 
                 />
              </div>
            ))}
          </motion.div>
        </Carousel>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-0" />
    </section>
  );
}