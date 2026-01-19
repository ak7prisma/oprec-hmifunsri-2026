"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavButton from "../ui/navbutton";
import { Button } from "../ui/button";  
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "@/constants"; 
import MobileMenu from "../molecules/MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        isScrolled || isOpen
          ? "h-[70px] bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60"
          : "h-[80px] bg-transparent"
      }`}
    >
      <div className="w-full h-full flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group z-50">
          <div className="relative w-[35px] h-[35px] md:w-[45px] md:h-[45px]">
             <Image
                src="/logo.png"
                alt="HMIF Logo"
                fill
                className="object-contain transition-transform duration-500 group-hover:rotate-12"
             />
          </div>
          <span className="font-bold text-lg md:text-xl text-slate-800 tracking-tight  sm:block">
            HMIF UNSRI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:block"> 
            <NavButton links={navLinks} className="hidden md:flex"/>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          
          {/* CTA */}
          <div className="hidden sm:block">
            <Button 
              href="/daftar" 
              variant="primary" 
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
                Daftar Sekarang
            </Button>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-pink-600" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <MobileMenu 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        links={navLinks} 
      />

    </nav>
  );
};