import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  LayoutDashboard, Calendar, Users, FileText, Package, MessageSquare, 
  LogOut, Home, Shield, ChevronRight, PlusCircle 
} from 'lucide-react';
import { CLINIC } from '../constants/clinic';

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!admin) {
    navigate('/admin/login');
    return null;
  }

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { label: 'Patients Directory', path: '/admin/patients', icon: Users },
    { label: 'Medical Records', path: '/admin/records', icon: FileText },
    { label: 'Siddha Inventory', path: '/admin/inventory', icon: Package },
    { label: 'Contact Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-serif">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-forest-900 text-white flex-shrink-0 flex flex-col justify-between border-r border-saffron-600/30 shadow-xl">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-forest-800">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-saffron-600 text-white flex items-center justify-center text-xl font-bold shadow">
                🌿
              </div>
              <div>
                <h1 className="text-sm font-bold font-tamil text-white">{CLINIC.name}</h1>
                <p className="text-xs text-saffron-400 font-sans font-semibold">{CLINIC.doctor}</p>
              </div>
            </Link>
          </div>

          {/* Quick Create Button */}
          <div className="p-4">
            <Link
              to="/admin/records/new"
              className="w-full flex items-center justify-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white font-sans text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl shadow transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-amber-200" />
              <span>New Prescription</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-1 font-sans">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path === '/admin/records' && location.pathname.startsWith('/admin/records'));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-saffron-600 text-white shadow-md font-bold'
                      : 'text-slate-300 hover:bg-forest-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-amber-200" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-forest-800 space-y-2 font-sans">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-forest-800 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
          <div>
            <span className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-wider">Doctor Management Portal</span>
            <h2 className="text-lg font-bold font-serif text-forest-900">Welcome, Doctor Admin</h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs font-sans font-semibold text-slate-600 bg-cream-100 px-3 py-1.5 rounded-full border border-cream-200">
              📅 {todayFormatted}
            </span>
          </div>
        </header>

        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
