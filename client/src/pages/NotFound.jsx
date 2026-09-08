import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#2C3E50] flex flex-col justify-between font-serif">
      <SEO 
        title="404 - Page Not Found | தமிழ் சித்த மருத்துவமனை" 
        description="The requested page could not be found. Return to Tamil Siddha Clinic home page." 
      />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-[#E8DCC4] relative overflow-hidden">
          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C45508]/10 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#2D6A4F]/10 rounded-tr-full pointer-events-none" />

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FDF6EC] text-[#C45508] mb-6 shadow-inner border border-[#E8DCC4]">
            <span className="text-4xl font-bold font-serif">404</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#2D6A4F] mb-2 font-serif">
            பக்கம் காணப்படவில்லை
          </h1>
          <h2 className="text-lg font-medium text-[#C45508] mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
            நீங்கள் தேடும் பக்கம் தற்காலிகமாக நீக்கப்பட்டிருக்கலாம் அல்லது தவறான முகவரியை உள்ளிட்டுள்ளீர்கள்.
            <br />
            <span className="text-xs text-gray-500 mt-2 block">
              The page you are looking for might have been removed, renamed, or is temporarily unavailable.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-[#C45508] hover:bg-[#A34305] text-white font-medium rounded-lg shadow-md transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              முகப்பு பக்கம் (Home)
            </Link>
            <Link
              to="/book"
              className="px-6 py-3 bg-[#2D6A4F] hover:bg-[#22523C] text-white font-medium rounded-lg shadow-md transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              பதிவு செய்க (Book Now)
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
