"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
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
          ? "h-[65px] bg-white/10 backdrop-blur-md shadow-sm border-b border-white/20"
          : "h-[80px] bg-transparent"
      }`}
    >
      <div className="w-full h-full flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
             <Image
                src="/logo.png"
                alt="HMIF Logo"
                fill
                className="object-contain transition-transform duration-500 group-hover:rotate-12"
             />
          </div>
          <span className="font-bold text-lg md:text-xl text-foreground tracking-tight hidden sm:block">
            HMIF UNSRI
          </span>
        </Link>

        {/* Main Menu */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center gap-1 bg-white/5 border border-primary/20 backdrop-blur-sm px-2 py-1.5 rounded-full shadow-lg shadow-primary/5">
            {[
              { name: "Home", href: "/" },
              { name: "Daftar", href: "/daftar" },
              { name: "Pengumuman", href: "/#pengumuman" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-5 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            {Socials?.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank" 
                rel="noreferrer"
                className="text-foreground/60 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <social.src className="w-6 h-6" />
              </a>
            ))}
          </div>

          <Link 
            href="/daftar"
            className="md:hidden px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-md"
          >
            Gass Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;