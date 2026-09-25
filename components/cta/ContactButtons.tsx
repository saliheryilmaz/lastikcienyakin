'use client';
import { useId, useRef } from 'react';
import { siteConfig, contactConfigured } from '@/siteConfig';
import { track } from '@/lib/analytics';
import { Icon } from '@/components/Icon';
type Props = { children?: React.ReactNode; className?: string; placement?: string; message?: string };
export function CallButton({children = 'Hemen ara', className = '', placement = 'page'}: Props) {
  return <a className={`button button-primary ${className}`} href={`tel:${siteConfig.phone}`} aria-label={contactConfigured ? `${typeof children === 'string' && children !== siteConfig.phoneDisplay ? children + ' — ' : ''}${siteConfig.phoneDisplay} numarasını ara` : 'Telefon numarası henüz eklenmedi'} onClick={e => {if (!contactConfigured) {e.preventDefault(); alert('İşletme telefon numarası henüz eklenmedi. Bu bir önizlemedir.'); return;} track('phone_click', {placement});}}><Icon name="phone"/>{children}</a>;
}
export function WhatsAppButton({children = 'WhatsApp', className = '', placement = 'page', message = 'Merhaba, mobil lastik desteği almak istiyorum.'}: Props) {
  const text = message;
  return <a className={`button button-whatsapp ${className}`} href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" aria-label={`${typeof children === 'string' ? children : 'WhatsApp'} — görüşmeyi aç`} onClick={e => {if (!contactConfigured) {e.preventDefault(); alert('WhatsApp numarası henüz eklenmedi. Bu bir önizlemedir.'); return;} track('whatsapp_click', {placement});}}><Icon name="whatsapp"/>{children}</a>;
}
export function LocationButton({children = 'Konum gönder', className = '', placement = 'page'}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  return <>
    <button type="button" className={`button button-location ${className}`} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Icon name="send"/>{children}</button>
    <dialog ref={dialog} className="location-dialog" aria-labelledby={titleId} onClick={event => {if (event.target === event.currentTarget) dialog.current?.close();}}>
      <button type="button" className="dialog-close" aria-label="Konum penceresini kapat" onClick={() => dialog.current?.close()}>×</button>
      <span className="location-dialog-icon"><Icon name="send"/></span>
      <h2 id={titleId}>Konumunuzu paylaşın</h2>
      <p>WhatsApp’tan araç konumunuzu iletin, ilgili ildeki ekibimizi yönlendirelim.</p>
      <ol><li>Aşağıdaki butonla WhatsApp görüşmesini açın.</li><li>Mesaj alanındaki <strong>+ veya ataç</strong> simgesinden <strong>Konum</strong> seçin.</li><li>Aracın bulunduğu konumu seçip gönderin.</li></ol>
      <WhatsAppButton placement={`${placement}_location`} message="Merhaba, mobil lastik desteği için aracımın konumunu paylaşmak istiyorum.">WhatsApp’ı aç</WhatsAppButton>
      <p className="location-dialog-note">Konum seçeneği görünmüyorsa harita bağlantısını veya açık adresinizi mesaj olarak iletebilirsiniz.</p>
    </dialog>
  </>;
}
export function ContactButtons({placement = 'page'}: {placement?: string}) {return <div className="contact-actions"><CallButton placement={placement}/><WhatsAppButton placement={placement}/><LocationButton placement={placement}/></div>;}
