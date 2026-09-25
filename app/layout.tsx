import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BusinessSchema } from '@/components/seo/JsonLd';
import { canonicalOrigin, siteConfig, includeDrafts } from '@/siteConfig';
import { Analytics } from '@/components/Analytics';
export const viewport: Viewport = {width:'device-width',initialScale:1,viewportFit:'cover'};
export const metadata: Metadata = {metadataBase:new URL(canonicalOrigin),verification:{google:siteConfig.searchConsoleVerification || undefined}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="tr"><body><a className="skip-link" href="#main">İçeriğe geç</a>{includeDrafts&&<div className="preview-note">Önizleme · İşletme bilgileri ve örnek hizmet içerikleri tamamlanacak.</div>}<Header/>{children}<Footer/><BusinessSchema/><Analytics {...siteConfig.analytics}/></body></html>;}

