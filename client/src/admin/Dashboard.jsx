import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Users, Calendar, AlertTriangle, MessageSquare, Clock, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/dashboard/stats');
        setStats(res.data.data || res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-sans text-xs">Loading Dashboard Analytics...</div>;
  }

  const weeklyData = stats?.weeklyAppointments || [
    { day: 'Mon', count: 2 },
    { day: 'Tue', count: 1 },
    { day: 'Wed', count: 0 },
    { day: 'Thu', count: 0 },
    { day: 'Fri', count: 0 },
    { day: 'Sat', count: 0 },
    { day: 'Sun', count: 0 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-forest-900">Clinical Dashboard</h1>
          <p className="text-xs font-sans text-slate-500">Real-time statistics for appointments, patients, and Siddha medicine inventory.</p>
        </div>
        <div className="flex space-x-3 font-sans">
          <Link
            to="/admin/records/new"
            className="flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow transition-colors"
          >
            <Plus className="w-4 h-4 text-amber-200" />
            <span>New Prescription</span>
          </Link>
          <Link
            to="/admin/appointments"
            className="flex items-center space-x-2 bg-cream-100 text-forest-900 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-cream-200 hover:bg-cream-200 transition-colors"
          >
            <Calendar className="w-4 h-4 text-saffron-600" />
            <span>Manage Appointments</span>
          </Link>
        </div>
      </div>

      {/* 5 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-sans">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Today's Visits</span>
            <p className="text-2xl font-bold font-serif text-forest-900 mt-1">{stats?.todayAppointments || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Pending</span>
            <p className="text-2xl font-bold font-serif text-amber-600 mt-1">{stats?.pendingCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Total Patients</span>
            <p className="text-2xl font-bold font-serif text-forest-900 mt-1">{stats?.totalPatients || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Low Stock Alerts</span>
            <p className="text-2xl font-bold font-serif text-rose-600 mt-1">{stats?.lowStockCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Unread Messages</span>
            <p className="text-2xl font-bold font-serif text-forest-900 mt-1">{stats?.unreadMessages || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Weekly Appointments Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold font-serif text-forest-900 mb-4">Weekly Appointments Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#C45508" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Appointments Quick View */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold font-serif text-forest-900">Today's Appointment Schedule</h3>
          <Link to="/admin/appointments" className="text-xs font-sans font-bold text-saffron-700 hover:underline flex items-center space-x-1">
            <span>View All Appointments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Time Slot</th>
                <th className="p-3">Health Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats?.todayAppointmentsList?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-500">No appointments scheduled for today yet.</td>
                </tr>
              ) : (
                stats?.recentAppointments?.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-800">{app.patient?.name}</td>
                    <td className="p-3 text-slate-600 font-mono">{app.patient?.phone}</td>
                    <td className="p-3 text-saffron-700 font-bold">{app.timeSlot}</td>
                    <td className="p-3 text-slate-700 max-w-xs truncate">{app.reason}</td>
                    <td className="p-3">
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/admin/records/new?patientId=${app.patientId}&appointmentId=${app.id}`}
                        className="text-forest-700 hover:text-forest-900 font-bold hover:underline"
                      >
                        Create EHR →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
