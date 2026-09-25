import Link from 'next/link';
import { cities, childrenOf } from '@/data/locations';
import type { Location } from '@/types/content';

function DistrictLinks({ districts }: { districts: Location[] }) {
  return <ul className="district-links">{districts.map(district =>
    <li key={district.slug}><Link href={`/${district.slug}`}>
      {district.district === 'Merkez' ? 'Düzce Merkez' : district.district}
      {!district.confirmed && <span> · önizleme</span>}
    </Link></li>
  )}</ul>;
}

export function LocationDirectory({ city, compact = false }: { city?: string; compact?: boolean }) {
  return <div className={`directory${city ? ' directory-single' : ''}`}>
    {cities.filter(c => !city || c.city === city).map(c => {
      const districts = childrenOf(c.city);
      const links = c.city === 'İstanbul' ? <div className="district-sides">
        {['Anadolu Yakası', 'Avrupa Yakası'].map(side => {
          const sideDistricts = districts.filter(d => d.side === side);
          return <div key={side}><h4>{side} <span>({sideDistricts.length})</span></h4><DistrictLinks districts={sideDistricts} /></div>;
        })}
      </div> : <DistrictLinks districts={districts} />;
      return <article key={c.slug} className="directory-city">
        <div className="directory-heading"><h3><Link href={`/${c.slug}`}>{c.city}</Link></h3><span className="district-count">{districts.length} ilçe</span></div>
        {compact ? <details className="district-disclosure"><summary>İlçeleri inceleyin <span aria-hidden="true">+</span></summary>{links}</details> : links}
        <p className="directory-note">{c.city} ekibimizden konumunuza yönlendirme. Anlık uygunluk ve erişim görüşmede netleşir.</p>
      </article>;
    })}
  </div>;
}
