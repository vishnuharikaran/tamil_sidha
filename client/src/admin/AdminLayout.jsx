import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  LayoutDashboard, Calendar, Users, FileText, Package, MessageSquare, 
  LogOut, Home, Shield, ChevronRight 
} from 'lucide-react';
import { CLINIC } from '../constants/clinic';

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!admin) {
    navigate('/login');
    return null;
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { label: 'Patients Directory', path: '/admin/patients', icon: Users },
    { label: 'Medical Records', path: '/admin/records', icon: FileText },
    { label: 'Siddha Inventory', path: '/admin/inventory', icon: Package },
    { label: 'Contact Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-herbal-dark text-white flex-shrink-0 flex flex-col justify-between border-r border-herbal-gold/20 shadow-xl">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-siddha-800">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-herbal-gold text-herbal-dark flex items-center justify-center text-xl font-bold shadow">
                🌿
              </div>
              <div>
                <h1 className="text-sm font-bold font-serif text-white">{CLINIC.name}</h1>
                <p className="text-xs text-herbal-gold font-medium">{CLINIC.doctor}</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-herbal-gold text-herbal-dark shadow-md font-bold'
                      : 'text-slate-300 hover:bg-siddha-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-siddha-800 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs text-slate-300 hover:bg-siddha-900 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
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
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Management Portal</span>
            <h2 className="text-lg font-bold font-serif text-herbal-dark">Doctor Sakthi Vadivu Dashboard</h2>
          </div>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5 text-siddha-700" />
              <span>Logged as {admin.email}</span>
            </span>
          </div>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
