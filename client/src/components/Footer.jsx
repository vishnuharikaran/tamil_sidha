import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CLINIC } from '../constants/clinic';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-forest-900 text-slate-200 border-t-4 border-saffron-600 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Col 1: Overview */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">🌿</span>
              <div>
                <h3 className="text-xl font-bold font-tamil text-white">{CLINIC.name}</h3>
                <p className="text-xs text-saffron-400 font-sans uppercase font-semibold">{CLINIC.doctor} ({CLINIC.designation})</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Providing traditional Siddha healthcare with clinical precision in Viluppuram. Root-cause treatment for kidney stones, uterine fibroids, chronic pain, and skin disorders.
            </p>
            <div className="flex items-center space-x-2 text-xs text-amber-200 font-sans">
              <ShieldCheck className="w-4 h-4 text-saffron-500" />
              <span>Registered Siddha Medicine Practitioner (8+ Years Exp.)</span>
            </div>
          </div>

          {/* Col 2: Hours & Address */}
          <div>
            <h4 className="text-lg font-bold font-tamil text-white mb-4 border-b border-forest-700 pb-2">
              Clinic Address & Hours
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-saffron-500 shrink-0 mt-0.5" />
                <span>{CLINIC.address.full}</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-saffron-500 shrink-0 mt-0.5" />
                <div className="font-sans text-xs">
                  <p className="font-semibold text-slate-100">{CLINIC.hours.weekdays.label}</p>
                  <p className="text-amber-300 font-bold mt-1">{CLINIC.hours.sunday.label}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Contact */}
          <div>
            <h4 className="text-lg font-bold font-tamil text-white mb-4 border-b border-forest-700 pb-2">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${CLINIC.phone}`}
                className="flex items-center space-x-3 text-slate-200 hover:text-saffron-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-saffron-500" />
                <span className="font-sans font-semibold">{CLINIC.phone}</span>
              </a>
              <a
                href={`https://wa.me/${CLINIC.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-emerald-400 hover:text-emerald-300 font-sans font-semibold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Doctor Direct</span>
              </a>
            </div>

            <div className="mt-8 pt-4 border-t border-forest-800 flex justify-between items-center text-xs font-sans text-slate-400">
              <Link to="/login" className="hover:text-amber-200 underline">
                Doctor Admin Portal
              </Link>
              <span>© {new Date().getFullYear()} {CLINIC.name}</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
