"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";
import DinasCard from "@/components/atoms/DinasCard";
import { fetchCalonStaffDashboard, segmentCalonStaff } from "@/lib/api";

// Admin
const ADMIN_EMAILS = [
  "akademik.hmifunsri@gmail.com",
];

export default function Dashboard() {
  const [user, setUser] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [calonStaffLength, setCalonStaffLength] = useState({
    global: 0,
    accept: 0,
    akademik: 0,
    administrasi: 0,
    kastrad: 0,
    kwu: 0,
    kominfo: 0,
    pmb: 0,
    psdm: 0,
  });

  const router = useRouter();

  // Protection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);

      if (currentUser && currentUser.email) {

        if (ADMIN_EMAILS.includes(currentUser.email)) {

          setUser({ email: currentUser.email });
          
          fetchData(); 
        } else {

          toast({
            variant: "destructive",
            title: "Akses Ditolak",
            description: "Email anda tidak terdaftar sebagai admin.",
          });
          await signOut(auth);
          router.push("/");
        }
      } else {

        router.push("/");
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchData = async () => {
    try {
      const calonStaff = await fetchCalonStaffDashboard();
      const segmentedData = segmentCalonStaff(calonStaff);
      setCalonStaffLength(segmentedData);
    } catch (error) {
      console.error("Error fetching calon staff:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data calon staff.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="ml-10 h-screen w-screen">
        <p className="animate-pulse text-lg font-semibold text-pink-500">Memuat Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 px-14 py-10">
      <div className="w-full text-center mb-4">
        <p className="text-sm text-gray-500">Login sebagai: <span className="font-bold text-gray-800">{user.email}</span></p>
      </div>

      <DinasCard href="/dashboard/pendaftar" title="Pendaftar Total" registrant={calonStaffLength.global} iconBgColor="bg-sky-500" />
      <DinasCard href="/dashboard/diterima" title="Pendaftar Diterima" registrant={calonStaffLength.accept} iconBgColor="bg-amber-500" />
      <DinasCard href="/dashboard/administrasi" title="Administrasi" registrant={calonStaffLength.administrasi} iconBgColor="bg-lime-500" />
      <DinasCard href="/dashboard/akademik" title="Akademik" registrant={calonStaffLength.akademik} iconBgColor="bg-emerald-500" />
      <DinasCard href="/dashboard/kastrad" title="Kastrad" registrant={calonStaffLength.kastrad} iconBgColor="bg-cyan-500" />
      <DinasCard href="/dashboard/kwu" title="KWU" registrant={calonStaffLength.kwu} iconBgColor="bg-pink-500" />
      <DinasCard href="/dashboard/kominfo" title="Kominfo" registrant={calonStaffLength.kominfo} iconBgColor="bg-indigo-500" />
      <DinasCard href="/dashboard/pmb" title="PMB" registrant={calonStaffLength.pmb} iconBgColor="bg-purple-500" />
      <DinasCard href="/dashboard/psdm" title="PSDM" registrant={calonStaffLength.psdm} iconBgColor="bg-violet-500" />
    </div>
  );
}