import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { MapPin, Phone, MessageCircle, Clock, Send } from 'lucide-react';
import { CLINIC } from '../constants/clinic';
import API from '../utils/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error('Please fill in name, phone, and message.');
      return;
    }

    setSending(true);
    try {
      await API.post('/contact', formData);
      toast.success('Thank you! Your message has been sent to Dr. Sakthi Vadivu.');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to submit message.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-serif">
      <Navbar />

      {/* Header */}
      <div className="bg-forest-900 text-white py-16 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-saffron-400 block">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-tamil text-white">
            Contact & Clinic Location
          </h1>
          <p className="text-slate-300 font-serif text-base max-w-2xl mx-auto">
            Reach out to Dr. Sakthi Vadivu or visit our clinic in Viluppuram.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Contact Info & Hours Table */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-tamil text-forest-900 mb-4">
                  Tamil Siddha Clinic
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-serif">
                  We are conveniently located at Gangai Square Road in Thanthai Periyar Nagar, Viluppuram. Patients can call or book an appointment online before visiting.
                </p>

                <div className="space-y-4 font-sans text-xs text-slate-800">
                  <div className="flex items-start space-x-3 bg-cream-50 p-4 rounded-2xl border border-cream-200">
                    <MapPin className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm font-serif text-forest-900">Clinic Address:</strong>
                      <span className="text-slate-700 leading-normal">{CLINIC.address.full}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-cream-50 p-4 rounded-2xl border border-cream-200">
                    <Phone className="w-5 h-5 text-saffron-600 shrink-0" />
                    <div>
                      <strong className="block text-sm font-serif text-forest-900">Phone Consultation:</strong>
                      <a href={`tel:${CLINIC.phone}`} className="font-bold text-saffron-700 text-sm hover:underline">{CLINIC.phone}</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours Table */}
              <div className="bg-cream-50 p-6 rounded-3xl border border-saffron-600/30">
                <h3 className="text-lg font-bold font-serif text-forest-900 mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-saffron-600" />
                  <span>Operating Hours</span>
                </h3>

                <div className="overflow-hidden rounded-xl border border-cream-200 bg-white font-sans text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-forest-900 text-white uppercase">
                      <tr>
                        <th className="p-3">Day</th>
                        <th className="p-3">Timing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-bold text-slate-800">Monday – Saturday</td>
                        <td className="p-3 font-semibold text-forest-800">09:00 AM – 09:00 PM</td>
                      </tr>
                      <tr className="bg-amber-50">
                        <td className="p-3 font-bold text-amber-900">Sunday</td>
                        <td className="p-3 font-bold text-saffron-700">11:00 AM – 01:00 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-saffron-600/30 h-64">
                <iframe
                  title="Tamil Siddha Clinic Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.7282869558485!2d79.4938!3d11.9401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU2JzI0LjQiTiA3OcKwMjknMzcuNyJF!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-6">
              <div className="siddha-card rounded-3xl p-8 bg-white space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-forest-900">Send an Inquiry</h3>
                  <p className="text-xs font-sans text-slate-600 mt-1">
                    Fill in the form below and Dr. Sakthi Vadivu's team will respond to your query.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kavitha Ramalingam"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+9196774..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 uppercase mb-1">Email Address (Optional)</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Message / Question *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Describe your health question or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider py-3.5 rounded-xl shadow flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sending ? 'Sending Message...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
