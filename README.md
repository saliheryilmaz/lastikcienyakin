> 25.09.2026 güncellemesi: [BUSINESS-UPDATE.md](BUSINESS-UPDATE.md). Marka/logo, 7/24, tüm araçlar ve dört mobil hizmet teyit edildi; sayfa sayısı 89 oldu. Satış/rot/balans yok. Aşağıdaki önceki denetim bilgileri bu güncelleme ile birlikte okunmalıdır.

# lastikcienyakin.com

Next.js 16.3.6 (kurulumda npm `latest` üzerinden doğrulandı), React 19.3.0, TypeScript ve Tailwind CSS 4.3.3. App Router; sayfalar Server Components ve build-time statik üretim kullanır. İstemci kodu CTA tıklamaları ve izinli ölçümle sınırlıdır. Vercel dağıtımına uygundur.

## Çalıştırma

```sh
npm ci
# .env.example dosyasını .env.local adıyla kopyalayın.
npm run dev
npm run lint
npm run typecheck
npm run build
npm run audit:seo
npm run audit:districts
```

İstanbul (39), Sakarya (16), Kocaeli (12) ve Düzce (8) illerindeki 75 ilçenin tamamı kullanıcı tarafından doğrulanmıştır; dört ilde de ekip bulunmaktadır. İlçe sayfaları taslak moduna bağlı değildir. Varsayılan modda doğrulama bekleyen üç hizmet kapalıdır. Yerel tasarım önizlemesinde `INCLUDE_DRAFT_CONTENT=true` kullanın. İndeksleme varsayılan olarak kapalıdır. Tüm telefon ve WhatsApp bağlantıları kullanıcı tarafından verilen **+90 538 291 60 51** numarasını kullanır. Telefon hedefi `tel:+905382916051`, WhatsApp hedefi `https://wa.me/905382916051` olarak merkezi config üzerinden üretilir.

## Dosyalar

- `app/`: ana sayfa, ortak layout, 404, robots, sitemap ve `[...slug]/page.tsx` statik lokasyon/hizmet/bilgi sayfaları.
- `siteConfig.ts`: işletme bilgileri, telefon, WhatsApp, saatler, alan adı, doğrulama ve ölçüm ayarları.
- `data/locations.ts`: şehirler, kapsamlı Sapanca ve Kadıköy sayfaları, ilçe verilerinin birleştirilmesi.
- `data/districts/`: dört ilin ilçe bazlı özgün içerikleri, erişim bilgileri, ilgili ilçe bağlantıları ve ortak veri modeli.
- `DISTRICT-PAGES.md`: 75 ilçe rotası ve resmi ilçe listesi kaynakları.
- `data/services.ts`: mobil servis ve doğrulama bekleyen üç hizmet taslağı.
- `data/pages.ts`: hakkımızda, iletişim, hizmet bölgeleri, gizlilik ve çerez bilgilendirmesi.
- `components/cta/ContactButtons.tsx`: tekrar kullanılabilir `CallButton`, `WhatsAppButton`, `LocationButton`. WhatsApp butonları yeşil renk ve özel simge kullanır. Mobil sabit çubuk Ara / WhatsApp / Konum şeklindedir. Konum butonu, WhatsApp içinde araç konumunu paylaşma adımlarını gösterir; tarayıcıdan konum alınmaz ve otomatik mesaj gönderilmez.
- `components/Analytics.tsx`, `lib/analytics.ts`: izinli yükleme, dönüşüm olayları ve UTM oturum kaydı.
- `components/seo/JsonLd.tsx`, `lib/metadata.ts`: güvenli JSON-LD, benzersiz metadata ve canonical.
- `scripts/audit-seo.mjs`, `SEO-AUDIT.json`: tekrarlanabilir SEO denetimi ve son sonuçlar.
- `public/images/`: yaklaşık 118 KiB WebP temsili servis görseli. `public/og.png`: sosyal paylaşım görseli. Görseller yapay zekâ ile üretilmiştir; gerçek ekip veya şube fotoğrafı değildir.

## Gerçek yayın öncesi doldurulacak bilgiler

Kodda bu alanlar `TODO BUSINESS DATA` ile işaretlidir.

1. `siteConfig.ts`: ticari unvan, e-posta, gerçek çalışma saatleri, varsa sosyal hesaplar. Telefon ve WhatsApp **+90 538 291 60 51** olarak dolduruldu. Fiziksel adres ancak gerçek ve müşteriye açıksa eklenir; hizmet alanı için adres uydurulmaz.
2. `.env.local` / Vercel ortam değişkenleri: `NEXT_PUBLIC_BUSINESS_PHONE` (+90 ve 10 hane), `NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY`, `NEXT_PUBLIC_BUSINESS_WHATSAPP` (90 ve 10 hane).
3. `data/services.ts`: gerçekten sunulan hizmetlerin `confirmed` alanını açın. Desteklenmeyenler kapalı kalır ve üretimde rota/menü/sitemap'e girmez.
4. `data/locations.ts` ve `data/districts/`: 75 ilçenin kapsamı ve dört ilde ekip bulunduğu kullanıcı tarafından teyit edilmiştir. `serviceAreas` yalnızca ayrıca doğrulanmış mahalleleri içerir. Özel girişler, Adalar ulaşımı, otoyol erişimi ve anlık ekip uygunluğu görüşmede netleşir. İstanbul ilçeleri Anadolu (14) ve Avrupa (25) yakaları olarak gruplanır. Yeni ilçeler için özgün erişim içeriği yazın ve ilgili ilçe bağlantılarını kontrol edin.
5. Gizlilik/çerez metinlerine gerçek veri sorumlusu, başvuru kanalı, saklama süreleri, kullanılan araçlar ve gerçek süreçleri ekleyin. Mevcut metinler teknik taslaktır.
6. Her şey doğrulanınca `siteConfig.businessVerified=true`, `SITE_INDEXABLE=true`, `INCLUDE_DRAFT_CONTENT=false` ayarlayın. Canlı alan adı `https://lastikcienyakin.com` olmalıdır. Vercel için `SITES_STATIC_EXPORT=false` bırakın.
7. Vercel'e projeyi alın, ortam değişkenlerini ekleyin ve alan adını bağlayın. Ortam değişkenleri build sırasında okunur; her değişiklikte yeniden deploy gerekir.
8. Search Console doğrulaması için `GOOGLE_SITE_VERIFICATION`; üretim sitemap adresi `/sitemap.xml`.

`businessVerified`, gerçek numaralar ve `SITE_INDEXABLE=true` birlikte sağlanmadan hiçbir sayfa indekslemeye açılmaz. Önizlemede tüm sayfalar `noindex, follow`; sitemap bilinçli olarak boştur. Robots taramaya izin verir ki noindex görülebilsin. Üretimde yalnızca doğrulanmış sayfalar sitemap'e girer. Canonical ve OG adresleri önizlemede de her zaman https://lastikcienyakin.com alan adını kullanır; indeksleme izni ayrı yönetilir. Lokasyonlarda confirmed hizmet kapsamını, indexReady ise editoryal uygunluğu belirtir. Dört il ve Sapanca editoryal olarak uygundur; diğer 74 ilçe daha güçlü yerel bilgi sağlanana kadar noindex kalır. Global doğrulama kapalı olduğu için şu anda hiçbir sayfa indekslemeye açık değildir.

## Google Analytics / Ads / GTM

`GTM_ID`, `GA_MEASUREMENT_ID`, `GOOGLE_ADS_ID` veya eşdeğer `NEXT_PUBLIC_*` değişkenleri desteklenir. Kimlik yoksa üçüncü taraf script yüklenmez. GTM varsa doğrudan gtag yüklenmez; çift ölçüm önlenir.

- `phone_click`: tıklama yeri ve sayfa yolu; aramanın gerçekten bağlandığı anlamına gelmez.
- `whatsapp_click`: tıklama yeri ve sayfa yolu; mesajın gönderildiği anlamına gelmez.
- `location_page_view`: lokasyon slug'ı ve sayfa yolu.
- `contact_form_submit`: olay türü hazırdır; isteğe bağlı form bu sürümde eklenmediği için gönderilmez. Form eklenirse sadece sunucu başarı yanıtından sonra gönderin; sunucu doğrulaması, hız sınırı ve bot kontrolü kullanın.

GTM'de ilgili Custom Event tetikleyicileri ve Ads conversion ID/label tanımlanmalıdır. Yalnızca Ads ID eklemek dönüşüm hedefi oluşturmaz. GA4 olaylarını reklam platformunda doğru hedeflerle eşleştirin. GTM kurulumu yapılırsa etiketlerin izin kontrollerini ayrıca yapılandırın. Uygulama GTM modunda her rota için virtual_page_view gönderir; bu Custom Event için tek GA4 page_view etiketi kurun ve başka sayfa görüntüleme tetikleyicileriyle çoğaltmayın. Doğrudan gtag modunda send_page_view:false kullanılır ve page_view uygulama tarafından bir kez gönderilir. GA4 Enhanced Measurement içindeki tarayıcı geçmişi değişikliğine dayalı otomatik sayfa görüntülemeyi kapatın; panel ayarı koddan doğrulanamaz.

UTM parametreleri URL'de korunur. Ziyaretçi izni varsa oturum depolamasına kaydedilir, olaylara eklenir. Telefon, mesaj veya konum verisi ölçüm olaylarına gönderilmez. WhatsApp'a kampanya bilgisi eklenmez; kullanıcı konumunu görüşmede kendisi paylaşır. GCLID saklama bu sürümün kapsamına alınmadı. Reddedildiğinde ölçüm ve attribution depolaması yapılmaz. Çerez politikası sayfasından tercih sıfırlanabilir.

## SEO ve performans yaklaşımı

Her rota benzersiz title/description, tek H1, self-canonical, Open Graph/Twitter bilgileri ve görünür breadcrumb kullanır. Özgün lokasyon içerikleri merkezi modelden `generateStaticParams` ile üretilir; `generateMetadata` rotaya göre çalışır. Sahte adres, yorum, puan, şube veya varış garantisi yoktur. FAQ görünürdür; zengin sonuç vaadi için FAQ schema eklenmez. Adres yokken Organization; doğrulanmış adres varsa TireShop seçilir. Service ve BreadcrumbList verileri görünür içerikle eşleşir.

Hero boyutu sabittir, WebP kullanır ve öncelikli yüklenir. Vercel'de next/image optimizasyonu etkindir; statik Sites export'unda önceden optimize edilmiş görsel kullanılır. Harici font veya animasyon kütüphanesi yoktur. Sistem fontu ilave ağ isteği oluşturmaz. Gerçek Core Web Vitals/Ads dönüşüm başarısı canlı trafik ve ölçüm olmadan doğrulanamaz; canlıya geçtikten sonra PageSpeed Insights, Search Console ve gerçek kullanıcı verileriyle takip edilmelidir.

Teknik referanslar: [Next.js statik rotalar](https://nextjs.org/docs/app/api-reference/functions/generate-static-params), [metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [Google spam politikaları](https://developers.google.com/search/docs/essentials/spam-policies), [structured data kuralları](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## Denetim kanıtları

Tam 34 maddelik sonuç ve sınırlar AUDIT-REPORT.md içindedir. npm run audit:logic, audit:content, audit:performance ve çalışan yerel üretim sunucusuyla audit:http ek kontrolleri çalıştırır. Varsayılan derleme 86 içerik sayfasıdır. Fiziksel cihaz, canlı saha performansı ve gerçek reklam dönüşümü bu denetime dahil değildir.
