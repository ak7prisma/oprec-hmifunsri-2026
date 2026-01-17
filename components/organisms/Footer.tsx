"use client";

import Link from "next/link";
import { RxGithubLogo, RxInstagramLogo } from "react-icons/rx";
import { FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const socials = [
    { 
      icon: RxInstagramLogo, 
      href: "https://www.instagram.com/hmif.unsri", 
      label: "Instagram" 
    },
    { 
      icon: FaYoutube, 
      href: "https://youtube.com/@hmiffasilkomunsri6922", 
      label: "Youtube" 
    },
    { 
      icon: FaLinkedin, 
      href: "https://www.linkedin.com/company/hmif-unsri/", 
      label: "Linkedin" 
    },
    { 
      icon: RxGithubLogo, 
      href: "https://github.com/HMIF-UNSRI", 
      label: "Github" 
    },
  ];

  return (
    <footer className="w-full relative z-10 bg-white/5 backdrop-blur-md border-t border-white/10 pt-10 pb-6">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-8">
        
        <div className="flex space-x-6">
          {socials.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-500 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]"
            >
              <social.icon size={20} />
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-medium text-sm text-gray-500/80">
          <Link href="/" className="hover:text-primary hover:underline underline-offset-4 transition-colors">
            Home
          </Link>
          <Link href="/daftar" className="hover:text-primary hover:underline underline-offset-4 transition-colors">
            Daftar
          </Link>
          <Link href="/#pengumuman" className="hover:text-primary hover:underline underline-offset-4 transition-colors">
            Pengumuman
          </Link>
        </div>

        {/* COPYRIGHT */}
        <div className="w-full border-t border-white/10 pt-4 flex items-center justify-center text-xs text-gray-500 gap-3">
          &copy; 2026 HMIF UNSRI. All rights reserved | akademik.hmifunsri@gmail.com.
        </div>

      </div>
    </footer>
  );
};

export default Footer;