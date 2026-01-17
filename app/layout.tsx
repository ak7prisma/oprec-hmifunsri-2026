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
  title: "OPREC HMIF 2025",
  description: "Website yang dibuat untuk pendaftaran calon staff HMIF UNSRI periode 2026",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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