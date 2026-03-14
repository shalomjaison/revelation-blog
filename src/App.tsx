/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PostForm from './pages/admin/PostForm';

interface ApiPost {
  post_id: string;
  title: string;
  content: string;
  slug: string;
  header_image_file_path: string | null;
  created_date: string;
  author_name: string | null;
}

function Navbar({ onHomeClick }: { onHomeClick: () => void }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winHeightPx > 0 ? scrollPx / winHeightPx : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCF8]/90 backdrop-blur-md border-b border-slate-200/50">
      <nav className="w-full max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={onHomeClick}
          className="font-serif font-black text-2xl tracking-tighter text-slate-900 hover:opacity-70 transition-opacity"
        >
          AJ
        </button>
        <a href="#newsletter" className="text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-slate-900 transition-colors">
          Join the Study
        </a>
      </nav>
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-slate-900"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </header>
  );
}

function Hero() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 text-center flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-8 shadow-sm">
        The Blog
      </div>
      <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif uppercase tracking-tight leading-[0.9] mb-10 text-slate-900">
        Unveiling<br/>The Prophecy
      </h1>
      <p className="text-base md:text-lg text-slate-500 max-w-xl leading-relaxed mb-12 font-medium">
        Deep dives into the symbolism, historical context, and profound meaning of the final book of the Bible.
      </p>
      <a
        href="#posts"
        className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest border-b-2 border-slate-900 text-slate-900 pb-1 hover:text-slate-500 hover:border-slate-500 transition-all duration-300"
      >
        Start Reading
        <ArrowRight className="w-4 h-4" />
      </a>
    </section>
  );
}

function BlogCard({ post, onClick }: { post: ApiPost, onClick: () => void }) {
  const excerpt = post.content.split('\n\n')[0].slice(0, 180) + (post.content.length > 180 ? '…' : '');
  const date = new Date(post.created_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article onClick={onClick} className="flex flex-col group cursor-pointer">
      <div className="overflow-hidden mb-5 bg-slate-100 aspect-square relative">
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500 z-10" />
        {post.header_image_file_path ? (
          <img
            src={post.header_image_file_path}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-slate-200" />
        )}
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold tracking-tight leading-snug mb-3 text-slate-900 group-hover:text-slate-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow font-medium line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">{post.author_name ?? 'Author'}</span>
          <span className="text-xs text-slate-400 font-medium">{date}</span>
        </div>
      </div>
    </article>
  );
}

function BlogGrid({ posts, onPostClick }: { posts: ApiPost[], onPostClick: (id: string) => void }) {
  return (
    <section id="posts" className="w-full max-w-6xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {posts.map(post => (
          <BlogCard key={post.post_id} post={post} onClick={() => onPostClick(post.post_id)} />
        ))}
      </div>
    </section>
  );
}

function BlogPostView({ post, onBack }: { post: ApiPost, onBack: () => void }) {
  const paragraphs = post.content.split('\n\n').filter(Boolean);
  const date = new Date(post.created_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const initials = (post.author_name ?? 'A').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <article className="w-full max-w-3xl mx-auto px-6 pt-32 pb-12 md:pt-40 md:pb-24">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </button>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1] mb-8 text-slate-900">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-200">
        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-sm text-slate-600 font-bold">
          {initials}
        </div>
        <div>
          <div className="font-bold text-slate-900 text-sm uppercase tracking-wider">{post.author_name ?? 'Author'}</div>
          <div className="text-slate-500 text-sm font-medium">{date}</div>
        </div>
      </div>

      {post.header_image_file_path && (
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-slate-100 mb-12 overflow-hidden">
          <img
            src={post.header_image_file_path}
            alt={post.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="prose prose-slate prose-lg max-w-none font-serif text-slate-700 leading-relaxed">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx} className="mb-6">{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

function Newsletter() {
  return (
    <section id="newsletter" className="w-full max-w-4xl mx-auto px-6 py-16 md:py-32 border-t border-slate-200">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-6 block">
          Resources
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif uppercase tracking-tight mb-6 text-slate-900">
          Join The Study
        </h2>
        <p className="text-slate-500 mb-10 text-base md:text-lg font-medium">
          Get weekly insights and study guides delivered directly to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 sm:gap-0 w-full max-w-md mx-auto sm:border sm:border-slate-300 sm:p-1" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-grow px-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm border border-slate-300 sm:border-none"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200 text-xs text-slate-400 font-medium uppercase tracking-wider text-center md:text-left">
      <div>&copy; {new Date().getFullYear()} Revelation Studies.</div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
        <a href="#" className="hover:text-slate-900 transition-colors">YouTube</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
      </div>
    </footer>
  );
}

function PublicBlog() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoadingPosts(false));
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPostId]);

  const selectedPost = posts.find(p => p.post_id === selectedPostId);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900 overflow-x-hidden">
      <Navbar onHomeClick={() => setSelectedPostId(null)} />
      <main>
        {selectedPost ? (
          <BlogPostView post={selectedPost} onBack={() => setSelectedPostId(null)} />
        ) : (
          <>
            <Hero />
            {loadingPosts ? (
              <section className="w-full max-w-6xl mx-auto px-6 py-24 text-center text-slate-400 text-sm">
                Loading posts...
              </section>
            ) : posts.length === 0 ? (
              <section className="w-full max-w-6xl mx-auto px-6 py-24 text-center text-slate-400 text-sm">
                No posts yet.
              </section>
            ) : (
              <BlogGrid posts={posts} onPostClick={setSelectedPostId} />
            )}
          </>
        )}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicBlog />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="posts/new" element={<PostForm />} />
          <Route path="posts/edit/:id" element={<PostForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
