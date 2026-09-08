import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { FileText, Plus, Download, User, Activity, Feather, CheckCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { CLINIC } from '../constants/clinic';
import { generatePrescriptionPDF } from '../utils/pdfGenerator';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [naadi, setNaadi] = useState('VATHAM');
  const [naadiFinding, setNaadiFinding] = useState('');
  const [neerkuri, setNeerkuri] = useState('');
  const [neikkuri, setNeikkuri] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  
  // Enn Vagai 8 fields
  const [ennVagai, setEnnVagai] = useState({
    Tongue: 'Normal',
    Skin: 'Normal',
    Color: 'Normal',
    Voice: 'Clear',
    Eyes: 'Clear',
    Stool: 'Regular',
    Urine: 'Clear',
    Pulse: 'Normal',
  });

  // Prescriptions array
  const [prescriptions, setPrescriptions] = useState([
    { formulation: 'CHOORNAM', medicineName: 'Amukkara Choornam', dosage: '2g twice daily', duration: '15 Days', instructions: 'With warm water' }
  ]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await API.get('/records');
      setRecords(res.data);
    } catch (err) {
      toast.error('Failed to load medical records.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await API.get('/patients');
      setPatients(res.data);
      if (res.data.length > 0) {
        setSelectedPatientId(res.data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
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

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    if (!selectedPatientId || !naadi || !diagnosis) {
      toast.error('Please select patient, Naadi, and enter Diagnosis.');
      return;
    }

    try {
      await API.post('/records', {
        patientId: selectedPatientId,
        naadi,
        naadiFinding,
        neerkuri,
        neikkuri,
        ennVagai,
        diagnosis,
        followUpDate: followUpDate || null,
        prescriptions,
      });

      toast.success('Medical Record & Prescription saved!');
      setShowCreateModal(false);
      fetchRecords();
    } catch (err) {
      toast.error('Failed to create medical record.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-herbal-dark">Siddha Medical Records & Prescriptions</h1>
          <p className="text-xs text-slate-500">Record Naadi diagnostics, Enn Vagai findings, and print prescriptions.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-herbal-dark hover:bg-siddha-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          <Plus className="w-4 h-4 text-herbal-gold" />
          <span>New Prescription Record</span>
        </button>
      </div>

      {/* Records Listing */}
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading medical records...</div>
      ) : records.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
          No medical records found. Create one using the button above.
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((rec) => (
            <div key={rec.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-4 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold font-serif text-herbal-dark">{rec.patient?.name}</span>
                    <span className="text-xs font-mono bg-siddha-100 text-siddha-800 px-2 py-0.5 rounded font-bold">
                      Naadi: {rec.naadi}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Visit Date: {new Date(rec.visitDate).toLocaleDateString()} | Phone: {rec.patient?.phone}
                  </span>
                </div>

                <button
                  onClick={() => generatePrescriptionPDF(rec)}
                  className="inline-flex items-center space-x-2 bg-herbal-sand hover:bg-amber-200 text-herbal-dark text-xs font-semibold px-3.5 py-2 rounded-xl border border-amber-300 transition-colors shadow-sm self-start sm:self-auto"
                >
                  <Download className="w-4 h-4 text-amber-800" />
                  <span>Download PDF Prescription</span>
                </button>
              </div>

              {/* Diagnosis Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#fbf9f4] p-3 rounded-xl border border-amber-900/10">
                  <strong className="text-herbal-dark block font-serif mb-1">Clinical Diagnosis:</strong>
                  <p className="text-slate-700 font-medium">{rec.diagnosis}</p>
                  {rec.naadiFinding && <p className="text-slate-500 mt-1 italic">Naadi Observation: {rec.naadiFinding}</p>}
                </div>

                <div className="bg-[#fbf9f4] p-3 rounded-xl border border-amber-900/10">
                  <strong className="text-herbal-dark block font-serif mb-1">Traditional Urine Analysis:</strong>
                  <p className="text-slate-700">Neerkuri: {rec.neerkuri || 'Normal amber'}</p>
                  <p className="text-slate-700">Neikkuri: {rec.neikkuri || 'Normal oil spread'}</p>
                </div>
              </div>

              {/* Prescriptions List */}
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase mb-2">Prescribed Medicines ({rec.prescriptions?.length})</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                    <thead className="bg-slate-100 text-slate-600 font-semibold uppercase">
                      <tr>
                        <th className="p-2.5">Formulation</th>
                        <th className="p-2.5">Medicine Name</th>
                        <th className="p-2.5">Dosage</th>
                        <th className="p-2.5">Duration</th>
                        <th className="p-2.5">Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {rec.prescriptions?.map((p) => (
                        <tr key={p.id}>
                          <td className="p-2.5">
                            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded">
                              {p.formulation}
                            </span>
                          </td>
                          <td className="p-2.5 font-bold text-slate-800">{p.medicineName}</td>
                          <td className="p-2.5 text-slate-700">{p.dosage}</td>
                          <td className="p-2.5 text-slate-700">{p.duration}</td>
                          <td className="p-2.5 text-slate-500 italic">{p.instructions || 'Standard dosing'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Create Medical Record Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 my-8 border border-herbal-gold/30">
            <h3 className="text-xl font-bold font-serif text-herbal-dark pb-3 border-b border-slate-100">
              Create Siddha Medical Record & Prescription
            </h3>

            <form onSubmit={handleCreateRecord} className="space-y-4 pt-4 text-xs">
              
              {/* Select Patient & Naadi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Select Patient *</label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-siddha-500"
                    required
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.phone})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Naadi Diagnosis *</label>
                  <select
                    value={naadi}
                    onChange={(e) => setNaadi(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-siddha-500"
                  >
                    {CLINIC.naadis.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Clinical Diagnosis *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kidney Stones (Renal Calculi) / Joint Pain"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-siddha-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Naadi Findings</label>
                  <input
                    type="text"
                    placeholder="Elevated Pitha Naadi..."
                    value={naadiFinding}
                    onChange={(e) => setNaadiFinding(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Prescriptions Section */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-herbal-dark font-serif text-sm">Siddha Medicines & Dosages</h4>
                  <button
                    type="button"
                    onClick={addPrescriptionRow}
                    className="text-siddha-700 hover:text-siddha-900 font-semibold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Medicine</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {prescriptions.map((p, idx) => (
                    <div key={idx} className="flex flex-wrap md:flex-nowrap gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <select
                        value={p.formulation}
                        onChange={(e) => handlePrescriptionChange(idx, 'formulation', e.target.value)}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                      >
                        {CLINIC.siddhaFormulations.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>

                      <input
                        type="text"
                        placeholder="Medicine Name (e.g. Amukkara Choornam)"
                        value={p.medicineName}
                        onChange={(e) => handlePrescriptionChange(idx, 'medicineName', e.target.value)}
                        className="flex-1 min-w-[140px] px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                        required
                      />

                      <input
                        type="text"
                        placeholder="Dosage (2g twice daily)"
                        value={p.dosage}
                        onChange={(e) => handlePrescriptionChange(idx, 'dosage', e.target.value)}
                        className="w-32 px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />

                      <input
                        type="text"
                        placeholder="Duration (15 Days)"
                        value={p.duration}
                        onChange={(e) => handlePrescriptionChange(idx, 'duration', e.target.value)}
                        className="w-24 px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />

                      {prescriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePrescriptionRow(idx)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 bg-herbal-dark text-white font-semibold py-2.5 rounded-xl shadow hover:bg-siddha-900 transition-colors"
                >
                  Save Record & Prescription
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 bg-slate-100 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MedicalRecords;
