import type { MetadataRoute } from 'next';
import { siteConfig, isIndexable } from '@/siteConfig';
import { locations } from '@/data/locations';
import { services } from '@/data/services';
import { infoPages } from '@/data/pages';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {if(!isIndexable)return [];return [{url:siteConfig.domain,lastModified:siteConfig.updatedAt,changeFrequency:'monthly',priority:1},...locations.filter(l=>l.confirmed && l.indexReady).map(l=>({url:`${siteConfig.domain}/${l.slug}`,lastModified:siteConfig.updatedAt,changeFrequency:'monthly' as const,priority:l.priority})),...services.filter(s=>s.confirmed).map(s=>({url:`${siteConfig.domain}/${s.slug}`,lastModified:siteConfig.updatedAt,changeFrequency:'monthly' as const,priority:.8})),...infoPages.map(p=>({url:`${siteConfig.domain}/${p.slug}`,lastModified:siteConfig.updatedAt,changeFrequency:'yearly' as const,priority:.3}))];}
