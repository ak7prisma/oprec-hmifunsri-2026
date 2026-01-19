import Pengumuman from "@/components/organisms/Pengumuman";
import Hero from "@/components/organisms/Hero";
import Timeline from "@/components/organisms/Timeline";
import Faq from "@/components/organisms/Faq";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import Dinas from "@/components/organisms/Dinas";
import Proker from "@/components/organisms/Proker";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="w-full h-full">
        <div className="flex flex-col">
          <Hero />
          <Timeline />
          <Dinas />
          <Proker />
          <Pengumuman />
          <Faq />
        </div>
      </main>

      <Footer />
    </>
  );
}
