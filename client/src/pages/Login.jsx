import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, Lock, Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { CLINIC } from '../constants/clinic';

const Login = () => {
  const [email, setEmail] = useState('admin@tamilsiddhaclinic.com');
  const [password, setPassword] = useState('Admin@1234');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome Doctor Sakthi Vadivu!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-herbal-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-md w-full relative z-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-herbal-gold hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-herbal-gold/40">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-herbal-dark text-herbal-gold flex items-center justify-center text-3xl mx-auto mb-3 shadow-md">
              🌿
            </div>
            <h1 className="text-2xl font-bold font-serif text-herbal-dark">{CLINIC.name}</h1>
            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mt-1">Doctor Portal Sign In</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-siddha-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-siddha-500"
                />
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
              <span className="font-semibold block">Demo Admin Credentials:</span>
              <span>Email: admin@tamilsiddhaclinic.com</span><br/>
              <span>Password: Admin@1234</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-herbal-dark hover:bg-siddha-900 text-white font-semibold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Shield className="w-4 h-4 text-herbal-gold" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
