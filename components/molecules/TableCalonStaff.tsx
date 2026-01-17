"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TableCalonStaffProps {
  calonStaff?: any[];
}

export default function TableCalonStaff({ calonStaff = [] }: TableCalonStaffProps) {
  
  const [filteredStaff, setFilteredStaff] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dinasName = usePathname().split("/")[2];

  useEffect(() => {
    const dataToFilter = calonStaff || []; 

    const results = dataToFilter.filter((staff: any) => 
      staff.name && staff.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredStaff(results);
  }, [searchQuery, calonStaff]);

  const isAccepted = dinasName === "diterima";

  return (
    <div className="w-full mx-auto my-5">
      <div className="flex items-center justify-between mx-6 mb-8">
        {/* Judul Dinamis */}
        <h1 className="text-xl font-semibold capitalize lg:text-2xl text-slate-200">
          {isAccepted 
            ? "Staf Diterima" 
            : dinasName === "pendaftar" 
              ? "Semua Pendaftar" 
              : `Calon Staf - Dinas ${decodeURIComponent(dinasName || "")}`
          }
        </h1>
        
        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="Cari nama staf..." 
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 text-black" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

      <div className="rounded-md border border-slate-700 bg-slate-900/50">
        <Table className="w-full text-slate-200">
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-800">
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Pilihan 1</TableHead>
              <TableHead>Pilihan 2</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff: any, index: number) => (
                <TableRow key={staff.id || index} className="border-slate-700 hover:bg-slate-800">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>{staff.nim}</TableCell>
                  <TableCell>{staff.divisions?.[0] || "-"}</TableCell>
                  <TableCell>{staff.divisions?.[1] || "-"}</TableCell>
                  <TableCell className="text-center">
                    <Link 
                      href={`/dashboard/${dinasName}/${staff.id}`} 
                      className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
                    >
                      Detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {searchQuery 
                    ? "Nama tidak ditemukan." 
                    : "Belum ada data pendaftar."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}