export type FAQ = { question: string; answer: string };
export type Location = {
  city: string; district?: string; slug: string; province: string; priority: number;
  confirmed: boolean; indexReady: boolean; side?: 'Anadolu Yakası' | 'Avrupa Yakası';
  serviceAreas: string[]; nearbyDistricts: string[];
  intro: string; description: string; seoTitle: string; seoDescription: string;
  advice: { title: string; text: string }[]; faq: FAQ[];
};
export type Service = { slug: string; name: string; short: string; description: string; confirmed: boolean; icon: 'truck' | 'wheel' | 'tool' | 'shield'; steps: string[]; faq: FAQ[] };
