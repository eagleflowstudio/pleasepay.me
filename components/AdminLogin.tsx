import React, { useState } from 'react';
import { Shield, Lock } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem('pleasepay_admin', 'true');
      onLoginSuccess();
    } else {
      setError('Invalid access code');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400 text-sm">Enter access code to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Access Code
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white focus:border-blue-500 outline-none"
                placeholder="Enter code"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Access Dashboard
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">
          Authorized access only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
