// Google Ads conversion events (tag loaded in index.html)
const CONVERSIONS = {
  signup: 'AW-11476860308/k54RCIuj_pQbEJT7y-Aq',
  contact: 'AW-11476860308/MM4DCJGj_pQbEJT7y-Aq',
  proBono: 'AW-11476860308/cJ6ZCLWN4J4dEJT7y-Aq',
  motionAnalysis: 'AW-11476860308/ryRrCLqh4Z4dEJT7y-Aq',
  documentAnalysis: 'AW-11476860308/Qj_6CL2h4Z4dEJT7y-Aq',
  donateClick: 'AW-11476860308/tvnkCLiN4J4dEJT7y-Aq',
} as const

const EVENT_NAMES: Record<keyof typeof CONVERSIONS, string> = {
  signup: 'sign_up',
  contact: 'contact',
  proBono: 'pro_bono_application',
  motionAnalysis: 'motion_analysis',
  documentAnalysis: 'document_analysis',
  donateClick: 'donate_click',
}

function getGtag() {
  return (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  getGtag()?.('event', name, params)
}

export function trackConversion(name: keyof typeof CONVERSIONS) {
  const gtag = getGtag()
  if (!gtag) return
  gtag('event', EVENT_NAMES[name])
  const sendTo = CONVERSIONS[name]
  if (sendTo) gtag('event', 'conversion', { send_to: sendTo, value: 1.0, currency: 'USD' })
}
