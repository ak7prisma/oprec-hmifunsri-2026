"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoFlowerOutline } from "react-icons/io5";
import { timeline } from "@/constants/timeline";

export default function Timeline() {
  return (
    <section id="timeline" className="w-full py-20 relative overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 pb-2"
        >
          Timeline Pendaftaran
        </motion.h2>
        <p className="text-slate-500 mt-3 text-sm md:text-base">
          Catat tanggal pentingnya, jangan sampai terlewat!
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-10 lg:px-20">
        
        <div className="relative">
          
          {/* Line Vertikal */}
          <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-pink-300 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }: { item: typeof timeline[0]; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative flex items-center md:justify-between ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      
      <div className="hidden md:block w-5/12" />

      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.4)] z-10">
        <IoFlowerOutline className="text-pink-600 w-5 h-5 animate-spin-slow" />
      </div>

      {/* Card*/}
      <div className="w-full pl-20 md:pl-0 md:w-5/12">
        <div 
          className={`p-6 bg-white/60 backdrop-blur-sm border border-pink-100 rounded-2xl shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-300 group
          ${ isEven ? "md:text-right md:items-end" : "md:text-left md:items-start" } 
          flex flex-col`}
        >
          {/* Tanggal */}
          <span className="inline-block py-1 px-3 mb-2 rounded-full text-xs font-semibold bg-pink-50 text-pink-600 border border-pink-100 w-fit">
            {item.date}
          </span>

          {/* Judul */}
          <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
            {item.title}
          </h3>

          {/* Deskripsi */}
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

    </motion.div>
  );
};