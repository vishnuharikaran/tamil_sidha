import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { FileText, Plus, Download, User, Activity, Feather, CheckCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { generatePrescriptionPDF } from '../utils/pdfGenerator';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await API.get('/records');
      setRecords(res.data.data || res.data);
    } catch (err) {
      toast.error('Failed to load medical records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4 font-sans text-xs">
        <div>
          <h1 className="text-2xl font-bold font-serif text-forest-900">Siddha EHR Medical Records</h1>
          <p className="text-slate-500">View classical Naadi diagnostic records and export PDF prescriptions.</p>
        </div>

        <Link
          to="/admin/records/new"
          className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-200" />
          <span>New Prescription Record</span>
        </Link>
      </div>

      {/* Records Listing */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 font-sans text-xs">Loading medical records...</div>
      ) : records.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 font-sans text-xs space-y-4">
          <p>No medical records found in the database.</p>
          <Link
            to="/admin/records/new"
            className="inline-flex items-center space-x-2 bg-saffron-600 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase"
          >
            <span>Create First Prescription</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((rec) => (
            <div key={rec.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 font-sans text-xs">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-4 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold font-serif text-forest-900">{rec.patient?.name}</span>
                    <span className="text-xs font-mono bg-forest-100 text-forest-800 px-2 py-0.5 rounded font-bold">
                      Naadi: {rec.naadi}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Visit Date: {new Date(rec.visitDate).toLocaleDateString()} | Phone: {rec.patient?.phone}
                  </span>
                </div>

                <button
                  onClick={() => generatePrescriptionPDF(rec)}
                  className="inline-flex items-center space-x-2 bg-cream-100 hover:bg-cream-200 text-forest-900 text-xs font-bold px-3.5 py-2 rounded-xl border border-cream-300 transition-colors shadow-sm self-start sm:self-auto uppercase tracking-wider"
                >
                  <Download className="w-4 h-4 text-saffron-600" />
                  <span>Download PDF Prescription</span>
                </button>
              </div>

              {/* Diagnosis Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-cream-50 p-3.5 rounded-xl border border-cream-200">
                  <strong className="text-forest-900 block font-serif mb-1">Clinical Diagnosis:</strong>
                  <p className="text-slate-800 font-semibold">{rec.diagnosis}</p>
                  {rec.naadiFinding && <p className="text-slate-500 mt-1 italic text-[11px]">Naadi Observation: {rec.naadiFinding}</p>}
                </div>

                <div className="bg-cream-50 p-3.5 rounded-xl border border-cream-200">
                  <strong className="text-forest-900 block font-serif mb-1">Urine Analysis:</strong>
                  <p className="text-slate-700">Neerkuri: {rec.neerkuri || 'Clear amber'}</p>
                  <p className="text-slate-700">Neikkuri: {rec.neikkuri || 'Pearl ring spread'}</p>
                </div>
              </div>

              {/* Prescriptions Table */}
              <div>
                <h4 className="font-bold text-slate-600 uppercase text-[11px] mb-2">Prescribed Siddha Medicines ({rec.prescriptions?.length})</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                    <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[11px]">
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

    </div>
  );
};

export default MedicalRecords;
