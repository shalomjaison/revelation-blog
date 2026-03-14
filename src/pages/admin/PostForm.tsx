import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import { API_URL } from '../../config';
import { supabase } from '../../lib/supabase';

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function PostForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [content, setContent] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('post-images').getPublicUrl(path);
      setHeaderImage(data.publicUrl);
    } catch (err) {
      setError(`Upload failed: ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    if (!isEdit) return;
    async function loadPost() {
      try {
        const res = await fetch(`${API_URL}/posts/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        // Try by ID — server uses slug for GET single post, so we fetch all and find by id
        const allRes = await fetch(`${API_URL}/posts`);
        const allPosts = await allRes.json();
        const post = allPosts.find((p: any) => p.post_id === id);
        if (!post) throw new Error('Post not found');
        setTitle(post.title);
        setSlug(post.slug);
        setHeaderImage(post.header_image_file_path || '');
        setContent(post.content);
        setSlugManual(true);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setFetching(false);
      }
    }
    loadPost();
  }, [id, isEdit]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManual) {
      setSlug(toSlug(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = isEdit ? `${API_URL}/posts/${id}` : `${API_URL}/posts`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title, slug, content, header_image_file_path: headerImage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      navigate('/admin/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <p className="text-slate-500 text-sm">Loading post...</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif font-bold text-2xl text-slate-900 mb-8">
        {isEdit ? 'Edit Post' : 'New Post'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            required
            className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={e => { setSlug(e.target.value); setSlugManual(true); }}
            required
            className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900 font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            Header Image
          </label>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-slate-100 border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              <span className="text-xs text-slate-400">or paste a URL below</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <input
              type="text"
              value={headerImage}
              onChange={e => setHeaderImage(e.target.value)}
              placeholder="https://..."
              className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
            />
            {headerImage && (
              <img src={headerImage} alt="Preview" className="w-full max-h-48 object-cover border border-slate-200" />
            )}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={16}
            className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900 resize-y font-serif leading-relaxed"
          />
        </div>
        {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Publish Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
