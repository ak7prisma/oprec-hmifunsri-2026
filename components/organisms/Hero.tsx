import React from "react";
import HeroContent from "../molecules/HeroContent";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className="relative flex flex-col w-full h-full overflow-hidden"
      id="hero"
    >
      <Image
        src="/light-1.svg"
        alt="Light"
        width={100}
        height={100}
        className="hidden lg:flex absolute top-[-500px] lg:top-[-750px] h-[150%] w-[150%] z-[1] opacity-70"
      />
      <HeroContent />
    </section>
  );
};

export default Hero;
