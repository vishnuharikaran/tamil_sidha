import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, Lock, Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { CLINIC } from '../constants/clinic';

const Login = () => {
  const [email, setEmail] = useState('admin@tamilsiddhaclinic.com');
  const [password, setPassword] = useState('Admin@1234');
  const [loading, setLoading] = useState(false);
  const { admin, login } = useAuth();
  const navigate = useNavigate();

  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome Doctor Sakthi Vadivu!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-900 flex items-center justify-center p-4 relative overflow-hidden font-serif">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C45508_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-md w-full relative z-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-sans font-semibold text-saffron-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-saffron-600/30">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-forest-700 text-amber-200 flex items-center justify-center text-3xl mx-auto mb-3 shadow-md border-2 border-saffron-600">
              🌿
            </div>
            <h1 className="text-2xl font-bold font-tamil text-forest-900">{CLINIC.name}</h1>
            <p className="text-xs font-sans font-bold text-saffron-700 uppercase tracking-wider mt-1">Doctor Admin Portal Sign In</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Admin Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-600"
                />
              </div>
            </div>

            <div className="bg-cream-100 p-3 rounded-xl border border-saffron-600/20 text-xs text-slate-800 space-y-0.5 font-sans">
              <span className="font-bold text-forest-900 block">Demo Credentials:</span>
              <span>Email: <strong>admin@tamilsiddhaclinic.com</strong></span><br/>
              <span>Password: <strong>Admin@1234</strong></span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-saffron-600 hover:bg-saffron-700 text-white font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Shield className="w-4 h-4 text-amber-200" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Doctor Dashboard'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
