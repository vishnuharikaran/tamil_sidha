import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Heart, Feather, BookOpen, Sparkles, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { CLINIC } from '../constants/clinic';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-serif">
      <Navbar />

      {/* Page Header */}
      <div className="bg-forest-900 text-white py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-saffron-400 block">About Doctor & Science</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-tamil text-white">
            Dr. Sakthi Vadivu, MD (Siddha)
          </h1>
          <p className="text-slate-300 font-serif text-base max-w-2xl mx-auto">
            Dedicated to restoring wellness through classical Tamil Siddha medical science.
          </p>
        </div>
      </div>

      {/* Doctor Profile Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="siddha-card rounded-3xl p-8 bg-cream-50/50 text-center relative border-2 border-saffron-600/30">
                <div className="w-32 h-32 rounded-full bg-forest-700 text-amber-200 mx-auto flex items-center justify-center text-5xl mb-6 shadow-lg border-4 border-saffron-600">
                  🩺
                </div>
                <h2 className="text-2xl font-bold font-serif text-forest-900">{CLINIC.doctor}</h2>
                <p className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-wider mt-1">{CLINIC.designation}</p>
                <div className="mt-4 inline-flex items-center space-x-2 bg-forest-50 px-3 py-1.5 rounded-full text-xs font-sans text-forest-800 border border-forest-200">
                  <Award className="w-4 h-4 text-saffron-600" />
                  <span>{CLINIC.experience} Clinical Experience</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-bold font-tamil text-forest-900">
                Expertise & Medicinal Philosophy
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                <strong>Dr. Sakthi Vadivu</strong> holds a Master of Medicine degree (MD in Siddha Medicine) and has over 8 years of clinical experience diagnosing and treating chronic illnesses across Tamil Nadu. She is recognized for her accurate Naadi (wrist pulse) reading and non-surgical management of renal stones, uterine fibroids, and severe joint disorders.
              </p>
              <p className="text-slate-700 text-base leading-relaxed">
                Her clinical practice integrates purified herbal formulations (Choornam, Kudineer, Thailam, Lehyam) with personalized dietary regimen (Pathyam) to eliminate root causes of disease without adverse effects.
              </p>

              <div className="grid grid-cols-2 gap-4 font-sans text-xs pt-2">
                <div className="bg-cream-100 p-4 rounded-xl border border-cream-300">
                  <strong className="text-forest-900 block font-bold text-sm mb-1">MD Siddha Specialist</strong>
                  <span className="text-slate-600">Advanced postgraduate qualification in classical Siddha therapeutics.</span>
                </div>
                <div className="bg-cream-100 p-4 rounded-xl border border-cream-300">
                  <strong className="text-forest-900 block font-bold text-sm mb-1">Non-Surgical Care</strong>
                  <span className="text-slate-600">Targeted herbal dissolution for kidney stones & uterine fibroid regression.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What is Siddha Medicine */}
      <section className="py-16 bg-cream-100/60 border-y border-saffron-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-widest block">Ancient Science</span>
          <h2 className="text-3xl font-bold font-tamil text-forest-900">What is Siddha Medicine?</h2>
          <p className="text-slate-700 text-base leading-relaxed">
            Siddha Medicine is one of India's oldest traditional medical systems, codified by the 18 Siddhars (ancient Tamil sages). It views the human body as a microcosm of the universe composed of the five elements (Ether, Air, Fire, Water, Earth) which manifest as the three bio-regulatory humors: <strong>Vatham, Pitham, and Kapham</strong>. Disease arises when these humors fall out of balance due to diet, climate, or mental stress.
          </p>
        </div>
      </section>

      {/* The 3 Humors: Vatham, Pitham, Kapham */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-widest">Tridosha Theory</h2>
            <p className="text-3xl sm:text-4xl font-bold font-tamil text-forest-900">
              The Three Humors (Mukkutram)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Vatham */}
            <div className="siddha-card rounded-2xl p-6 border-t-4 border-t-blue-600 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center text-2xl">
                💨
              </div>
              <h3 className="text-2xl font-bold font-serif text-forest-900">Vatham</h3>
              <p className="text-xs font-sans font-bold text-blue-700 uppercase">Air & Ether Elements</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Governs motor activities, nervous system impulses, movement, and joint mobility. Imbalance causes back pain, sciatica, arthritis, constipation, and neurological stiffness.
              </p>
            </div>

            {/* Pitham */}
            <div className="siddha-card rounded-2xl p-6 border-t-4 border-t-saffron-600 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-saffron-50 text-saffron-700 flex items-center justify-center text-2xl">
                🔥
              </div>
              <h3 className="text-2xl font-bold font-serif text-forest-900">Pitham</h3>
              <p className="text-xs font-sans font-bold text-saffron-700 uppercase">Fire & Water Elements</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Governs metabolic heat, digestion, body temperature, and organ filtration. Imbalance leads to hyperacidity, hypertension, renal calculi (kidney stones), and skin inflammations.
              </p>
            </div>

            {/* Kapham */}
            <div className="siddha-card rounded-2xl p-6 border-t-4 border-t-emerald-700 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-2xl">
                🌊
              </div>
              <h3 className="text-2xl font-bold font-serif text-forest-900">Kapham</h3>
              <p className="text-xs font-sans font-bold text-emerald-700 uppercase">Earth & Water Elements</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Governs physical stability, joint lubrication, tissue mass, and immunity. Imbalance manifests as respiratory congestion, uterine fibroids, obesity, and lethargy.
              </p>
            </div>

          </div>

          <div className="mt-16 text-center font-sans">
            <Link
              to="/book"
              className="inline-flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <span>Schedule Naadi Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
