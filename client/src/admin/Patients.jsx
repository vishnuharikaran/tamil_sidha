import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Users, Search, Plus, Phone, Mail, MapPin, Calendar, FileText, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    bloodGroup: 'O+',
  });

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/patients${search ? `?search=${search}` : ''}`);
      setPatients(res.data);
    } catch (err) {
      toast.error('Failed to load patients.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await API.post('/patients', formData);
      toast.success('Patient registered successfully!');
      setShowAddModal(false);
      setFormData({ name: '', age: '', gender: 'Male', phone: '', email: '', address: '', bloodGroup: 'O+' });
      fetchPatients();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create patient.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-herbal-dark">Patients Directory</h1>
          <p className="text-xs text-slate-500">Manage registered patient profiles and visit history.</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-siddha-500"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-herbal-dark hover:bg-siddha-900 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-herbal-gold" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      {/* Patient Cards Grid */}
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading patients list...</div>
      ) : patients.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
          No patients found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold font-serif text-herbal-dark">{patient.name}</h3>
                  <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {patient.gender}, {patient.age} Yrs {patient.bloodGroup ? `| ${patient.bloodGroup}` : ''}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-siddha-100 text-siddha-800 flex items-center justify-center font-bold text-sm">
                  {patient.name.charAt(0)}
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-siddha-600" />
                  <span className="font-mono font-medium text-slate-800">{patient.phone}</span>
                </div>
                {patient.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-siddha-600" />
                    <span>{patient.email}</span>
                  </div>
                )}
                {patient.address && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-siddha-600 shrink-0 mt-0.5" />
                    <span className="truncate">{patient.address}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span>{patient.records?.length || 0} Medical Records</span>
                <span>{patient.appointments?.length || 0} Appointments</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-amber-900/20">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold font-serif text-herbal-dark">Register New Patient</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Patient Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    placeholder="35"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-2 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Blood</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-2 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                  >
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Address</label>
                <input
                  type="text"
                  placeholder="City, District..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-siddha-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-herbal-dark text-white font-semibold py-2.5 rounded-lg shadow hover:bg-siddha-900 transition-colors text-xs"
              >
                Register Patient
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Patients;
