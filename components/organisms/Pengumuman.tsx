"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CountdownItem from "../atoms/CountdownItem";
import { Tanggal_Pengumuman } from "@/constants";
import PengumumanTrue from "../molecules/PengumumanTrue";

export default function Pengumuman() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const targetDate = new Date(Tanggal_Pengumuman).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) { 
        clearInterval(interval); 
        setIsTimeUp(true);
      } 
      else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isTimeUp) {
    return (
      <PengumumanTrue/>
    );
  }

  return (
    <section
      id="pengumuman"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-950"
    >

      {/* Base */}
      <div className="absolute inset-0 bg-pink-300 z-0" />

      <div className="absolute z-[5] w-[70vw] h-[70vw] md:w-[500px] md:h-[500px] flex items-center justify-center">
         <Image 
            src="/lotus2.png"
            alt="Teratai Dalam Es"
            width={1000}
            height={1000}
            className="drop-shadow-[0_0_50px_rgba(255,255,255,0.5)] brightness-125"
         />
      </div>

      {/* Ice Bg */}
      <div className="absolute inset-0 z-[10] w-full h-full pointer-events-none">
         <Image 
            src="/iced-bg.jpg"
            alt="Frozen Background"
            fill
            className="object-cover opacity-70 mix-blend-screen md:opacity-60"
         />
         
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/50" />
      </div>

      <div className="relative z-[20] flex flex-col items-center text-center p-4">
        
        {/* Gembok */}
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mb-6 relative"
        >
            <div className="flex flex-col items-center w-auto h-auto cursor-pointer group bg-black/40 pb-5 px-5 rounded-full border border-cyan-200/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                <Image
                    src="/shackle-only.svg"
                    alt="Lock top"
                    width={150}
                    height={150}
                    className="w-[50px] translate-y-16 transition-all duration-200 group-hover:translate-y-14"
                />
                <Image
                    src="/diamond-lock.svg"
                    alt="Lock Main"
                    width={100}
                    height={100}
                    className="z-10 "
                />
            </div>
        </motion.div>
        
        {/* Header */}
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-cyan-50 drop-shadow-md">
            Pengumuman
        </h2>
        <p className="text-cyan-100/80 mt-4 max-w-lg text-sm md:text-lg font-medium bg-black/20 p-2 px-4 rounded-lg backdrop-blur-sm">
            Nantikan Open Recruitment staff HMIF 2026...
        </p>

        {/* Countdown */}
        <div className="mt-8 flex justify-center gap-4 text-white">
            <CountdownItem val={timeLeft.days} label="Day" />
            <span className="text-2xl mt-2 text-cyan-400">:</span>
            <CountdownItem val={timeLeft.hours} label="Hour" />
            <span className="text-2xl mt-2 text-cyan-400">:</span>
            <CountdownItem val={timeLeft.minutes} label="Mnt" />
            <span className="text-2xl mt-2 text-cyan-400">:</span>
            <CountdownItem val={timeLeft.seconds} label="Sec" />
        </div>

      </div>
    </section>
  );
}