import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Calendar, Search, Filter, Trash2, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      let url = '/appointments?';
      if (statusFilter) url += `status=${statusFilter}&`;
      if (dateFilter) url += `date=${dateFilter}&`;
      if (search) url += `search=${search}&`;

      const res = await API.get(url);
      setAppointments(res.data.data || res.data);
    } catch (err) {
      toast.error('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, dateFilter, search]);

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
    if (!window.confirm('Delete this appointment?')) return;
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
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-forest-900">Appointments Manager</h1>
          <p className="text-xs font-sans text-slate-500">Track and update patient appointment statuses.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto font-sans text-xs">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search name/phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
            />
          </div>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600 bg-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 font-sans text-xs">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 font-sans text-xs">
          No appointments found matching your filters.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time Slot</th>
                  <th className="p-4">Health Reason</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{app.patient?.name}</div>
                      <span className="text-slate-500 text-[11px]">{app.patient?.gender}, {app.patient?.age} Yrs</span>
                    </td>
                    <td className="p-4 text-slate-700 font-mono">{app.patient?.phone}</td>
                    <td className="p-4 font-semibold text-slate-800">
                      {new Date(app.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold text-saffron-700">{app.timeSlot}</td>
                    <td className="p-4 max-w-xs">
                      <div className="font-medium text-slate-800">{app.reason}</div>
                      {app.notes && <p className="text-slate-500 text-[11px] italic mt-0.5">{app.notes}</p>}
                    </td>
                    <td className="p-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
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
                    <td className="p-4 text-right space-x-2">
                      <Link
                        to={`/admin/records/new?patientId=${app.patientId}&appointmentId=${app.id}`}
                        className="inline-flex items-center space-x-1 bg-forest-50 text-forest-800 hover:bg-forest-100 px-2.5 py-1 rounded-lg border border-forest-200 font-bold text-[11px]"
                        title="Create EHR Record"
                      >
                        <FileText className="w-3.5 h-3.5 text-saffron-600" />
                        <span>Create EHR</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50"
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
