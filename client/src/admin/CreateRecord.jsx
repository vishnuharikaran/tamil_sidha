import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';
import { FileText, Plus, Download, Save, ArrowLeft, Trash2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { CLINIC } from '../constants/clinic';
import { generatePrescriptionPDF } from '../utils/pdfGenerator';

const CreateRecord = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryPatientId = searchParams.get('patientId') || '';
  const queryAppointmentId = searchParams.get('appointmentId') || '';

  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [saving, setSaving] = useState(false);
  const [createdRecord, setCreatedRecord] = useState(null);

  // Form State
  const [selectedPatientId, setSelectedPatientId] = useState(queryPatientId);
  const [appointmentId, setAppointmentId] = useState(queryAppointmentId);
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Section 1: Siddha Diagnostics
  const [naadi, setNaadi] = useState('VATHAM');
  const [naadiFinding, setNaadiFinding] = useState('');
  const [neerkuri, setNeerkuri] = useState('');
  const [neikkuri, setNeikkuri] = useState('');
  
  const [ennVagai, setEnnVagai] = useState({
    Tongue: 'Coated pale',
    Skin: 'Dry',
    Color: 'Normal',
    Voice: 'Clear',
    Eyes: 'Clear',
    Stool: 'Regular',
    Urine: 'Amber yellow',
    Pulse: '76 bpm, Vatham dominant',
  });

  // Section 2: Diagnosis & Prescription
  const [diagnosis, setDiagnosis] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [prescriptions, setPrescriptions] = useState([
    { formulation: 'CHOORNAM', medicineName: 'Amukkara Choornam', dosage: '2g twice daily', duration: '15 Days', instructions: 'With warm water' },
    { formulation: 'KUDINEER', medicineName: 'Nandukkal Kudineer', dosage: '50ml twice daily', duration: '15 Days', instructions: 'Before food' }
  ]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get('/patients');
        const list = res.data.data || res.data;
        setPatients(list);
        if (!selectedPatientId && list.length > 0) {
          setSelectedPatientId(list[0].id);
        }
      } catch (err) {
        toast.error('Failed to load patient dropdown list.');
      } finally {
        setLoadingPatients(false);
      }
    };
    fetchPatients();
  }, []);

  const addPrescriptionRow = () => {
    setPrescriptions([
      ...prescriptions,
      { formulation: 'KUDINEER', medicineName: '', dosage: '50ml twice daily', duration: '10 Days', instructions: 'Before food' }
    ]);
  };

  const removePrescriptionRow = (idx) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== idx));
  };

  const handlePrescriptionChange = (idx, field, value) => {
    const updated = [...prescriptions];
    updated[idx][field] = value;
    setPrescriptions(updated);
  };

  const handleEnnVagaiChange = (field, value) => {
    setEnnVagai({ ...ennVagai, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId || !naadi || !diagnosis) {
      toast.error('Please select patient, Naadi, and enter Diagnosis.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        patientId: selectedPatientId,
        appointmentId: appointmentId || null,
        visitDate,
        naadi,
        naadiFinding: naadiFinding || null,
        neerkuri: neerkuri || null,
        neikkuri: neikkuri || null,
        ennVagai,
        diagnosis,
        followUpDate: followUpDate || null,
        prescriptions,
      };

      const res = await API.post('/records', payload);
      const saved = res.data.data || res.data;
      setCreatedRecord(saved);
      toast.success('Siddha Medical Record & Prescriptions saved!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save medical record.');
    } finally {
      setSaving(false);
    }
  };

  const selectedPatientObj = patients.find(p => p.id === selectedPatientId);

  return (
    <div className="space-y-6 font-serif">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 font-sans">
        <div className="flex items-center space-x-4">
          <Link to="/admin/records" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif text-forest-900">Create Siddha EHR Prescription Record</h1>
            <p className="text-xs text-slate-500">Record 3-section Siddha diagnostic examination and prescriptions.</p>
          </div>
        </div>
      </div>

      {createdRecord ? (
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-forest-600 text-center space-y-6 font-sans">
          <div className="w-20 h-20 bg-forest-100 text-forest-800 rounded-full flex items-center justify-center text-4xl mx-auto border-2 border-forest-600">
            ✓
          </div>
          <h2 className="text-3xl font-bold font-serif text-forest-900">Medical Record Saved Successfully!</h2>
          <p className="text-slate-700 text-sm">
            Record created for <strong>{createdRecord.patient?.name || selectedPatientObj?.name}</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => generatePrescriptionPDF({ ...createdRecord, patient: createdRecord.patient || selectedPatientObj })}
              className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow transition-all"
            >
              <Download className="w-4 h-4 text-amber-200" />
              <span>Download PDF Prescription</span>
            </button>

            <button
              onClick={() => navigate('/admin/records')}
              className="flex items-center space-x-2 bg-forest-800 hover:bg-forest-900 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow transition-all"
            >
              <span>View All Records</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 font-sans text-xs">
          
          {/* Patient Selection Banner */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-serif text-forest-900">Patient & Visit Date</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Select Patient *</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                  required
                >
                  <option value="">Choose Patient...</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.phone}) — {p.gender}, {p.age} Yrs
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Visit Date *</label>
                <input
                  type="date"
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                />
              </div>
            </div>
          </div>

          {/* SECTION 1 — SIDDHA DIAGNOSTICS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-lg font-bold font-serif text-forest-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-saffron-600 text-white flex items-center justify-center text-xs font-bold font-sans">1</span>
              <span>SECTION 1 — SIDDHA DIAGNOSTICS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Naadi Humor Diagnosis *</label>
                <select
                  value={naadi}
                  onChange={(e) => setNaadi(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600 font-bold text-forest-900"
                  required
                >
                  {CLINIC.naadis.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Naadi Pulse Findings</label>
                <input
                  type="text"
                  placeholder="Elevated Pitham indicating internal heat..."
                  value={naadiFinding}
                  onChange={(e) => setNaadiFinding(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Neerkuri (Urine Color/Sediment Test)</label>
                <input
                  type="text"
                  placeholder="Clear amber color with mild cloudiness..."
                  value={neerkuri}
                  onChange={(e) => setNeerkuri(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Neikkuri (Oil Droplet Spread Test)</label>
                <input
                  type="text"
                  placeholder="Oil droplet spreads into pearl ring shape..."
                  value={neikkuri}
                  onChange={(e) => setNeikkuri(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            {/* Enn Vagai Thervu (8 Fields) */}
            <div className="bg-cream-50/70 p-5 rounded-2xl border border-saffron-600/20 space-y-3">
              <h4 className="font-bold font-serif text-forest-900 text-sm">Enn Vagai Thervu (8-Fold Examination)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CLINIC.ennVagaiFields.map((field) => (
                  <div key={field}>
                    <label className="block font-bold text-[11px] text-slate-700 uppercase mb-1">{field}</label>
                    <input
                      type="text"
                      value={ennVagai[field] || ''}
                      onChange={(e) => handleEnnVagaiChange(field, e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2 — DIAGNOSIS & PRESCRIPTION */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-lg font-bold font-serif text-forest-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-saffron-600 text-white flex items-center justify-center text-xs font-bold font-sans">2</span>
              <span>SECTION 2 — DIAGNOSIS & PRESCRIPTION</span>
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Clinical Diagnosis *</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Renal Calculi (Kidney Stones) with Pitha-Kapha imbalance"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
              ></textarea>
            </div>

            {/* Dynamic Prescription Rows */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold font-serif text-forest-900 text-sm">Prescribed Medicines</h4>
                <button
                  type="button"
                  onClick={addPrescriptionRow}
                  className="flex items-center space-x-1 text-saffron-700 font-bold hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Medicine Row</span>
                </button>
              </div>

              {prescriptions.map((p, idx) => (
                <div key={idx} className="flex flex-wrap md:flex-nowrap gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <select
                    value={p.formulation}
                    onChange={(e) => handlePrescriptionChange(idx, 'formulation', e.target.value)}
                    className="px-2.5 py-2 border border-slate-300 rounded-lg text-xs font-bold text-forest-900 bg-white"
                  >
                    {CLINIC.siddhaFormulations.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    required
                    placeholder="Medicine Name (e.g. Amukkara Choornam)"
                    value={p.medicineName}
                    onChange={(e) => handlePrescriptionChange(idx, 'medicineName', e.target.value)}
                    className="flex-1 min-w-[150px] px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />

                  <input
                    type="text"
                    required
                    placeholder="Dosage (2g twice daily)"
                    value={p.dosage}
                    onChange={(e) => handlePrescriptionChange(idx, 'dosage', e.target.value)}
                    className="w-36 px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />

                  <input
                    type="text"
                    required
                    placeholder="Duration (15 Days)"
                    value={p.duration}
                    onChange={(e) => handlePrescriptionChange(idx, 'duration', e.target.value)}
                    className="w-28 px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />

                  <input
                    type="text"
                    placeholder="Instructions (With warm milk)"
                    value={p.instructions || ''}
                    onChange={(e) => handlePrescriptionChange(idx, 'instructions', e.target.value)}
                    className="w-44 px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  />

                  {prescriptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePrescriptionRow(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Follow-up Visit Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full max-w-xs px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* SECTION 3 — SAVE & PRINT */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-forest-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-saffron-600 text-white flex items-center justify-center text-xs font-bold font-sans">3</span>
              <span>SECTION 3 — SAVE & PRINT</span>
            </h3>

            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-xs"
              >
                <Save className="w-4 h-4 text-amber-200" />
                <span>{saving ? 'Saving to Database...' : 'Save Medical Record & Generate Prescription'}</span>
              </button>
            </div>
          </div>

        </form>
      )}

    </div>
  );
};

export default CreateRecord;
