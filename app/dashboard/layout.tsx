import LogoutButton from "@/components/atoms/LogoutButton";
import MobileSidebar from "@/components/molecules/MobileSidebar";

import Image from "next/image";
import { MdDashboard, MdVerifiedUser } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
export default function RootDashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-[60] px-3 lg:px-10 xl:px-14">
        <div className="w-full h-full flex flex-row items-center justify-between m-auto lg:px-[10px]">
          <Link href="/dashboard" className="flex-row items-center hidden w-auto h-auto md:flex">
            <Image src="/logo.png" alt="logo" width={50} height={50} className="cursor-pointer hover:animate-slowspin" />

            <span className="font-bold ml-[10px] hidden md:block text-slate-900">HMIF UNSRI</span>
          </Link>
        </div>
      </div>

      <div className="flex">
        <MobileSidebar />
        <aside className=" pt-20 hidden md:flex flex-col bg-[#03001417] backdrop-blur-md shadow-2xl shadow-[#2A0E61]/50 h-full w-56 fixed z-[50] px-5 mx-auto">
          <Link href={"/dashboard"} className="flex items-center justify-start gap-2 px-3 py-2 mt-5 text-xl rounded-md cursor-pointer sidebar-dashboard-item  text-slate-900 hover:text-pink-600 hover:pl-2 duration-200">
            <MdDashboard />
            <p className=""> Dashboard</p>
          </Link>
          <Link href={"/dashboard/pendaftar"} className="flex items-center justify-start gap-2 px-3 py-2 mt-5 text-xl rounded-md cursor-pointer sidebar-dashboard-item text-slate-900 hover:text-pink-600 hover:pl-2 duration-200">
            <FaUsers />
            <p className=""> Pendaftar</p>
          </Link>
          <Link href={"/dashboard/diterima"} className="flex items-center justify-start gap-2 px-3 py-2 mt-5 text-xl rounded-md cursor-pointer sidebar-dashboard-item text-slate-900 hover:text-pink-600 hover:pl-2 duration-200">
            <MdVerifiedUser />
            <p className=""> Diterima</p>
          </Link>
          <hr className="h-2 mt-5 text-slate-900-300" />
          <LogoutButton />
        </aside>
        <div className="relative z-30 py-16 pt-24 md:pl-56">{children}</div>
      </div>
    </>
  );
}
