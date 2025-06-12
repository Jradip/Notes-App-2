# Submission Web Intermediate - Proyek Kedua

## 🌐 Deskripsi Proyek

Proyek ini merupakan submission kedua dari kelas **Belajar Pengembangan Web Intermediate** oleh Dicoding. Aplikasi ini dibangun menggunakan **Webpack** dan menerapkan berbagai fitur modern dalam pengembangan aplikasi web.


## 🚀 Fitur Utama

- ✅ Menggunakan **Webpack** sebagai module bundler
- ✅ **Push Notification** melalui Notification API dan Service Worker
- ✅ Mengadopsi **Progressive Web App (PWA)** (Installable & Offline)
- ✅ Menggunakan **IndexedDB** untuk penyimpanan data lokal
- ✅ Memanfaatkan satu **API** sebagai sumber data utama
- ✅ Menggunakan arsitektur **Single-Page Application (SPA)** berbasis hash routing
- ✅ Menampilkan data dari API (termasuk gambar, deskripsi, lokasi)
- ✅ Memiliki fitur **tambah data baru** melalui form
- ✅ Menerapkan **aksesibilitas** sesuai dengan standar web (semantic element & skip link)
- ✅ Menerapkan transisi halaman yang **halus dan responsif**

## 📁 Struktur Folder (src)

```
src/
├── data/
│   ├── PostData.js
│   └── UserData.js
├── presenter/
│   ├── AddStoryPresenter.js
│   ├── LoginPresenter.js
│   ├── PostPresenter.js
│   └── RegisterPresenter.js
├── public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── app.webmanifest
├── script/
│   └── index.js
├── style/
│   └── style.css
├── utils/
│   ├── config.js
│   ├── indexedDb.js
│   ├── location.js
│   ├── notification-helper.js
│   └── router.js
├── views/
│   ├── pages/
│   │   ├── add-page.js
│   │   ├── favorite-page.js
│   │   ├── home-page.js
│   │   ├── login-page.js
│   │   ├── register-page.js
│   └── PostView.js
├── index.html
├── service-worker.js
```

## 🛠️ Teknologi yang Digunakan

- Webpack 5
- JavaScript (ES6)
- HTML5 & CSS3
- IndexedDB (idb)
- Service Worker & Notification API
- Web App Manifest
- SPA Architecture (Hash Routing)
- Leaflet.js (jika digunakan untuk peta)
- Lighthouse A11y Compliance

## 💻 Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/username/proyek-kedua.git
cd proyek-kedua
```

### 2. Install Dependency

```bash
npm install
```

### 3. Jalankan Mode Development

```bash
npm run dev
```

Akses di browser: `http://localhost:8080`

### 4. Build untuk Produksi

```bash
npm run build
```

Output akan muncul di folder `dist/` dan siap untuk deploy.

### 5. Jalankan Produksi Secara Lokal (Opsional)

Untuk menjalankan hasil build (`dist/`) secara lokal di browser:

```bash
npm install -g serve
serve -s dist
```

Aplikasi akan tersedia di: `http://localhost:3000`

## 🌍 Akses Publik

Project ini dapat diakses oleh publik melalui tautan berikut:

🔗 https://transcendent-unicorn-e0858a.netlify.app

