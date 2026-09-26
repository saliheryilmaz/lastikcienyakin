export const siteConfig = {
  // TODO BUSINESS DATA: Veri sorumlusunun gerçek unvanı/adı ve varsa e-posta bilgisi bekleniyor.
  businessName: 'En Yakın Lastikçi',
  legalName: '',
  domain: 'https://www.lastikcienyakin.com',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+905382916051',
  phoneDisplay: process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '+90 538 291 60 51',
  whatsapp: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '905382916051',
  email: '',
  // Marka ve logo kullanıcı tarafından doğrulandı.
  logo: '/lastikcienyakinlogo.png',
  // TODO BUSINESS DATA: Varsa gerçek sosyal hesapları ekleyin.
  socialLinks: [] as string[],
  serviceAreas: ['İstanbul', 'Sakarya', 'Kocaeli', 'Düzce'],
  dispatchNotice: 'İstanbul, Sakarya, Kocaeli ve Düzce’de ekiplerimiz bulunur. Konumunuza yönlendirme, ilgili ekibin anlık uygunluğu ve erişim koşullarına göre planlanır.',
  businessHours: ['Mo-Su 00:00-24:00'],
  businessHoursLabel: '7/24 · Haftanın her günü, günün her saati',
  serviceScope: 'Tüm araçlara mobil lastik tamiri ve yerinde lastik değişimi. Lastik satışı, rot ve balans hizmetimiz yoktur.',
  // Yalnızca mobil hizmet; müşteriye açık iş yeri yok.
  address: null as null | { streetAddress: string; addressLocality: string; postalCode: string; addressCountry: string },
  businessVerified: false,
  updatedAt: '2026-09-25',
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || process.env.GTM_ID || '',
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.GA_MEASUREMENT_ID || '',
    adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || process.env.GOOGLE_ADS_ID || 'AW-18475956790',
  },
  searchConsoleVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
};
export const contactConfigured = /^\+90\d{10}$/.test(siteConfig.phone) && siteConfig.phone !== '+900000000000' && /^90\d{10}$/.test(siteConfig.whatsapp) && siteConfig.whatsapp !== '900000000000';
// Production publication is independent from outstanding legal identity fields.
// Preview/development deployments remain noindex even if production variables are inherited.
const productionDeployment = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production';
export const isIndexable = productionDeployment && process.env.SITE_INDEXABLE !== 'false' && contactConfigured;
export const includeDrafts = process.env.INCLUDE_DRAFT_CONTENT === 'true' && !isIndexable;
// Canonical origin is independent from the publication gate.
export const canonicalOrigin = siteConfig.domain;
