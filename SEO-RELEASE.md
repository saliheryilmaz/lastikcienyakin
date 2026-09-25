# SEO yayın düzeltmesi — 25.09.2026

Çalışılan asıl proje: C:/Users/talha/OneDrive/Masaüstü/lastikcienyakin. Kullanıcının değiştirdiği mobil galeri korunmuştur. Bu çalışma canlıya dağıtım yapmaz; yeni kaynak ve yerel üretim derlemesini hazırlar.

## 1. SEO 69'un tespit edilen nedeni

Canlı https://www.lastikcienyakin.com/ üzerinde Lighthouse 13.5.0 mobil denetimi SEO 69 sonucunu yeniden üretti. Başarısız tek puanlı SEO denetimi `is-crawlable`: HTML içindeki `<meta name="robots" content="noindex, follow">`. Rapor: LIGHTHOUSE-LIVE-BEFORE.json. Google'ın açıklaması: https://developer.chrome.com/docs/lighthouse/seo/is-crawlable

Kod kaynağı: siteConfig.ts içindeki indeksleme koşulu hem SITE_INDEXABLE=true hem businessVerified=true istiyordu; businessVerified=false idi. .env.example da SITE_INDEXABLE=false örneği veriyordu. Eksik hukuki işletme alanları böylece tüm hizmet sayfalarını Google'a kapatıyordu.

Ayrıca doğrudan HTTP incelemesi, canlı sitemap'in boş olduğunu ve canonical'ın www olmayan adrese işaret ettiğini doğruladı. Bu adres 308 ile www adresine yönleniyor. Bunlar gerçek organik SEO sorunlarıdır; Lighthouse raporunda 69 puanın başka başarısız denetimleriymiş gibi sunulmaz. LIVE-SEO-BEFORE.json tüm ham yanıtları içerir.

## 2–3. Dosyalar ve değişiklikler

| Dosya | Değişiklik |
|---|---|
| siteConfig.ts | Tercih edilen domain https://www.lastikcienyakin.com. Üretimde indeksleme varsayılan açık; Vercel preview/development kapalı. SITE_INDEXABLE=false açık yayın durdurma seçeneği. businessVerified hukuki/adres doğrulaması için korunuyor, indeksleme şartı olmaktan çıkarıldı. |
| .env.example | Üretim örneği SITE_INDEXABLE=true; preview koruması açıklandı. |
| lib/metadata.ts | Merkezi production domain üzerinden standart URL üretimi. Sayfa bazlı robots, OG, Twitter ve benzersiz metadata korunuyor. |
| app/page.tsx | Ana sayfa title/description 7/24 mobil hizmet, tamir, yerinde değişim ve iletişim niyetine göre güncellendi. Görünür tasarım/H1/galeri değiştirilmedi. |
| app/robots.ts | Native robots route her zaman doğru www sitemap adresini bildiriyor. Allow:/ korunuyor. |
| components/seo/JsonLd.tsx | AutomotiveBusiness, teyitli 7/24 saatleri, gerçek logo/fotoğraf, hizmet açıklaması ve Sapanca dahil hizmet alanları. Boş sameAs çıkartıldı. Bilinmeyen adres/unvan/e-posta oluşturulmadı. |
| components/DetailPages.tsx | Mevcut Service JSON-LD'ye gerçek hizmet adına dayalı serviceType eklendi. |
| next.config.ts | www olmayan üretim hostunu www/HTTPS'e kalıcı 308 yönlendirme; yol ve sorgu korunur. Static export'ta bu sunucu kuralı kullanılmaz, barındırmada tanımlanır. |
| scripts/audit-logic.mjs | Üretim/preview/manuel durdurma ve yeni schema/domain senaryoları; 20 kontrol. |
| scripts/audit-seo.mjs | www canonical ve AutomotiveBusiness doğrulaması. |
| scripts/audit-publication.mjs | 89 rota, 18 varlık, host yönlendirmesi ve değişmemesi gereken dosyaların SHA-256 kontrolü. |
| README.md | Güncel yayın ayarları için bu rapora yönlendirme. |

Üretilen kanıtlar: SEO-AUDIT.json, LOGIC-AUDIT.json, HTTP-AUDIT.json, PUBLICATION-AUDIT.json, LIVE-SEO-BEFORE.json, Lighthouse JSON raporları, SEO-BUILD.log, SEO-LINT.log, SEO-TYPECHECK.log, seo-before-hashes.json. next-env.d.ts Next.js tarafından yeniden üretilir.

app/sitemap.ts'nin mevcut filtreleme algoritması yeterliydi; nihai içeriği değiştirilmedi. Config düzeltmesiyle boş sitemap yerine doğru URL'ler üretiliyor. app/layout.tsx zaten metadataBase, viewport ve html lang=tr içeriyordu. Bunları sırf dosya değiştirmek için yeniden yazmadım.

## 4. Robots.txt

User-Agent: *
Allow: /
Sitemap: https://www.lastikcienyakin.com/sitemap.xml

Önemli sayfaları engelleyen kural yok. Önizlemeler meta noindex ile korunur; Google'ın bu etiketi okuyabilmesi için tarama kapatılmaz.

## 5. Sitemap.xml

Üretimde 15 canonical, HTTP200 ve indexlenebilir URL: ana sayfa, 4 il, Sapanca, 4 hizmet, 5 bilgi sayfası. 74 editoryal bekleyen ilçe sitemap dışında. /sapanca rotası yok; gerçek rota /sakarya/sapanca kullanıldı. 404 veya redirect eklenmedi. Sitemap ve üretilmiş HTML index/canonical kümesi birebir denetlendi.

## 6. Canonical / URL tutarlılığı

Tüm sayfalar https://www.lastikcienyakin.com alan adını kullanıyor. UTM canonical'a eklenmiyor. Next.js trailingSlash:false nedeniyle kök canonical'ı sondaki / olmadan serileştirir; https://www.lastikcienyakin.com ve https://www.lastikcienyakin.com/ aynı kök URL'dir. Alt rotalarda son slash 308 ile temizlenir.

Canlı başlangıç durumu: https non-www → 308 https www; http non-www → 308 https non-www → 308 https www; http www → 308 https www. Tüm alternatifler tek hosta ulaşır. HTTP→HTTPS işlemi Vercel/barındırma katmanındadır. Kodda non-www host yönlendirmesi ayrıca güvenceye alındı; localhost zorla canlıya yönlenmez.

## 7. Structured data

AutomotiveBusiness, WebSite, Service ve BreadcrumbList geçerli JSON olarak üretiliyor. 7/24, telefon, logo ve fotoğraf kullanıcının gerçek beyan/varlıklarından; rating/review/adres/fiyat uydurulmadı. Service için serviceType doğru yerde; işletmeye geçersiz serviceType alanı basılmadı. Açık adres olmadan Google LocalBusiness zengin sonuç uygunluğu vaat edilmez. Lighthouse structured-data kontrolü manuel kontrol niteliğindedir; SEO100 bunun Google tarafından onaylandığını göstermez. Schema türü: https://schema.org/AutomotiveBusiness

## 8. Title / description ve semantik yapı

Title: En Yakın Lastikçi | 7/24 Mobil Lastikçi ve Yol Yardım

Description: İstanbul, Sakarya, Kocaeli ve Düzce’de 7/24 mobil lastikçi, lastik tamiri ve yerinde değişim. Yol yardımı için hemen arayın veya WhatsApp’tan konumunuzu gönderin.

Tüm 89 sayfada tek H1, benzersiz title/description, alt, breadcrumb ve canonical doğrulandı. Mevcut H1 mobil lastikçi niyetini karşılıyor; görsel satır düzeni korunması için değiştirilmedi. Telefon/WhatsApp gerçek href; konum düğmesi eylem olduğu için button olarak kaldı. İl/ilçe linkleri sunucudan üretilen HTML'de bulunuyor. Gizlenmiş SEO metni veya gereksiz anahtar kelime eklenmedi.

## 9. Crawlability ve performans

Üretimde 15 sayfa index,follow. 74 ilçede önceki editoryal noindex kararı korunur: yerel fayda tamamlanmadan yalnızca Lighthouse puanı için açılmadı. Bu sayfalar erişilebilir, iç linkleri mevcut; ayrı ayrı Lighthouse yapılırsa indekslenebilirlik denetimi bilerek başarısız olur. Geçersiz sayfalar HTTP404 döner ve noindex kalır.

Yeni kütüphane, font, üçüncü taraf script, görsel veya galeri değişikliği yok. app/globals.css, components/WorkGallery.tsx, telefon/WhatsApp bileşeni, Analytics, package.json ve package-lock.json denetim öncesi SHA-256 ile aynı. Başlangıç canlı/son yerel raporlarında JS kaynak boyutları 492.076 / 491.833 byte; artış yok. Yerel/CDN ağ koşulları farklı olduğu için tek başına bu iki performans skoru kontrollü karşılaştırma değildir.

Son üretim build, TypeScript, ESLint PASS. SEO denetimi 89 sayfada 0 hata/uyarı/orphan, mantık testleri 20 PASS, 89 sayfa ve 18 varlık HTTP200, iki bilinmeyen rota HTTP404. Next.js'in doğru 404 yanıtında NoFallbackError günlük kaydı önceki upstream sınırlama olarak sürer; Lighthouse ana sayfa SEO hatası değildir.

Lighthouse mobil: canlı başlangıç SEO69 / Accessibility100 / Best Practices100; düzeltilmiş yerel SEO100 / Accessibility100 / Best Practices100. Puanlar gerçek JSON raporlarından alınmıştır; canlı güncelleme sonrası sonucu ayrıca ölçmek gerekir. CLI, raporları başarıyla yazdıktan sonra Windows geçici Chrome profili temizliğinde EPERM verdi; raporların runtimeError ve runWarnings alanlarında denetim hatası yoktur.

## 10. Kullanıcının yayın adımları / kalanlar

1. Bu OneDrive projesindeki değişiklikleri normal Git/deploy akışınızla Vercel'e gönderin. Çalışma canlı siteyi kendiliğinden güncellemez.
2. Vercel Production ortamında eski SITE_INDEXABLE=false varsa true yapın veya kaldırın. Ortam değeri build sırasında işlendiği için yeniden deploy gereklidir. VERCEL_ENV değerini elle uydurmayın; Vercel yönetir. businessVerified alanını SEO için true yapmanız gerekmiyor.
3. www alanını ana domain, non-www alanını ona yönlenen domain olarak koruyun; HTTPS aktif kalsın. Static export kullanılacaksa yönlendirmeleri hosting tarafına taşıyın.
4. Yayından sonra ana sayfa kaynak kodunda index,follow, www canonical, robots sitemap satırı ve 15 kayıtlı sitemap'i kontrol edin; mobil PageSpeed'i yeniden çalıştırın. Siteyi yayına almadan yeni canlı puan verilemez.
5. Search Console'da sitemap'i gönderin ve ana sayfa / öncelikli landing page'ler için URL denetimi yapın. SEO100, indekslenme veya sıralama garantisi değildir.
6. Eksik gerçek ticari unvan/veri sorumlusu, varsa başvuru e-postası ve saklama/silme süreçlerini ayrıca tamamlayın. Bu alanlar uydurulmadı ve indeksleme puanını düzeltmek için doğrulanmış sayılmadı. Ads/GA4/GTM kullanıcının tercihiyle sonraya bırakıldı.

Hâlâ başarısız olabilecek Lighthouse maddeleri: eski deployment veya Production SITE_INDEXABLE=false nedeniyle is-crawlable; preview/74 noindex ilçe/404 için kasıtlı indeksleme engeli; hosting sonradan X-Robots-Tag eklerse is-crawlable; domain yanlış bağlanırsa HTTP/canonical; sonraki içerik değişikliklerinde eksik alt/description/link. Bu yerel ana sayfa raporunda başarısız puanlı SEO maddesi kalmadı.

## Performans karşılaştırması — son ölçüm

| Ortam | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Değişmemiş canlı site / CDN | 94 | 100 | 100 | 69 |
| Değişiklik öncesi kod / ayrı yerel kopya | 77 | 100 | 100 | 69 |
| Düzeltilmiş kod / yerel üretim | 86 | 100 | 100 | 100 |

Lighthouse 13.5.0, varsayılan mobil benzetim. Yerel önce/sonra LCP 3,9 / 3,8 saniye, TBT 220 / 170 ms, CLS 0 / 0. Ayrı yerel başlangıç kopyası, değiştirilen uygulama dosyalarının denetim öncesi SHA-256 değerleriyle eşleştirilerek kuruldu; kullanıcının mevcut galeri/CSS/varlıkları her iki kopyada aynı. Ek ölçümde gerileme gözlenmedi, fakat tek çalıştırma çifti 99'un her koşulda korunacağını kanıtlamaz. Canlıya dağıtım sonrası aynı PageSpeed koşullarında yeniden ölçülmelidir. Ham raporlar LIGHTHOUSE-LOCAL-BEFORE.json, LIGHTHOUSE-LOCAL-AFTER.json ve karşılaştırma LIGHTHOUSE-COMPARISON.json.
