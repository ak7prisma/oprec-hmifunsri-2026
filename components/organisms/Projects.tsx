"use client";

import React from "react";
import ProjectCard from "../molecules/ProjectCard";
import { motion } from "framer-motion";
import { proker } from "@/constants/proker";

export default function Projects() {
  return (
    <section id="projects" className="w-full py-24 bg-gradient-to-b from-sky-200/40 via-sky-100/50 to-pink-300/10 relative overflow-hidden">
      
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-10 lg:px-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 pb-2"
          >
            Program Kerja
          </motion.h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Kegiatan unggulan HMIF UNSRI untuk mengembangkan potensi akademik maupun non-akademik.
          </p>
        </div>

        {/* Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {proker.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard
                src={item.src}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};