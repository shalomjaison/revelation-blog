/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Lenis from 'lenis';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Seven Churches: A Historical Context",
    excerpt: "Understanding the cultural and historical background of the seven churches of Asia Minor to grasp the letters' full impact and relevance today.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop",
    author: "Anie Jaison",
    date: "October 12, 2026"
  },
  {
    id: 2,
    title: "Decoding the Symbolism of the Beasts",
    excerpt: "A comprehensive look at the imagery used in Revelation 13, its roots in Old Testament prophetic literature, and what it means for the modern reader.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1000&auto=format&fit=crop",
    author: "Anie Jaison",
    date: "October 05, 2026"
  },
  {
    id: 3,
    title: "The New Jerusalem: A Vision of Hope",
    excerpt: "Exploring the final chapters of Revelation and the promise of a restored creation, eternal dwelling, and the ultimate victory of light over darkness.",
    image: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?q=80&w=1000&auto=format&fit=crop",
    author: "Anie Jaison",
    date: "September 28, 2026"
  }
];

function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCF8]/90 backdrop-blur-md border-b border-slate-200/50">
      <nav className="w-full max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-serif font-black text-2xl tracking-tighter text-slate-900">
          AJ
        </div>
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

function BlogCard({ post }: { post: typeof BLOG_POSTS[0] }) {
  return (
    <article className="flex flex-col group cursor-pointer">
      <div className="overflow-hidden mb-5 bg-slate-100 aspect-square relative">
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500 z-10" />
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold tracking-tight leading-snug mb-3 text-slate-900 group-hover:text-slate-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow font-medium line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">{post.author}</span>
          <span className="text-xs text-slate-400 font-medium">{post.date}</span>
        </div>
      </div>
    </article>
  );
}

function BlogGrid() {
  return (
    <section id="posts" className="w-full max-w-6xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {BLOG_POSTS.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section id="newsletter" className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 border-t border-slate-200">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-6 block">
          Resources
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-tight mb-6 text-slate-900">
          Join The Study
        </h2>
        <p className="text-slate-500 mb-10 text-base md:text-lg font-medium">
          Get weekly insights and study guides delivered directly to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-slate-300 p-1" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-grow px-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm"
            required
          />
          <button 
            type="submit" 
            className="bg-slate-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors whitespace-nowrap"
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
    <footer className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200 text-xs text-slate-400 font-medium uppercase tracking-wider">
      <div>&copy; {new Date().getFullYear()} Revelation Studies.</div>
      <div className="flex gap-8">
        <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
        <a href="#" className="hover:text-slate-900 transition-colors">YouTube</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
      </div>
    </footer>
  );
}

export default function App() {
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

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <BlogGrid />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
