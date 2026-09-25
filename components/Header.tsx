import Link from 'next/link';
import Image from 'next/image';
import { CallButton } from './cta/ContactButtons';
import { Icon } from './Icon';
import { siteConfig } from '@/siteConfig';
const nav = [['/#hizmetler','Hizmetler'],['/#calismalarimiz','Galeri'],['/hizmet-bolgeleri','Hizmet bölgeleri'],['/hakkimizda','Hakkımızda'],['/iletisim','İletişim']];
export function Brand(){return <Link className="brand" href="/" aria-label={`${siteConfig.businessName} ana sayfa`}><Image className="brand-image" src={siteConfig.logo} width={1760} height={880} sizes="260px" alt={siteConfig.businessName}/></Link>;}
export function Header(){return <><div className="topbar"><div className="container"><span>{siteConfig.businessHoursLabel}</span><span>{siteConfig.serviceAreas.join(' · ')}</span></div></div><header className="header"><div className="container header-inner"><Brand/><nav className="desktop-nav" aria-label="Ana menü">{nav.map(([href,label])=><a key={href} href={href}>{label}</a>)}</nav><CallButton className="header-call" placement="header">{siteConfig.phoneDisplay}</CallButton><details className="mobile-menu"><summary aria-label="Menüyü aç"><Icon name="menu"/></summary><nav aria-label="Mobil menü">{nav.map(([href,label])=><a key={href} href={href}>{label}</a>)}</nav></details></div></header></>;}
