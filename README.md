# 📖 Qolbul Qur'an

**Aplikasi Bacaan, Wirid & Doa Pondok Pesantren Ainul Hasan**

![Version](https://img.shields.io/badge/version-2.0.0-0f766e)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Mobile-lightgrey)
![PWA](https://img.shields.io/badge/PWA-Ready-success)
![Language](https://img.shields.io/badge/language-HTML%20%7C%20CSS%20%7C%20JavaScript-yellow)

---

## ✨ Tentang Aplikasi

**Qolbul Qur'an** adalah aplikasi web mobile yang dirancang khusus untuk **para alumni, asatidz, jamaah, dan santri** Pondok Pesantren Ainul Hasan dalam mengakses bacaan, wirid, dan doa harian.

Aplikasi ini hadir dengan desain modern bertema **hijau islami + emas**, mendukung **mode offline (PWA)**, dan dapat **di-install ke Home Screen** HP Android & iOS.

> _"Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya"_
> — **HR. Bukhari**

---

## 🚀 Fitur Unggulan

### 📊 Dashboard
- Ucapan **Assalamu'alaikum** dengan nama hari
- Tanggal **Masehi + Hijriah** (API MABIMS/Kemenag)
- **Statistik** bacaan, favorit, dan selesai
- **Progress Hafalan** dengan animasi
- **Quote motivasi harian**
- **Rekomendasi Bacaan** acak yang belum selesai
- **Favorit Teratas**

### 📖 Semua Bacaan
- Daftar lengkap semua bacaan
- **Pencarian realtime**
- **Filter kategori** (scroll horizontal)
- Tombol **❤️ Favorit** dan **✅ Selesai** di setiap item

### ❤️ Favorit
- Daftar bacaan favorit
- Tambah/hapus favorit dengan satu klik

### ✅ Selesai
- Daftar bacaan yang sudah dihafal
- Batalkan status selesai kapan saja

### 📖 Detail Bacaan
- **Teks Arab** dengan font Amiri
- **Latin** (transliterasi)
- **Terjemahan** Bahasa Indonesia
- Tombol aksi Favorit & Selesai
- **Ukuran teks bisa diubah** (4 pilihan)

### ⚙️ Pengaturan
- **Dark Mode** 🌙
- **4 ukuran teks**: Kecil, Sedang, Besar, Sangat Besar
- **Toggle** tampilkan Latin & Terjemahan
- **Reset** favorit / selesai / semua data

### 📲 PWA (Progressive Web App)
- **Install ke Home Screen** ala aplikasi native
- **Offline mode** — bisa dibuka tanpa internet
- **Icon kustom** di Home Screen
- **Splash screen** otomatis

---

## 🎨 Desain & Tema

| Elemen | Detail |
|--------|--------|
| **Warna Utama** | 🟢 Hijau Islami (`#0f766e`) |
| **Warna Aksen** | 🟡 Emas Royal (`#d97706`) |
| **Font Utama** | Inter (modern, clean) |
| **Font Arab** | Amiri (indah, klasik) |
| **Icons** | Font Awesome 6 |
| **Layout** | Mobile-first, max 480px |
| **Style** | Top AppBar + Bottom Nav ala aplikasi besar |

---

## 🛠️ Teknologi

| Teknologi | Deskripsi |
|-----------|-----------|
| **HTML5** | Struktur aplikasi |
| **CSS3** | Modern styling + animasi |
| **JavaScript ES6** | Logika & interaksi |
| **LocalStorage** | Penyimpanan data di perangkat |
| **Service Worker** | Cache offline & PWA |
| **Web App Manifest** | Metadata PWA |
| **MABIMS API** | Kalender Hijriah Indonesia |
| **Font Awesome** | Icon premium |
| **Google Fonts** | Inter + Amiri |

---

## 📁 Struktur Folder
qolbul-quran/
├── index.html # Aplikasi utama (SPA)
├── manifest.json # PWA manifest
├── sw.js # Service Worker
├── offline.html # Halaman offline fallback
├── README.md # Dokumentasi ini
│
├── css/
│ └── style.css # Stylesheet utama
│
├── js/
│ ├── data.js # Data bacaan (edit di sini!)
│ ├── app.js # Core aplikasi
│ ├── dashboard.js # Halaman dashboard
│ ├── semua.js # Halaman semua bacaan
│ ├── favorid.js # Halaman favorit
│ ├── selesai.js # Halaman selesai
│ ├── pengaturan.js # Halaman pengaturan
│ └── detail.js # Halaman detail bacaan
│
└── icons/
├── 72x72.png
├── 96x96.png
├── 128x128.png
├── 144x144.png
├── 152x152.png
├── 192x192.png
├── 384x384.png
└── 512x512.png

text

---

## 🚀 Cara Menjalankan

### 🌐 Akses Online (GitHub Pages)

Aplikasi ini sudah di-hosting di GitHub Pages:
https://ainul-hasan.github.io/qolbul-qur-an/

text

### 💻 Jalankan Lokal (Development)

**Opsi 1: Live Server VS Code (Rekomendasi)**
1. Install ekstensi **Live Server** di VS Code
2. Klik kanan `index.html` → **Open with Live Server**
3. Buka di browser: `http://localhost:5500/`

**Opsi 2: Python HTTP Server**
```bash
python -m http.server 5500
# Buka: http://localhost:5500/
Opsi 3: Node.js

bash
npx serve -p 5500
⚠️ PENTING: Jangan buka via file:/// karena PWA tidak akan berfungsi!

📲 Cara Install sebagai Aplikasi
🤖 Android (Chrome)
Buka aplikasi di Chrome

Tunggu 30 detik → banner install muncul

Tap tombol Install

Aplikasi akan muncul di Home Screen

🍎 iPhone/iPad (Safari)
Buka aplikasi di Safari (bukan Chrome)

Tap tombol Share ⬆️

Pilih Add to Home Screen

Tap Add

💻 Desktop (Chrome/Edge)
Buka aplikasi

Klik ikon install di address bar

Atau menu → Install Qolbul Qur'an

📝 Cara Menambah Bacaan Baru
1. Buka js/data.js
2. Tambahkan data di array window.READINGS_DATA
javascript
{
    id: 12,                       // ID unik (increment dari terakhir)
    title: "Nama Bacaan",         // Judul
    subtitle: "Subtitle",         // Sub-judul (opsional)
    verses: [
        {
            arabic: "نص عربي",     // Teks Arab
            latin: "Teks latin",  // Latin (opsional)
            translation: "Terjemahan" // Terjemahan (opsional)
        }
        // Tambahkan ayat lainnya...
    ],
    totalVerses: 1                // Total ayat
}
3. Simpan file & refresh browser
Contoh lengkap:

javascript
{
    id: 12,
    title: "Surah Al-Kahfi",
    subtitle: "الكهف",
    verses: [
        {
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَنْزَلَ عَلَى عَبْدِهِ الْكِتَابَ",
            latin: "Alhamdu lillahil ladzi anzala 'ala 'abdihil kitab",
            translation: "Segala puji bagi Allah yang telah menurunkan Kitab (Al-Qur'an) kepada hamba-Nya"
        }
    ],
    totalVerses: 1
}
💾 Penyimpanan Data
Data pengguna disimpan di LocalStorage browser:

Key	Deskripsi	Format
favorit	ID bacaan favorit	[1, 3, 5, 7]
selesai	ID bacaan selesai	[2, 4, 6, 8]
theme	Tema aplikasi	'light' / 'dark'
textSize	Ukuran teks	'small' / 'medium' / 'large' / 'xlarge'
showLatin	Tampilkan latin	'true' / 'false'
showTranslation	Tampilkan terjemahan	'true' / 'false'
hijriDate	Cache tanggal Hijriah	'17 Rabiul Akhir 1448 H'
lastDetailId	ID terakhir dibaca	7
🔧 Pengembangan
Menambah Kategori Baru
Cukup tambahkan di js/data.js dengan category baru:

javascript
{
    id: 13,
    title: "Bacaan Baru",
    category: "Doa Harian",  // Kategori baru
    verses: [...],
    totalVerses: 1
}
Filter di halaman Semua akan otomatis muncul.

Mengganti Warna Tema
Edit css/style.css, bagian :root:

css
:root {
    --primary: #0f766e;         /* Warna utama */
    --primary-light: #14b8a6;   /* Warna utama muda */
    --gold: #d97706;            /* Warna aksen emas */
    --gold-light: #fbbf24;      /* Emas muda */
}
Mengganti Logo
Ganti file icons/128x128.png dengan logo baru (persegi, background transparan).

Update Cache Service Worker
Setiap kali update aplikasi, naikkan versi cache di sw.js:

javascript
const CACHE_NAME = 'qolbul-quran-v2.0.1'; // naikkan versi
Ini memastikan user mendapat versi terbaru.

🐛 Troubleshooting
Aplikasi tidak muncul saat dibuka offline?
Solusi: Pastikan sudah dibuka minimal 1x dengan internet agar Service Worker bisa caching.

Banner install tidak muncul?
Cek list berikut:

□ URL pakai HTTPS atau localhost (bukan file:/// atau 127.0.0.1)
□ Icon 192x192 & 512x512 sudah ada
□ Service Worker aktif (cek di DevTools → Application)
□ Tunggu 30 detik + interaksi dengan halaman
Data hilang setelah refresh?
Solusi: Data disimpan di LocalStorage. Jangan clear cache browser.

Tampilan lama masih muncul?
Solusi: Hard refresh dengan Ctrl + Shift + R, atau:

Buka DevTools (F12)

Tab Application → Service Workers

Klik Unregister

Reload halaman

Reset semua data?
Solusi: Buka Pengaturan → Data → Reset Semua Data

📊 Kompatibilitas
Platform	Browser	Status
🤖 Android	Chrome, Firefox, Samsung Internet	✅
🍎 iOS	Safari, Chrome	✅
💻 Desktop	Chrome, Firefox, Edge, Safari	✅
📴 Offline	Setelah first load	✅
📲 PWA Install	Android, iOS, Desktop	✅
🎯 Roadmap Fitur
Fitur yang direncanakan untuk update selanjutnya:

□ 📢 Pengumuman Pondok
□ 🕌 Jadwal Kajian Rutin
□ 📖 Materi Khutbah Jumat
□ 👥 Direktori Kontak Asatidz
□ 🕌 Jadwal Waktu Sholat
□ 📅 Kalender Kegiatan Pondok
□ 💝 Info Infaq & Donasi
□ 🌙 Hijriah Countdown
📄 Lisensi
text
MIT License

Copyright (c) 2026 Qolbul Qur'an · Pondok Pesantren Ainul Hasan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
🙏 Kontribusi
Kontribusi selalu diterima! Untuk berkontribusi:

Fork repository ini

Buat branch baru: git checkout -b fitur-baru

Commit perubahan: git commit -m 'Tambah fitur baru'

Push ke branch: git push origin fitur-baru

Buat Pull Request

📞 Kontak & Dukungan
🏫 Pondok Pesantren Ainul Hasan

📍 Maron, Probolinggo, Jawa Timur

🌐 Website: GitHub Repo

📧 Email: support@qolbulquran.com

🙌 Terima Kasih
Terima kasih telah menggunakan Qolbul Qur'an. Semoga aplikasi ini bermanfaat untuk meningkatkan hafalan, bacaan, dan kecintaan kita kepada Al-Qur'an.

"Dan sesungguhnya telah Kami mudahkan Al-Qur'an untuk pelajaran, maka adakah orang yang mau mengambil pelajaran?"
— QS. Al-Qamar: 17

📊 Version History
Version	Tanggal	Perubahan
2.0.0	2026-09-28	🎨 Redesign total (hijau islami + emas), Top AppBar, PWA install, Kalender Hijriah, fix teks Arab
1.0.3	2026-06-18	Tambah rekomendasi & favorit teratas
1.0.2	2026-06-18	Tambah fitur ukuran teks
1.0.1	2026-06-18	Fix back button navigation
1.0.0	2026-06-18	Initial release
© 2026 Qolbul Qur'an · Pondok Pesantren Ainul Hasan
