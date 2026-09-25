import { notFound } from 'next/navigation';
import { visibleLocations } from '@/data/locations';
import { visibleServices } from '@/data/services';
import { infoPages } from '@/data/pages';
import { pageMetadata } from '@/lib/metadata';
import { LocationPage, ServicePage } from '@/components/DetailPages';
import { InfoPage } from '@/components/InfoPage';
export const dynamicParams = false;
export function generateStaticParams(){return [...visibleLocations,...visibleServices,...infoPages].map(p=>({slug:p.slug.split('/')}));}
type Props = {params:Promise<{slug:string[]}>};
export async function generateMetadata({params}:Props){const slug=(await params).slug.join('/');const location=visibleLocations.find(l=>l.slug===slug);if(location)return pageMetadata(location.seoTitle,location.seoDescription,`/${slug}`,location.confirmed && location.indexReady);const service=visibleServices.find(s=>s.slug===slug);if(service)return pageMetadata(`${service.name} | En Yakın Lastikçi`,service.description.slice(0,159),`/${slug}`,service.confirmed);const page=infoPages.find(p=>p.slug===slug);if(page)return pageMetadata(`${page.title} | En Yakın Lastikçi`,page.description,`/${slug}`);notFound();}
export default async function Page({params}:Props){const slug=(await params).slug.join('/');const location=visibleLocations.find(l=>l.slug===slug);if(location)return <LocationPage location={location}/>;const service=visibleServices.find(s=>s.slug===slug);if(service)return <ServicePage service={service}/>;const page=infoPages.find(p=>p.slug===slug);if(page)return <InfoPage page={page}/>;notFound();}
