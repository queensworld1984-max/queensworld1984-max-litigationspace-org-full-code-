import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const GOLD = '#F5A623'
const DARK = '#0d1117'
const CARD = '#161d2e'
const BD   = 'rgba(255,255,255,0.08)'
const T1   = '#ffffff'
const T2   = 'rgba(255,255,255,0.68)'
const T3   = 'rgba(255,255,255,0.42)'

interface ResourceLink { title: string; desc: string; to: string; external?: boolean }
interface ResourceGroup { heading: string; items: ResourceLink[] }

const GROUPS: ResourceGroup[] = [
  {
    heading: 'Free Tools',
    items: [
      { title: 'Motion Analyzer', desc: 'Upload a motion and get an AI-generated strength/weakness report with case law citations — free, no account required.', to: '/motion-analyzer' },
      { title: 'Win Probability Simulator', desc: 'Model case factors — evidence, jurisdiction, venue — to get an AI-generated outcome estimate.', to: '/win-simulator' },
      { title: 'Legal Database', desc: 'Search statutes, case law, and court rules across 12+ jurisdictions.', to: '/legal-database' },
    ],
  },
  {
    heading: 'Learn About the Platform',
    items: [
      { title: 'Legal Brain — AI Research Assistant', desc: 'How AI-assisted legal research works on LitigationSpace.org.', to: '/legal-brain' },
      { title: 'Drafting Engine', desc: 'AI-assisted motion, brief, and document drafting tools.', to: '/drafting' },
      { title: 'Blog', desc: 'Articles on motion practice, litigation strategy, and legal technology.', to: '/blog' },
    ],
  },
  {
    heading: 'Access & Pro Bono',
    items: [
      { title: 'Pro Bono Clinic Access', desc: 'Approved pro bono legal clinics get free access to the full platform. Apply through our Contact page.', to: '/contact' },
      { title: 'About Build Champions', desc: 'Learn about the 501(c)(3) nonprofit that operates LitigationSpace.org and who it serves.', to: '/about-build-champions' },
      { title: 'Pricing', desc: 'Reduced-cost plans for individuals and small practices, plus a 7-day free trial.', to: '/pricing' },
    ],
  },
]

export default function Resources() {
  return (
    <div style={{ background: DARK, minHeight: '100vh' }}>
      <SEO
        title="Resources — Free Legal Tools & Learning Center"
        description="Free legal tools and educational resources from LitigationSpace.org: Motion Analyzer, Win Probability Simulator, Legal Database, and guidance on pro bono clinic access."
        path="/resources"
      />
      <Navbar />

      <div style={{ paddingTop: 100, paddingBottom: 56, textAlign: 'center', borderBottom: `1px solid ${BD}` }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,166,35,0.10)', border: '1px solid rgba(245,166,35,0.30)', borderRadius: 999, padding: '5px 16px', marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'inline-block' }} />
          <span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' }}>Learning Center</span>
        </div>
        <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)', color: T1, margin: '0 0 14px', lineHeight: 1.15 }}>
          Resources
        </h1>
        <p style={{ color: T2, fontSize: 16, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          Free tools, platform guides, and access information from Build Champions, the 501(c)(3) nonprofit behind LitigationSpace.org.
        </p>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '64px 24px' }}>
        {GROUPS.map(g => (
          <div key={g.heading} style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 800, fontSize: '1.5rem', color: T1, margin: '0 0 24px' }}>
              {g.heading}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {g.items.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{ background: CARD, border: `1px solid ${BD}`, borderRadius: 14, padding: '24px 22px', textDecoration: 'none', display: 'block', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = GOLD + '60')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = BD)}
                >
                  <div style={{ fontWeight: 700, fontSize: 15, color: T1, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: T2, lineHeight: 1.6 }}>{item.desc}</div>
                  <div style={{ marginTop: 14, fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Explore →</div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '32px 24px', background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.20)', borderRadius: 16 }}>
          <p style={{ color: T2, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            Looking for something specific, or representing a pro bono legal clinic? <Link to="/contact" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>Contact us</Link> and we'll point you in the right direction.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
