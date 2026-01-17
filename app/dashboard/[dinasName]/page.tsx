"use client";
import TableCalonStaff from "@/components/molecules/TableCalonStaff";
import { auth } from "@/lib/firebase";
import { fetchCalonStaff } from "@/lib/api";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function DinasName() {
  const rawPath = usePathname().split("/")[2];
  const dinasName = rawPath ? decodeURIComponent(rawPath) : "";
  
  const [user, setUser] = useState({ email: "" });
  const [staffData, setStaffData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Cek Login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email || "" });
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Filtering Data
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const allData = (await fetchCalonStaff()) || [];
        
        let filteredData = [];

        if (dinasName === "diterima") {
          filteredData = allData.filter((item: any) => item.status === "Diterima");
        
        } else if (dinasName === "pendaftar") {
          filteredData = allData;
          
        } else {
          
          filteredData = allData.filter((item: any) => {
             const choices = item.divisions || [];
             return choices.some((choice: string) => 
               choice.toLowerCase().includes(dinasName.toLowerCase())
             );
          });
        }

        setStaffData(filteredData);
      } catch (error) {
        console.error("Error fetch data:", error);
        toast({ title: "Gagal", description: "Gagal mengambil data", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    if (user.email) {
        getData();
    }
  }, [dinasName, user.email]);

  return (
    <main className="flex items-center justify-center px-2 lg:px-10">
      <div className="flex flex-col justify-center w-full px-5 py-8 mx-auto rounded-lg table-calon-staff">
        
        <h1 className="mb-6 text-2xl font-bold text-white capitalize">
          {dinasName === "diterima" ? "Staff Yang Diterima" : `Pendaftar: ${dinasName}`}
        </h1>

        {isLoading ? (
            <p className="text-center text-white">Sedang memuat data...</p>
        ) : (
            <TableCalonStaff calonStaff={staffData} />
        )}
        
      </div>
    </main>
  );
}