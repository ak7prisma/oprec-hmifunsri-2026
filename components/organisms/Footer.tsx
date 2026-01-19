"use client";

import Link from "next/link";
import { socialsLink, navLinks } from "@/constants";
import NavButton from "../ui/navbutton";

export default function Footer() {
  return (
    <footer className="w-full relative z-10 bg-white/5 border-t border-slate-200 pt-12 pb-8 overflow-hidden">
      
      <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-pink-50/60 to-transparent -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 flex flex-col items-center space-y-8 relative z-10">
        
        <div className="flex space-x-5">
          {socialsLink.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-3 rounded-full bg-slate-50 border border-slate-200 text-slate-500 
                         hover:text-pink-600 hover:bg-pink-50 hover:border-pink-200 
                         transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-200/50"
            >
              <social.icon size={20} />
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <NavButton links={navLinks}/>
        </div>

        <div className="w-full max-w-2xl border-t border-slate-200 flex flex-col md:flex-row items-center justify-center text-xs text-slate-500 gap-2 md:gap-4 text-center">
          <span>&copy; 2026 HMIF UNSRI. All rights reserved.</span>
          <span className="hidden md:block text-slate-300">|</span>
          <a 
            href="mailto:akademik.hmifunsri@gmail.com" 
            className="hover:text-pink-600 transition-colors font-medium"
          >
            akademik.hmifunsri@gmail.com
          </a>
        </div>

      </div>
    </footer>
  );
};