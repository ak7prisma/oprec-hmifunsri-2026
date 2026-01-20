"use client";
import { Modal, ModalBody } from "flowbite-react";
import Link from "next/link";
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { X, MessageCircle } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: Readonly<ContactModalProps>) {

  const contactItemStyle = "flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 hover:border-pink-200 hover:-translate-y-1 cursor-pointer group hover:bg-pink-50";

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
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-50 rounded-lg">
                <MessageCircle className="w-5 h-5 text-pink-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Contact Us</h3>
        </div>
        
        <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Tutup"
        >
            <X className="w-5 h-5" />
        </button>
      </div>

      <ModalBody className="p-5 bg-slate-50/50 rounded-b-2xl">
        <div className="flex flex-col space-y-3">
          
          <Link href="https://wa.me/6281245408202" target="_blank" rel="noopener noreferrer" className={contactItemStyle}>
            <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-full transition-colors">
                <FaWhatsapp size={24} className="text-green-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-base">WhatsApp - Naomi</span>
              <span className="text-xs text-slate-500 font-medium">+62 812-4540-8202</span>
            </div>
          </Link>

          <Link href="https://wa.me/6282282283728" target="_blank" rel="noopener noreferrer" className={contactItemStyle}>
            <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-full transition-colors">
                <FaWhatsapp size={24} className="text-green-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-base">WhatsApp - Ima</span>
              <span className="text-xs text-slate-500 font-medium">+62 822-8228-3728</span>
            </div>
          </Link>


        </div>
      </ModalBody>
      
    </Modal>
  );
}