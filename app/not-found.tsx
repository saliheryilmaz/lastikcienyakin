import Link from 'next/link';
import { ContactButtons } from '@/components/cta/ContactButtons';
export default function NotFound(){return <main id="main" className="section"><div className="container"><p className="eyebrow">404 / SAYFA BULUNAMADI</p><h1>Bu yol bir yere çıkmıyor.</h1><p style={{margin:'25px 0'}}>Aradığınız sayfa bulunamadı. Ana sayfaya dönebilir veya lastik desteği için bize ulaşabilirsiniz.</p><Link className="button button-secondary" style={{marginBottom:25}} href="/">Ana sayfaya dön</Link><ContactButtons placement="404"/></div></main>;}
