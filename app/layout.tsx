import type { Metadata } from "next";
import { Inter, Outfit, Poppins } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/organisms/StarBackground";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "700", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OPREC HMIF 2026",
  description: "Website yang dibuat untuk pendaftaran calon staff HMIF UNSRI periode 2025",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[#020a14] overflow-x-hidden`}>
        <StarsCanvas />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
