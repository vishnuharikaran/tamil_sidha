import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Calendar, Search, Filter, CheckCircle, Clock, XCircle, AlertCircle, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/appointments${statusFilter ? `?status=${statusFilter}` : ''}`);
      setAppointments(res.data);
    } catch (err) {
      toast.error('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/appointments/${id}/status`, { status: newStatus });
      toast.success(`Appointment status updated to ${newStatus}`);
      fetchAppointments();
    } catch (err) {
      toast.error('Failed to update appointment status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await API.delete(`/appointments/${id}`);
      toast.success('Appointment deleted.');
      fetchAppointments();
    } catch (err) {
      toast.error('Failed to delete appointment.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-herbal-dark">Appointments Manager</h1>
          <p className="text-xs text-slate-500">Track and schedule patient visits at Tamil Siddha Clinic.</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Filter className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-siddha-500 bg-white"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
          No appointments found matching current filter.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Health Reason</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-sm">{app.patient?.name}</div>
                      <span className="text-slate-400 text-xs">{app.patient?.gender}, {app.patient?.age} yrs</span>
                    </td>
                    <td className="p-4 text-slate-700 font-mono">{app.patient?.phone}</td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">
                        {new Date(app.date).toLocaleDateString()}
                      </div>
                      <span className="text-amber-800 text-xs">{app.timeSlot}</span>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-medium text-slate-800">{app.reason}</div>
                      {app.notes && <p className="text-slate-500 text-xs italic mt-0.5">{app.notes}</p>}
                    </td>
                    <td className="p-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border border-transparent cursor-pointer ${
                          app.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : app.status === 'CONFIRMED'
                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                            : app.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50"
                        title="Delete Appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Appointments;
