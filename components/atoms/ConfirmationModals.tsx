"use client";
import { Modal, ModalBody } from "flowbite-react";
import { X, AlertTriangle, CheckCircle2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { useState, useEffect } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedDivision?: string) => void;
  isAccepted: boolean;
  isLoading?: boolean;
  divisions?: string[];
}

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isAccepted,
  isLoading,
  divisions = []
}: Readonly<ConfirmationModalProps>) {

  const isRevoking = isAccepted;
  const [selectedDiv, setSelectedDiv] = useState<string>("");

  useEffect(() => {
    if (isOpen && divisions.length > 0) {
        setSelectedDiv(divisions[0]); 
    }
  }, [isOpen, divisions]);

  const handleConfirm = () => {
    if (isRevoking) {
        onConfirm();
    } else {
        onConfirm(selectedDiv);
    }
  };

  const title = isRevoking ? "Batalkan Penerimaan?" : "Konfirmasi Penerimaan";
  
  const confirmText = isRevoking ? "Ya, Batalkan" : "Ya, Terima Staff";
  const confirmColorClass = isRevoking 
    ? "bg-red-600 hover:bg-red-700 border-red-600 text-white" 
    : "bg-pink-600 hover:bg-pink-700 border-pink-600 text-white";

  return (
    <Modal 
      show={isOpen} 
      onClose={onClose} 
      position="center"
      size="md"
      popup
      theme={{
        content: {
          base: "relative w-full p-4 h-auto flex justify-center items-center",
          inner: "relative rounded-2xl shadow-2xl bg-white flex flex-col w-full max-w-md animate-in fade-in zoom-in duration-300" 
        }
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isRevoking ? 'bg-red-50' : 'bg-pink-50'}`}>
                {isRevoking ? (
                    <AlertTriangle className={`w-6 h-6 ${isRevoking ? 'text-red-500' : 'text-pink-600'}`} />
                ) : (
                    <CheckCircle2 className="w-6 h-6 text-pink-600" />
                )}
            </div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        </div>
        
        <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
            <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <ModalBody className="p-6 bg-slate-50/50 rounded-b-2xl">
        <div className="flex flex-col gap-4">
          
          {isRevoking ? (
             <p className="text-slate-600 text-base leading-relaxed">
                Status staff ini akan dikembalikan menjadi <b>Belum Diterima</b> dan data divisi penerimaan akan dihapus.
             </p>
          ) : (
             <div className="space-y-4">
                <p className="text-slate-600 text-base">
                    Pilih divisi tempat staff ini akan ditempatkan:
                </p>
                
                <div className="flex flex-col gap-2">
                    {divisions.map((div, index) => (
                        <label 
                            key={div} 
                            className={`
                                flex items-center p-3 border rounded-xl cursor-pointer transition-all
                                ${selectedDiv === div 
                                    ? 'border-pink-500 bg-pink-50 text-pink-700 ring-1 ring-pink-500' 
                                    : 'border-slate-200 bg-white hover:border-pink-300 text-slate-700'
                                }
                            `}
                        >
                            <input 
                                type="radio" 
                                name="divisionSelect"
                                value={div}
                                checked={selectedDiv === div}
                                onChange={(e) => setSelectedDiv(e.target.value)}
                                className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                            />
                            <div className="ml-3 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 opacity-70"/>
                                <span className="font-semibold text-sm">
                                    {index === 0 ? "Pilihan 1: " : "Pilihan 2: "}
                                    {div}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
             </div>
          )}

          <div className="flex items-center gap-3 mt-4 justify-end">
            <Button 
                variant="outline" 
                onClick={onClose}
                className="border-slate-300 text-slate-600 hover:bg-slate-100"
                disabled={isLoading}
            >
                Batal
            </Button>
            
            <Button 
                onClick={handleConfirm}
                className={`${confirmColorClass} min-w-[100px] font-semibold`}
                disabled={isLoading || (!isRevoking && !selectedDiv)}
            >
                {isLoading ? "Memproses..." : confirmText}
            </Button>
          </div>
        </div>
      </ModalBody>
      
    </Modal>
  );
}