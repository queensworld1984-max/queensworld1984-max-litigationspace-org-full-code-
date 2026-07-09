import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import SupportWidget from '../components/SupportWidget'
import SEO from '../components/SEO'

/* ── Scroll-reveal wrapper — fades/slides a section in the first time it enters the viewport ── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal${visible ? ' in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── Constants ───────────────────────────────────────────────────────────── */

const FEATURES = [
  { name: 'Legal Brain',     desc: 'Deep case analysis',       color: '#a5b4fc', bg: 'rgba(99,102,241,0.14)',  border: 'rgba(99,102,241,0.40)',  to: '/legal-brain' },
  { name: 'Legal Database',  desc: 'Authoritative case law',   color: '#2dd4bf', bg: 'rgba(13,148,136,0.14)', border: 'rgba(13,148,136,0.40)',  to: '/legal-database' },
  { name: 'Case Vault',      desc: 'Intelligent organization', color: '#60a5fa', bg: 'rgba(59,130,246,0.14)', border: 'rgba(59,130,246,0.40)',  to: '/cases' },
  { name: 'War Room',        desc: 'Strategy command center',  color: '#f87171', bg: 'rgba(239,68,68,0.14)',  border: 'rgba(239,68,68,0.40)',   to: '/warroom' },
  { name: 'Drafting Engine', desc: 'Court-ready precision',    color: '#c084fc', bg: 'rgba(139,92,246,0.14)', border: 'rgba(139,92,246,0.40)', to: '/drafting' },
  { name: 'Live Bench',      desc: 'On-demand expert talent',  color: '#fbbf24', bg: 'rgba(245,166,35,0.14)', border: 'rgba(245,166,35,0.45)',  to: '/live-bench' },
]

const STATS = [
  { value: '12',   label: 'Countries Served' },
  { value: '8',    label: 'Communities We Serve' },
  { value: '0%',   label: 'Platform Fees on Donations' },
  { value: '501(c)(3)', label: 'Nonprofit Status' },
]

const PILLARS = [
  {
    title: 'Legal Brain',
    subtitle: 'AI Legal Research Assistant',
    desc: 'Ask any legal question, analyze documents, and get thorough analytical answers with case citations and actionable guidance.',
    bullets: [
      'LitigationSpace Intelligence powered legal analysis',
      'Document upload and instant AI review',
      'Case law citations and verification',
      'Free for general questions, premium for case-specific advice',
    ],
    to: '/legal-brain',
    bg: '#1a1f3a',
    accent: '#6366f1',
    icon: '🧠',
  },
  {
    title: 'Legal Database',
    subtitle: 'Authoritative Legal Research',
    desc: 'Ground your strategy in verified case law, statutes, and legal authority across 12 countries and 50+ jurisdictions.',
    bullets: [
      'Real case law from CourtListener',
      'Citation verification and good law badges',
      'Counter-argument research engine',
      'Multi-jurisdiction coverage',
    ],
    to: '/legal-database',
    bg: '#0f2027',
    accent: '#0d9488',
    icon: '📚',
  },
  {
    title: 'Case Vault',
    subtitle: 'Intelligent Case Organization',
    desc: 'Every case gets its own AI-powered workspace — Documents, Tasks, Exhibits, AI Chat, Drafting, Experts, Outreach, Notes, and Billing.',
    bullets: [
      'AI-organized documents with automatic exhibit labeling',
      'Smart task management with deadline tracking',
      'Case-specific AI chat trained on your documents',
      'Integrated billing and time tracking',
    ],
    to: '/cases',
    bg: '#0f1f3a',
    accent: '#3b82f6',
    icon: '🗂️',
  },
  {
    title: 'War Room',
    subtitle: 'Strategy Command Center',
    desc: 'Your litigation war room in one screen. Build timelines, map contradictions, detect weaknesses in opposing filings, and simulate counter-arguments.',
    bullets: [
      'Automated contradiction detection across all case documents',
      'AI-generated counter-argument playbooks',
      'Timeline builder with exhibit linking',
      'Oral argument simulation and prep',
    ],
    to: '/warroom',
    bg: '#1f0f0f',
    accent: '#ef4444',
    icon: '⚔️',
  },
  {
    title: 'Drafting Engine',
    subtitle: 'Court-Ready Document Generation',
    desc: 'Generate motions, complaints, demand letters, briefs, and memoranda with proper court formatting. Download as Word or PDF.',
    bullets: [
      'Court-aware formatting with local rules',
      'Page-limit sentinel and AI trim',
      'Verified case law suggestions from CourtListener',
      'Good law validation badges',
    ],
    to: '/drafting',
    bg: '#1a0f2e',
    accent: '#8b5cf6',
    icon: '✍️',
  },
  {
    title: 'Live Bench',
    subtitle: 'Expert Witness Marketplace',
    desc: 'Connect with vetted expert witnesses across every specialty. Economists, forensic accountants, medical experts, engineers — available immediately.',
    bullets: [
      '500+ verified experts across 18 practice areas',
      'Direct booking and engagement management',
      'Expert report review and AI enhancement',
      'Real-time availability and rate transparency',
    ],
    to: '/live-bench',
    bg: '#1a1500',
    accent: '#F5A623',
    icon: '⚖️',
  },
  {
    title: 'Judicial Workspace',
    subtitle: 'Built for the Bench',
    desc: 'A dedicated workspace for judges and judicial officers. Manage dockets, review AI case summaries, and generate preliminary analysis.',
    bullets: [
      'AI-powered case summary and issue spotting',
      'Docket management and scheduling tools',
      'Neutral AI analysis with no advocate bias',
      'Secure, isolated case data environment',
    ],
    to: '/judicial-workspace',
    bg: '#0f1a0f',
    accent: '#22c55e',
    icon: '🏛️',
  },
]

// NOTE: the previous EXPERTS array (12 fabricated names with stock photos
// and made-up ratings/rates) was removed — it misrepresented seed/demo data
// as real, available marketplace listings. Do not reintroduce placeholder
// professionals here; pull real data from the Live Bench API once populated.

const PRACTICE_AREAS = [
  { icon: '⚖️', name: 'Civil Litigation',        desc: 'Full-stack tools for complex civil matters — discovery, motions, and trial prep all in one place.', bg: '#1e3a8a', accent: '#fbbf24' },
  { icon: '🏢', name: 'Corporate Law',            desc: 'Contract analysis, due diligence workflows, and M&A document review powered by AI.', bg: '#78350f', accent: '#fef08a' },
  { icon: '🏠', name: 'Family Law',               desc: 'Case management, custody documentation, support calculations, and mediation prep.', bg: '#000000', accent: '#fda4af' },
  { icon: '🛡️', name: 'Criminal Defense',        desc: 'Evidence organization, motion drafting, timeline analysis, and witness management.', bg: '#b91c1c', accent: '#fee2e2' },
  { icon: '🌍', name: 'Immigration',              desc: 'Document workflows, visa case tracking, and evidence management across jurisdictions.', bg: '#4c1d95', accent: '#c4b5fd' },
  { icon: '🩹', name: 'Personal Injury',          desc: 'Demand letter automation, medical record analysis, and settlement value modeling.', bg: '#ffffff', accent: '#9a3412', light: true },
  { icon: '🤝', name: 'Arbitration & Mediation', desc: 'Argument preparation, document exchange workflows, and neutral case briefs.', bg: '#134e4a', accent: '#67e8f9' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Create Your Case', desc: 'Add your case details and upload documents. Our AI automatically organizes, labels, and analyzes everything.' },
  { step: '02', title: 'Analyze with AI',  desc: 'Run motion analysis, contradiction detection, and win probability scoring on your specific facts and law.' },
  { step: '03', title: 'Draft & Prepare',  desc: 'Generate court-ready documents, build your war room strategy, and engage expert witnesses — all in one place.' },
  { step: '04', title: 'Walk In Prepared', desc: 'Walk into court with organized evidence, verified case law, and a clear strategy — the same caliber of preparation, at a cost that fits your budget.' },
]

const WHY_US = [
  'Built exclusively for litigation — not generic legal "AI" bolted onto a word processor',
  'Case-isolated AI: your documents never train shared models or cross into other cases',
  'End-to-end: from intake to invoice, every workflow lives in one platform',
  'Expert marketplace with 500+ vetted witnesses, economists, and forensic specialists',
  'Enterprise-grade security: SOC 2, AES-256 encryption, multi-tenant RBAC, IOLTA compliant',
]

/* ── Component ───────────────────────────────────────────────────────────── */

export default function Home() {
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([])
  const [chatLoading, setChatLoading] = useState(false)

  const sendPublicChat = async () => {
    if (!chatInput.trim() || chatLoading) return
    const msg = chatInput; setChatInput('')
    setChatMessages(h => [...h, { role: 'user', content: msg }])
    setChatLoading(true)
    // Simulate AI response for public demo
    await new Promise(r => setTimeout(r, 1200))
    setChatMessages(h => [...h, {
      role: 'assistant',
      content: `This is a general legal information response about: "${msg}". For case-specific analysis, sign up for a free account to access full AI capabilities with your actual case documents.\n\nGeneral information: [AI response would appear here with relevant legal information, statute citations, and case law references.]`,
    }])
    setChatLoading(false)
  }

  const S = {
    section: { padding: 'clamp(40px,6vw,80px) 0' as const },
    inner: { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,32px)' } as const,
    goldText: {
      background: 'linear-gradient(135deg,#ffd700,#F5A623,#b8760a)',
      WebkitBackgroundClip: 'text' as const,
      WebkitTextFillColor: 'transparent' as const,
      backgroundClip: 'text' as const,
    },
    h2: { fontFamily: '"Playfair Display",serif', fontWeight: 900, lineHeight: 1.15, margin: 0 } as const,
    label: { fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const },
  }

  return (
    <>
      <SEO
        title="AI Litigation Platform for Attorneys"
        description="LitigationSpace is the AI-powered operating system for litigation attorneys. Analyze motions, research case law, build trial strategy, draft documents, and find expert witnesses — all in one platform."
        keywords="litigation platform, legal AI software, AI motion analyzer, legal research AI, case management software, trial preparation software, litigation attorney tools, law firm software, attorney software"
        path="/"
      />
      <div style={{ minHeight: '100vh', background: '#0d1117', color: '#ffffff' }}>
      <style>{`
        .secLabel {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
        }
        .secLabel::before,
        .secLabel::after {
          content: '';
          display: block;
          width: 36px;
          height: 2px;
          background: currentColor;
          opacity: 0.55;
          border-radius: 1px;
          flex-shrink: 0;
        }

        /* ── Hero — full-bleed video background ── */
        .heroSection {
          position: relative;
          overflow: hidden;
        }
        .pillarCard {
          border-radius: 14px;
          padding: 18px 16px;
          backdrop-filter: blur(12px);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s ease;
          text-decoration: none;
          display: block;
        }
        .pillarCard::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%);
          border-radius: 14px 14px 0 0;
          pointer-events: none;
        }
        .pillarCard:hover {
          transform: translateY(-5px) scale(1.02);
        }
        .heroCta {
          position: relative;
          overflow: hidden;
        }
        .heroCta::after {
          content: '';
          position: absolute;
          top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%);
          transform: skewX(-20deg);
          transition: left 0.55s ease;
          pointer-events: none;
        }
        .heroCta:hover::after { left: 130%; }

        /* ── Fancy: animated gradient mesh behind hero ── */
        .heroOrbs { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .heroOrb {
          position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.35;
          animation: orbFloat 16s ease-in-out infinite;
        }
        .heroOrb1 { width: 420px; height: 420px; top: -140px; left: -80px; background: radial-gradient(circle, #F5A623, transparent 70%); animation-delay: 0s; }
        .heroOrb2 { width: 380px; height: 380px; top: 40px; right: -100px; background: radial-gradient(circle, #34d399, transparent 70%); animation-delay: -5s; }
        .heroOrb3 { width: 320px; height: 320px; bottom: -160px; left: 40%; background: radial-gradient(circle, #6366f1, transparent 70%); animation-delay: -10s; }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-24px) scale(1.08); }
          66% { transform: translate(-24px,20px) scale(0.95); }
        }

        .heroBadge { animation: badgePulse 2.6s ease-in-out infinite; }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(245,166,35,0); }
        }

        .heroHeadline { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .heroSub      { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .heroSub2     { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s both; }
        .heroCtas     { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s both; }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Fancy: scroll-reveal ── */
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }

        /* ── Fancy: glass stat cards ── */
        .statCard {
          position: relative; border-radius: 16px; padding: 28px 20px;
          background: linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(10px);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .statCard:hover {
          transform: translateY(-6px);
          border-color: rgba(245,166,35,0.45);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(245,166,35,0.15);
        }
      `}</style>
      <Navbar />

      {/* ── 1. HERO — mission-first, real text (not baked into an image) ──── */}
      <section className="heroSection" style={{ padding: '76px 24px 64px', background: 'linear-gradient(160deg, #0a0c14 0%, #101625 55%, #0a0c14 100%)', lineHeight: 'normal' }}>
        <div className="heroOrbs">
          <div className="heroOrb heroOrb1" />
          <div className="heroOrb heroOrb2" />
          <div className="heroOrb heroOrb3" />
        </div>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Link to="/about-build-champions" className="heroBadge" style={{
            display: 'inline-block', margin: '0 0 20px', padding: '6px 16px', borderRadius: 20,
            background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.4)',
            color: '#F5A623', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            A Build Champions 501(c)(3) Initiative
          </Link>
          <h1 className="heroHeadline" style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900,
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.15, color: '#fff', margin: '0 0 22px',
          }}>
            Litigation Tools Shouldn't Depend on{' '}
            <span style={{
              background: 'linear-gradient(135deg,#ffd700,#F5A623,#b8760a)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Your Budget</span>
          </h1>
          <p className="heroSub" style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6, margin: '0 auto 20px', maxWidth: 680,
          }}>
            LitigationSpace.org is operated by <strong style={{ color: '#fff' }}>Build Champions</strong>, a 501(c)(3)
            nonprofit, to expand access to justice. It offers case management, document automation, and AI-assisted
            legal drafting at reduced cost for individuals and small practices — completely free for approved
            pro bono legal clinics.
          </p>
          <p className="heroSub2" style={{
            fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.6, margin: '0 auto 36px', maxWidth: 680,
          }}>
            85% of proceeds fund Build Champions' nonprofit access-to-justice programs; 15% covers platform operating costs.
          </p>
        </div>
      </section>

      {/* ── CTA BAR ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#0a0c14', padding: '52px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>

          <p style={{
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 900,
            letterSpacing: '-0.01em',
            background: 'linear-gradient(135deg, #ffd700 0%, #F5A623 40%, #ffe066 70%, #b8760a 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 32, fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Start here — no account required
          </p>

          <div className="heroCtas" style={{
            display: 'flex', flexWrap: 'wrap', gap: 16,
            justifyContent: 'center', alignItems: 'center',
          }}>

            {/* See reduced pricing — gold */}
            <Link to="/register" style={{ textDecoration: 'none' }} className="heroCta">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '15px 36px', borderRadius: 12,
                background: 'linear-gradient(135deg, #ffe066 0%, #F5A623 40%, #e8940f 80%, #b8760a 100%)',
                boxShadow: '0 0 28px rgba(245,166,35,0.55), 0 2px 0 #7a4a00, inset 0 1px 0 rgba(255,255,255,0.28)',
                color: '#000', fontWeight: 800, fontSize: '1rem',
                fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                See Reduced Pricing
              </span>
            </Link>

            {/* Apply as a pro bono clinic — emerald outline, routes to real contact form */}
            <Link to="/contact" style={{ textDecoration: 'none' }} className="heroCta">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '15px 36px', borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(52,211,153,0.18) 0%, rgba(16,185,129,0.10) 100%)',
                border: '1.5px solid rgba(52,211,153,0.55)',
                boxShadow: '0 0 22px rgba(52,211,153,0.18), inset 0 1px 0 rgba(52,211,153,0.12)',
                color: '#34d399', fontWeight: 700, fontSize: '1rem',
                fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1l1.6 3.5 3.9.4-2.9 2.6.9 3.8-3.5-2-3.5 2 .9-3.8-2.9-2.6 3.9-.4L7.5 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                Apply as a Pro Bono Clinic
              </span>
            </Link>

            {/* Analyze a Motion — electric blue */}
            <Link to="/motion-analyzer" style={{ textDecoration: 'none' }} className="heroCta">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '15px 36px', borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(14,165,233,0.12) 100%)',
                border: '1.5px solid rgba(56,189,248,0.55)',
                boxShadow: '0 0 22px rgba(56,189,248,0.20), inset 0 1px 0 rgba(56,189,248,0.12)',
                color: '#38bdf8', fontWeight: 700, fontSize: '1rem',
                fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 12L7.5 3l5.5 9H2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                Analyze a Motion
              </span>
            </Link>

            {/* Analyze a Document — emerald */}
            <Link to="/document-analyzer" style={{ textDecoration: 'none' }} className="heroCta">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '15px 36px', borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(52,211,153,0.18) 0%, rgba(16,185,129,0.10) 100%)',
                border: '1.5px solid rgba(52,211,153,0.55)',
                boxShadow: '0 0 22px rgba(52,211,153,0.18), inset 0 1px 0 rgba(52,211,153,0.12)',
                color: '#34d399', fontWeight: 700, fontSize: '1rem',
                fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="2" y="1" width="9" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 5h4M5 8h4M5 11h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Analyze a Document
              </span>
            </Link>

            {/* Ask Legal Brain — violet */}
            <Link to="/legal-brain" style={{ textDecoration: 'none' }} className="heroCta">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '15px 36px', borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(139,92,246,0.10) 100%)',
                border: '1.5px solid rgba(167,139,250,0.55)',
                boxShadow: '0 0 22px rgba(167,139,250,0.20), inset 0 1px 0 rgba(167,139,250,0.12)',
                color: '#a78bfa', fontWeight: 700, fontSize: '1rem',
                fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 5v3.5M7.5 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Ask Legal Brain
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* ── 2. OUR IMPACT — glass cards on the same dark gradient as the hero ── */}
      <section style={{ background: '#0a0c14', padding: '0 24px 72px' }}>
        <div style={{ ...S.inner, padding: 0 }}>
          <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16, justifyContent: 'center' }}>Our Impact</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16 }}>
            {STATS.map(s => (
              <div key={s.label} className="statCard">
                <div style={{ fontSize: 34, fontWeight: 900, fontFamily: '"Playfair Display",serif', ...S.goldText }}>{s.value}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', marginTop: 6, fontWeight: 600, letterSpacing: '0.02em' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.55)', fontSize: 13, marginTop: 24 }}>
            <Link to="/about-build-champions" style={{ color: '#F5A623', textDecoration: 'none', fontWeight: 600 }}>Read more about our nonprofit mission →</Link>
          </p>
        </div>
      </section>

      {/* ── 2b. WHO WE SERVE ──────────────────────────────────────────────── */}
      <section style={{ ...S.section, background: '#0a0f1e' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 44px' }}>
            <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16, justifyContent: 'center' }}>Who We Serve</div>
            <h2 style={{ ...S.h2, fontSize: 36, color: '#ffffff', marginBottom: 14 }}>
              Built for Everyone <span style={S.goldText}>Access to Justice</span> Depends On
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7 }}>
              LitigationSpace.org, operated by Build Champions, provides reduced-cost — and for approved pro bono clinics, free — access to the following:
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {[
              'Pro Se / Self-Represented Litigants',
              'Legal Aid Organizations',
              'Public Defenders',
              'Nonprofits & NGOs',
              'Law Students & Clinics',
              'Attorneys in Under-Resourced Areas',
              'Government Agencies',
              'Judicial Officers',
            ].map(w => (
              <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '16px 18px' }}>
                <span style={{ color: '#F5A623', fontWeight: 900, fontSize: 16, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{w}</span>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 3. FREE MOTION INTELLIGENCE ──────────────────────────────────── */}
      <section style={{ ...S.section, background: '#0d1117' }}>
        <Reveal>
        <div style={S.inner}>

          {/* Section header — centered */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16, justifyContent: 'center' }}>Free · No Account Required</div>
            <h2 style={{ ...S.h2, fontSize: 42, color: '#ffffff', marginBottom: 16 }}>
              Instant <span style={S.goldText}>Motion Analysis</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, lineHeight: 1.7, maxWidth: 640, margin: '0 auto' }}>
              Upload a motion, opposition, or reply and receive an instant litigation analysis including argument structure, evidence review, and case law verification.{' '}
              <strong style={{ color: '#ffffff' }}>See your results in seconds.</strong>
            </p>
          </div>

          {/* Two-column: Motion Analyzer | Demo Panel */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24, alignItems: 'start' }}>

            {/* ── Motion Analyzer Module ── */}
            <div style={{
              background: 'linear-gradient(160deg, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.06) 100%)',
              border: '1px solid rgba(139,92,246,0.35)',
              borderRadius: 20, padding: '32px 26px',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 14, background: 'rgba(139,92,246,0.22)', border: '1px solid rgba(139,92,246,0.4)', marginBottom: 20, fontSize: 24 }}>⚖️</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#a78bfa', margin: '0 0 4px', fontFamily: '"Playfair Display",serif' }}>Motion Analyzer</h3>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(167,139,250,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px' }}>Motions · Oppositions · Replies</p>

              {/* Capability blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                {[
                  {
                    icon: '📊',
                    title: 'Motion Strength Score',
                    desc: 'Objective 0–100 score based on legal standard alignment and evidence quality.',
                    color: '#a78bfa',
                  },
                  {
                    icon: '🔍',
                    title: 'Key Weakness Detection',
                    desc: 'Identify unsupported assertions, missing evidence, and contradictions.',
                    color: '#f87171',
                  },
                  {
                    icon: '⚔️',
                    title: 'Suggested Attack Points',
                    desc: 'Strategic observations and case law verification for winning arguments.',
                    color: '#fbbf24',
                  },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                    <div>
                      <p style={{ margin: '0 0 3px', fontSize: 13.5, fontWeight: 700, color: item.color }}>{item.title}</p>
                      <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
                <Link to="/motion-analyzer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  background: '#F5A623', color: '#000000',
                  fontWeight: 700, fontSize: 14, padding: '13px 20px',
                  borderRadius: 11, textDecoration: 'none',
                  boxShadow: '0 2px 0 #8a5500, 0 4px 16px rgba(245,166,35,0.3)',
                }}>
                  Try Motion Analyzer Free
                </Link>
                <Link to="/register" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(99,102,241,0.12) 100%)',
                  border: '1px solid rgba(139,92,246,0.45)',
                  color: '#c4b5fd', fontWeight: 600, fontSize: 13.5, padding: '11px 20px',
                  borderRadius: 11, textDecoration: 'none',
                }}>
                  Get Reduced Access
                </Link>
              </div>
            </div>

            {/* ── Demo Panel (center) ── */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 18, padding: '24px 22px', fontFamily: 'Inter,sans-serif' }}>
              {/* Header */}
              <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'inline-flex', background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 7, padding: '4px 11px', fontSize: 10, color: '#F5A623', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 8 }}>SAMPLE ANALYSIS OUTPUT</div>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>Motion for Summary Judgment · U.S. District Court, SDNY</p>
              </div>

              {/* Motion Strength Score */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Motion Strength Score</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 48, fontWeight: 900, fontFamily: '"Playfair Display",serif', color: '#F5A623', lineHeight: 1 }}>78</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>/100 · Moderate</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[
                      { label: 'Legal Standard',       score: 82, color: '#22c55e' },
                      { label: 'Evidence Strength',    score: 65, color: '#F5A623' },
                      { label: 'Case Law Support',     score: 88, color: '#22c55e' },
                      { label: 'Procedural Compliance',score: 76, color: '#60a5fa' },
                    ].map(item => (
                      <div key={item.label} style={{ marginBottom: 7 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 11 }}>
                          <span style={{ color: 'rgba(255,255,255,0.85)' }}>{item.label}</span>
                          <span style={{ color: item.color, fontWeight: 700 }}>{item.score}</span>
                        </div>
                        <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                          <div style={{ height: '100%', width: `${item.score}%`, background: item.color, borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Issue cards */}
              {[
                {
                  tag: 'Critical Risk',
                  tagColor: '#fca5a5', tagBg: 'rgba(239,68,68,0.08)', tagBorder: 'rgba(239,68,68,0.22)',
                  text: 'Damages claimed but no calculation methodology or expert report referenced.',
                },
                {
                  tag: 'Court Rule',
                  tagColor: '#fbbf24', tagBg: 'rgba(245,166,35,0.08)', tagBorder: 'rgba(245,166,35,0.22)',
                  text: 'SDNY Local Rule 56.1 requires a separate statement of undisputed material facts.',
                },
                {
                  tag: 'Case Law Gap',
                  tagColor: '#60a5fa', tagBg: 'rgba(96,165,250,0.08)', tagBorder: 'rgba(96,165,250,0.22)',
                  text: 'Celotex Corp. v. Catrett, 477 U.S. 317 (1986) — controlling authority not cited.',
                },
              ].map(item => (
                <div key={item.tag} style={{ background: item.tagBg, border: `1px solid ${item.tagBorder}`, borderRadius: 9, padding: '10px 12px', marginBottom: 10 }}>
                  <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: item.tagColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.tag}</p>
                  <p style={{ margin: 0, fontSize: 11.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <Link to="/motion-analyzer" style={{ flex: 1, display: 'block', textAlign: 'center', background: '#F5A623', color: '#000000', fontWeight: 700, fontSize: 12.5, padding: '10px 8px', borderRadius: 8, textDecoration: 'none' }}>
                  Full Report
                </Link>
                <Link to="/motion-analyzer" style={{ flex: 1, display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontWeight: 600, fontSize: 12.5, padding: '10px 8px', borderRadius: 8, textDecoration: 'none' }}>
                  Upload Your Motion
                </Link>
              </div>
              <p style={{ margin: '10px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.35)', textAlign: 'center', lineHeight: 1.4 }}>Issue map, argument depth, evidence analysis, and outcome simulation</p>
            </div>

          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 3b. DOCUMENT ANALYZER ────────────────────────────────────────── */}
      <section style={{ ...S.section, background: '#0a0f1e' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 40, alignItems: 'center' }}>

            {/* ── LEFT — capabilities ── */}
            <div>
              <div className="secLabel" style={{ color: '#38bdf8', marginBottom: 20 }}>Document Intelligence</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 16, background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.35)', fontSize: 26, flexShrink: 0 }}>📄</div>
                <div>
                  <h2 style={{ ...S.h2, fontSize: 38, color: '#ffffff', margin: 0 }}>
                    Document <span style={{ background: 'linear-gradient(135deg,#38bdf8,#7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Analyzer</span>
                  </h2>
                  <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: 'rgba(56,189,248,0.65)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>For All Legal Documents</p>
                </div>
              </div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 32 }}>
                Built for contracts, emails, discovery, claims, and general legal documents. Extract key facts, obligations, deadlines, risks, and strategic issues in seconds.
              </p>

              {/* Capability checklist */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', marginBottom: 36 }}>
                {[
                  'Key facts & party identification',
                  'Obligations & deadline mapping',
                  'Risk & liability flagging',
                  'Strategic issue spotting',
                  'Discovery pattern analysis',
                  'Contract clause red-flagging',
                ].map(cap => (
                  <div key={cap} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: '#38bdf8', fontWeight: 900, fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>{cap}</span>
                  </div>
                ))}
              </div>

              <Link to="/document-analyzer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #7dd3fc 100%)',
                color: '#000000', fontWeight: 800, fontSize: 15, padding: '14px 32px',
                borderRadius: 11, textDecoration: 'none',
                boxShadow: '0 2px 0 #0369a1, 0 6px 24px rgba(14,165,233,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}>
                Analyze Documents →
              </Link>
            </div>

            {/* ── RIGHT — document types visual ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '📝', type: 'Contracts & Agreements',    tag: 'Obligations · Deadlines · Clauses',  color: '#38bdf8', bg: 'rgba(56,189,248,0.08)',  border: 'rgba(56,189,248,0.22)' },
                { icon: '📧', type: 'Emails & Correspondence',   tag: 'Admissions · Intent · Timeline',     color: '#a78bfa', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.22)' },
                { icon: '🔍', type: 'Discovery Documents',       tag: 'Patterns · Gaps · Key Evidence',     color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.22)' },
                { icon: '⚠️', type: 'Claims & Complaints',       tag: 'Liability · Damages · Risk Flags',   color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.22)' },
                { icon: '🏢', type: 'Corporate Documents',       tag: 'Governance · Compliance · Exposure', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.22)' },
              ].map(item => (
                <div key={item.type} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: item.bg, border: `1px solid ${item.border}`,
                  borderRadius: 14, padding: '16px 20px',
                }}>
                  <div style={{ fontSize: 26, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 700, color: item.color }}>{item.type}</p>
                    <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.80)' }}>{item.tag}</p>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.color, background: `${item.bg}`, border: `1px solid ${item.border}`, borderRadius: 6, padding: '3px 9px', flexShrink: 0 }}>Analyze</div>
                </div>
              ))}
            </div>

          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 8. LEGAL BRAIN — dark copy left / white chat demo right ─────── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', minHeight: 'unset' }}>
        <Reveal>

        {/* ── LEFT — dark navy, marketing copy ── */}
        <div style={{ background: '#0d1117', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 52px' }}>
          <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16 }}>
            Legal Brain
          </div>
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontWeight: 900, lineHeight: 1.15, margin: '0 0 16px', fontSize: 38, color: '#ffffff' }}>
            AI Legal Brain —<br />
            <span style={{ background: 'linear-gradient(135deg,#ffd700,#F5A623,#b8760a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Your 24/7 Legal<br />Research Partner
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            Ask any legal question and get authoritative, jurisdiction-aware answers grounded in real case law, statutes, and regulations. Free for general legal information.
          </p>

          <div style={{ background: 'rgba(245,166,35,0.07)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 12, padding: '16px 20px', marginBottom: 28 }}>
            <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: '#F5A623' }}>Consultation Pricing</p>
            {[
              { tier: 'Free',         desc: 'General legal information, public case law' },
              { tier: 'Professional', desc: 'Case-specific analysis, document review' },
              { tier: 'Firm',         desc: 'Team access, bulk queries, API integration' },
            ].map(t => (
              <div key={t.tier} style={{ display: 'flex', gap: 10, fontSize: 13, marginBottom: 7 }}>
                <span style={{ color: '#F5A623', fontWeight: 700, width: 90, flexShrink: 0 }}>{t.tier}</span>
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>{t.desc}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {[
              'Jurisdiction-aware answers with citations',
              'Upload documents for instant AI review',
              'Case law verification built-in',
              'Free for general questions, premium for case advice',
            ].map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                <span style={{ color: '#F5A623', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{f}
              </div>
            ))}
          </div>

          <Link to="/legal-brain" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F5A623', color: '#000000', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 8, textDecoration: 'none', alignSelf: 'flex-start' }}>
            Open Legal Brain →
          </Link>
        </div>

        {/* ── RIGHT — white, animated chat demo ── */}
        <div style={{ background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
          <style>{`
            @keyframes lbFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes lbBlink  { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes lbDotBob { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-4px); opacity: 1; } }
            .lbMsg { opacity: 0; animation: lbFadeIn 0.5s ease both; }
            .lbDot1 { animation: lbDotBob 1s ease-in-out infinite 0s; }
            .lbDot2 { animation: lbDotBob 1s ease-in-out infinite 0.2s; }
            .lbDot3 { animation: lbDotBob 1s ease-in-out infinite 0.4s; }
          `}</style>

          {/* Chrome bar */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#fff8c0,#ffd700,#F5A623,#b8760a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, fontFamily: '"Playfair Display",serif', color: '#000', flexShrink: 0 }}>LS</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0f1e', lineHeight: 1.2 }}>Legal Brain</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>AI Legal Research Assistant</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#16a34a', fontWeight: 600 }}>● Online</span>
          </div>

          {/* Animated conversation */}
          <div style={{ flex: 1, padding: '20px 20px 12px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'hidden' }}>

            {/* User Q1 */}
            <div className="lbMsg" style={{ display: 'flex', gap: 8, flexDirection: 'row-reverse', animationDelay: '0.4s' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#374151', flexShrink: 0, fontFamily: 'Inter,sans-serif', fontWeight: 700 }}>U</div>
              <div style={{ maxWidth: '78%', background: '#F5A623', borderRadius: '10px 10px 2px 10px', padding: '9px 13px' }}>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: '#000', fontFamily: 'Inter,sans-serif' }}>What are the elements of negligence?</p>
              </div>
            </div>

            {/* AI A1 */}
            <div className="lbMsg" style={{ display: 'flex', gap: 8, animationDelay: '1.3s' }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg,#fff8c0,#ffd700,#F5A623,#b8760a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, fontFamily: '"Playfair Display",serif', color: '#000', flexShrink: 0 }}>LS</div>
              <div style={{ maxWidth: '82%', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '10px 10px 10px 2px', padding: '9px 13px' }}>
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#1a1a1a', fontFamily: 'Inter,sans-serif' }}>
                  Negligence requires <strong style={{ color: '#b8760a' }}>four elements</strong>:<br />
                  1. <strong style={{ color: '#111827' }}>Duty</strong> — a legal obligation to act reasonably<br />
                  2. <strong style={{ color: '#111827' }}>Breach</strong> — failure to meet that standard<br />
                  3. <strong style={{ color: '#111827' }}>Causation</strong> — actual &amp; proximate cause<br />
                  4. <strong style={{ color: '#111827' }}>Damages</strong> — cognizable harm<br />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 6, display: 'block' }}>See <em>Palsgraf v. Long Island R.R.</em>, 248 N.Y. 339 (1928)</span>
                </p>
              </div>
            </div>

            {/* User Q2 */}
            <div className="lbMsg" style={{ display: 'flex', gap: 8, flexDirection: 'row-reverse', animationDelay: '2.8s' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#374151', flexShrink: 0, fontFamily: 'Inter,sans-serif', fontWeight: 700 }}>U</div>
              <div style={{ maxWidth: '78%', background: '#F5A623', borderRadius: '10px 10px 2px 10px', padding: '9px 13px' }}>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: '#000', fontFamily: 'Inter,sans-serif' }}>Does California use comparative fault?</p>
              </div>
            </div>

            {/* AI A2 — answer appearing with cursor */}
            <div className="lbMsg" style={{ display: 'flex', gap: 8, animationDelay: '3.8s' }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg,#fff8c0,#ffd700,#F5A623,#b8760a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, fontFamily: '"Playfair Display",serif', color: '#000', flexShrink: 0 }}>LS</div>
              <div style={{ maxWidth: '82%', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '10px 10px 10px 2px', padding: '9px 13px' }}>
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: '#1a1a1a', fontFamily: 'Inter,sans-serif' }}>
                  Yes. California applies <strong style={{ color: '#b8760a' }}>pure comparative fault</strong> (<em>Li v. Yellow Cab Co.</em>, 1975). Plaintiff's damages are reduced by their own percentage of fault — even 99% at-fault plaintiffs may recover. Unlike contributory negligence states where any fault bars recovery.
                  <span style={{ display: 'inline-block', width: 2, height: 13, background: '#F5A623', verticalAlign: 'middle', marginLeft: 2, animation: 'lbBlink 0.85s step-end infinite' }} />
                </p>
              </div>
            </div>

          </div>

          {/* Live input bar — stays interactive */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 8, flexShrink: 0 }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendPublicChat()}
              placeholder="Try it — ask your own legal question…"
              style={{ flex: 1, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '9px 14px', fontSize: 12.5, color: '#1a1a1a', outline: 'none', fontFamily: 'Inter,sans-serif' }}
            />
            <button
              onClick={sendPublicChat}
              disabled={chatLoading || !chatInput.trim()}
              style={{ background: '#F5A623', color: '#000', fontWeight: 700, padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, opacity: chatLoading ? 0.6 : 1, flexShrink: 0 }}
            >→</button>
          </div>

          {/* Live replies appear below if user types */}
          {(chatMessages.length > 0 || chatLoading) && (
            <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 160, overflowY: 'auto' }}>
              {chatMessages.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: 22, height: 22, borderRadius: m.role === 'assistant' ? 5 : '50%', background: m.role === 'assistant' ? 'linear-gradient(135deg,#fff8c0,#ffd700,#F5A623,#b8760a)' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, color: m.role === 'assistant' ? '#000' : '#374151', flexShrink: 0 }}>
                    {m.role === 'assistant' ? 'LS' : 'U'}
                  </div>
                  <div style={{ maxWidth: '80%', background: m.role === 'user' ? '#F5A623' : '#f3f4f6', border: '1px solid', borderColor: m.role === 'user' ? 'transparent' : '#e5e7eb', borderRadius: 7, padding: '6px 10px' }}>
                    <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.5, color: m.role === 'user' ? '#000' : '#1a1a1a', whiteSpace: 'pre-wrap', fontFamily: 'Inter,sans-serif' }}>{m.content}</p>
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ display: 'flex', gap: 5, paddingLeft: 30, alignItems: 'center' }}>
                  {[0,1,2].map(i => <div key={i} className={`lbDot${i+1}`} style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5A623' }} />)}
                </div>
              )}
            </div>
          )}
        </div>

        </Reveal>
      </section>

      {/* ── 4. PLATFORM CAPABILITIES — 7 PILLARS ─────────────────────────── */}
      <section style={{ ...S.section, background: '#0d1117' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16 }}>Platform Capabilities</div>
            <h2 style={{ ...S.h2, fontSize: 40, color: '#ffffff', marginBottom: 16 }}>
              Your Complete Legal <span style={S.goldText}>Command Center</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
              Seven purpose-built tools covering every dimension of litigation — from first question to final verdict.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
            {PILLARS.map(p => {
              const authed = (() => { try { const t = localStorage.getItem('token'); return !!(t && t.length > 10) } catch { return false } })()
              const href = authed ? p.to : '/register'
              return (
                <div
                  key={p.title}
                  style={{
                    background: p.bg,
                    border: `1px solid rgba(255,255,255,0.10)`,
                    borderTop: `3px solid ${p.accent}`,
                    borderRadius: 16,
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform .2s, box-shadow .2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-4px) scale(1.02)'
                    el.style.boxShadow = `0 12px 40px ${p.accent}33`
                    el.style.borderColor = p.accent
                    el.style.borderTopColor = p.accent
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0) scale(1)'
                    el.style.boxShadow = 'none'
                    el.style.borderColor = 'rgba(255,255,255,0.10)'
                    el.style.borderTopColor = p.accent
                  }}
                >
                  {/* Icon */}
                  <div style={{ fontSize: 40, marginBottom: 16, lineHeight: 1 }}>{p.icon}</div>

                  {/* Heading */}
                  <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#ffffff', fontFamily: '"Playfair Display",serif' }}>{p.title}</h3>
                  <p style={{ margin: '0 0 14px', fontSize: 12, color: p.accent, fontWeight: 600, letterSpacing: '0.03em' }}>{p.subtitle}</p>

                  {/* Description */}
                  <p style={{ margin: '0 0 18px', fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, flexGrow: 1 }}>{p.desc}</p>

                  {/* Bullets */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px' }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 7, lineHeight: 1.5 }}>
                        <span style={{ color: '#F5A623', flexShrink: 0, fontWeight: 700 }}>→</span>{b}
                      </li>
                    ))}
                  </ul>

                  {/* Explore link */}
                  <Link
                    to={href}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: p.accent, textDecoration: 'none' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.textDecoration = 'underline')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.textDecoration = 'none')}
                  >
                    Explore {p.title} →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 5. WIN PROBABILITY SIMULATOR ─────────────────────────────────── */}
      <section style={{ ...S.section, background: '#0d1117' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16 }}>Win Probability Simulator</div>
              <h2 style={{ ...S.h2, fontSize: 38, color: '#ffffff', marginBottom: 16 }}>
                Understand Your Case.<br /><span style={S.goldText}>Estimate the Odds.</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                Input your case factors — evidence strength, legal precedent, jurisdiction, opposing counsel — and get an AI-generated probability estimate with strategic considerations to help inform your decisions. This is a planning aid, not legal advice or a guaranteed outcome.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {['Adjustable case factor weighting', 'Jurisdiction-specific modeling', 'Settlement vs. trial recommendation', 'Comparable case benchmarking'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
                    <span style={{ color: '#F5A623', fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <Link to="/win-simulator" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F5A623', color: '#000000', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
                Run Win Simulator →
              </Link>
            </div>

            {/* Preview */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, padding: 28 }}>
              <p style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>Case Factor Analysis</p>
              {[
                { label: 'Strength of Evidence', value: 8, max: 10 },
                { label: 'Legal Precedent',      value: 7, max: 10 },
                { label: 'Jurisdiction',          value: 6, max: 10 },
                { label: 'Opposing Counsel',      value: 5, max: 10 },
                { label: 'Client Credibility',    value: 9, max: 10 },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                    <span style={{ color: 'rgba(255,255,255,0.85)' }}>{f.label}</span>
                    <span style={{ color: '#F5A623', fontWeight: 700 }}>{f.value}/{f.max}</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${(f.value / f.max) * 100}%`, background: 'linear-gradient(to right,#F5A623,#ffd700)', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: '16px 20px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 44, fontWeight: 900, fontFamily: '"Playfair Display",serif', color: '#22c55e' }}>74%</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.80)', marginTop: 2 }}>Estimated Win Probability</div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 7. DRAFTING ENGINE — dark copy left / white demo right ──────── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', minHeight: 'unset' }}>
        <Reveal>

        {/* ── LEFT — pure black, marketing copy ── */}
        <div style={{ background: '#0d1117', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 52px' }}>
          <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16 }}>
            Drafting Engine
          </div>
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontWeight: 900, lineHeight: 1.15, margin: '0 0 16px', fontSize: 38, color: '#ffffff' }}>
            Draft Like the Court<br />
            <span style={{ background: 'linear-gradient(135deg,#ffd700,#F5A623,#b8760a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Is Watching
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            Generate motions, complaints, demand letters, briefs, and memoranda with proper court formatting. Download as Word or PDF. AI names your exhibits automatically.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 32 }}>
            {[
              'Smart intake form for any document type',
              'Court-specific formatting rules built in',
              'Automatic exhibit labeling and citation',
              'AI rewrite and strengthen any passage',
              'Export to DOCX or court-ready PDF',
            ].map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                <span style={{ color: '#F5A623', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{f}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/drafting" style={{ background: '#F5A623', color: '#000000', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
              Open Drafting Engine →
            </Link>
            <Link to="/drafting/new" style={{ background: 'transparent', color: '#ffffff', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 8, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)', whiteSpace: 'nowrap' as const }}>
              Smart Intake Form
            </Link>
          </div>
        </div>

        {/* ── RIGHT — white, animated document demo ── */}
        <div style={{ background: '#ffffff', display: 'flex', flexDirection: 'column', padding: '40px 44px' }}>
          {/* Window chrome bar */}
          <div style={{ background: '#e8e8e8', borderRadius: '12px 12px 0 0', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {['#ef4444','#f59e0b','#22c55e'].map(c => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ marginLeft: 12, fontSize: 12, color: '#888888', fontFamily: 'Inter,sans-serif' }}>
              Motion to Dismiss — Smith v. Jones.docx
            </span>
          </div>

          {/* Animated drafting mockup — white background */}
          <div style={{ background: '#fafafa', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #e5e5e5', borderTop: 'none' }}>
            <style>{`
              @keyframes draftFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
              @keyframes draftBlink  { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
              @keyframes draftAiPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
              .draftLine { opacity: 0; animation: draftFadeIn 0.55s ease both; }
              .draftCursor { display: inline-block; width: 2px; height: 13px; background: #F5A623; vertical-align: middle; margin-left: 2px; animation: draftBlink 0.85s step-end infinite; }
              .draftAiDot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: draftAiPulse 1.4s ease-in-out infinite; }
            `}</style>

            {/* AI status bar */}
            <div style={{ padding: '8px 18px', background: 'rgba(34,197,94,0.06)', borderBottom: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <span className="draftAiDot" />
              <span style={{ fontSize: 11, color: '#16a34a', fontFamily: 'Inter,sans-serif', fontWeight: 600 }}>AI Drafting in Progress</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter,sans-serif', marginLeft: 'auto' }}>~12s remaining</span>
            </div>

            {/* Document scroll area */}
            <div style={{ padding: '18px 22px', fontFamily: 'Georgia, serif', fontSize: 11.5, lineHeight: 1.85, color: '#374151', overflowY: 'auto', flex: 1 }}>
              <p className="draftLine" style={{ textAlign: 'center', fontWeight: 700, marginBottom: 10, color: '#111827', fontSize: 10.5, letterSpacing: '0.03em', animationDelay: '0.1s' }}>
                IN THE UNITED STATES DISTRICT COURT<br />
                FOR THE SOUTHERN DISTRICT OF NEW YORK
              </p>
              <div className="draftLine" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 11, animationDelay: '0.5s' }}>
                <div>
                  <div style={{ color: '#111827', fontWeight: 700 }}>JOHN SMITH,</div>
                  <div style={{ paddingLeft: 28 }}>Plaintiff,</div>
                  <div style={{ marginTop: 4 }}>v.</div>
                  <div style={{ color: '#111827', fontWeight: 700, marginTop: 4 }}>ACME CORPORATION,</div>
                  <div style={{ paddingLeft: 28 }}>Defendant.</div>
                </div>
                <div style={{ textAlign: 'right', paddingTop: 2, color: 'rgba(255,255,255,0.8)', fontSize: 10, whiteSpace: 'nowrap' }}>
                  Case No. 2026-CV-01234
                </div>
              </div>
              <p className="draftLine" style={{ textAlign: 'center', fontWeight: 700, marginBottom: 14, fontSize: 11.5, color: '#111827', animationDelay: '1.0s' }}>
                DEFENDANT'S MOTION TO DISMISS
              </p>
              <p className="draftLine" style={{ marginBottom: 10, animationDelay: '1.5s' }}>
                Pursuant to Fed. R. Civ. P. 12(b)(6), Defendant Acme Corporation respectfully moves this Court to dismiss Plaintiff's Complaint in its entirety for failure to state a claim upon which relief can be granted.
              </p>
              <p className="draftLine" style={{ fontWeight: 700, marginBottom: 6, fontSize: 11.5, color: '#111827', animationDelay: '2.0s' }}>
                I. INTRODUCTION
              </p>
              <p className="draftLine" style={{ marginBottom: 10, color: 'rgba(255,255,255,0.8)', animationDelay: '2.4s' }}>
                Plaintiff's Complaint fails to allege facts sufficient to establish any cognizable legal claim. The allegations are conclusory and do not meet the pleading standard of <em>Ashcroft v. Iqbal</em>, 556 U.S. 662 (2009).
              </p>
              <p className="draftLine" style={{ fontWeight: 700, marginBottom: 6, fontSize: 11.5, color: '#111827', animationDelay: '3.0s' }}>
                II. LEGAL STANDARD
              </p>
              <p className="draftLine" style={{ animationDelay: '3.5s', color: '#374151' }}>
                <span style={{ background: 'rgba(245,166,35,0.15)', padding: '1px 3px', borderRadius: 2 }}>
                  To survive a motion to dismiss, a complaint must contain sufficient factual matter, accepted as true, to "state a claim to relief that is plausible on its face."
                </span>
                <span className="draftCursor" />
              </p>
            </div>
          </div>

          {/* Action bar */}
          <div style={{ background: '#e8e8e8', borderRadius: '0 0 12px 12px', padding: '10px 16px', display: 'flex', gap: 8, flexShrink: 0 }}>
            <div style={{ background: '#F5A623', color: '#000', fontWeight: 700, fontSize: 11, padding: '5px 13px', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap' }}>✨ AI Improve</div>
            <div style={{ background: '#ffffff', color: '#374151', border: '1px solid #d1d5db', fontSize: 11, padding: '5px 13px', borderRadius: 6, cursor: 'pointer' }}>Export DOCX</div>
            <div style={{ background: '#ffffff', color: '#374151', border: '1px solid #d1d5db', fontSize: 11, padding: '5px 13px', borderRadius: 6, cursor: 'pointer' }}>Export PDF</div>
          </div>
        </div>

        </Reveal>
      </section>

      {/* ── 9. AI CASE NAVIGATOR ─────────────────────────────────────────── */}
      <section style={{ ...S.section, background: '#0d1117' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <div className="secLabel" style={{ color: '#8b5cf6', marginBottom: 16 }}>AI Case Navigator</div>
              <h2 style={{ ...S.h2, fontSize: 38, color: '#ffffff', marginBottom: 16 }}>
                An AI That Only <span style={{ color: '#8b5cf6' }}>Knows Your Case</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                A private AI that knows ONLY your case. No cross-contamination. Watches deadlines. Finds evidence gaps. Suggests next moves.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {[
                  { icon: '🔒', label: 'Case-isolated', desc: 'Your documents never train shared models or enter other cases' },
                  { icon: '⏰', label: 'Deadline aware', desc: 'Tracks all filed dates, statutes of limitations, and court deadlines' },
                  { icon: '🔍', label: 'Evidence gaps', desc: 'Identifies missing exhibits, unverified facts, and weak citations' },
                  { icon: '🗺️', label: 'Next move engine', desc: 'Suggests strategic actions based on current case posture' },
                ].map(f => (
                  <div key={f.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#ffffff' }}>{f.label}</p>
                      <p style={{ margin: '2px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.80)' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/case-vault" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#8b5cf6', color: '#fff', fontWeight: 700, fontSize: 14, padding: '11px 22px', borderRadius: 8, textDecoration: 'none' }}>
                Activate Case Navigator →
              </Link>
            </div>

            {/* RAG architecture visual */}
            <div style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 16, padding: 28 }}>
              <p style={{ margin: '0 0 20px', fontSize: 13, fontWeight: 700, color: 'rgba(139,92,246,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>How Case Navigator Works</p>
              {[
                { step: '1', title: 'Ingest', desc: 'All case documents, exhibits, and communications are indexed into a private vector store' },
                { step: '2', title: 'Retrieve', desc: 'RAG architecture pulls only relevant case context for each query — zero leakage' },
                { step: '3', title: 'Reason', desc: 'Claude AI reasons over your specific facts, not generic legal knowledge' },
                { step: '4', title: 'Act', desc: 'Surfaces next actions, flags risks, drafts responses based on YOUR case' },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(139,92,246,0.3)', border: '1px solid rgba(139,92,246,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#a78bfa', flexShrink: 0 }}>{s.step}</div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#ffffff' }}>{s.title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 10. WHY LEGAL PROFESSIONALS ──────────────────────────────────── */}
      <section style={{ ...S.section, background: '#ffffff' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16 }}>Why Us</div>
              <h2 style={{ ...S.h2, fontSize: 38, color: '#0a0f1e', marginBottom: 16 }}>
                Why Legal Professionals<br /><span style={S.goldText}>Choose LitigationSpace</span>
              </h2>
              <p style={{ color: '#1a1a1a', fontSize: 15, lineHeight: 1.7 }}>
                Designed for legal professionals — from solo practitioners to firms handling 300+ active matters.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {WHY_US.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '18px 22px' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Playfair Display",serif', fontWeight: 900, fontSize: 14, color: '#F5A623', flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ margin: 0, fontSize: 15, color: '#1a1a1a', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 11. SECURITY ─────────────────────────────────────────────────── */}
      <section style={{ ...S.section, background: '#0a0e1a' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="secLabel" style={{ color: '#22d3ee', marginBottom: 16 }}>Enterprise Security</div>
            <h2 style={{ ...S.h2, fontSize: 42, marginBottom: 16 }}>
              <span style={{
                background: 'linear-gradient(135deg, #e2e8f0 0%, #ffffff 35%, #94a3b8 60%, #ffffff 80%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Security Built for </span>
              <span style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 40%, #86efac 70%, #16a34a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Legal Professionals</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Privileged communications and confidential case data need more than a login screen.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 20 }}>
            {[
              { icon: '🏢', label: 'Multi-Tenant',   desc: 'Isolated data environments per firm — zero cross-contamination', bg: '#1e3a8a', accent: '#60a5fa' },
              { icon: '🔐', label: 'AES-256',         desc: 'Military-grade encryption at rest and in transit',               bg: '#78350f', accent: '#fbbf24' },
              { icon: '✅', label: 'SOC 2',           desc: 'Annual third-party security audit and certification',             bg: '#14532d', accent: '#4ade80' },
              { icon: '👤', label: 'RBAC',            desc: 'Role-based access control — attorneys see only their matters',   bg: '#4c1d95', accent: '#c084fc' },
              { icon: '💰', label: 'IOLTA Compliant', desc: 'Trust account handling meets bar association requirements',      bg: '#134e4a', accent: '#2dd4bf' },
            ].map(s => (
              <div key={s.label} style={{
                textAlign: 'center',
                background: s.bg,
                borderRadius: 16,
                padding: '22px 14px 20px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 20px rgba(0,0,0,0.35), 0 1px 0 rgba(0,0,0,0.5)`,
                transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s ease',
                cursor: 'default',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-7px)'; el.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.14), 0 16px 36px rgba(0,0,0,0.45), 0 1px 0 rgba(0,0,0,0.5)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 20px rgba(0,0,0,0.35), 0 1px 0 rgba(0,0,0,0.5)`; }}
              >
                {/* Glass sheen */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(180deg,rgba(255,255,255,0.08) 0%,transparent 100%)', borderRadius: '16px 16px 0 0', pointerEvents: 'none' }} />
                {/* Accent top bar */}
                <div style={{ width: 28, height: 2.5, background: s.accent, borderRadius: 2, margin: '0 auto 14px', opacity: 0.9 }} />
                {/* Icon */}
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <p style={{ margin: '0 0 7px', fontWeight: 800, fontSize: 14, color: s.accent, fontFamily: 'Inter,sans-serif' }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: 11.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 12. HOW IT WORKS ─────────────────────────────────────────────── */}
      <section style={{ ...S.section, background: '#0d1117' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16 }}>Process</div>
            <h2 style={{ ...S.h2, fontSize: 38, color: '#ffffff' }}>
              How It <span style={S.goldText}>Works</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, position: 'relative' }}>
            {/* connector line */}
            <div style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 2, background: 'rgba(245,166,35,0.2)', zIndex: 0 }} />
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#F5A623,#ffd700)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: '"Playfair Display",serif', fontWeight: 900, fontSize: 18, color: '#000', boxShadow: '0 4px 20px rgba(245,166,35,0.3)' }}>{s.step}</div>
                <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#ffffff', fontFamily: '"Playfair Display",serif' }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.80)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 13. PRACTICE AREAS — cream bg, infinite carousel ────────────── */}
      <section style={{ background: '#FAF8F3', padding: '80px 0 88px', overflow: 'hidden' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16 }}>Practice Areas</div>
            <h2 style={{ ...S.h2, fontSize: 38, color: '#0a0f1e' }}>
              Built for Every <span style={S.goldText}>Practice Area</span>
            </h2>
            <p style={{ color: '#4b5563', fontSize: 15, maxWidth: 480, margin: '14px auto 0', lineHeight: 1.7 }}>
              Purpose-built tools for every corner of the legal profession — hover to pause.
            </p>
          </div>
        </div>

        {/* Full-bleed scrolling track */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Left fade mask */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 140, background: 'linear-gradient(to right, #FAF8F3 30%, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          {/* Right fade mask */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 140, background: 'linear-gradient(to left, #FAF8F3 30%, transparent)', zIndex: 2, pointerEvents: 'none' }} />

          <style>{`
            @keyframes paScroll {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .paTrack {
              display: flex;
              gap: 28px;
              width: max-content;
              padding: 28px 28px 40px;
              animation: paScroll 26s linear infinite;
            }
            .paTrack:hover { animation-play-state: paused; }
            .paCard {
              width: 280px;
              flex-shrink: 0;
              border-radius: 22px;
              padding: 36px 28px 32px;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              cursor: default;
              position: relative;
              overflow: hidden;
              /* 3-D depth: ambient + lift + bottom edge */
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,0.13),
                0 2px 0 rgba(0,0,0,0.55),
                0 8px 24px rgba(0,0,0,0.38),
                0 24px 48px rgba(0,0,0,0.22);
              transition: transform 0.35s cubic-bezier(0.23,1,0.32,1),
                          box-shadow 0.35s ease;
            }
            /* glass-light sheen across top-left */
            .paCard::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0;
              height: 55%;
              background: linear-gradient(160deg, rgba(255,255,255,0.09) 0%, transparent 70%);
              border-radius: 22px 22px 0 0;
              pointer-events: none;
            }
            /* bottom edge 3-D ledge */
            .paCard::after {
              content: '';
              position: absolute;
              bottom: -3px; left: 8px; right: 8px;
              height: 6px;
              border-radius: 0 0 18px 18px;
              background: rgba(0,0,0,0.45);
              filter: blur(4px);
              pointer-events: none;
            }
            .paCard:hover {
              transform: translateY(-16px) perspective(900px) rotateX(5deg);
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,0.18),
                0 2px 0 rgba(0,0,0,0.6),
                0 28px 56px rgba(0,0,0,0.55),
                0 48px 80px rgba(0,0,0,0.28);
            }
          `}</style>

          <div className="paTrack">
            {[...PRACTICE_AREAS, ...PRACTICE_AREAS].map((p, i) => (
              <div key={i} className="paCard" style={{ background: p.bg, border: (p as any).light ? '1.5px solid #e8d5a3' : undefined }}>
                {/* Accent icon circle */}
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: `${p.accent}22`,
                  border: `1.5px solid ${p.accent}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, marginBottom: 18, flexShrink: 0,
                  boxShadow: `0 0 18px ${p.accent}33`,
                }}>
                  {p.icon}
                </div>
                {/* Accent line */}
                <div style={{ width: 36, height: 2.5, background: p.accent, borderRadius: 2, marginBottom: 14, opacity: 0.85 }} />
                <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 15.5, color: (p as any).light ? '#0a0f1e' : '#ffffff', fontFamily: '"Playfair Display",serif', lineHeight: 1.25 }}>{p.name}</p>
                <p style={{ margin: 0, fontSize: 12.5, color: (p as any).light ? '#4b5563' : 'rgba(255,255,255,0.58)', lineHeight: 1.7, flexGrow: 1 }}>{p.desc}</p>
                <div style={{ marginTop: 20, fontSize: 11, fontWeight: 700, color: p.accent, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>
                  Explore →
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── 15. FINAL CTA ────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 0', background: '#0a1628' }}>
        <Reveal>
        <div style={{ ...S.inner, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Logo size="lg" litigationColor="#ffffff" />
          </div>
          <h2 style={{ ...S.h2, fontSize: 48, color: '#ffffff', marginBottom: 16 }}>
            Ready to Get <span style={S.goldText}>Started?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Join attorneys, pro se litigants, and legal aid organizations using LitigationSpace.org to manage cases and draft with confidence — at reduced cost, and free for approved pro bono legal clinics.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
            <Link to="/register" style={{ background: '#F5A623', color: '#000000', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 9, textDecoration: 'none', boxShadow: '0 4px 28px rgba(245,166,35,0.35)' }}>
              Get Reduced Access →
            </Link>
            <Link to="/pricing" style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', fontWeight: 600, fontSize: 16, padding: '14px 32px', borderRadius: 9, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)' }}>
              View Pricing
            </Link>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>No credit card required · 7-day free trial · Cancel anytime</p>
        </div>
        </Reveal>
      </section>

      {/* ── LIVE BENCH MARKETPLACE — honest "early access" framing, no fabricated listings ── */}
      <section id="live-bench" style={{ ...S.section, background: '#ffffff' }}>
        <Reveal>
        <div style={S.inner}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <div style={{
              display: 'inline-block', margin: '0 0 16px', padding: '5px 14px', borderRadius: 20,
              background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.35)',
              color: '#b8760a', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              Early Access
            </div>
            <div className="secLabel" style={{ color: '#F5A623', marginBottom: 16, justifyContent: 'center' }}>Live Bench Marketplace</div>
            <h2 style={{ ...S.h2, fontSize: 38, color: '#0a0f1e', marginBottom: 16 }}>
              Legal Experts <span style={S.goldText}>On Demand</span>
            </h2>
            <p style={{ color: '#1a1a1a', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              Live Bench is our expert-witness and co-counsel marketplace, currently building its verified network.
              We do not display sample or placeholder professionals as available listings — profiles you see on the
              live marketplace are real registrants only. Interested in joining as an expert, or requesting one for
              your case? Get in touch and we'll follow up directly.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/live-bench" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#F5A623,#e0941f)', color: '#000000', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 8, textDecoration: 'none' }}>
                Explore Live Bench →
              </Link>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: '1px solid rgba(0,0,0,0.15)', color: '#0a0f1e', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 8, textDecoration: 'none' }}>
                Request an Expert
              </Link>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── Build Champions ── */}
      <section style={{ background: '#0a1628', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <Reveal>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse,rgba(245,166,35,0.10) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,166,35,0.10)', border: '1px solid rgba(245,166,35,0.35)', borderRadius: 999, padding: '5px 16px', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#F5A623', display: 'inline-block' }} />
            <span style={{ color: '#F5A623', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>501(c)(3) Nonprofit Organization</span>
          </div>

          {/* Headline */}
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, margin: '0 0 20px' }}>
            Built for Justice.<br />
            <span style={{ color: '#F5A623' }}>Powered by People.</span>
          </h2>

          {/* Sub-headline */}
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 40px' }}>
            LitigationSpace is built and operated by <strong style={{ color: '#e2e8f0' }}>Build Champions</strong>, a registered 501(c)(3) nonprofit on a mission to democratize access to justice — making world-class litigation tools available to every attorney, legal aid organization, and pro se litigant regardless of resources.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 0, justifyContent: 'center', marginBottom: 44, flexWrap: 'wrap' }}>
            {[
              { value: '12', label: 'Countries Served' },
              { value: '501(c)(3)', label: 'Tax-Deductible Donations' },
              { value: 'Free', label: 'Access for Legal Aid Orgs' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '0 32px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', textAlign: 'center' }}>
                <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 28, fontWeight: 900, color: '#F5A623', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/donate"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#F5A623,#e08a10)', color: '#000', fontWeight: 800, fontSize: 15, padding: '14px 32px', borderRadius: 10, textDecoration: 'none', boxShadow: '0 0 32px rgba(245,166,35,0.35)', letterSpacing: '0.01em' }}
            >
              ❤ Donate to Build Champions
            </Link>
            <Link
              to="/about-build-champions"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: '1px solid rgba(245,166,35,0.40)', color: '#F5A623', fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 10, textDecoration: 'none' }}
            >
              Our Mission →
            </Link>
          </div>

          {/* Tax note */}
          <p style={{ marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
            Build Champions is a registered 501(c)(3) nonprofit. Donations are tax-deductible to the extent permitted by law.
          </p>
        </div>
        </Reveal>
      </section>

      <Footer />
      <SupportWidget />
      </div>
    </>
  )
}
