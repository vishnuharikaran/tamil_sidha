import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CLINIC } from '../constants/clinic';

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${CLINIC.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/40"
      aria-label="Chat with Dr. Sakthi Vadivu on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="hidden sm:inline">WhatsApp Consult</span>
    </a>
  );
};

export default WhatsAppButton;
