"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ExternalLink, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";

interface TableCalonStaffProps {
  calonStaff?: any[];
}

export default function TableCalonStaff({ calonStaff = [] }: TableCalonStaffProps) {
  
  const [filteredStaff, setFilteredStaff] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dinasName = usePathname().split("/")[2];

  const isAcceptedPage = dinasName === "diterima"; 

  useEffect(() => {
    const dataToFilter = calonStaff || []; 
    const results = dataToFilter.filter((staff: any) => 
      staff.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStaff(results);
  }, [searchQuery, calonStaff]);

  const handleExportExcel = () => {
    const dataToExport = filteredStaff.map((staff, index) => ({
      No: index + 1,
      Nama: staff.name,
      Email: staff.email,
      "Divisi": staff.acceptedDivision || "-", 
      Status: staff.status || "Ditolak",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    
    const wscols = [
        { wch: 5 },
        { wch: 30 },
        { wch: 25 },
        { wch: 25 },
        { wch: 15 },
    ];
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Staff");
    const fileName = `Data_${dinasName}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const formatTitle = () => {
    if (isAcceptedPage) return "Staf Diterima";
    if (dinasName === "pendaftar") return "Semua Pendaftar";
    return `Calon Staf - ${decodeURIComponent(dinasName || "").toUpperCase()}`;
  };

  return (
    <div className="w-full max-w-full mx-auto my-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between px-1">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            {formatTitle()}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Total Data: {filteredStaff.length} orang
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full md:w-[280px]">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="w-4 h-4" />
                </div>
                <input 
                    type="text" 
                    placeholder="Cari nama..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>
            {/* Export */}
            <button 
                onClick={handleExportExcel}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-emerald-200 w-full md:w-auto active:scale-95"
            >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Excel</span>
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        <div className="w-full max-w-[calc(100vw-2.5rem)] md:max-w-full overflow-x-auto">
            
            <Table className="min-w-[800px] w-full">
            <TableHeader className="bg-slate-50/80">
                <TableRow className="border-slate-100 hover:bg-slate-50/80">
                <TableHead className="w-[50px] font-semibold text-slate-600 whitespace-nowrap">No</TableHead>
                <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Nama Lengkap</TableHead>
                <TableHead className="font-semibold text-slate-600 whitespace-nowrap">NIM</TableHead>
                <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Pilihan 1</TableHead>
                <TableHead className="font-semibold text-slate-600 whitespace-nowrap">Pilihan 2</TableHead>

                {isAcceptedPage && (
                    <TableHead className="font-semibold text-emerald-600 whitespace-nowrap">Diterima Di</TableHead>
                )}

                <TableHead className="text-center font-semibold text-slate-600 whitespace-nowrap">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredStaff.length > 0 ? (
                filteredStaff.map((staff: any, index: number) => (
                    <TableRow 
                    key={staff.id || index} 
                    className="border-slate-100 hover:bg-pink-50/30 transition-colors"
                    >
                    <TableCell className="font-medium text-slate-500 whitespace-nowrap">{index + 1}</TableCell>
                    <TableCell className="text-base md:text-lg font-semibold text-slate-800 whitespace-nowrap">{staff.name}</TableCell>
                    <TableCell className="text-slate-600 font-mono text-sm whitespace-nowrap">{staff.nim}</TableCell>
                    
                    <TableCell className="text-slate-600 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                        {staff.divisions?.[0] || "-"}
                        </span>
                    </TableCell>
                    <TableCell className="text-slate-600 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 border border-slate-100">
                        {staff.divisions?.[1] || "-"}
                        </span>
                    </TableCell>

                    {isAcceptedPage && (
                        <TableCell className="whitespace-nowrap">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                {staff.acceptedDivision || "Belum ditentukan"}
                             </span>
                        </TableCell>
                    )}

                    <TableCell className="text-center whitespace-nowrap">
                        <Link 
                        href={`/dashboard/${dinasName}/${staff.id}`} 
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-200"
                        >
                        Detail <ExternalLink className="w-3 h-3" />
                        </Link>
                    </TableCell>
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={isAcceptedPage ? 7 : 6} className="h-32 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="p-3 bg-slate-50 rounded-full">
                        <Search className="w-6 h-6 text-slate-300" />
                        </div>
                        <p>{searchQuery ? "Pencarian tidak ditemukan." : "Belum ada data."}</p>
                    </div>
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
}