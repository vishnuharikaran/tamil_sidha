import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { Sparkles, Check, Activity, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Treatments = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-serif">
      <Navbar />

      {/* Header */}
      <div className="bg-forest-900 text-white py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-saffron-400 block">Formulations & Diagnostics</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-tamil text-white">
            Siddha Formulations & Diagnostics
          </h1>
          <p className="text-slate-300 font-serif text-base max-w-2xl mx-auto">
            Traditional medicine preparation methods and classical diagnostic techniques.
          </p>
        </div>
      </div>

      {/* 4 Formulations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-widest">Classical Medicine Types</h2>
            <p className="text-3xl sm:text-4xl font-bold font-tamil text-forest-900">
              The Four Siddha Formulations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Choornam */}
            <div className="siddha-card rounded-3xl p-8 border-l-4 border-l-saffron-600 space-y-4">
              <span className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-widest block">FORMULATION 01</span>
              <h3 className="text-2xl font-bold font-serif text-forest-900">CHOORNAM (Herbal Powders)</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Choornam refers to finely sieved, purified herbal powders prepared by grinding sun-dried medicinal roots, barks, and seeds following traditional Suddhi (purification) processes.
              </p>
              <div className="bg-cream-50 p-4 rounded-xl text-xs font-sans text-slate-700 border border-cream-200">
                <strong className="text-forest-900 block mb-1">Key Examples:</strong>
                <span>Amukkara Choornam (rejuvenative & anti-inflammatory), Thiriphala Choornam (digestive & detoxifier).</span>
              </div>
            </div>

            {/* Kudineer */}
            <div className="siddha-card rounded-3xl p-8 border-l-4 border-l-forest-700 space-y-4">
              <span className="text-xs font-sans font-bold text-forest-700 uppercase tracking-widest block">FORMULATION 02</span>
              <h3 className="text-2xl font-bold font-serif text-forest-900">KUDINEER (Herbal Decoctions)</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Kudineer is a concentrated aqueous extract prepared by boiling raw coarse herbal drugs in water until reduced to a quarter of its original volume, ensuring rapid therapeutic bioavailability.
              </p>
              <div className="bg-cream-50 p-4 rounded-xl text-xs font-sans text-slate-700 border border-cream-200">
                <strong className="text-forest-900 block mb-1">Key Examples:</strong>
                <span>Nandukkal Kudineer (renal crystal dissolution), Nilavembu Kudineer (antipyretic & immune booster).</span>
              </div>
            </div>

            {/* Thailam */}
            <div className="siddha-card rounded-3xl p-8 border-l-4 border-l-amber-600 space-y-4">
              <span className="text-xs font-sans font-bold text-amber-700 uppercase tracking-widest block">FORMULATION 03</span>
              <h3 className="text-2xl font-bold font-serif text-forest-900">THAILAM (Medicated Oils)</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Thailam preparations involve infusing herbal pastes and juices into base oils (such as sesame or coconut oil) under precise heating control to extract lipid-soluble active compounds.
              </p>
              <div className="bg-cream-50 p-4 rounded-xl text-xs font-sans text-slate-700 border border-cream-200">
                <strong className="text-forest-900 block mb-1">Key Examples:</strong>
                <span>Vatha Kesari Thailam (joint pain & sciatica), Pinda Thailam (soothing oil for inflammatory skin rashes).</span>
              </div>
            </div>

            {/* Lehyam */}
            <div className="siddha-card rounded-3xl p-8 border-l-4 border-l-purple-700 space-y-4">
              <span className="text-xs font-sans font-bold text-purple-700 uppercase tracking-widest block">FORMULATION 04</span>
              <h3 className="text-2xl font-bold font-serif text-forest-900">LEHYAM (Semi-Solid Confections)</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Lehyam is a nutritious semi-solid electuary prepared by boiling herbal extracts with jaggery or sugar syrup, ghee, and honey, providing long-lasting stamina and systemic nourishment.
              </p>
              <div className="bg-cream-50 p-4 rounded-xl text-xs font-sans text-slate-700 border border-cream-200">
                <strong className="text-forest-900 block mb-1">Key Examples:</strong>
                <span>Venpoosani Lehyam (uterine & reproductive toner), Nellikai Lehyam (immuno-rejuvenator).</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Siddha Diagnostics Section */}
      <section className="py-20 bg-cream-100/60 border-t border-saffron-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-widest">Clinical Evaluation</h2>
            <p className="text-3xl sm:text-4xl font-bold font-tamil text-forest-900">
              Siddha Diagnostic Principles
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Naadi */}
            <div className="bg-white p-8 rounded-3xl border border-saffron-600/30 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-saffron-50 text-saffron-700 flex items-center justify-center text-2xl font-bold">
                🩺
              </div>
              <h3 className="text-2xl font-bold font-serif text-forest-900">Naadi Parikshai (Pulse Exam)</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Wrist radial pulse diagnosis. By gently placing three fingers on the radial artery below the wrist joint, Dr. Sakthi Vadivu senses the subtle movement rhythms corresponding to Vatham (cock/swan movement), Pitham (turtle/frog movement), and Kapham (peacock/snake movement).
              </p>
            </div>

            {/* Neerkuri & Neikkuri */}
            <div className="bg-white p-8 rounded-3xl border border-saffron-600/30 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center text-2xl font-bold">
                🧫
              </div>
              <h3 className="text-2xl font-bold font-serif text-forest-900">Neerkuri & Neikkuri Test</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Classical urine examination. Neerkuri assesses color, density, and sediment. Neikkuri involves dropping a single drop of sesame oil onto a sample of morning urine to observe how the oil droplet spreads, revealing humor dominance.
              </p>
            </div>

            {/* Enn Vagai Thervu */}
            <div className="bg-white p-8 rounded-3xl border border-saffron-600/30 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center text-2xl font-bold">
                👁️
              </div>
              <h3 className="text-2xl font-bold font-serif text-forest-900">Enn Vagai Thervu (8-Fold Test)</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Eightfold systemic diagnostic parameters:
                Tongue (Naa), Color (Varnam), Voice (Swaram), Eyes (Kan), Touch/Skin (Thodal), Stool (Malam), Urine (Neer), and Pulse (Naadi).
              </p>
            </div>

          </div>

          <div className="mt-16 text-center font-sans">
            <Link
              to="/book"
              className="inline-flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <span>Book In-Person Diagnostic Visit</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Treatments;
