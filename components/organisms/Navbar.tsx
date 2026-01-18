"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavButton from "../ui/navbutton";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { navLinks } from "@/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 lg:px-14 ${
        isScrolled
          ? "h-[65px] bg-white/70 backdrop-blur-md shadow-sm border-b border-white/20"
          : "h-[80px] bg-transparent"
      }`}
    >
      <div className="w-full h-full flex items-center justify-between max-w-7xl mx-auto">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
             <Image
                src="/logo.png"
                alt="HMIF Logo"
                fill
                className="object-contain transition-transform duration-500 group-hover:rotate-12"
             />
          </div>
          <span className="font-bold text-lg md:text-xl text-slate-800 tracking-tight hidden sm:block">
            HMIF UNSRI
          </span>
        </Link>

        {/* Main Menu */}
        <div className="hidden md:block"> 
            <NavButton links={navLinks} className="hidden"/>
        </div>

        <div className="flex items-center">
          {/* CTA Mobile */}
          <Button 
            href="/daftar" 
            variant="primary" 
            size="sm"
            className="w-full sm:w-auto"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
             Gass Daftar
          </Button>
        </div>
      </div>
    </nav>
  );
};