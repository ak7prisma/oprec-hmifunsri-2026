import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, LucideHome } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

export default function DaftarSukses() {

    const router = useRouter();

    useEffect(() => {
 
    toast({
        title: "Pendafataran belum dibuka",
        description: "Mohon maaf pendaftaran OPREC HMIF UNSRI 2026 belum dibuka, sabar gess!!",
    });
  
    router.push("/");
    
    }, []);
    return(
              <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-10">
        
                {/* Content */}
                <div className="container relative z-10 px-4 pt-5 ">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-2xl mx-auto"
                  >
                    {/* Card */}
                    <div className="bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-cyan-600/10 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 lg:p-12">
                      
                      {/* Sukses Icon */}
                      <div className="flex justify-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                          className="rounded-full bg-green-100 p-4 ring-8 ring-green-50 animate-float"
                        >
                          <CheckCircle2 className="w-16 h-16 text-green-500" />
                        </motion.div>
                      </div>
        
                      {/* Header */}
                      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight text-center">
                        Pendaftaran Berhasil!
                      </h1>
                      
                      <p className="text-slate-500 text-center text-lg leading-relaxed mb-8">
                        Terima kasih telah mendaftar pada <br className="hidden md:block"/>
                        <span className="font-semibold text-pink-500">Open Recruitment Staff HMIF UNSRI 2026</span>.
                        <br />Data kamu berhasil kami simpan.
                      </p>
        
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8" />
        
                      {/* Action Section */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left md:text-center">
                        <p className="text-slate-700 font-medium mb-2">
                          Langkah Selanjutnya (Wajib):
                        </p>
                        <p className="text-slate-500 text-sm mb-6">
                          Calon staff wajib bergabung ke dalam <b>Grup Whatsapp Global</b> serta grup <b>Dinas Pilihan 1 & 2</b> untuk informasi wawancara.
                        </p>
        
                        <Button 
                          href="https://linktr.ee/OPREC_HMIF2026" 
                          variant="primary"
                          target="_blank" 
                          size="md"
                          icon={<ExternalLink 
                          className="w-4 h-4" />}
                          iconPosition="right"
                        >
                            Join WhatsApp Group
                        </Button>
                      </div>
        
                      <div className="mt-8">
                        <Button 
                          href="/#home" 
                          variant="ghost"
                          size="sm"
                          icon={<LucideHome 
                          className="w-4 h-4" />}
                          iconPosition="left"
                        >
                            Kembali ke Beranda
                        </Button>
                      </div>
        
                    </div>
                  </motion.div>
                </div>
              </main>
    );
}