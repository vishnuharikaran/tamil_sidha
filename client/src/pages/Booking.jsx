import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, CheckCircle, ArrowRight, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { CLINIC } from '../constants/clinic';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [slotsData, setSlotsData] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    age: '35',
    gender: 'Male',
    reason: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '',
    notes: '',
  });

  // Fetch available slots whenever date changes in Step 2
  const fetchSlots = async (selectedDate) => {
    setLoadingSlots(true);
    try {
      const res = await API.get(`/appointments/slots/${selectedDate}`);
      setSlotsData(res.data.data);
    } catch (err) {
      toast.error('Failed to load available time slots.');
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (step === 2 && formData.date) {
      fetchSlots(formData.date);
    }
  }, [step, formData.date]);

  const handleStep1Next = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone || !formData.reason) {
      toast.error('Please fill in patient name, phone, and health concern.');
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    if (!formData.timeSlot) {
      toast.error('Please select a 30-minute appointment time slot.');
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await API.post('/appointments', formData);
      setBookingSuccess(res.data.data || res.data);
      toast.success('Appointment booked successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Failed to book appointment.';
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const isSunday = (dateStr) => {
    const d = new Date(dateStr);
    return d.getDay() === 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-serif">
      <Navbar />

      {/* Header */}
      <div className="bg-forest-900 text-white py-12 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-saffron-400 block">Online Booking</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-tamil text-white">
            Schedule Appointment
          </h1>
          <p className="text-slate-300 font-serif text-sm max-w-xl mx-auto">
            Consult Dr. Sakthi Vadivu at Tamil Siddha Clinic, Viluppuram.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 flex-1 w-full">

        {/* Success Screen */}
        {bookingSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-forest-600 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-forest-100 text-forest-800 rounded-full flex items-center justify-center text-4xl mx-auto border-2 border-forest-600">
              ✓
            </div>
            <h2 className="text-3xl font-bold font-serif text-forest-900">Appointment Confirmed!</h2>
            <p className="text-slate-700 text-sm">
              Thank you <strong>{bookingSuccess.patient?.name || formData.patientName}</strong>. Your appointment request has been successfully registered.
            </p>

            <div className="bg-cream-50 p-6 rounded-2xl border border-saffron-600/30 text-left space-y-3 font-sans text-xs text-slate-800 max-w-md mx-auto">
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-slate-500 uppercase font-semibold">Doctor</span>
                <span className="font-bold text-forest-900">{CLINIC.doctor}</span>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-slate-500 uppercase font-semibold">Date & Time</span>
                <span className="font-bold text-saffron-700">
                  {new Date(bookingSuccess.date || formData.date).toLocaleDateString()} at {bookingSuccess.timeSlot || formData.timeSlot}
                </span>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-slate-500 uppercase font-semibold">Health Concern</span>
                <span className="font-bold text-slate-900">{bookingSuccess.reason || formData.reason}</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-500 uppercase font-semibold block mb-1">Clinic Address</span>
                <span className="font-semibold text-forest-900">{CLINIC.address.full}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setBookingSuccess(null);
                setStep(1);
                setFormData({
                  patientName: '',
                  phone: '',
                  age: '35',
                  gender: 'Male',
                  reason: '',
                  date: new Date().toISOString().split('T')[0],
                  timeSlot: '',
                  notes: '',
                });
              }}
              className="bg-forest-800 hover:bg-forest-900 text-white font-sans text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-xl shadow transition-all"
            >
              Book Another Appointment
            </button>
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-saffron-600/30 space-y-8">
            
            {/* Step Indicators */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-6 font-sans text-xs">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-saffron-700 font-bold' : 'text-slate-400'}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-saffron-600 text-white' : 'bg-slate-100'}`}>1</span>
                <span>Patient Info</span>
              </div>
              <div className="h-0.5 flex-1 mx-4 bg-slate-200"></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-saffron-700 font-bold' : 'text-slate-400'}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-saffron-600 text-white' : 'bg-slate-100'}`}>2</span>
                <span>Date & Slot</span>
              </div>
              <div className="h-0.5 flex-1 mx-4 bg-slate-200"></div>
              <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-saffron-700 font-bold' : 'text-slate-400'}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? 'bg-saffron-600 text-white' : 'bg-slate-100'}`}>3</span>
                <span>Confirm</span>
              </div>
            </div>

            {/* Step 1: Patient Details */}
            {step === 1 && (
              <form onSubmit={handleStep1Next} className="space-y-5 font-sans text-xs">
                <h3 className="text-xl font-bold font-serif text-forest-900">Step 1: Patient Details</h3>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Full Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Murugan"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Age *</label>
                    <input
                      type="number"
                      required
                      placeholder="35"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Primary Reason for Visit *</label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                    required
                  >
                    <option value="">Select Speciality / Health Issue...</option>
                    <option value="Kidney Stones / Internal Stones">Internal Stones (Kidney / Gallbladder)</option>
                    <option value="Uterine Fibroids / Women's Wellness">Women's Health (Uterine Fibroids)</option>
                    <option value="Chronic Joint Pain / Back Pain">Chronic Illness (Joint / Back Pain)</option>
                    <option value="Diabetes / Blood Pressure">Diabetes / High Blood Pressure</option>
                    <option value="Long-standing Skin Conditions">Dermatology / Skin Allergies</option>
                    <option value="General Siddha Naadi Consultation">General Siddha Naadi Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Additional Symptoms / Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Mention any existing medication or symptoms..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow transition-all text-xs"
                  >
                    <span>Proceed to Select Date & Time</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Date & Available Slots */}
            {step === 2 && (
              <div className="space-y-6 font-sans text-xs">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold font-serif text-forest-900">Step 2: Pick Appointment Slot</h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-slate-500 hover:text-forest-900 flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Patient Info</span>
                  </button>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Select Visit Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value, timeSlot: '' })}
                    className="w-full max-w-xs px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                  />
                </div>

                {/* Operating hours indicator */}
                {isSunday(formData.date) ? (
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex items-center space-x-2 text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span><strong>Sunday Operating Hours:</strong> Strictly limited to <strong>11:00 AM – 01:00 PM</strong> (4 slots).</span>
                  </div>
                ) : (
                  <div className="bg-forest-50 border border-forest-200 rounded-xl p-3.5 flex items-center space-x-2 text-forest-900">
                    <Clock className="w-4 h-4 text-forest-700 shrink-0" />
                    <span><strong>Mon – Sat Operating Hours:</strong> <strong>09:00 AM – 09:00 PM</strong> (30-minute intervals).</span>
                  </div>
                )}

                {/* Slots Grid */}
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-3">Available 30-Minute Time Slots</label>
                  {loadingSlots ? (
                    <div className="p-8 text-center text-slate-500">Fetching available slots...</div>
                  ) : !slotsData || slotsData.slots.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl">No slots available for this date.</div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {slotsData.slots.map((s) => {
                        const isSelected = formData.timeSlot === s.slot;
                        return (
                          <button
                            key={s.slot}
                            type="button"
                            disabled={!s.isAvailable}
                            onClick={() => setFormData({ ...formData, timeSlot: s.slot })}
                            className={`p-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                              !s.isAvailable
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                                : isSelected
                                ? 'bg-saffron-600 text-white border-saffron-600 shadow-md font-bold'
                                : 'bg-white text-slate-800 border-slate-300 hover:border-saffron-600 hover:bg-saffron-50'
                            }`}
                          >
                            {s.slot}
                            {!s.isAvailable && <span className="block text-[9px] uppercase">Booked</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center space-x-1 text-slate-600 hover:text-forest-900 px-4 py-2.5 rounded-xl border border-slate-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStep2Next}
                    disabled={!formData.timeSlot}
                    className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow transition-all disabled:opacity-50"
                  >
                    <span>Confirm Booking Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm & Submit */}
            {step === 3 && (
              <div className="space-y-6 font-sans text-xs">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold font-serif text-forest-900">Step 3: Review & Confirm</h3>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-slate-500 hover:text-forest-900 flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Edit Date/Time</span>
                  </button>
                </div>

                <div className="bg-cream-50 p-6 rounded-2xl border border-saffron-600/30 space-y-3 text-slate-800">
                  <div className="flex justify-between border-b border-cream-200 pb-2">
                    <span className="text-slate-500 uppercase font-semibold">Patient Name</span>
                    <span className="font-bold text-forest-900 text-sm">{formData.patientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-cream-200 pb-2">
                    <span className="text-slate-500 uppercase font-semibold">Phone</span>
                    <span className="font-mono font-bold text-slate-900">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-cream-200 pb-2">
                    <span className="text-slate-500 uppercase font-semibold">Age / Gender</span>
                    <span className="font-semibold text-slate-900">{formData.age} Yrs / {formData.gender}</span>
                  </div>
                  <div className="flex justify-between border-b border-cream-200 pb-2">
                    <span className="text-slate-500 uppercase font-semibold">Appointment Date</span>
                    <span className="font-bold text-saffron-700 text-sm">{new Date(formData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-cream-200 pb-2">
                    <span className="text-slate-500 uppercase font-semibold">Selected Time Slot</span>
                    <span className="font-bold text-forest-900 text-sm">{formData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between border-b border-cream-200 pb-2">
                    <span className="text-slate-500 uppercase font-semibold">Health Concern</span>
                    <span className="font-semibold text-slate-900">{formData.reason}</span>
                  </div>
                  {formData.notes && (
                    <div>
                      <span className="text-slate-500 uppercase font-semibold block mb-0.5">Notes</span>
                      <span className="italic text-slate-700">{formData.notes}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center space-x-1 text-slate-600 hover:text-forest-900 px-4 py-2.5 rounded-xl border border-slate-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Change Slot</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={submitting}
                    className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50"
                  >
                    <span>{submitting ? 'Submitting...' : 'Submit & Book Visit'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Booking;
