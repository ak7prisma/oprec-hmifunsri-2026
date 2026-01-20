"use client";
import { Modal, ModalBody } from "flowbite-react";
import { X, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button"; 

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isAccepted: boolean;
  isLoading?: boolean;
}

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isAccepted,
  isLoading 
}: Readonly<ConfirmationModalProps>) {

  const isRevoking = isAccepted; 

  const title = isRevoking ? "Konfirmasi Pembatalan" : "Konfirmasi Penerimaan";
  const message = isRevoking 
    ? "Apakah Anda yakin ingin membatalkan status diterima staff ini? Status akan kembali menjadi pendaftar."
    : "Apakah Anda yakin ingin menerima calon staff ini menjadi pengurus resmi?";
    
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
          <p className="text-slate-600 text-base leading-relaxed">
            {message}
          </p>

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
                onClick={onConfirm}
                className={`${confirmColorClass} min-w-[100px] font-semibold`}
                disabled={isLoading}
            >
                {isLoading ? "Memproses..." : confirmText}
            </Button>
          </div>
        </div>
      </ModalBody>
      
    </Modal>
  );
}