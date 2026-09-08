import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';
import { User, Phone, Mail, MapPin, Calendar, FileText, Download, ArrowLeft, Save, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { generatePrescriptionPDF } from '../utils/pdfGenerator';

const PatientProfile = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editable form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    bloodGroup: '',
  });

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/patients/${id}/history`);
      const data = res.data.data || res.data;
      setPatientData(data);

      const p = data.patient;
      if (p) {
        setFormData({
          name: p.name || '',
          age: p.age ? p.age.toString() : '',
          gender: p.gender || 'Male',
          phone: p.phone || '',
          email: p.email || '',
          address: p.address || '',
          bloodGroup: p.bloodGroup || '',
        });
      }
    } catch (err) {
      toast.error('Failed to load patient profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.put(`/patients/${id}`, formData);
      toast.success('Patient details updated successfully!');
      fetchProfile();
    } catch (err) {
      toast.error('Failed to update patient details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-sans text-xs">Loading patient profile...</div>;
  }

  if (!patientData || !patientData.patient) {
    return <div className="p-8 text-center text-slate-500 font-sans text-xs">Patient record not found.</div>;
  }

  const { patient, appointments, medicalRecords } = patientData;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-4">
          <Link to="/admin/patients" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif text-forest-900">{patient.name}</h1>
            <p className="text-xs font-sans text-slate-500">Patient ID: {patient.id}</p>
          </div>
        </div>

        <Link
          to={`/admin/records/new?patientId=${patient.id}`}
          className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-sans text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          <Plus className="w-4 h-4 text-amber-200" />
          <span>New EHR Record</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans text-xs">
        
        {/* Left Col: Editable Demographics */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold font-serif text-forest-900 border-b border-slate-100 pb-3">Patient Demographics</h3>

          <form onSubmit={handleUpdatePatient} className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Age *</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-2 py-2 border border-slate-300 rounded-xl"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Blood</label>
                <input
                  type="text"
                  placeholder="O+"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Residential Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-forest-800 hover:bg-forest-900 text-white font-bold uppercase tracking-wider py-2.5 rounded-xl shadow transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4 text-amber-200" />
              <span>{saving ? 'Saving...' : 'Save Patient Changes'}</span>
            </button>
          </form>
        </div>

        {/* Right Col: Visit Timeline & EHR Records */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* EHR Records Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-forest-900 border-b border-slate-100 pb-3">Siddha Medical Records ({medicalRecords?.length || 0})</h3>

            {!medicalRecords || medicalRecords.length === 0 ? (
              <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl">No medical records created for this patient yet.</div>
            ) : (
              <div className="space-y-4">
                {medicalRecords.map((rec) => (
                  <div key={rec.id} className="p-4 rounded-xl border border-slate-200 bg-cream-50/50 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-forest-900 font-serif text-sm block">Diagnosis: {rec.diagnosis}</span>
                        <span className="text-[11px] text-slate-500">
                          Visit Date: {new Date(rec.visitDate).toLocaleDateString()} | Naadi: <strong>{rec.naadi}</strong>
                        </span>
                      </div>
                      <button
                        onClick={() => generatePrescriptionPDF({ ...rec, patient })}
                        className="flex items-center space-x-1 text-xs font-bold text-saffron-700 bg-white px-3 py-1.5 rounded-lg border border-saffron-300 shadow-sm hover:bg-saffron-50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-700 bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                      <strong className="block text-slate-900 font-bold uppercase text-[10px]">Prescribed Siddha Formulations:</strong>
                      {rec.prescriptions?.map((p, idx) => (
                        <div key={idx} className="flex justify-between font-mono">
                          <span>{p.medicineName} ({p.formulation})</span>
                          <span>{p.dosage} — {p.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appointments Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-forest-900 border-b border-slate-100 pb-3">Visit History Timeline ({appointments?.length || 0})</h3>

            {!appointments || appointments.length === 0 ? (
              <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl">No past appointments recorded.</div>
            ) : (
              <div className="space-y-3">
                {appointments.map((app) => (
                  <div key={app.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">{app.reason}</span>
                      <span className="text-[11px] text-slate-500">
                        {new Date(app.date).toLocaleDateString()} at {app.timeSlot}
                      </span>
                    </div>
                    <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default PatientProfile;
