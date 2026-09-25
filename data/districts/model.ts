import type { Location } from '@/types/content';

/** Bölgesel metinler editoryal olarak yazılır; ilçe adı değiştirerek içerik üretilmez. */
export type DistrictEditorial = {
  slug: string;
  name: string;
  side?: Location['side'];
  intro: string;
  description: string;
  accessTitle: string;
  access: string;
  question: string;
  answer: string;
  nearby: string[];
};

export function districtLocations(city: string, provinceSlug: string, records: DistrictEditorial[]): Location[] {
  return records.map(record => ({
    city, province: city, district: record.name,
    slug: `${provinceSlug}/${record.slug}`,
    priority: .65,
    // Kapsam kullanıcı tarafından 24.09.2026'da teyit edildi. Bu, anlık müsaitlik değildir.
    confirmed: true,
    // Editorial hold: coverage confirmation does not establish unique local SEO value.
    indexReady: false,
    side: record.side,
    serviceAreas: [], // TODO BUSINESS DATA: Yalnızca tek tek teyit edilen mahalleleri ekleyin.
    nearbyDistricts: record.nearby.map(slug => `${provinceSlug}/${slug}`),
    intro: record.intro,
    description: record.description,
    seoTitle: `${record.name === 'Merkez' ? 'Düzce Merkez' : record.name} Mobil Lastikçi | Yerinde Lastik Desteği`,
    seoDescription: `${record.name === 'Merkez' ? 'Düzce Merkez' : record.name} mobil lastik desteği için arayın veya WhatsApp’tan konum gönderin. İldeki ekibimizden uygunluk, ücret ve tahmini süreyi öğrenin.`,
    advice: [{ title: record.accessTitle, text: record.access }],
    faq: [
      { question: record.question, answer: record.answer },
      { question: `${record.name === 'Merkez' ? 'Düzce Merkez' : record.name} için ekip yönlendirmesi nasıl yapılır?`, answer: `${city} ekibimize konumunuzu, araç modelini ve lastik sorununuzu iletin. İstanbul, Sakarya, Kocaeli ve Düzce’nin her birinde ekiplerimiz bulunur. İlgili ekibin anlık uygunluğu ve erişim koşullarına göre yönlendirme, ücret ve tahmini süre görüşmede netleşir.` },
    ],
  }));
}
