"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { getCalonStaffById } from "@/lib/api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "@/lib/firebase";
import { Button } from "../ui/button";
import ConfirmationModal from "../atoms/ConfirmationModals";

export default function TableDetail() {
  const [kpmUrl, setKpmUrl] = useState<string>("");
  const [calonStaff, setCalonStaff] = useState<any>({});
  const [accepted, setAccepted] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const pathParts = usePathname().split("/");
  const calonStaffId = pathParts[pathParts.length - 1];

  useEffect(() => {
    const initData = async () => {
      if (!calonStaffId) return;

      const staffData = await getCalonStaffById(calonStaffId);
      if (staffData) {
        setCalonStaff(staffData);
        setAccepted(staffData.status === "Diterima");

        if (staffData.nim) {
            try {
                const url = await getDownloadURL(ref(storage, `calonStaff/${staffData.nim}`));
                setKpmUrl(url);
            } catch (error) {
                console.error("Gagal load gambar KPM:", error);
                setKpmUrl("");
            }
        }
      }
    };

    initData();
  }, [calonStaffId]);

  const executeStatusChange = async () => {
    setIsLoadingAction(true);
    try {
      const newStatus = accepted ? "Belum Diterima" : "Diterima";
      
      const docRef = doc(db, "calonStaff", calonStaffId);
      await updateDoc(docRef, { status: newStatus });

      setAccepted(!accepted);
      console.log(`Status updated to: ${newStatus}`);
      
      setShowModal(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const DetailRow = ({ label, value, isLink = false, isImage = false }: any) => {
    let content;

    if (isLink) {
      content = (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-500 hover:text-sky-600 hover:underline break-all"
        >
          {value}
        </a>
      );
    } else if (isImage) {
      if (kpmUrl) {
        content = (
          <img
            src={kpmUrl}
            alt="KPM Bukti"
            className="max-w-[200px] md:max-w-xs rounded-lg border border-slate-200 shadow-sm transition-transform hover:scale-105 duration-300"
          />
        );
      } else {
        content = (
          <span className="text-slate-400 italic text-sm">
            Sedang memuat gambar atau tidak ditemukan...
          </span>
        );
      }
    } else {
      content = value || "-";
    }

    return (
      <TableRow className="hover:bg-pink-50/50 border-b border-pink-100">
        <TableCell className="w-[140px] md:w-[250px] text-base md:text-lg font-base md:font-semibold text-slate-800 align-top bg-slate-50/50">
          {label}
        </TableCell>
        <TableCell className="w-[20px] text-slate-500 text-base md:text-lg font-medium align-top">:</TableCell>
        <TableCell className="text-base md:text-lg font-medium text-slate-600 align-top whitespace-pre-wrap">
          {content}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
        <ConfirmationModal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={executeStatusChange}
            isAccepted={accepted}
            isLoading={isLoadingAction}
        />

        <div className="w-full max-w-[calc(100vw-2.5rem)] mx-auto my-5 overflow-hidden bg-white rounded-xl shadow-sm border border-slate-200">
            
            <div className="overflow-x-auto p-1">
                <Table className="min-w-[600px] w-full">
                    <TableBody className="font-semibold text-sm md:text-base">
                        
                        <DetailRow label="Nama" value={calonStaff.name} />
                        <DetailRow label="NIM" value={calonStaff.nim} />
                        <DetailRow label="Angkatan" value={calonStaff.generation} />
                        <DetailRow label="Kelas" value={calonStaff.classStudent} />
                        <DetailRow label="Email" value={calonStaff.email} />
                        <DetailRow label="Domisili Kampus" value={calonStaff.campusDomicile} />
                        <DetailRow label="Alamat" value={calonStaff.address} />
                        <DetailRow label="No Whatsapp" value={calonStaff.whatsappNumber} />
                        <DetailRow label="ID Line" value={calonStaff.idLine} />
                        
                        <DetailRow label="Divisi 1" value={calonStaff?.divisions?.at(0)} />
                        <DetailRow label="Divisi 2" value={calonStaff?.divisions?.at(1)} />
                        
                        <DetailRow label="Alasan masuk HMIF" value={calonStaff.reasonHMIF} />
                        <DetailRow label="Alasan Divisi 1" value={calonStaff.reasonDivision1} />
                        <DetailRow label="Alasan Divisi 2" value={calonStaff.reasonDivision2} />
                        
                        <DetailRow label="Link Twibbon" value={calonStaff.linkTwibbon} isLink={true} />
                        <DetailRow label="KPM" isImage={true} />

                        <TableRow>
                            <TableCell colSpan={3} className="text-left md:text-right pt-6 pb-4 pr-4">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setShowModal(true)} 
                                    className={`
                                        min-w-[120px] font-semibold transition-all duration-300
                                        ${accepted 
                                            ? "bg-pink-600 text-white hover:bg-pink-700 hover:text-white border-pink-600 shadow-pink-200" 
                                            : "bg-white text-emerald-600 border-emerald-500 hover:bg-emerald-500 hover:text-white shadow-emerald-100"
                                        }
                                        shadow-md hover:shadow-lg
                                    `}
                                >
                                    {accepted ? "Batalkan" : "Terima Staff"}
                                </Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
        </div>
    </>
  );
}