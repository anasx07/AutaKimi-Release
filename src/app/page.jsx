"use client";

import { Download, BookOpen, Puzzle, History, Search, Zap, ChevronDown, Globe } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Personal Library",
      description: "Organize your collection with a beautiful, responsive library interface."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Localization",
      description: "Full support for Arabic (العربية) and English, ensuring a native experience for global readers."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Native Anime Support",
      description: "Watch your favorite anime series with our built-in, high-performance video player (BETA)."
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Modular Scaling",
      description: "Advanced extension system with language-aware catalogs and bulk management."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Search",
      description: "Find any title across all your connected sources instantly."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Fast & Lightweight",
      description: "Built with performance in mind for a smooth, lag-free experience."
    }
  ]

  const showcases = [
    {
      badge: "Customization",
      title: "Premium Themes",
      description: "Make AutaKimi yours. Choose from a variety of premium themes, ranging from classic dark modes to character-inspired aesthetics.",
      image: "/assets/screenshot-themes.png" // Updated path
    },
    {
      badge: "Discovery",
      title: "Smart Search & Filters",
      description: "Find your next read across connected translation sources instantly with deep filters support.",
      image: "/assets/screenshot-themes.png", // Updated path
      reverse: true
    }
  ]

  const faqs = [
    { q: "Is AutaKimi free and open-source?", a: "Yes, AutaKimi is 100% free and open-source with no ads or trackers." },
    { q: "How do I install extensions?", a: "Extensions are self-contained and pre-installed in the application for immediate native browsing." },
    { q: "Does it support offline reading?", a: "Yes, you can download chapters to read them fully offline anytime." }
  ]

  return (
    <div className="relative min-h-screen flex flex-col items-center selection:bg-primary/30">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_50%_50%,#0a0a0c_0%,#050505_100%)] overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-[70vmax] h-[70vmax] bg-primary/[0.05] rounded-full blur-[100px] float-animate" />
        <div className="absolute bottom-[5%] right-[5%] w-[70vmax] h-[70vmax] bg-primary/[0.03] rounded-full blur-[100px] float-animate" />
      </div>

      <nav className="fixed top-0 left-0 w-full py-4 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 animate-fade-in">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/assets/icon.png" alt="Logo" className="w-8 h-8 rounded-lg shadow-lg" />
            <span className="font-extrabold text-xl tracking-tighter">AutaKimi</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Showcase</a>
            <a href="#faq" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">FAQ</a>
            <a href="https://github.com/anasx07" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all hover:-translate-y-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <header className="pt-32 pb-16 w-full flex justify-center">
        <div className="glass-card rounded-[32px] p-10 md:p-16 max-w-[680px] w-[90%] text-center hero-animate">
          <div className="mb-8 flex justify-center opacity-0 animate-[fadeIn_0.8s_ease_forwards_0.4s]">
            <img src="/assets/icon.png" alt="AutaKimi Icon" className="w-[100px] h-[100px] rounded-3xl shadow-2xl" />
          </div>
          <span className="premium-pill mb-6 opacity-0 animate-[fadeIn_0.8s_ease_forwards_0.4s]">Version 1.0.52</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-5 text-gradient opacity-0 animate-[fadeIn_0.8s_ease_forwards_0.6s]">AutaKimi</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-[500px] mx-auto mb-12 leading-relaxed opacity-0 animate-[fadeIn_0.8s_ease_forwards_0.8s]">
            The ultimate manga experience on Windows.
            Open-source, extensible, and built for speed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeIn_0.8s_ease_forwards_1s]">
            <a href="https://github.com/anasx07/AutaKimi-Release/releases/latest" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black px-12 py-4.5 rounded-2xl font-bold text-lg hover:bg-primary hover:text-white transition-all hover:scale-105 shadow-xl hover:shadow-primary/20">
              <Download className="w-5 h-5" />
              Repo Release Page
            </a>
            <a href="https://github.com/anasx07/AutaKimi-Release/releases/download/latest/AutaKimi.exe" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 text-white px-12 py-4.5 rounded-2xl font-bold border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
              <Download className="w-5 h-5" />
              Download Installer
            </a>
          </div>
        </div>
      </header>

      <section id="features" className="py-24 px-6 max-w-6xl w-full">
        <div className="text-center mb-12 space-y-4">
          <span className="premium-pill">Features</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Everything you need</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl group hover:bg-white/[0.05] transition-all hover:-translate-y-2 opacity-0 animate-fade-in" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white group-hover:text-primary transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="showcase" className="py-24 w-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto px-6 space-y-32">
          {showcases.map((s, i) => (
            <div key={i} className={cn("grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", s.reverse && "lg:flex-row-reverse")}>
              <div className={cn("space-y-6", s.reverse && "lg:order-2")}>
                <span className="premium-pill">{s.badge}</span>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient">{s.title}</h2>
                <p className="text-zinc-400 text-lg leading-relaxed">{s.description}</p>
              </div>
              <div className={cn("relative rounded-3xl overflow-hidden glass-card transform perspective-1000 rotate-x-2 hover:rotate-x-0 transition-all group", s.reverse && "lg:order-1")}>
                <img src={s.image} alt={s.title} className="w-full group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="py-24 px-6 max-w-3xl w-full">
        <div className="text-center mb-12 space-y-4">
          <span className="premium-pill">FAQ</span>
          <h2 className="text-4xl font-extrabold tracking-tight">Common Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <button
                className="w-full p-6 flex justify-between items-center text-left font-bold text-lg hover:bg-white/5 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{f.q}</span>
                <ChevronDown className={cn("w-5 h-5 text-zinc-500 transition-transform duration-300", openFaq === i && "rotate-180 text-white")} />
              </button>
              <div className={cn("grid transition-all duration-300 ease-in-out", openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-sm">
                    {f.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 text-zinc-600 text-sm font-medium">
        <p>© {new Date().getFullYear()} AutaKimi. Built with passion for readers.</p>
      </footer>
    </div>
  )
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
