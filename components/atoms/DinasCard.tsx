import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";

type Props = {
  title: string;
  registrant: number;
  iconBgColor: string;
  href: string;
};

export default function DinasCard({
  title,
  registrant,
  iconBgColor,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="flex cursor-pointer flex-col w-[250px] md:w-[275px] gap-4 bg-white border rounded-2xl p-6 shadow-md shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10 hover:border-pink-200 ring-slate-400"
    >
      {/* Title */}
      <p className="text-slate-500 font-medium text-lg">{title}</p>

      {/* Icon */}
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-3 ${iconBgColor} text-white shadow-sm`}>
          <FaUsers className="text-xl" />
        </div>
        <p className="text-slate-800 font-bold text-2xl">
          {registrant} <span className="text-sm font-normal text-slate-400">Orang</span>
        </p>
      </div>
    </Link>
  );
}