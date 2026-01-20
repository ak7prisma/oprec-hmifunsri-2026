import type { Metadata } from "next";
import { Inter, Outfit, Poppins } from "next/font/google";
import "./globals.css";
import FallingPetals from "@/components/organisms/FallingEfectBg";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "700", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OPREC HMIF 2026",
  description: "Website resmi pendaftaran Open Recruitment Staff Himpunan Mahasiswa Informatika (HMIF) Universitas Sriwijaya tahun 2026. Bergabunglah bersama kami!",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "Open Recruitment Staff HMIF Unsri 2026",
    description: "Ayo daftarkan dirimu menjadi bagian dari pengurus HMIF Unsri 2026!",
    url: "https://oprec.hmifunsri.com",
    siteName: "OPREC HMIF Unsri",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  keywords: ["HMIF", "Unsri", "Oprec", "Organisasi", "Informatika"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-background text-foreground min-h-screen antialiased overflow-x-hidden`}>
        
        <FallingPetals />
        
        <div className="relative z-10 flex flex-col min-h-screen">
            {children}
        </div>
        
        <Toaster />
      </body>
    </html>
  );
}