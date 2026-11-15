# Proje Tanıtım Dokümanı — Task Manager API

- **Proje:** TaskFlow — Görev ve Proje Yönetim Sistemi API Geliştirme Projesi
- **Eğitim:** Node.js ile Backend Programlama — Bitirme Projesi
- **Hazırlayan:** Kubilay Karaca
- **Kaynak kod:** https://github.com/KubilayKaraca/task-manager-api

---

## 1. Projenin Amacı

Bu projenin amacı, Node.js ve Express.js eğitiminde öğrenilen konuları (sunucu kurulumu, routing, middleware, CRUD işlemleri ve JSON ile veri yönetimi) gerçek hayatta kullanılabilecek bir uygulama üzerinde uygulamaktır. Sonuç olarak, bir ekibin görevlerini yönetebileceği, tamamen REST API mantığında çalışan bir backend servisi geliştirilmiştir.

## 2. Proje Senaryosu

Bir yazılım şirketi, ekip içindeki görevleri, projeleri ve çalışanların sorumluluklarını tek bir sistem üzerinden takip etmek istemektedir. Geliştirilen API ile:

- Yeni görevler oluşturulabilir,
- Görevler çalışanlara atanabilir (`assignee` alanı),
- Görevlerin durumu takip edilebilir (`pending` → `completed`),
- Görevlere öncelik verilebilir (`priority` alanı: `low`, `medium`, `high`),
- Görevler listelenebilir, tek tek görüntülenebilir, güncellenebilir ve silinebilir.

## 3. Sistem Özeti

| Özellik | Açıklama |
| :--- | :--- |
| Çalışma ortamı | Node.js |
| Web çerçevesi | Express.js |
| Mimari | REST API (JSON istek ve yanıtlar) |
| Veri saklama | `data/tasks.json` dosyası (Node.js `fs` modülü) |
| Middleware | Logger: her isteğin zaman damgası, metodu ve uç noktası konsola yazılır |
| Hata yönetimi | 400 (hatalı istek), 404 (bulunamadı) ve 500 (sunucu hatası) için JSON yanıtlar |
| Test aracı | Postman |

### Klasör Yapısı

```text
src/
├── app.js               # Sunucu, middleware ve route tanımları
├── middleware/
│   └── logger.js        # İstek kayıt (logger) middleware'i
├── routes/
│   └── tasks.js         # Görev uç noktaları (Router)
└── utils/
    └── file.js          # JSON dosyası okuma, yazma ve yedekleme
data/
└── tasks.json           # Görev verileri
```

## 4. Veri Modeli

Her görev aşağıdaki alanlardan oluşur:

| Alan | Tip | Açıklama |
| :--- | :--- | :--- |
| `id` | Sayı | Benzersiz kimlik (sistem otomatik atar) |
| `title` | Metin | Görev başlığı (zorunlu) |
| `description` | Metin | Görev açıklaması |
| `priority` | Metin | Öncelik: `low`, `medium`, `high` |
| `assignee` | Metin | Görevin atandığı çalışan |
| `status` | Metin | Görev durumu: `pending` (varsayılan) veya `completed` |
| `createdAt` | Tarih (ISO) | Oluşturulma zamanı (sistem otomatik atar) |

## 5. API Tasarımı (Endpoint Listesi)

Temel adres: `http://localhost:3000`

| İşlem | Metot | Uç Nokta | Başarılı Yanıt |
| :--- | :--- | :--- | :--- |
| Görev ekleme | `POST` | `/tasks` | `201 Created` |
| Görev listeleme | `GET` | `/tasks` | `200 OK` |
| Görev detayı | `GET` | `/tasks/:id` | `200 OK` |
| Görev güncelleme | `PUT` | `/tasks/:id` | `200 OK` |
| Görev silme | `DELETE` | `/tasks/:id` | `200 OK` |

İstek ve yanıt örnekleri [README](README.md) dosyasındaki API Dokümantasyonu bölümündedir.

## 6. Test

Beş CRUD uç noktasının tamamı Postman ile test edilmiştir. Ayrıca silinen göreve tekrar erişilmeye çalışıldığında `404 Not Found` yanıtı alındığı doğrulanmıştır. Test ekran görüntüleri [`screenshots/`](screenshots/) klasöründedir.
