export type TrackingEvent = 'phone_click' | 'whatsapp_click' | 'contact_form_submit' | 'location_page_view';
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; } }
const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
type TrackingMode = 'pending' | 'disabled' | 'gtm' | 'gtag';
let mode: TrackingMode = 'pending';
const pending: {event:TrackingEvent;values:Record<string,string>}[]=[];
export function hasConsent(){try{return localStorage.getItem('measurement-consent')==='granted';}catch{return false;}}
export function attribution(){
 if(!hasConsent())return {};
 try{
  const query=new URLSearchParams(window.location.search);
  const current=Object.fromEntries(keys.flatMap(key=>query.has(key)?[[key,query.get(key)!.slice(0,200)]]:[]));
  if(Object.keys(current).length)sessionStorage.setItem('campaign-attribution',JSON.stringify(current));
  const stored=Object.keys(current).length?current:JSON.parse(sessionStorage.getItem('campaign-attribution')||'{}');
  return Object.fromEntries(keys.flatMap(key=>typeof stored?.[key]==='string'?[[key,stored[key].slice(0,200)]]:[]));
 }catch{return {};}
}
export function prepareTracking(){mode='pending';}
export function configureTracking(nextMode:Exclude<TrackingMode,'pending'>){
 mode=nextMode;const queued=pending.splice(0);
 if(mode!=='disabled')queued.forEach(item=>track(item.event,item.values));
}
export function track(event:TrackingEvent,values:Record<string,string>={}){
 // Optional measurement must never interrupt contact navigation.
 try{
  if(!hasConsent()||mode==='disabled')return;
  if(mode==='pending'){if(pending.length<20)pending.push({event,values});return;}
  const payload={page_path:window.location.pathname,...attribution(),...values};
  if(mode==='gtm'){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event,...payload});}
  else window.gtag?.('event',event,payload);
 }catch{/* A failed tag must not break telephone or WhatsApp links. */}
}
