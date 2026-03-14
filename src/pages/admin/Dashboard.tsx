import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import { API_URL } from '../../config';

interface Post {
  post_id: string;
  title: string;
  slug: string;
  created_date: string;
  edited_date: string | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchPosts() {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      setPosts(prev => prev.filter(p => p.post_id !== id));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p className="text-slate-500 text-sm">Loading posts...</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;

  return (
    <div>
      <h2 className="font-serif font-bold text-2xl text-slate-900 mb-8">All Posts</h2>
      {posts.length === 0 ? (
        <p className="text-slate-500 text-sm">No posts yet. Create your first one!</p>
      ) : (
        <div className="border border-slate-200 divide-y divide-slate-200 bg-white">
          {posts.map(post => (
            <div key={post.post_id} className="flex items-center justify-between px-6 py-4 gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">{post.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{post.slug}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => navigate(`/admin/posts/edit/${post.post_id}`)}
                  className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.post_id, post.title)}
                  disabled={deletingId === post.post_id}
                  className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                >
                  {deletingId === post.post_id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
