import type { Metadata } from 'next';
import { canonicalOrigin, isIndexable, siteConfig } from '@/siteConfig';
export function pageMetadata(title: string, description: string, path = '/', confirmed = true): Metadata {
 const url = `${canonicalOrigin}${path === '/' ? '' : path}`;
 return {title, description, alternates:{canonical:url}, robots:{index:isIndexable && confirmed,follow:true}, openGraph:{title,description,url,siteName:siteConfig.businessName,locale:'tr_TR',type:'website',images:[{url:`${canonicalOrigin}/og.png`,width:1200,height:630,alt:`${siteConfig.businessName} — Mobil lastik servisi`}]},twitter:{card:'summary_large_image',title,description,images:[`${canonicalOrigin}/og.png`]}};
}
