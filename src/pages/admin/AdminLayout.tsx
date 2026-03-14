import { Link, Outlet, useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/admin/dashboard" className="font-serif font-black text-xl tracking-tight text-slate-900">
            Blog CMS
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/posts/new"
              className="bg-slate-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors"
            >
              New Post
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
