import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, FileText, CheckCircle } from 'lucide-react';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { CLINIC } from '../constants/clinic';

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: 'Male',
    date: '',
    timeSlot: '09:30 AM',
    reason: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone || !formData.date || !formData.reason) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/appointments/book', formData);
      setSuccessMsg(res.data);
      toast.success('Appointment booked successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to book appointment.');
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-herbal-gold/30">
        
        {/* Modal Header */}
        <div className="bg-herbal-dark text-white p-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold font-serif text-white">Book Appointment</h3>
            <p className="text-xs text-herbal-gold">{CLINIC.doctor} — {CLINIC.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {successMsg ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle className="w-16 h-16 text-siddha-600 mx-auto" />
              <h4 className="text-xl font-bold text-herbal-dark">Appointment Confirmed!</h4>
              <p className="text-sm text-slate-600">
                Thank you <strong>{successMsg.patient?.name}</strong>. Your appointment request for <strong>{new Date(successMsg.date).toLocaleDateString()}</strong> at <strong>{successMsg.timeSlot}</strong> has been registered.
              </p>
              <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                Clinic Address: {CLINIC.address.full}
              </p>
              <button
                onClick={() => {
                  setSuccessMsg(null);
                  onClose();
                }}
                className="w-full bg-herbal-dark text-white py-2.5 rounded-lg font-semibold shadow hover:bg-siddha-900 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Murugan"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500 focus:border-siddha-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+9196774..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500 focus:border-siddha-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Age / Gender
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-1/2 px-2 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                    />
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-1/2 px-2 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Health Concern / Speciality *
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                  required
                >
                  <option value="">Select Primary Concern...</option>
                  <option value="Kidney Stones / Internal Stones">Kidney Stones / Gallstones</option>
                  <option value="Uterine Fibroids / Women's Wellness">Uterine Fibroids / Women's Wellness</option>
                  <option value="Chronic Joint Pain / Back Pain">Chronic Joint Pain / Back Pain</option>
                  <option value="Diabetes / Blood Pressure">Diabetes / Blood Pressure</option>
                  <option value="Long-standing Skin Conditions">Long-standing Skin Conditions / Allergies</option>
                  <option value="General Siddha Naadi Consultation">General Siddha Naadi Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Additional Medical Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your symptoms..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-herbal-dark hover:bg-siddha-900 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? 'Booking Appointment...' : 'Confirm Appointment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
