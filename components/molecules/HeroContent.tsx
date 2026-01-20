"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoFlowerOutline } from "react-icons/io5";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

export default function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative flex flex-col lg:flex-row items-center justify-center pb-20 md:pb-0 px-4 sm:px-10 lg:px-20 w-full min-h-screen z-20 overflow-hidden"
    >
      
      {/* Background */}
      <div className="absolute bottom-0 left-0 right-0 h-[150px] sm:h-[250px] bg-gradient-to-t from-sky-200 via-sky-100/50 to-transparent z-0 pointer-events-none" />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl mx-auto z-10 pt-24 lg:pt-20 gap-10 lg:gap-0">
        
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2 gap-4 lg:gap-6 text-center lg:text-left">
          
          {/* Badge */}
          <motion.div
            variants={slideInFromTop}
            className="inline-flex items-center gap-2 py-2 px-4 border border-pink-200 bg-white/80 backdrop-blur-md rounded-full w-fit shadow-sm"
          >
            <IoFlowerOutline className="text-pink-500 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-slate-700 font-bold text-xs sm:text-[13px] tracking-wide">
              Open Recruitment HMIF UNSRI 2026
            </span>
          </motion.div>

          {/* Header */}
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col font-bold text-slate-900 leading-[1.1] sm:leading-tight"
          >
            <span className="text-4xl sm:text-6xl lg:text-7xl">
              Wujudkan <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                Potensi Dirimu
              </span>
            </span>
            <span className="text-2xl sm:text-5xl lg:text-5xl mt-2 text-slate-700 font-semibold">
              Bersama HMIF
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-base sm:text-lg text-slate-600 max-w-[90%] sm:max-w-[600px] leading-relaxed font-medium"
          >
            Himpunan Mahasiswa Informatika (HMIF) adalah wadah bagi mahasiswa Teknik Informatika UNSRI untuk berkembang, berinovasi, serta berkontribusi.
          </motion.p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center justify-center lg:justify-start mt-2">
              
              {/* Daftar */}
              <motion.div variants={slideInFromLeft(1)} className="w-full sm:w-auto">
                  <Button
                    href="/daftar"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto shadow-xl shadow-pink-500/20"
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    Daftar Sekarang
                  </Button>
              </motion.div>

              {/* Guidebook */}
              <motion.div variants={slideInFromLeft(1)} className="w-full sm:w-auto">
                  <Button
                    href="https://bit.ly/gboprechmifunsri2026"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                    icon={<FileText className="w-5 h-5" />}
                    iconPosition="left"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Guidebook
                  </Button>
              </motion.div>

          </div>
        </div>

        {/* Right Section */}
        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full lg:w-1/2 flex items-center justify-center"
        >
          <div className="relative w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] animate-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/30 to-purple-300/30 rounded-full blur-[40px] lg:blur-[60px] -z-10" />
              
              <Image
                  src="/artasenaxdinas.svg" 
                  alt="HMIF Mascot"
                  fill
                  className="object-contain drop-shadow-xl"
                  priority
              />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};