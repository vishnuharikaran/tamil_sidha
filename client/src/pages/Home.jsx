import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Award, ShieldCheck, Calendar, Phone, ArrowRight, Activity, 
  Sparkles, CheckCircle2, Heart, Feather, MapPin, Clock 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import { CLINIC } from '../constants/clinic';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-serif">
      <SEO
        title="Ancient Wisdom. Modern Healing."
        description={`Official portal for ${CLINIC.name} in Viluppuram. Dr. Sakthi Vadivu provides authentic Siddha medical care for kidney stones, uterine fibroids, chronic pain, and skin disorders.`}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 text-white pt-16 pb-24 overflow-hidden border-b-4 border-saffron-600">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C45508_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-saffron-600/20 text-saffron-300 font-sans px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-saffron-600/40">
                <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
                <span>Ancient Wisdom. Modern Healing.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-tamil leading-tight text-white">
                {CLINIC.name}
              </h1>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-serif text-saffron-300 font-semibold">
                  {CLINIC.doctor} — <span className="text-white font-normal text-lg">{CLINIC.designation}</span>
                </h2>
                <div className="inline-flex items-center space-x-2 bg-forest-700/80 px-3 py-1 rounded-lg text-xs font-sans text-amber-200 border border-forest-600">
                  <Award className="w-4 h-4 text-saffron-400" />
                  <span>{CLINIC.experience} Clinical Expertise</span>
                </div>
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-serif pt-2 max-w-2xl">
                Siddha medicine is an ancient, holistic medical system originating in South India that restores physical and mental equilibrium by harmonizing the body's three vital humors. Through purificatory herbal formulations and precise diagnostic examination, we deliver long-lasting relief from chronic conditions without surgical intervention.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4 font-sans">
                <Link
                  to="/book"
                  className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-amber-200" />
                  <span>Book Appointment</span>
                </Link>

                <Link
                  to="/specialities"
                  className="flex items-center space-x-2 bg-forest-700/80 hover:bg-forest-600 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-forest-500 transition-all"
                >
                  <span>Explore Specialities</span>
                  <ArrowRight className="w-4 h-4 text-saffron-400" />
                </Link>
              </div>

            </motion.div>

            {/* Hero Column 2 — Doctor Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-800 border-2 border-saffron-600/30">
                <div className="text-center pb-6 border-b border-cream-200">
                  <div className="w-24 h-24 rounded-full bg-forest-100 text-forest-800 mx-auto flex items-center justify-center text-4xl mb-4 border-2 border-saffron-600 shadow-inner">
                    🩺
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-forest-900">{CLINIC.doctor}</h3>
                  <p className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-wider mt-1">{CLINIC.designation}</p>
                </div>

                <div className="mt-6 space-y-3 font-sans text-xs text-slate-700">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-saffron-600 shrink-0 mt-0.5" />
                    <span>{CLINIC.address.full}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-saffron-600 shrink-0" />
                    <span>{CLINIC.hours.weekdays.label}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-saffron-600 shrink-0" />
                    <span className="font-bold text-slate-900">{CLINIC.phone}</span>
                  </div>
                </div>

                <Link
                  to="/book"
                  className="mt-6 w-full bg-forest-800 hover:bg-forest-900 text-white font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow transition-all block text-center"
                >
                  Schedule Clinic Consultation
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2-Sentence Siddha Intro Section */}
      <section className="py-16 bg-cream-100/60 border-b border-saffron-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-widest block">Root Cause Healing</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-tamil text-forest-900">
            Traditional Siddha Medical Practice in Viluppuram
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            Siddha medicine evaluates health through pulse diagnosis (Naadi) and eightfold diagnostic criteria to treat illness at its physiological root. By combining classical herbal preparations with tailored lifestyle counseling, Dr. Sakthi Vadivu helps patients achieve sustainable wellness.
          </p>
        </div>
      </section>

      {/* Specialities Preview Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-widest">Medical Expertise</h2>
            <p className="text-3xl sm:text-4xl font-bold font-tamil text-forest-900">
              Specialized Siddha Clinical Care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CLINIC.specialities.map((spec) => (
              <div key={spec.category} className="siddha-card rounded-2xl p-6 hover:border-saffron-600 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-cream-100 text-forest-800 flex items-center justify-center text-2xl mb-4 group-hover:bg-saffron-600 group-hover:text-white transition-colors">
                  {spec.icon === 'stone' && '🪨'}
                  {spec.icon === 'women' && '🌸'}
                  {spec.icon === 'chronic' && '🧬'}
                  {spec.icon === 'skin' && '🌿'}
                </div>
                <h3 className="text-xl font-bold font-serif text-forest-900 mb-3">{spec.category}</h3>
                <ul className="space-y-2 font-sans text-xs text-slate-700 mb-4">
                  {spec.conditions.map((cond) => (
                    <li key={cond} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
                      <span>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 font-sans">
            <Link
              to="/specialities"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-saffron-700 hover:text-saffron-800 border-b-2 border-saffron-600 pb-1"
            >
              <span>View All Conditions & Treatment Notes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
