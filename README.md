# 📝 Task Manager API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)

Node.js ve Express.js üzerine inşa edilmiş, kalıcı veri depolama için dosya sistemini (JSON) kullanan hafif, hızlı ve bağımsız bir RESTful Görev Yönetimi API'si.

Bu proje, veritabanı bağımlılığı olmadan tam kapsamlı CRUD operasyonlarını, gelişmiş hata yönetimini ve dinamik yönlendirme mimarisini uçtan uca sunar.

---

## 📑 İçindekiler
- [Özellikler](#-özellikler)
- [Mimari ve Teknolojiler](#-mimari-ve-teknolojiler)
- [Klasör Yapısı](#-klasör-yapısı)
- [Kurulum Rehberi](#-kurulum-rehberi)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Hata Yönetimi ve Durum Kodları](#-hata-yönetimi-ve-durum-kodları)
- [Test ve Doğrulama](#-test-ve-doğrulama)

---

## 🚀 Özellikler
- **Tam CRUD Desteği:** Görevleri oluşturma, okuma, güncelleme ve kalıcı olarak silme.
- **Kalıcı Depolama:** Veriler anlık olarak `fs` modülü ile fiziksel `tasks.json` dosyasına işlenir.
- **Parametrik Yönlendirme:** Benzersiz ID'ler üzerinden tekil veri manipülasyonu.
- **Güvenli Hata Yakalama:** Merkezi hata yönetimi, 404 ve 500 hataları için yapılandırılmış JSON dönüşleri.
- **Hafif ve Bağımsız:** Harici bir veritabanı kurulumu (MongoDB, SQL vb.) gerektirmez.

---

## 🛠 Mimari ve Teknolojiler
- **Çalışma Ortamı:** [Node.js](https://nodejs.org/)
- **Web Çerçevesi:** [Express.js](https://expressjs.com/)
- **Veri Katmanı:** Node.js Native `fs` (File System) & JSON
- **Test Aracı:** Postman

---

## 📁 Klasör Yapısı
Proje, sürdürülebilirlik ve ölçeklenebilirlik prensiplerine uygun olarak modüler bir yapıda tasarlanmıştır:

```text
task-manager-api/
├── data/
│   └── tasks.json         # Fiziksel veri depolama dosyası
├── src/
│   ├── app.js             # Express uygulama yapılandırması ve sunucu girişi
│   └── routes/
│       └── tasks.js       # Görev yönetimi uç noktaları (Router)
├── .env                   # Çevresel değişkenler
├── package.json           # Bağımlılık ağacı ve NPM scriptleri
└── README.md              # Proje dokümantasyonu
```

---

## ⚙️ Kurulum Rehberi

Geliştirme ortamınızı kurmak için aşağıdaki adımları sırasıyla uygulayın.

### Ön Koşullar
- Node.js (v14.x veya üzeri önerilir)
- NPM veya Yarn paket yöneticisi

### Adımlar

1. **Bağımlılıkları Yükleyin:**
   Proje kök dizininde terminalinizi açın ve gerekli paketleri indirin.
   ```bash
   npm install
   ```

2. **Çevresel Değişkenleri Ayarlayın (Opsiyonel):**
   Ana dizinde bir `.env` dosyası oluşturun.
   ```env
   PORT=3000
   ```

3. **Sunucuyu Başlatın:**
   ```bash
   node src/app.js
   ```
   > Başarılı başlatma sonrasında terminalde `Server is running on port 3000` çıktısı alınacaktır.

---

## 📡 API Dokümantasyonu

Temel URL: `http://localhost:3000/tasks`

### 1. Tüm Görevleri Getir
Sistemde kayıtlı olan tüm görevleri liste formatında döndürür.
- **Metot:** `GET`
- **Uç Nokta:** `/`
- **Başarılı Yanıt (200 OK):**
  ```json
  {
    "message": "Tasks retrieved",
    "status": "success",
    "tasks": [ ... ]
  }
  ```

### 2. Tekil Görev Getir
Benzersiz ID numarasına göre spesifik bir görevi döndürür.
- **Metot:** `GET`
- **Uç Nokta:** `/:id`
- **Başarılı Yanıt (200 OK):**
  ```json
  {
    "message": "Task found",
    "status": "success",
    "task": {
      "id": 1792347042918,
      "title": "Complete Tests",
      "description": "Save Postman screenshots to the folder.",
      "priority": "high",
      "assignee": "Kubilay Karaca",
      "createdAt": "2026-10-18T18:10:42.918Z",
      "status": "pending"
    }
  }
  ```

### 3. Yeni Görev Oluştur
Sisteme yeni bir görev kaydeder. Sistem ID, oluşturulma tarihi ve başlangıç durumunu (pending) otomatik atar.
- **Metot:** `POST`
- **Uç Nokta:** `/`
- **İstek Gövdesi (JSON):**
  ```json
  {
    "title": "Update README File",
    "description": "Write detailed setup instructions.",
    "priority": "medium",
    "assignee": "Kubilay Karaca"
  }
  ```
- **Başarılı Yanıt (201 Created):** `{"message": "Task created", "status": "success", "task": { ... }}`

### 4. Görev Güncelle
Mevcut bir görevin statüsünü veya diğer bilgilerini günceller.
- **Metot:** `PUT`
- **Uç Nokta:** `/:id`
- **İstek Gövdesi (JSON):**
  ```json
  {
    "status": "completed"
  }
  ```
- **Başarılı Yanıt (200 OK):** `{"message": "Task updated", "status": "success", "task": { ... }}`

### 5. Görev Sil
Görev verisini sistemden kalıcı olarak temizler.
- **Metot:** `DELETE`
- **Uç Nokta:** `/:id`
- **Başarılı Yanıt (200 OK):**
  ```json
  {
    "message": "Task deleted",
    "status": "success"
  }
  ```

---

## 🛡 Hata Yönetimi ve Durum Kodları

API, istemci ve sunucu hatalarında standartlaştırılmış HTTP durum kodları ve JSON hata mesajları döndürür.

| Kod | Durum | Açıklama |
| :--- | :--- | :--- |
| **200** | `OK` | İstek başarıyla işlendi (GET, PUT, DELETE). |
| **201** | `Created` | Yeni kaynak başarıyla oluşturuldu (POST). |
| **400** | `Bad Request` | İstek gövdesi eksik veya hatalı formatta. |
| **404** | `Not Found` | İstenen uç nokta veya belirtilen ID'ye sahip görev bulunamadı. |
| **500** | `Internal Error` | Sunucu tarafında veri okuma/yazma işlemi sırasında beklenmeyen bir hata oluştu. |

---

## 🧪 Test ve Doğrulama

Bu API uç noktalarının tamamı (GET, POST, PUT, DELETE) **Postman** kullanılarak uçtan uca test edilmiş ve tam kararlılıkla çalıştığı doğrulanmıştır. 
Özellikle silme (DELETE) işleminin bütünlüğü, silinen veriye tekrar erişilmeye çalışıldığında (GET `/:id`) başarılı bir şekilde `404 Not Found` hatası alınmasıyla güvence altına alınmıştır.