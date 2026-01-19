import Image from "next/image";
import { MdMarkEmailUnread } from "react-icons/md";

export default function PengumumanTrue() {
    return(
        <section id="pengumuman" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-950">
            
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/iced-bg.jpg" 
                    alt="Ice Texture"
                    fill
                    className="object-cover opacity-20 mix-blend-overlay grayscale"
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/80" />
            </div>
    
            {/* Massage */}
            <div className="z-10 flex flex-col items-center text-center px-6 animate-in fade-in zoom-in duration-1000">
                <div className="mb-6 bg-cyan-900/30 p-6 rounded-full border border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.15)]">
                   <MdMarkEmailUnread className="text-7xl text-pink-300"/>
                </div>
    
                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 pb-2">
                    Pengumuman Telah Dikirim
                </h1>
                
                <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed">
                    Silakan cek kotak masuk (inbox) atau folder spam pada email yang sudah kamu daftarkan.
                </p>
        
                <div className="mt-8 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                    HMIF UNSRI 2026
                </div>
            </div>
          </section>
    );
}