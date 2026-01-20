"use client";
import {
  SheetContent,
  SheetTrigger,
  Sheet,
} from "@/components/ui/sheet";
import { MdDashboard, MdVerifiedUser } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MenuIcon } from "lucide-react";
import LogoutButton from "../atoms/LogoutButton";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
type Props = {};

export default function MobileSidebar({}: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild className="z-30 block md:hidden">
        <MenuIcon
          className={cn("-translate-y-12 top-0 right-5 cursor-pointer h-40 w-8 text-slate-700 hover:text-pink-600 duration-200 z-[80]", {
            fixed: !sheetOpen,
          })}
        />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex-col bg-[#03001417]/5 shadow-2xl shadow-[#2A0E61]/50 px-5 mx-auto z-[100]"
      >
        <Link
          href={"/dashboard"}
          className="flex items-center justify-start gap-2 px-3 py-2 mt-5 text-xl rounded-md cursor-pointer sidebar-dashboard-item text-slate-200 hover:text-pink-500 hover:pl-2 duration-200"
        >
          <MdDashboard />
          <p className=""> Dashboard</p>
        </Link>
        <Link
          href={"/dashboard/pendaftar"}
          className="flex items-center justify-start gap-2 px-3 py-2 mt-5 text-xl rounded-md cursor-pointer sidebar-dashboard-item text-slate-200 hover:text-pink-500 hover:pl-2 duration-200"
        >
          <FaUsers />
          <p className=""> Pendaftar</p>
        </Link>
        <Link
          href={"/dashboard/pendaftar-diterima"}
          className="flex items-center justify-start gap-2 px-3 py-2 mt-5 text-xl rounded-md cursor-pointer sidebar-dashboard-item text-slate-200 hover:text-pink-500 hover:pl-2 duration-200"
        >
          <MdVerifiedUser />
          <p className=""> Diterima</p>
        </Link>
        <hr className="h-1 mt-5 mb-3 text-slate-300" />
        <LogoutButton />
      </SheetContent>
    </Sheet>
  );
}
