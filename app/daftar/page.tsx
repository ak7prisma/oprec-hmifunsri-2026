"use client";

import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import PendaftaranForm from "@/components/organisms/PendaftaranForm";
import React from "react";
import { motion } from "framer-motion"; 
import { slideInFromTop } from "@/lib/motion";

export default function Daftar() {
  return (
    <>
      <Navbar />
      
      <main className="relative min-h-screen w-full overflow-hidden pt-28 pb-20">

        {/* Container */}
        <div className="container relative z-10 px-4 mx-auto md:px-10">
          
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10 space-y-4">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={slideInFromTop}
                >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600">
                  Formulir Pendaftaran
                </span>
              </motion.h1>
              <motion.p 
                className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={slideInFromTop}
                >
                Bergabunglah bersama kami! Silakan lengkapi formulir di bawah ini dengan data yang valid.
              </motion.p>
            </div>

            {/* Form Card */}
            <motion.div
              className="bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-cyan-600/10 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 lg:p-12"
              initial="hidden"
              whileInView="visible"
              viewport={{once: true}}
              variants={slideInFromTop}
              >
               <PendaftaranForm />
            </motion.div>

            {/* Note */}
            <p className="text-center text-slate-400 text-sm mt-8">
              Mengalami kendala saat mendaftar? <a href="https://wa.me/..." className="text-pink-500 hover:underline">Hubungi Bantuan</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}