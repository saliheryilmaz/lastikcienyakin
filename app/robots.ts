import type { MetadataRoute } from 'next';
import { isIndexable, siteConfig } from '@/siteConfig';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/'},...(isIndexable?{sitemap:`${siteConfig.domain}/sitemap.xml`}:{})};}
