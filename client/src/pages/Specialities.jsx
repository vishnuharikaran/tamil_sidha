import React from 'react';
import { CLINIC } from '../constants/clinic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Specialities = () => {
  const treatmentNotes = {
    "Internal Stones": "Targeted herbal lithotriptic formulations (such as Nandukkal Kudineer) dissolve urinary crystals, flush out stones naturally, and prevent recurrent calcification.",
    "Women's Health": "Classical Siddha remedies (like Venpoosani Lehyam) regulate hormonal balance, reduce uterine inflammation, shrink fibroids, and restore regular menstrual rhythm.",
    "Chronic Illnesses": "Root-cause management using Vatha-relieving oils (Vatha Kesari Thailam) and metabolic purifiers (Amukkara Choornam) to alleviate joint stiffness, control blood glucose, and stabilize BP.",
    "Dermatology": "Blood-purifying herbal decoctions and topical medicated oils (Pinda Thailam) cleanse deep-seated toxins (Ratha Shuddhi) to resolve eczema, psoriasis, and chronic skin allergies."
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-serif">
      <Navbar />

      {/* Header */}
      <div className="bg-forest-900 text-white py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-saffron-400 block">Clinical Expertise</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-tamil text-white">
            Specialities & Conditions Treated
          </h1>
          <p className="text-slate-300 font-serif text-base max-w-2xl mx-auto">
            Targeted Siddha medical care for chronic and internal conditions by Dr. Sakthi Vadivu.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLINIC.specialities.map((spec) => (
              <div
                key={spec.category}
                className="siddha-card rounded-3xl p-8 hover:border-saffron-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-cream-100 text-forest-800 flex items-center justify-center text-3xl shadow-inner border border-saffron-600/30">
                      {spec.icon === 'stone' && '🪨'}
                      {spec.icon === 'women' && '🌸'}
                      {spec.icon === 'chronic' && '🧬'}
                      {spec.icon === 'skin' && '🌿'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-serif text-forest-900">{spec.category}</h2>
                      <span className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-wider block mt-0.5">Siddha Clinical Therapy</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xs font-sans font-bold text-slate-500 uppercase mb-3">Conditions Addressed:</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-sans text-slate-800">
                      {spec.conditions.map((cond) => (
                        <li key={cond} className="flex items-center space-x-2 bg-cream-50 p-2.5 rounded-xl border border-cream-200">
                          <CheckCircle2 className="w-4 h-4 text-saffron-600 shrink-0" />
                          <span className="font-semibold">{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-forest-50/70 p-4 rounded-2xl border border-forest-200 mb-6">
                    <h4 className="text-xs font-sans font-bold text-forest-900 uppercase mb-1">Siddha Treatment Approach:</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-serif">
                      {treatmentNotes[spec.category]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 font-sans">
                  <Link
                    to="/book"
                    className="w-full flex items-center justify-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow transition-all"
                  >
                    <Calendar className="w-4 h-4 text-amber-200" />
                    <span>Book Consultation for {spec.category}</span>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Specialities;
