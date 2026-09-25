'use client';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { attribution, configureTracking, hasConsent, prepareTracking, track } from '@/lib/analytics';
function subscribe(callback:()=>void){window.addEventListener('consent-change',callback);return ()=>window.removeEventListener('consent-change',callback);}
function getChoice(){try{return localStorage.getItem('measurement-consent')||'unset';}catch{return 'denied';}}
function serverChoice(){return 'pending';}
function choose(value:string){
 if(value==='granted')prepareTracking();else configureTracking('disabled');
 try{localStorage.setItem('measurement-consent',value);if(value!=='granted')sessionStorage.removeItem('campaign-attribution');}catch{}
 window.dispatchEvent(new Event('consent-change'));
}
export function ConsentSettings(){return <button className="consent-settings" onClick={()=>{choose('unset');window.location.reload();}}>Çerez tercihlerini değiştir</button>;}
export function Analytics({gtmId,gaId,adsId}:{gtmId:string;gaId:string;adsId:string}){
 const choice=useSyncExternalStore(subscribe,getChoice,serverChoice),pathname=usePathname();
 const lastPage=useRef('');
 const gtm=/^GTM-[A-Z0-9]+$/.test(gtmId)?gtmId:'',ga=/^G-[A-Z0-9]+$/.test(gaId)?gaId:'',ads=/^AW-\d+$/.test(adsId)?adsId:'';
 useEffect(()=>{
  if(!gtm&&!ga&&!ads){configureTracking('disabled');return;}
  if(choice==='pending')return;
  if(choice!=='granted'){configureTracking('disabled');return;}
  try{
   attribution();window.dataLayer=window.dataLayer||[];
   if(!document.getElementById('measurement-script')){
    // Google tag's documented queue uses Arguments, including in GTM mode.
    window.gtag=function(){
     // eslint-disable-next-line prefer-rest-params
     window.dataLayer!.push(arguments);
    };
    window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'denied',ad_personalization:'denied'});
    let src='';
    if(gtm){window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});src=`https://www.googletagmanager.com/gtm.js?id=${gtm}`;}
    else{window.gtag('js',new Date());if(ga)window.gtag('config',ga,{send_page_view:false});if(ads)window.gtag('config',ads);src=`https://www.googletagmanager.com/gtag/js?id=${ga||ads}`;}
    const script=document.createElement('script');script.id='measurement-script';script.async=true;script.src=src;document.head.appendChild(script);
   }
   configureTracking(gtm?'gtm':'gtag');
   const page=window.location.href;
   if(lastPage.current!==page){
    const payload={page_path:pathname,page_location:page,page_title:document.title,page_referrer:lastPage.current||document.referrer};
    if(gtm)window.dataLayer.push({event:'virtual_page_view',...payload});else if(ga)window.gtag?.('event','page_view',{...payload,send_to:ga});
    lastPage.current=page;
   }
  }catch{configureTracking('disabled');}
 },[choice,gtm,ga,ads,pathname]);
 if((!gtm&&!ga&&!ads)||choice!=='unset')return null;
 return <aside className="consent-banner" aria-label="Çerez tercihleri"><p>İzninizle site kullanımını ve arama / WhatsApp butonu tıklamalarını ölçebiliriz. Kabul etmeden de tüm iletişim seçeneklerini kullanabilirsiniz.</p><button onClick={()=>choose('denied')}>Reddet</button><button onClick={()=>choose('granted')}>Ölçüme izin ver</button></aside>;
}
export function LocationPageView({slug}:{slug:string}){
 const lastSent=useRef('');
 useEffect(()=>{const send=()=>{if(lastSent.current!==slug&&hasConsent()){track('location_page_view',{location_slug:slug});lastSent.current=slug;}};send();window.addEventListener('consent-change',send);return()=>window.removeEventListener('consent-change',send);},[slug]);return null;
}
