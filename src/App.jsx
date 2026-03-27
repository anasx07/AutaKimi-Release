import { Download, BookOpen, Puzzle, History, Search, Zap, ChevronDown, Globe } from 'lucide-react'
import { useState } from 'react'
import './index.css'

function App() {
  const [openFaq, setOpenFaq] = useState(null)

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Personal Library",
      description: "Organize your collection with a beautiful, responsive library interface."
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Extensible",
      description: "Support for multiple sources via a flexible extension system."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Offline Reading",
      description: "Download your favorite chapters and read them anytime, anywhere."
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Reading History",
      description: "Pick up exactly where you left off with synchronized reading progress."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Search",
      description: "Find any title across all your connected sources instantly."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Lightweight",
      description: "Built with performance in mind for a smooth, lag-free experience."
    }
  ]

  const showcases = [
    {
      badge: "Customization",
      title: "Premium Themes",
      description: "Make LManwa yours. Choose from a variety of premium themes, ranging from classic dark modes to character-inspired aesthetics.",
      image: "assets/screenshot-themes.png"
    },
    {
      badge: "Discovery",
      title: "Smart Search & Filters",
      description: "Find your next read across connected translation sources instantly with deep filters support.",
      image: "assets/screenshot-themes.png",
      reverse: true
    }
  ]

  const faqs = [
    { q: "Is AutaKimi free and open-source?", a: "Yes, LManwa is 100% free and open-source with no ads or trackers." },
    { q: "How do I install extensions?", a: "Extensions are self-contained and pre-installed in the application for immediate native browsing." },
    { q: "Does it support offline reading?", a: "Yes, you can download chapters to read them fully offline anytime." }
  ]

  return (
    <div className="app-container">
      <div className="bg-container">
        <div className="bg-glow" style={{ top: '5%', left: '5%' }}></div>
        <div className="bg-glow" style={{ bottom: '5%', right: '5%' }}></div>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="assets/icon.png" alt="Logo" className="nav-icon" />
            <span>AutaKimi</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#showcase">Showcase</a>
            <a href="#faq">FAQ</a>
            <a href="https://github.com/anasx07" className="nav-github" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-icon"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> GitHub
            </a>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-card">
          <div className="icon-container">
            <img src="assets/icon.png" alt="LManwa Icon" className="app-icon" />
          </div>
          <span className="badge">Version 1.0.13</span>
          <h1>AutaKimi</h1>
          <p>
            The ultimate manga experience on Windows. 
            Open-source, extensible, and built for speed.
          </p>
          
          <div className="btn-group">
            <a 
              href="https://github.com/anasx07/LManwa/releases/latest" 
              className="download-btn"
            >
              <Download className="inline-icon" />
              Repo Release Page
            </a>
             <a 
              href="https://github.com/anasx07/LManwa/releases/latest" 
              className="download-btn"
            >
              <Download className="inline-icon" />
              One Click Download for Windows
            </a>
          </div>
        </div>
      </header>

      <section id="features" className="features-section">
         <div className="section-header">
            <span className="badge">Features</span>
            <h2>Everything you need</h2>
         </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="showcase" className="showcase-section">
        <div className="showcase-container">
          {showcases.map((s, i) => (
            <div key={i} className={`showcase-item ${s.reverse ? 'reverse' : ''}`}>
              <div className="showcase-content">
                <span className="badge">{s.badge}</span>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
              </div>
              <div className="screenshot-container">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="app-screenshot" 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="faq-section">
         <div className="section-header">
            <span className="badge">FAQ</span>
            <h2>Common Questions</h2>
         </div>
         <div className="faq-list">
            {faqs.map((f, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'active' : ''}`}>
                    <button className="faq-toggle" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        <span>{f.q}</span>
                        <ChevronDown className="faq-icon" />
                    </button>
                    <div className="faq-content">
                        <div className="faq-inner">{f.a}</div>
                    </div>
                </div>
            ))}
         </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} LManwa. Built with passion for readers.</p>
      </footer>
    </div>
  )
}

export default App
