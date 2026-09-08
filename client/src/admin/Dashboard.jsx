import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Users, Calendar, AlertTriangle, MessageSquare, Clock, CheckCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/stats/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading Dashboard Analytics...</div>;
  }

  const appointmentData = [
    { name: 'Pending', count: stats?.appointmentsByStatus?.PENDING || 0, color: '#f59e0b' },
    { name: 'Confirmed', count: stats?.appointmentsByStatus?.CONFIRMED || 0, color: '#3b82f6' },
    { name: 'Completed', count: stats?.appointmentsByStatus?.COMPLETED || 0, color: '#10b981' },
    { name: 'Cancelled', count: stats?.appointmentsByStatus?.CANCELLED || 0, color: '#ef4444' },
  ];

  const formulationData = [
    { name: 'CHOORNAM', value: stats?.formulationCounts?.CHOORNAM || 0, color: '#16a34a' },
    { name: 'KUDINEER', value: stats?.formulationCounts?.KUDINEER || 0, color: '#d97706' },
    { name: 'THAILAM', value: stats?.formulationCounts?.THAILAM || 0, color: '#0284c7' },
    { name: 'LEHYAM', value: stats?.formulationCounts?.LEHYAM || 0, color: '#9333ea' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-herbal-dark">Clinical Overview</h1>
          <p className="text-xs text-slate-500">Real-time stats for appointments, patients, and Siddha medicine inventory.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/admin/records"
            className="flex items-center space-x-2 bg-herbal-dark hover:bg-siddha-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition-colors"
          >
            <Plus className="w-4 h-4 text-herbal-gold" />
            <span>New Medical Record</span>
          </Link>
          <Link
            to="/admin/appointments"
            className="flex items-center space-x-2 bg-herbal-sand text-herbal-dark text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-amber-100 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Appointments</span>
          </Link>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Patients</span>
            <p className="text-3xl font-bold font-serif text-herbal-dark mt-1">{stats?.totalPatients || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-siddha-100 text-siddha-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Appointments</span>
            <p className="text-3xl font-bold font-serif text-herbal-dark mt-1">{stats?.totalAppointments || 0}</p>
            <span className="text-xs text-amber-600 font-medium">{stats?.appointmentsByStatus?.PENDING || 0} Pending</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Low Stock Alert</span>
            <p className="text-3xl font-bold font-serif text-rose-600 mt-1">{stats?.lowStockCount || 0}</p>
            <span className="text-xs text-rose-500 font-medium">Reorder required</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Unread Messages</span>
            <p className="text-3xl font-bold font-serif text-herbal-dark mt-1">{stats?.unreadMessages || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bar Chart: Appointments */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold font-serif text-herbal-dark mb-4">Appointments Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {appointmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Formulations */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold font-serif text-herbal-dark mb-4">Siddha Inventory Formulations</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formulationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {formulationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-2">
            {formulationData.map(f => (
              <div key={f.name} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: f.color }}></span>
                <span>{f.name}: <strong>{f.value}</strong></span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold font-serif text-herbal-dark">Recent Appointment Requests</h3>
          <Link to="/admin/appointments" className="text-xs font-semibold text-siddha-700 hover:underline">
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Date / Time</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats?.recentAppointments?.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-800">{app.patient?.name}</td>
                  <td className="p-3 text-slate-600">{app.patient?.phone}</td>
                  <td className="p-3 text-slate-600">
                    {new Date(app.date).toLocaleDateString()} — {app.timeSlot}
                  </td>
                  <td className="p-3 text-slate-700 max-w-xs truncate">{app.reason}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : app.status === 'CONFIRMED'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
