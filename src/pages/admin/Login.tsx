import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }
      setToken(data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('Network error. Is the server running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center">
      <div className="w-full max-w-sm px-8 py-10 border border-slate-200 bg-white">
        <h1 className="font-serif font-bold text-2xl text-slate-900 mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>
          {error && (
            <p className="text-red-600 text-xs font-medium">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-slate-900 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
