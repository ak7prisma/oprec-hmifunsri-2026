"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCalonStaff, getCalonStaffById } from "@/lib/api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { Button } from "../ui/button";
import { store } from "next/dist/build/output/store";

export default function TableDetail() {
  const [kpmUrl, setKpmUrl] = useState("");
  const [calonStaff, setCalonStaff] = useState<any>({});
  const [accepted, setAccepted] = useState(false);
  const calonStaffId = usePathname().split("/")[3];

  useEffect(() => {
    const getCalonStaff = async () => {
      if (calonStaffId) {
        const response = await getCalonStaffById(calonStaffId);
        setCalonStaff(response);

        if (response?.status === "Diterima") {
          setAccepted(true);
        } else {
          setAccepted(false);
        }
      }
    };
    getCalonStaff();

    const getCalonStaffKPM = async () => {
      if (calonStaff.nim) {
        const url = await getDownloadURL(ref(storage, `calonStaff/${calonStaff.nim}`));
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        const img = document.getElementById("myimg");
        img?.setAttribute("src", url);
        setKpmUrl(kpmUrl);
      }
    };
    getCalonStaffKPM();
  }, [calonStaff]);

  const handleAccept = async () => {
    try {
      const newStatus = accepted ? "Belum Diterima" : "Diterima";
      setAccepted(!accepted);

      const docRef = doc(db, "calonStaff", calonStaffId);
      await updateDoc(docRef, { status: newStatus });

      console.log(`Status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <Table className="w-full mx-auto my-5">
      <TableBody className="text-xl md:text-2xl">
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Nama
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.name}</TableCell>
        </TableRow>

        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            NIM
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.nim}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Angkatan
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.generation}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Kelas
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.classStudent}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Email
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.email}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Domisili Kampus
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.campusDomicile}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Alamat
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.address}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            No Whatsapp
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.whatsappNumber}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            ID Line
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.idLine}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Divisi 1
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff?.divisions?.at(0)}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Divisi 2
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff?.divisions?.at(1)}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Alasan masuk HMIF
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.reasonHMIF}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Alasan memilih divisi 1
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.reasonDivision1}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Alasan memilih divisi 2
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium text-slate-500">{calonStaff.reasonDivision2}</TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            Link postingan Twibbon
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">
            <a href={calonStaff.linkTwibbon} className="text-sky-400 hover:text-sky-500 hover:underline duration-200">
              {calonStaff.linkTwibbon}
            </a>
          </TableCell>
        </TableRow>
        <TableRow className="font-bold hover:bg-pink-200/50 border">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold text-slate-700">
            KPM
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">
            <img id="myimg" className="max-w-64 max-h-64" src={calonStaff.kpm} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell colSpan={10} className="text-right pt-4">
            <Button variant="outline" onClick={handleAccept} className={`rounded-lg cursor-pointer text-lg ${accepted ? "bg-pink-500 text-white hover:text-pink-500" : "bg-sky-500 text-white hover:text-sky-500 border-sky-500"}`}>
              {accepted ? "Hapus" : "Terima"}
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
