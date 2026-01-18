"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/lib/motion";
import Image from "next/image";
import { Carousel, CarouselApi, CarouselContent, CarouselImg, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { cn } from "@/lib/utils";
import { dinas } from "@/constants/dinas";

export default function Dinas() {
  return (
    <section id="dinas" className="relative flex flex-row items-center justify-center lg:min-h-[70vh] w-full lg:px-20 mt-10 overflow-x-hidden">
      <div className="absolute w-auto h-auto top-0 z-[5]">
        <motion.div variants={slideInFromTop} className="text-[40px] lg:text-[50px]  font-semibold text-center bg-clip-text bg-gradient-to-r text-transparent  from-white via-[#00BBE0] to-[#00BBE0]">
          Dinas
        </motion.div>
      </div>
      <div className="flex z-[20] h-fit justify-center px-20 mt-10 lg:mt-28">
        <Carousel className="flex flex-col items-center justify-center">
          <CarouselContent>
            {dinas.map((item: any, key: any) => (
              <CarouselItem className=" flex  items-center justify-center" key={key}>
                <div className="flex flex-row justify-center max-w-full">
                  <div className="w-full h-fit flex flex-col lg:flex-row items-center justify-center">
                    {/* <h1 className="text-gray-300 text-3xl font-semibold capitalize">
                      {item.name}
                    </h1> */}

                    <Image src={item.content} alt={item.content} width={500} height={500} className="w-1/3" />
                    <div className="w-1/4 md:w-1/3 min-h-fit flex flex-col gap-4 my-10 flex-wrap text-justify">
                      <h1 className="text-gray-300 text-3xl font-semibold text-center lg:text-start capitalize">Dinas {item.name}</h1>
                      <p className="flex flex-wrap text-gray-300 text-base lg:text-lg text-wrap basis-1/2 leading-loose tracking-wide break-words">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="scrollbar embla__dots relative -mt-10 lg:mt-10 w-1/4 md:w-full flex items-center justify-start md:justify-center gap-2 lg:gap-8 self-center overflow-x-scroll lg:overflow-x-hidden overflow-y-hidden whitespace-nowrap py-2">
            {dinas.map((item, key) => (
              <CarouselImg key={item.id + key} index={key} src={item.content} />
            ))}
          </div>
        </Carousel>
      </div>

      {/* <div className="absolute object-center  left-[ opacity-55">
        <Image
          src={"light-1.svg"}
          alt="light"
          width={500}
          height={500}
          className="w-1/2 h-full"
        />
      </div> */}
      {/* <div className="absolute bottom-[-100px] right-[-100px] opacity-55">
        <Image
          src={"light-2.svg"}
          alt="light"
          width={500}
          height={500}
          className="w-1/3 h-full"
        />
      </div> */}
    </section>
  );
}
