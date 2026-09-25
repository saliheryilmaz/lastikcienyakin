> 25.09.2026 güncellemesi: [BUSINESS-UPDATE.md](BUSINESS-UPDATE.md). Marka/logo, 7/24, tüm araçlar ve dört mobil hizmet teyit edildi; sayfa sayısı 89 oldu. Satış/rot/balans yok. Aşağıdaki önceki denetim bilgileri bu güncelleme ile birlikte okunmalıdır.

# Yayın öncesi denetim — lastikcienyakin.com

Denetim kapsamı: kullanıcının 34 maddesi, yerel kaynak kodu ve üretim derlemesi. Canlı dağıtım yapılmadı. Önceki kaynak klasörü bulunamadığı için eldeki kaynak ZIP'i ayrı `lastikcienyakin-denetim` klasörüne açıldı ve denetim düzeltmeleri bu kopyaya uygulandı. Sonradan taşınmış farklı bir kopyayla eşitlik iddiası yoktur.

## Kritik Sonuçlar

| Kontrol | Sonuç | Kanıt / sınır |
|---|---|---|
| BUILD | PASS | npm run build; BUILD-AUDIT.log; 86 içerik sayfası, sistem uçları dahil 91 statik çıktı |
| TYPESCRIPT | PASS | npm run typecheck; CHECKS-AUDIT.json |
| LINT | PASS | npm run lint; CHECKS-AUDIT.json |
| SEO INFRASTRUCTURE | PARTIAL | Teknik kontroller geçiyor; işletme/yasal içerik tamamlanmadan genel indeksleme kapalı |
| LOCAL SEO | PARTIAL | 4 il / 75 ilçe mevcut; 74 ilçede editoryal geliştirme gerekiyor |
| GOOGLE ADS READINESS | PARTIAL | CTA ve olay altyapısı var; gerçek kimlikler, hedefler ve dönüşüm teslimatı doğrulanmadı |
| MOBILE UX | PASS | 5 rota × 6 genişlik; fiziksel telefon testi değil |
| STRUCTURED DATA | PASS | JSON, türler, alanlar ve bağlantılar yerel testlerden geçti; Google zengin sonuç onayı değildir |
| SITEMAP | PASS | Noindex sayfalar dışarıda; mevcut boş sitemap bilinçli; doğrulanmış işletme testinde 12 URL |
| ROBOTS | PASS | Allow: /; doğru alan adındaki sitemap; noindex'in okunmasını engellemiyor |
| CANONICAL | PASS | 86 sayfada gerçek alan adına temiz self-canonical; UTM taşınmıyor |

**Site henüz koşulsuz production-ready değildir.** Gerçek işletme ve yasal bilgiler, ölçüm kurulumu ve editoryal eksikler aşağıdadır. Mevcut noindex korumasını yalnızca bu raporu geçmiş olmak için açmayın.

## Bulduğun Sorunlar

| Dosya | Sorun ve etkisi | Yapılan düzeltme / kalan sınır |
|---|---|---|
| siteConfig.ts, lib/metadata.ts | Önizleme origin'i canonical/OG adreslerine girebiliyordu; hedef alan adı tutarsızdı | Canonical her ortamda https://lastikcienyakin.com; indeksleme kapısı bağımsız |
| types/content.ts, data/locations.ts, data/districts/model.ts, app/[...slug]/page.tsx, app/sitemap.ts | Hizmet kapsamının teyidi, içerik kalitesi teyidiyle aynı kabul ediliyordu; çok sayıda genel ilçe metninin indekslenme riski | indexReady alanı eklendi; 74 ilçe noindex ve sitemap dışında; tüm rotalar erişilebilir |
| data/navigation.ts, app/page.tsx, components/Sections.tsx, components/Header.tsx, components/Footer.tsx, components/InfoPage.tsx | Bölge/marka bilgileri farklı bileşenlerde tekrar ediyordu | Merkezi config ve lokasyon verisine bağlandı; logo da config üzerinden |
| components/Analytics.tsx, lib/analytics.ts | İlk lokasyon olayı izin/başlatma sırası nedeniyle kaybolabilir; GTM/gtag çift gönderim ve rota görüntüleme tutarsızlığı riski | Bekleyen olay kuyruğu, tek taşıyıcı seçimi, rota bazlı tek gönderim, izin sırası, hata yalıtımı ve güvenli UTM depolaması; 18 mantık senaryosu |
| components/seo/JsonLd.tsx | Organization üzerinde openingHours uygun değildi; logo merkezi değildi; script içine JSON basarken kaçış güçlendirmesi gerekiyordu | Saatler yalnızca doğrulanmış adresli TireShop'ta; config logo/isteğe bağlı unvan ve e-posta; < karakteri kaçırılıyor |
| app/globals.css, app/layout.tsx | Küçük ekranda ana CTA'lar aşağıda kalabiliyor; alt çubuk içerik ve safe-area payı yetersizdi; bazı metin kontrastları zayıftı | Hero CTA yerleşimi, footer/çerez/safe-area payları, viewport-fit ve kontrast düzeltildi |
| components/cta/ContactButtons.tsx | Erişilebilir adlar görünür etiketlerle tam uyumlu değildi | Görünür etiket ve merkezi numarayı içeren aria-label; numara tekrarının önlenmesi |
| .env.example, components/Sections.tsx | Doğrulanmamış hizmetlerin önizlemede gerçek hizmet sanılması riski | Taslaklar varsayılan kapalı; açıldığında teyit bekliyor etiketi |
| next.config.ts | Üst dizindeki lockfile nedeniyle Turbopack kök uyarısı | Proje kökü açıkça tanımlandı; son build uyarısız |
| scripts/audit-seo.mjs, scripts/audit-districts.mjs | Eski out klasörü veya sistem hata sayfaları yanlış denetlenebilirdi; bağlantı/index kuralları eksik kontrol ediliyordu | Güncel .next çıktısı, açık AUDIT_ROOT, iç link/fragment/orphan, canonical/schema/sitemap/robots kontrolleri |
| README.md, VERIFICATION.md, DISTRICT-PAGES.md | Önceki 89 sayfa/tüm ilçelerin SEO uygunluğu ve canonical açıklamaları güncel değildi | 86 sayfa, 74 editoryal bekleme, gerçek ölçüm sınırları ve kurulum adımları güncellendi |
| app/[...slug]/page.tsx / Next.js çalışma zamanı | Geçersiz rotalar HTTP 404 olmasına rağmen next start günlüğüne Internal: NoFallbackError yazıyor | Kullanıcıya doğru 404 ve iletişim seçenekleri dönüyor. Framework kodu değiştirilmedi; statik export uyumu için dynamicParams=false korundu. Açık upstream sorun olarak bırakıldı |

Son madde [Next.js resmi deposundaki #90537](https://github.com/vercel/next.js/issues/90537) ile uyumludur. Tarayıcı konsolu temizken, beş geçersiz/taslak rota denemesi sunucu günlüğünde bu hatayı oluşturdu. Bu nedenle tüm konsollar temiz iddiası yoktur.

## 34 maddelik kanıt matrisi

| No | Kontrol | Sonuç ve somut kanıt |
|---|---|---|
| 1 | Kod sağlığı | Build, strict TypeScript ve ESLint geçti. Browser konsolunda hata/uyarı yok; sunucudaki 404 kontrol akışı uyarısı yukarıda |
| 2 | Mimari | Next App Router, TypeScript, Tailwind; app/components/data/lib/types/public ayrımı. Sayfalar server component, etkileşim CTA ve Analytics client sınırında |
| 3 | Merkezi config | siteConfig.ts tüm istenen alanları içeriyor; telefon/WhatsApp merkezi; bilinmeyenler TODO BUSINESS DATA |
| 4 | Ana sayfa SEO | Tek H1, başlık hiyerarşisi, title/description, canonical, OG/Twitter mevcut; metin iletişim ve hizmet ihtiyacını anlatıyor |
| 5 | Hero | 375×667'de arama/WhatsApp/konum alt koordinatları 503.53/505.53/575.13 px, sticky başlangıcı 592.4 px; hedefler doğru |
| 6 | Sticky | Mobil Ara/WhatsApp/Konum; 74.8 px çubuk, 90 px alt boşluk + safe-area; masaüstünde gizli |
| 7 | Local model | Location: city, district, slug, priority, serviceAreas, nearbyDistricts, SEO ve içerik alanları mevcut; 39+16+12+8 ilçe |
| 8 | Statik rota / metadata | app/[...slug]/page.tsx generateStaticParams ve generateMetadata; 86 sayfada yinelenen title/description yok |
| 9 | İstanbul | Yaka grupları: 14 Anadolu / 25 Avrupa; 39 ilçe bağlantısı, yerel giriş, çağırma akışı, hizmet bağlantısı, CTA, FAQ, breadcrumb |
| 10 | Sapanca | Tesis/bungalov girişi, ayrı otopark, yol yönü, lastik sorunu/değişim hazırlığı; şehir ve ilgili ilçe bağlantıları, FAQ. Yol erişimi/işlem uygunluğu garanti edilmiyor |
| 11 | Duplicate / doorway | 79 lokasyonun 3.081 çifti yer adları normalize edilerek karşılaştırıldı; birebir kopya yok. Kelime farkı yerel değer kanıtı sayılmadı; 74 ilçe editoryal beklemede |
| 12 | Internal links | Ana sayfa→il→ilçe ve ilgili ilçe/hizmet bağlantıları; 86 sayfada 0 orphan; SEO-AUDIT.json |
| 13 | Breadcrumb | Görünür gezinme ve BreadcrumbList; URL/sıra/tür kontrolleri geçti |
| 14 | Canonical | Gerçek alan adı ve rota, sorgusuz; UTM'li Sapanca tarayıcı kontrolü geçti |
| 15 | Sitemap | Şu anda 0 URL, çünkü tüm sayfalar noindex; bellek içi doğrulanmış işletme senaryosu 12 URL, 74 ilçe ve 3 taslak hizmet dışarıda |
| 16 | Robots | Üretim taramasını engelleyen Disallow:/ yok; sitemap adresi doğru |
| 17 | Structured data | Organization/WebSite/Service/BreadcrumbList; gerçek müşteriye açık adres sağlanırsa TireShop. Sahte puan/yorum/adres yok |
| 18 | Hizmet alanı | Dört ilde ekip beyanı kullanıcı teyidine dayanıyor; fiziksel şube uydurulmuyor |
| 19 | Ads landing | Sapanca/Kadıköy başlık, bölge ve iletişim uyumlu; CTA görünürlüğü kontrol edildi. Reklam hesabı, politika onayı veya canlı kampanya başarısı test edilmedi |
| 20 | Olaylar | phone_click/whatsapp_click/location_page_view uygulanmış; contact_form_submit yalnızca tip olarak hazır, form yok ve olay gönderilmiyor. Tıklama gerçek görüşme değildir |
| 21 | UTM | 5 izinli parametre, değer uzunluk sınırı, izinli oturum kaydı; bozuk depolama hata vermiyor; canonical temiz |
| 22 | Performans | Hero 120.466 byte WebP; next/image, preload/sizes, sabit kapsayıcı, sistem fontu; gereksiz animasyon kütüphanesi yok. Kimlik yokken harici script yok |
| 23 | CWV | LCP için öncelikli görsel, CLS için ayrılmış alan; INP için sınırlı etkileşim kodu. Gerçek LCP/CLS/INP skoru ölçülmedi; saha PASS iddiası yok |
| 24 | Görsel SEO | Anlamlı dosya adı, alt, 1200×800 WebP; fill kullanımları ayrılmış boyutlu kapsayıcıda. Temsili görsel gerçek ekip fotoğrafı olarak sunulmuyor |
| 25 | Hizmetler | /mobil-lastikci açık. Diğer üç hizmet farklı amaçta hazırlanmış fakat teyitli değil; üretimde 404, taslak modunda işaretli |
| 26 | FAQ | Konum, erişim, fiyatı etkileyen koşullar ve gerekli bilgi gibi pratik sorular; görünür details/summary; FAQ schema/zengin sonuç vaadi yok |
| 27 | 404 | Beş yanlış/taslak adres HTTP404; ana sayfa, tel ve WhatsApp HTML içinde var; upstream günlük sorunu ayrı |
| 28 | Güven sayfaları | Hakkımızda, iletişim, bölgeler, gizlilik, çerez mevcut; gerçek unvan ve süreç bilgileri eksik olduğundan yasal metinler taslak |
| 29 | Footer | Marka, telefon, WhatsApp, bölgeler, bilgi/yasal sayfalar ve copyright; kırık iç bağlantı yok |
| 30 | Responsive | 375/390/430/768/1024/1440 px × 5 rota = 30 senaryo; 0 yatay taşma, 0 kesilen CTA; BROWSER-AUDIT.json |
| 31 | Accessibility | Semantik link/button, alt/aria, görünür focus; menü/FAQ klavye, modal Escape ve focus dönüşü. Sapanca metin kontrast örneklemi geçti; tam WCAG sertifikasyonu değil |
| 32 | Broken links | 86 sayfanın iç rota ve fragment hedefleri denetlendi; HTTP rotaları da kontrol edildi |
| 33 | Spam | Sahte yorum/puan/şube/adres veya gizli SEO metni bulunmadı. Genel ilçe içerikleri için noindex editoryal kapısı eklendi; mahalle/operasyon bilgisi uydurulmadı |
| 34 | Son test | Son kod değişikliğinden sonra build, typecheck, lint ve SEO/ilçe/mantık/içerik/performans/HTTP kontrolleri; loglar paket içinde |

İçerik karşılaştırmasının güncel benzerlik oranları ve bekleyen 74 rotanın tam listesi CONTENT-AUDIT.json içindedir. Ortak şablonun sözcük farkları Google kalite değerlendirmesinin yerine geçmez. İndeksleme kararı [Google spam politikalarındaki](https://developers.google.com/search/docs/essentials/spam-policies) doorway/scaled content riskini azaltmayı amaçlar; sıralama garantisi değildir.

## Eksik İşletme Bilgileri

- Gerçek ticari unvan ve görünen marka adının onayı.
- E-posta / veri sorumlusuna başvuru kanalı ve gerçek çalışma saatleri.
- Patlak lastik yardımı, yerinde lastik değişimi ve lastik tamiri hizmetlerinin fiili kapsamı; araç/ekipman kısıtları.
- Varsa gerçek, müşteriye açık adres. Mobil hizmet için adres veya şube icat edilmeyecek; yoksa boş kalabilir.
- Mevcut tasarım logosunun onayı; varsa gerçek sosyal hesaplar ve ekip fotoğrafları.
- Gizlilik/çerez metinleri için gerçek veri sorumlusu, saklama süreleri, kullanılan araçlar ve süreçler.
- GTM/GA4/Ads kimlikleri, dönüşüm hedefleri/label, Search Console doğrulaması.
- İlçelere özgü doğrulanabilir operasyon bilgileri; rota erişimi, gerçek hizmet örnekleri ve gerekli yerel açıklamalar. İlçelerin hizmet kapsamında olup olmadığı yeniden sorulmuyor.

**Telefon ve WhatsApp eksik değil:** +90 538 291 60 51. **Dört il ve 75 ilçe kapsamı / dört ilde ekip varlığı teyitli.**

## SEO Landing Pages

Şu anda doğrudan indekslemeye açılabilecek sayfa **yok**: businessVerified=false ve SITE_INDEXABLE kapalı. Bu, teknik arıza değil bilinçli yayın korumasıdır.

İşletme ve yasal bilgiler tamamlandığında teknik/editoryal olarak ilk açılmaya aday landing page'ler:

- / — ana hizmet ve bölge yönlendirmesi
- /mobil-lastikci — teyitli genel mobil hizmet
- /istanbul — 39 ilçeyi yaka gruplarıyla bağlayan il merkezi sayfası
- /sakarya — 16 ilçeyi bağlayan il merkezi sayfası
- /kocaeli — 12 ilçeyi bağlayan il merkezi sayfası
- /duzce — 8 ilçeyi bağlayan il merkezi sayfası
- /sakarya/sapanca — daha ayrıntılı, ayrı hazırlanmış ilçe sayfası

Hazır olmayanlar: Kadıköy dahil Sapanca dışındaki 74 ilçe (indexReady:false); üç teyitsiz hizmet (varsayılan üretimde yok); gerçek işletme/yasal bilgi bekleyen beş bilgi sayfası. Doğrulanmış işletme testindeki 12 sitemap kaydı, 7 aday landing page + tamamlanması gereken 5 bilgi sayfasıdır; hepsinin bugün yayına hazır olduğu anlamına gelmez.

Ads ölçümünde GTM ve doğrudan gtag birbirini dışlar. GTM kullanılırsa virtual_page_view olayı tek GA4 page_view etiketine bağlanmalı; doğrudan gtag send_page_view:false ile uygulama olayı kullanılır. GA4 arayüzündeki otomatik geçmiş değişikliği ölçümünü ayrıca kapatın. Bkz. [Google page view rehberi](https://developers.google.com/analytics/devguides/collection/ga4/views) ve [izin rehberi](https://developers.google.com/tag-platform/security/guides/consent). Gerçek hesapta tekil olay/dönüşüm teslimatı ayrıca doğrulanmalıdır.

## Değiştirilen Dosyalar

Tam dosya listesi CHANGED-FILES.md içindedir. Liste, denetim öncesi SHA-256 manifestiyle karşılaştırılarak oluşturulmuştur; node_modules, .next ve diğer üretilmiş derleme önbellekleri kapsam dışıdır. Değişiklikler Git commit'i olarak sunulmuyor; bu klasörde Git deposu bulunmuyor.
