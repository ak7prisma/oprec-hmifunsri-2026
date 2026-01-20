import Image from "next/image";
import React from "react";
import { ArrowUpRight } from "lucide-react";

interface Props {
  src: string;
  title: string;
  description: string;
}

export default function ProkerCard({ src, title, description }: Readonly<Props>) {
  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-pink-500/10 hover:border-pink-300 hover:-translate-y-1 transition-all duration-300">
      
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-xl font-bold text-slate-800 group-hover:text-pink-600 transition-colors line-clamp-1">
            {title}
          </h1>
        </div>
        
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="mt-auto pt-4 flex items-center gap-2">
           <div className="h-[2px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full rounded-full"></div>
        </div>
      </div>

    </div>
  );
};