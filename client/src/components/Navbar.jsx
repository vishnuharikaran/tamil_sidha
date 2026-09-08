import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, Shield } from 'lucide-react';
import { CLINIC } from '../constants/clinic';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { admin } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Doctor', path: '/about' },
    { label: 'Specialities', path: '/specialities' },
    { label: 'Treatments', path: '/treatments' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-cream-50/95 backdrop-blur-md border-b border-saffron-600/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Clinic Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-full bg-forest-700 flex items-center justify-center text-amber-200 text-xl font-bold shadow group-hover:bg-saffron-600 transition-colors">
              🌿
            </div>
            <div>
              <span className="text-xl font-bold font-tamil text-forest-900 tracking-tight block leading-tight group-hover:text-saffron-600 transition-colors">
                {CLINIC.name}
              </span>
              <span className="text-xs font-sans text-saffron-700 font-semibold tracking-wide uppercase block">
                {CLINIC.doctor} ({CLINIC.designation.split(' ')[0]})
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-7 font-sans text-xs font-semibold uppercase tracking-wider text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors py-1 border-b-2 ${
                  location.pathname === link.path
                    ? 'border-saffron-600 text-saffron-700 font-bold'
                    : 'border-transparent hover:text-forest-700 hover:border-forest-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`tel:${CLINIC.phone}`}
              className="flex items-center space-x-1.5 font-sans text-xs font-semibold text-forest-800 bg-forest-50 px-3 py-2 rounded-lg border border-forest-200 hover:bg-forest-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-saffron-600" />
              <span>{CLINIC.phone}</span>
            </a>

            <Link
              to="/book"
              className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-sans text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4 text-amber-200" />
              <span>Book Now</span>
            </Link>

            {admin && (
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-1 text-xs font-sans font-semibold text-forest-700 border border-forest-600 px-3 py-2 rounded-lg hover:bg-forest-50"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Portal</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link
              to="/book"
              className="bg-saffron-600 text-white text-xs font-sans font-bold px-3 py-2 rounded-lg shadow"
            >
              Book Now
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-forest-900 p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-saffron-200 px-4 pt-3 pb-6 space-y-3 shadow-xl font-sans text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block font-semibold py-2 px-3 rounded-lg ${
                location.pathname === link.path
                  ? 'bg-saffron-50 text-saffron-700 font-bold'
                  : 'text-slate-700 hover:bg-forest-50 hover:text-forest-700'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <a
              href={`tel:${CLINIC.phone}`}
              className="flex items-center space-x-2 text-sm font-semibold text-forest-800"
            >
              <Phone className="w-4 h-4 text-saffron-600" />
              <span>Call: {CLINIC.phone}</span>
            </a>
            {admin && (
              <Link to="/admin/dashboard" className="text-xs font-semibold text-forest-700 pt-1">
                Go to Admin Doctor Portal →
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
