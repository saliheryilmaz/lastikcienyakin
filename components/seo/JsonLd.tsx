import { canonicalOrigin, siteConfig, contactConfigured } from '@/siteConfig';
export function JsonLd({data}:{data:Record<string,unknown>}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;}
export function BusinessSchema(){
 const verifiedAddress=siteConfig.businessVerified && !!siteConfig.address;
 return <JsonLd data={{'@context':'https://schema.org','@graph':[
 {'@type':'AutomotiveBusiness','@id':`${canonicalOrigin}/#business`,name:siteConfig.businessName,url:`${canonicalOrigin}/`,
 logo:new URL(siteConfig.logo,canonicalOrigin).href,
 image:new URL('/images/calismalar/seferler2.jpeg',canonicalOrigin).href,
 description:siteConfig.serviceScope,
 ...(siteConfig.legalName?{legalName:siteConfig.legalName}:{}),...(siteConfig.email?{email:siteConfig.email}:{}),
 ...(contactConfigured?{telephone:siteConfig.phone}:{}),
 ...(verifiedAddress?{address:{'@type':'PostalAddress',...siteConfig.address}}:{}),
 ...(siteConfig.businessHours.length?{openingHours:siteConfig.businessHours}:{}),
 areaServed:[...siteConfig.serviceAreas,'Sapanca'].map(name=>({'@type':'AdministrativeArea',name})),...(siteConfig.socialLinks.length?{sameAs:siteConfig.socialLinks}:{})},
 {'@type':'WebSite','@id':`${canonicalOrigin}/#website`,name:siteConfig.businessName,url:canonicalOrigin,inLanguage:'tr-TR'}
 ]}}/>;
}
export function BreadcrumbSchema({items}:{items:{name:string;path:string}[]}){return <JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:`${canonicalOrigin}${item.path}`}))}}/>;}
