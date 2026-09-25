import { canonicalOrigin, siteConfig, contactConfigured } from '@/siteConfig';
export function JsonLd({data}:{data:Record<string,unknown>}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;}
export function BusinessSchema(){
 const localBusiness=siteConfig.businessVerified && !!siteConfig.address;
 return <JsonLd data={{'@context':'https://schema.org','@graph':[
 {'@type':localBusiness?'TireShop':'Organization','@id':`${canonicalOrigin}/#business`,name:siteConfig.businessName,url:canonicalOrigin,
 logo:new URL(siteConfig.logo,canonicalOrigin).href,
 ...(siteConfig.legalName?{legalName:siteConfig.legalName}:{}),...(siteConfig.email?{email:siteConfig.email}:{}),
 ...(contactConfigured?{telephone:siteConfig.phone}:{}),
 ...(localBusiness?{address:{'@type':'PostalAddress',...siteConfig.address}}:{}),
 ...(localBusiness&&siteConfig.businessHours.length?{openingHours:siteConfig.businessHours}:{}),
 areaServed:siteConfig.serviceAreas.map(name=>({'@type':'AdministrativeArea',name})),sameAs:siteConfig.socialLinks},
 {'@type':'WebSite','@id':`${canonicalOrigin}/#website`,name:siteConfig.businessName,url:canonicalOrigin,inLanguage:'tr-TR'}
 ]}}/>;
}
export function BreadcrumbSchema({items}:{items:{name:string;path:string}[]}){return <JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:`${canonicalOrigin}${item.path}`}))}}/>;}
