/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Lenis from 'lenis';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Seven Churches: A Historical Context",
    excerpt: "Understanding the cultural and historical background of the seven churches of Asia Minor to grasp the letters' full impact and relevance today.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop",
    author: "Anie Jaison",
    date: "October 12, 2026",
    content: [
      "The Book of Revelation is often approached with a mixture of fascination and trepidation. Its vivid imagery, apocalyptic language, and prophetic visions have captivated readers for centuries. However, to truly understand the depth of its message, we must first ground ourselves in its historical and cultural context.",
      "Before the cosmic battles and heavenly visions unfold, Revelation begins with something deeply grounded in the reality of the first century: seven letters addressed to seven literal churches in Asia Minor (modern-day Turkey). These were real communities facing real challenges—persecution, false teaching, complacency, and cultural assimilation.",
      "Each letter follows a specific pattern: a revelation of Christ's character, an assessment of the church's spiritual condition, a command or warning, and a promise to the 'one who conquers.' By studying the historical backdrop of cities like Ephesus, Smyrna, and Laodicea, the symbolic language of the letters suddenly bursts into sharp, practical focus.",
      "For instance, the church in Laodicea is famously rebuked for being 'neither cold nor hot.' While modern readers often interpret this as a lack of spiritual zeal, the historical context reveals a deeper meaning. Laodicea lacked a natural water supply, relying on aqueducts that brought hot water from Hierapolis (which arrived lukewarm) and cold water from Colossae (which also arrived lukewarm). The rebuke was a pointed local reference: their faith, like their water, had lost its refreshing or healing properties.",
      "As we journey through these seven letters, we'll uncover how the specific cultural, economic, and political pressures of the Roman Empire shaped the struggles of these early believers, and how their triumphs and failures offer a timeless mirror for the church today."
    ]
  },
  {
    id: 2,
    title: "Decoding the Symbolism of the Beasts",
    excerpt: "A comprehensive look at the imagery used in Revelation 13, its roots in Old Testament prophetic literature, and what it means for the modern reader.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1000&auto=format&fit=crop",
    author: "Anie Jaison",
    date: "October 05, 2026",
    content: [
      "When we read about the beasts in Revelation 13, it's easy to get lost in the terrifying imagery of multiple heads, horns, and blasphemous names. But to the first-century reader, these symbols were not arbitrary monsters; they were deeply rooted in the prophetic literature of the Old Testament, particularly the book of Daniel.",
      "The first beast, rising from the sea, represents the oppressive, anti-God empires of the world. In John's day, this was unmistakably the Roman Empire, which demanded worship of the emperor and persecuted those who refused. The sea itself was often a symbol of chaos and the Gentile nations in ancient Near Eastern thought.",
      "The second beast, rising from the earth, acts as a propagandist for the first. It performs signs and deceives the inhabitants of the earth, enforcing the worship of the first beast. This represents the local authorities, religious cults, and economic systems that supported the empire's idolatrous demands.",
      "Understanding this symbolism shifts our focus from trying to identify specific modern political figures to recognizing the timeless patterns of human power and corruption. The beasts represent any system—political, economic, or religious—that elevates itself above God and demands ultimate allegiance.",
      "The message to the early church, and to us today, is one of endurance and faithfulness. Even when the beasts seem invincible, Revelation assures us that their time is limited and that true power belongs to the Lamb."
    ]
  },
  {
    id: 3,
    title: "The New Jerusalem: A Vision of Hope",
    excerpt: "Exploring the final chapters of Revelation and the promise of a restored creation, eternal dwelling, and the ultimate victory of light over darkness.",
    image: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?q=80&w=1000&auto=format&fit=crop",
    author: "Anie Jaison",
    date: "September 28, 2026",
    content: [
      "After the intense visions of judgment and cosmic conflict, the book of Revelation concludes with one of the most beautiful and hopeful images in all of Scripture: the New Jerusalem coming down out of heaven from God. This is not a picture of escaping the earth to float on clouds, but of heaven and earth finally being reunited.",
      "The description of the city is breathtaking. Its streets of gold, gates of pearl, and foundations of precious stones are not meant to be read as a literal architectural blueprint, but as symbols of immense value, purity, and the glorious presence of God. It is the ultimate fulfillment of the Garden of Eden, but now as a bustling, perfected city.",
      "Perhaps the most profound detail is what is missing: there is no temple in the city. In the ancient world, the temple was the place where heaven and earth intersected, where God dwelled with His people. In the New Jerusalem, the entire city is the temple because 'the Lord God the Almighty and the Lamb are its temple.'",
      "Furthermore, there is no more night, no more crying, and no more pain. The curse of sin is finally and fully reversed. The river of the water of life flows through the middle of the street, and the tree of life yields its fruit every month, its leaves for the healing of the nations.",
      "This vision is meant to anchor our hope. It reminds us that the story of the world does not end in destruction, but in glorious restoration. It calls us to live faithfully in the present, knowing that the ultimate victory has already been won."
    ]
  }
];

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
    handleScroll(); // Initial check
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

function BlogCard({ post, onClick }: { post: typeof BLOG_POSTS[0], onClick: () => void }) {
  return (
    <article onClick={onClick} className="flex flex-col group cursor-pointer">
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

function BlogGrid({ onPostClick }: { onPostClick: (id: number) => void }) {
  return (
    <section id="posts" className="w-full max-w-6xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {BLOG_POSTS.map(post => (
          <BlogCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
        ))}
      </div>
    </section>
  );
}

function BlogPostView({ post, onBack }: { post: typeof BLOG_POSTS[0], onBack: () => void }) {
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
          AJ
        </div>
        <div>
          <div className="font-bold text-slate-900 text-sm uppercase tracking-wider">{post.author}</div>
          <div className="text-slate-500 text-sm font-medium">{post.date}</div>
        </div>
      </div>
      
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-slate-100 mb-12 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="prose prose-slate prose-lg max-w-none font-serif text-slate-700 leading-relaxed">
        {post.content.map((paragraph, idx) => (
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

export default function App() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

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

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPostId]);

  const selectedPost = BLOG_POSTS.find(p => p.id === selectedPostId);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900 overflow-x-hidden">
      <Navbar onHomeClick={() => setSelectedPostId(null)} />
      <main>
        {selectedPost ? (
          <BlogPostView post={selectedPost} onBack={() => setSelectedPostId(null)} />
        ) : (
          <>
            <Hero />
            <BlogGrid onPostClick={setSelectedPostId} />
          </>
        )}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
