import type React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { trackEvent } from '../lib/gtag'

// Public landing pages for features that live behind login (Google Ads targets)

interface Feature {
  name: string
  eyebrow: string
  headline: string
  intro: string
  seoTitle: string
  seoDescription: string
  keywords: string
  points: { title: string; body: string }[]
  who: string[]
  appPath: string
}

const FEATURES: Record<string, Feature> = {
  'case-vault': {
    name: 'Case Vault',
    eyebrow: 'Case Management',
    headline: 'Keep every case, document and deadline in one place',
    intro: 'Case Vault is where your cases live: files, parties, evidence and notes, organized by matter and searchable when you need them.',
    seoTitle: 'Case Vault — Organize Your Court Case',
    seoDescription: 'Organize court cases, documents and evidence in one secure place. Case management from LitigationSpace.org, a Build Champions 501(c)(3) program. 7-day free trial, no credit card.',
    keywords: 'case management software, organize court case, legal case organizer, court document organizer, pro se case management',
    points: [
      { title: 'One home per case', body: 'Create a case and keep its documents, parties, notes and history together instead of scattered across email and folders.' },
      { title: 'Search your cases', body: 'Find any matter quickly from your case list.' },
      { title: 'Deadlines on every case', body: 'Keep upcoming dates attached to the case they belong to.' },
      { title: 'Storage that grows with you', body: '1 GB on the free trial, 25 GB on Basic, and more on higher plans.' },
    ],
    who: ['Pro se litigants managing their own case', 'Solo attorneys and small practices', 'Legal aid teams handling many matters'],
    appPath: '/cases',
  },
  'case-strategy': {
    name: 'Case Strategy & Deadlines',
    eyebrow: 'Case Builder · War Room · Timeline',
    headline: 'Map your case, track deadlines, plan your strategy',
    intro: 'Build the facts of your case, see them on a timeline, and work through strategy in the War Room so nothing important slips.',
    seoTitle: 'Case Strategy, Timeline & Deadline Alerts',
    seoDescription: 'Build your case, see it on a visual timeline, get deadline alerts and plan strategy in the War Room. A Build Champions 501(c)(3) program. 7-day free trial.',
    keywords: 'litigation timeline, court deadline tracker, case strategy tool, legal deadline alerts, case builder',
    points: [
      { title: 'Case Builder', body: 'Walk through your facts, claims and evidence step by step to build a structured case file.' },
      { title: 'Visual timeline', body: 'See events and filings in order so you can explain your case clearly.' },
      { title: 'Deadline alerts', body: 'Keep track of upcoming dates and get reminded before they arrive.' },
      { title: 'War Room', body: 'Work through arguments, risks and next steps for a case in one focused workspace.' },
    ],
    who: ['Self-represented litigants preparing for court', 'Attorneys planning litigation strategy', 'Clinics coordinating case deadlines'],
    appPath: '/case-builder',
  },
  drafting: {
    name: 'Drafting Engine',
    eyebrow: 'AI-Assisted Drafting',
    headline: 'Draft motions, briefs and letters faster',
    intro: 'Start from your case details and get an AI-assisted first draft you can edit, then export to Word or PDF.',
    seoTitle: 'AI-Assisted Legal Drafting — Motions & Briefs',
    seoDescription: 'Draft motions, briefs and legal letters with AI assistance, edit them, and export to Word or PDF. A Build Champions 501(c)(3) program. 7-day free trial, no credit card.',
    keywords: 'legal drafting software, draft a motion, AI legal drafting, legal brief writing, motion template',
    points: [
      { title: 'AI-assisted first drafts', body: 'Describe what you need and get a structured draft to work from instead of a blank page.' },
      { title: 'Edit in the browser', body: 'Revise your draft in the built-in editor.' },
      { title: 'Word and PDF export', body: 'Download your document when it is ready to file or share.' },
      { title: 'Choose a document type', body: 'Pick the kind of document you need and the draft is structured for it.' },
    ],
    who: ['Pro se litigants writing their own filings', 'Attorneys and paralegals drafting routine documents', 'Law students and clinics'],
    appPath: '/drafting/new',
  },
  'judicial-workspace': {
    name: 'Judicial Workspace',
    eyebrow: 'For Judges, Clerks & Arbitrators',
    headline: 'A research and case workspace for the bench',
    intro: 'Judicial Workspace gives judges, clerks and arbitrators a place to keep their matters and use AI-assisted legal research while reviewing them.',
    seoTitle: 'Judicial Workspace — Research Tools for Judges & Clerks',
    seoDescription: 'A case and research workspace for judges, clerks and arbitrators, from LitigationSpace.org, a Build Champions 501(c)(3) program. Contact us to get started.',
    keywords: 'judicial research tool, tools for judges, law clerk research, arbitrator software, court research assistant',
    points: [
      { title: 'Matter list', body: 'Record matters with case number, court, jurisdiction, parties and assigned judge.' },
      { title: 'AI-assisted research', body: 'Use Legal Brain AI and the Legal Database to look up statutes, rules and case law.' },
      { title: 'Separate from litigant data', body: 'Each organization’s data is kept in its own isolated workspace.' },
    ],
    who: ['Judges and judicial clerks', 'Arbitrators and mediators', 'Court staff'],
    appPath: '/judicial-workspace',
  },
  team: {
    name: 'Team Collaboration',
    eyebrow: 'For Clinics, Legal Aid & Firms',
    headline: 'Work on cases together with the right access for each person',
    intro: 'Invite your team, give each person a role, and share case workspaces so everyone works from the same file.',
    seoTitle: 'Team Collaboration for Legal Aid & Law Clinics',
    seoDescription: 'Shared case workspaces with roles for attorneys, paralegals, staff and read-only users. Built for legal aid teams, clinics and small firms by Build Champions, a 501(c)(3).',
    keywords: 'legal team collaboration, law clinic software, legal aid team software, shared case workspace, law firm collaboration',
    points: [
      { title: 'Role-based access', body: 'Attorney, Paralegal, Support Staff and Read-Only roles control who can see and change what.' },
      { title: 'Shared case workspace', body: 'Everyone on the team works from the same case, documents and timeline.' },
      { title: 'Up to 10 seats on Chambers', body: 'Larger teams can talk to us about Enterprise.' },
    ],
    who: ['Pro bono and law school clinics', 'Legal aid organizations', 'Small firms'],
    appPath: '/dashboard/team',
  },
  billing: {
    name: 'Billing & Time Tracking',
    eyebrow: 'Billing & Invoicing',
    headline: 'Track time and send invoices clients have already approved',
    intro: 'Log time against your matters, turn approved work into invoices, and send clients a link to view them online.',
    seoTitle: 'Legal Billing & Time Tracking',
    seoDescription: 'Track time, create invoices and share them with clients online. Reduced-cost legal billing from LitigationSpace.org, a Build Champions 501(c)(3) program. 7-day free trial.',
    keywords: 'legal billing software, attorney time tracking, legal invoicing, law firm billing, client invoice',
    points: [
      { title: 'Time tracking', body: 'Record hours per matter so nothing billable is forgotten.' },
      { title: 'Client invoices', body: 'Create invoices from tracked work and send clients a link to view them, with a pay button when you add a payment link.' },
      { title: 'Client approvals first', body: 'Clients approve scope and billed work before it is invoiced, which cuts down on disputes.' },
    ],
    who: ['Solo attorneys', 'Small practices', 'Experts and consultants billing hourly'],
    appPath: '/dashboard/billing',
  },
  'e-signature': {
    name: 'E-Signature & Client Portal',
    eyebrow: 'Client Sign-Off',
    headline: 'Get client signatures and approvals online',
    intro: 'Send documents for signature, get scope and billing approved by clients, and give clients one portal to see what needs their attention.',
    seoTitle: 'E-Signature & Client Portal for Legal Work',
    seoDescription: 'Send documents for e-signature, collect client approvals on scope and billing, and give clients a portal. From LitigationSpace.org, a Build Champions 501(c)(3) program.',
    keywords: 'legal e-signature, client portal for lawyers, engagement letter signature, client approval, attorney client portal',
    points: [
      { title: 'Document signing', body: 'Clients open a secure link and sign documents online.' },
      { title: 'Scope and billing approval', body: 'Clients approve the scope of work and billed items before invoices go out.' },
      { title: 'Client portal', body: 'Clients see their pending approvals in one place.' },
    ],
    who: ['Attorneys working with clients', 'Legal aid teams collecting client consent', 'Experts engaged on cases'],
    appPath: '/client-portal',
  },
  analytics: {
    name: 'Practice Dashboard',
    eyebrow: 'Dashboard',
    headline: 'See your caseload at a glance',
    intro: 'Your dashboard shows how many cases you have, which are active, how many documents you hold and which matters need attention first.',
    seoTitle: 'Practice Dashboard — Caseload at a Glance',
    seoDescription: 'See total and active cases, documents and priority matters on one dashboard. From LitigationSpace.org, a Build Champions 501(c)(3) program. 7-day free trial.',
    keywords: 'legal practice dashboard, caseload overview, law practice reporting, case dashboard',
    points: [
      { title: 'Caseload counts', body: 'Total cases, active cases and documents on one screen.' },
      { title: 'Priority cases', body: 'See which matters need attention first.' },
      { title: 'Notifications', body: 'Updates on your cases in one feed.' },
    ],
    who: ['Solo attorneys', 'Clinic supervisors', 'Legal aid managers'],
    appPath: '/dashboard',
  },
  'legal-aid': {
    name: 'Legal Aid & Pro Bono',
    eyebrow: 'Free for Approved Clinics',
    headline: 'Litigation tools for legal aid, at reduced cost or free',
    intro: 'LitigationSpace.org is run by Build Champions, a 501(c)(3) nonprofit. Approved pro bono legal clinics get free access; everyone else pays reduced-cost plans that fund the mission.',
    seoTitle: 'Legal Aid & Pro Bono Clinic Software',
    seoDescription: 'Case management, legal research and AI-assisted drafting for legal aid, public defenders and law school clinics. Free for approved pro bono clinics. A Build Champions 501(c)(3) program.',
    keywords: 'legal aid case management software, pro bono clinic software, law school clinic software, nonprofit legal software',
    points: [
      { title: 'Free for approved clinics', body: 'Pro bono legal clinics can apply for free access to the platform.' },
      { title: 'Case management', body: 'Case Vault, timelines and deadline alerts for every client matter.' },
      { title: 'Research and drafting', body: 'Legal Brain AI, the Legal Database and the Drafting Engine help staff and volunteers move faster.' },
      { title: 'Team roles', body: 'Give attorneys, paralegals, students and volunteers the right access.' },
    ],
    who: ['Pro bono and law school clinics', 'Legal aid organizations', 'Public defenders'],
    appPath: '/cases',
  },
}

const NAVY = '#0c2461'
const GOLD = '#C9A020'
const INK = '#111'

export default function FeaturePage() {
  const { slug = '' } = useParams()
  const f = FEATURES[slug]
  if (!f) return <Navigate to="/pricing" replace />

  const isJudicial = slug === 'judicial-workspace'
  const isLegalAid = slug === 'legal-aid'

  return (
    <>
      <SEO title={f.seoTitle} description={f.seoDescription} keywords={f.keywords} path={`/features/${slug}`} />
      <div style={{ background: 'linear-gradient(170deg,#FFFDF5 0%,#FDF8EC 50%,#FAF4E4 100%)', minHeight: '100vh', color: NAVY, fontFamily: 'Inter, sans-serif' }}>
        <Navbar />
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '96px 16px 96px', boxSizing: 'border-box' }}>

          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a7010', background: 'rgba(190,148,35,0.10)', border: '1px solid rgba(190,148,35,0.30)', borderRadius: 9999, padding: '5px 16px', marginBottom: 20 }}>
              {f.eyebrow}
            </div>
            <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(30px, 6vw, 50px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 18px', letterSpacing: '-0.02em' }}>
              {f.headline}
            </h1>
            <p style={{ fontSize: 16, color: INK, maxWidth: 640, margin: '0 auto 30px', lineHeight: 1.7 }}>{f.intro}</p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {isJudicial ? (
                <Link to="/contact" onClick={() => trackEvent('feature_cta', { feature: slug, cta: 'contact' })}
                  style={btnGold}>Contact Us to Get Started</Link>
              ) : isLegalAid ? (
                <Link to="/contact?subject=pro-bono-clinic" onClick={() => trackEvent('feature_cta', { feature: slug, cta: 'apply' })}
                  style={btnGold}>Apply for Free Clinic Access</Link>
              ) : (
                <Link to="/register" state={{ from: f.appPath }} onClick={() => trackEvent('feature_cta', { feature: slug, cta: 'trial' })}
                  style={btnGold}>Start 7-Day Free Trial</Link>
              )}
              <Link to={isLegalAid ? '/register' : '/pricing'} style={btnOutline}>
                {isLegalAid ? 'Start 7-Day Free Trial' : 'See Plans From $19/mo'}
              </Link>
            </div>
            {!isJudicial && !isLegalAid && (
              <p style={{ fontSize: 12.5, color: '#6a5010', marginTop: 14 }}>200 trial credits included · No credit card required</p>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18, marginBottom: 48 }}>
            {f.points.map(p => (
              <div key={p.title} style={{ background: '#fff', border: '1.5px solid #ddd5b8', borderRadius: 16, padding: '24px 22px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ color: GOLD, fontSize: 16, marginBottom: 8 }}>✦</div>
                <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 8px', color: NAVY }}>{p.title}</h2>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: INK, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginBottom: 48 }}>
            <div style={{ background: '#fff', border: '1.5px solid #ddd5b8', borderRadius: 16, padding: '24px 22px' }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 12px' }}>Who it's for</h2>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.9, color: INK }}>
                {f.who.map(w => <li key={w}>{w}</li>)}
              </ul>
            </div>
            <div style={{ background: '#FFFBEE', border: '1px solid #ddc86a', borderRadius: 16, padding: '24px 22px' }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 12px' }}>A nonprofit program</h2>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#4a3a08', margin: '0 0 10px' }}>
                LitigationSpace.org is operated by Build Champions, a 501(c)(3) nonprofit expanding access to justice.
                Subscriptions fund the mission, and approved pro bono clinics get free access.
              </p>
              <Link to="/about-build-champions" style={{ color: '#9a7010', fontWeight: 700, fontSize: 14 }}>About Build Champions →</Link>
            </div>
          </div>

          <div style={{ textAlign: 'center', background: '#fff', border: '1.5px solid #ddd5b8', borderRadius: 16, padding: '28px 20px' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px' }}>Want to try something free first?</h2>
            <p style={{ fontSize: 14, color: INK, margin: '0 0 16px' }}>These tools work without an account.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/motion-analyzer" style={chip}>Motion Analyzer</Link>
              <Link to="/document-analyzer" style={chip}>Document Analyzer</Link>
              <Link to="/legal-brain" style={chip}>Legal Brain AI</Link>
              <Link to="/legal-database" style={chip}>Legal Database</Link>
            </div>
            <p style={{ fontSize: 13, color: '#555', margin: '18px 0 0' }}>
              Questions? <Link to="/contact" style={{ color: '#9a7010', fontWeight: 700 }}>Contact our team</Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

const btnGold: React.CSSProperties = {
  display: 'inline-block', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
  background: 'linear-gradient(135deg,#D4A020,#C49010)', color: '#fff', boxShadow: '0 4px 16px rgba(196,144,16,0.35)',
}
const btnOutline: React.CSSProperties = {
  display: 'inline-block', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
  background: '#fff', color: NAVY, border: '1.5px solid #a8b8d8',
}
const chip: React.CSSProperties = {
  display: 'inline-block', padding: '8px 16px', borderRadius: 9999, fontSize: 13.5, fontWeight: 600, textDecoration: 'none',
  background: '#FFFBEE', color: '#6a5010', border: '1px solid #ddc86a',
}
