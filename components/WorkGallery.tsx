'use client';
import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import { workPhotos } from '@/data/gallery';

export function WorkGallery(){
  const [selected,setSelected]=useState(0);
  const dialog=useRef<HTMLDialogElement>(null);
  const titleId=useId();
  const photo=workPhotos[selected];
  const navigate=(step:number)=>setSelected(current=>(current+step+workPhotos.length)%workPhotos.length);
  return <section id="calismalarimiz" className="section work-gallery" aria-labelledby="work-gallery-title">
    <div className="container">
      <div className="work-gallery-heading"><div><p className="eyebrow">İŞİMİZDEN KARELER</p><h2 id="work-gallery-title">Sahadan çalışmalarımız.</h2></div><p>Mobil servis araçlarımız ve yerinde lastik çalışmalarımızdan gerçek fotoğraflar. Ayrıntıları görmek için bir fotoğrafa dokunun.</p></div>
      <div className="work-gallery-grid">{workPhotos.map((item,index)=><figure className={`work-gallery-card${index===0?' work-gallery-featured':''}`} key={item.src}>
        <button type="button" className="work-gallery-open" aria-label={`${item.title} — fotoğrafı büyüt`} aria-haspopup="dialog" onClick={()=>{setSelected(index);dialog.current?.showModal();}}>
          <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes={index===0?'(max-width: 800px) 100vw, 50vw':'(max-width: 600px) 100vw, (max-width: 800px) 50vw, 25vw'}/>
          <span className="work-gallery-zoom" aria-hidden="true">↗</span>
        </button><figcaption><span>{String(index+1).padStart(2,'0')}</span>{item.title}</figcaption>
      </figure>)}</div>
      <p className="work-gallery-note">7/24 mobil lastik hizmeti · İstanbul, Sakarya, Kocaeli ve Düzce</p>
    </div>
    <dialog ref={dialog} className="work-lightbox" aria-labelledby={titleId} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();navigate(1);}if(event.key==='ArrowLeft'){event.preventDefault();navigate(-1);}}}>
      <div className="work-lightbox-toolbar"><p id={titleId} aria-live="polite">{photo.title} <span>{selected+1} / {workPhotos.length}</span></p><button type="button" aria-label="Galeriyi kapat" onClick={()=>dialog.current?.close()}>×</button></div>
      <div className="work-lightbox-photo"><Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 95vw, 1100px"/></div>
      <div className="work-lightbox-controls"><button type="button" onClick={()=>navigate(-1)}>← Önceki fotoğraf</button><span>← →</span><button type="button" onClick={()=>navigate(1)}>Sonraki fotoğraf →</button></div>
    </dialog>
  </section>;
}
