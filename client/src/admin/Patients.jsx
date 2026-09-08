import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Users, Search, Plus, Phone, Mail, MapPin, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      setPatients(res.data.data || res.data);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4 font-sans text-xs">
        <div>
          <h1 className="text-2xl font-bold font-serif text-forest-900">Patients Directory</h1>
          <p className="text-slate-500">Manage registered patient profiles and full visit history.</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-200" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      {/* Patient Cards Grid */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 font-sans text-xs">Loading patients list...</div>
      ) : patients.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 font-sans text-xs">
          No patients found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans text-xs">
          {patients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-forest-900">{patient.name}</h3>
                    <span className="text-xs font-semibold text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                      {patient.gender}, {patient.age} Yrs {patient.bloodGroup ? `| ${patient.bloodGroup}` : ''}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-forest-700 text-amber-200 flex items-center justify-center font-bold text-sm">
                    {patient.name.charAt(0)}
                  </div>
                </div>

                <div className="space-y-2 text-slate-600 border-t border-slate-100 pt-3 mt-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-saffron-600" />
                    <span className="font-mono font-bold text-slate-800">{patient.phone}</span>
                  </div>
                  {patient.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-saffron-600" />
                      <span>{patient.email}</span>
                    </div>
                  )}
                  {patient.address && (
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-saffron-600 shrink-0 mt-0.5" />
                      <span className="truncate">{patient.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-slate-500">
                <span>{patient.records?.length || 0} Medical Records</span>
                <Link
                  to={`/admin/patients/${patient.id}`}
                  className="font-bold text-saffron-700 hover:text-saffron-800 flex items-center space-x-1"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-sans text-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-saffron-600/30">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold font-serif text-forest-900">Register New Patient</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-4 pt-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Patient Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    placeholder="35"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Blood</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
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
                <label className="block font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+9196774..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Address</label>
                <input
                  type="text"
                  placeholder="City, District..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider py-2.5 rounded-lg shadow transition-colors"
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
