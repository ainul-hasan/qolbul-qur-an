# 📖 Qolbul Qur'an

**Aplikasi Web Mobile untuk Menghafal dan Mengelola Bacaan Qur'an**

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Mobile-lightgrey)
![Language](https://img.shields.io/badge/language-HTML%20%7C%20CSS%20%7C%20JavaScript-yellow)

---

## ✨ Tentang Aplikasi

Qolbul Qur'an adalah aplikasi web mobile yang dirancang untuk membantu umat Muslim dalam menghafal dan mengelola bacaan Al-Qur'an serta wirid harian. Aplikasi ini hadir dengan desain modern berbasis **glassmorphism** dan **gradient ungu** yang elegan, memberikan pengalaman pengguna yang nyaman dan menyenangkan.

> "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya" - HR. Bukhari

---

## 🚀 Fitur Unggulan

### 📊 Dashboard
- **Sambutan** - Ucapan Assalamu'alaikum dengan nama hari
- **Tanggal** - Menampilkan tanggal Masehi dan Hijriyah
- **Statistik** - Total bacaan, favorit, dan selesai
- **Progress Hafalan** - Progress bar dengan animasi dan pesan motivasi
- **Rekomendasi Bacaan** - 4 bacaan acak yang belum selesai
- **Favorit Teratas** - 3 bacaan favorit teratas

### 📖 Semua Bacaan
- **Daftar Lengkap** - Semua bacaan tersedia
- **Pencarian Realtime** - Cari bacaan dengan cepat
- **Filter Kategori** - Filter berdasarkan kategori (quran, tawasul, tahlil, dll)
- **Tombol Favorit** - Tambah/hapus favorit dengan satu klik
- **Tombol Selesai** - Tandai bacaan yang sudah selesai

### ❤️ Favorit
- **Daftar Favorit** - Menampilkan semua bacaan favorit
- **Hapus Favorit** - Hapus dari daftar favorit

### ✅ Selesai
- **Daftar Selesai** - Menampilkan semua bacaan yang sudah selesai
- **Batalkan Selesai** - Batalkan status selesai

### 📖 Detail Bacaan
- **Teks Arab** - Tampilan Arab dengan font besar
- **Latin** - Transliterasi latin
- **Terjemahan** - Terjemahan Bahasa Indonesia
- **Tombol Aksi** - Tambah/hapus favorit dan tandai selesai

### ⚙️ Pengaturan
- **Dark Mode** - Tema gelap untuk kenyamanan membaca
- **Light Mode** - Tema terang default
- **Ukuran Teks** - 4 pilihan (Kecil, Sedang, Besar, Sangat Besar)
- **Reset Data** - Reset favorit, selesai, atau semua data

### 🔄 Navigasi
- **Bottom Navigation** - Navigasi bawah yang modern
- **Tombol Back HP** - Kembali ke halaman sebelumnya
- **Konfirmasi Keluar** - Konfirmasi sebelum keluar aplikasi

---

## 📸 Tampilan Aplikasi

| Dashboard | Semua Bacaan | Detail Bacaan |
|-----------|--------------|---------------|
| Hero dengan gradient | List dengan search & filter | Arab, Latin, Terjemahan |
| Statistik 3 kartu | Tombol favorit & selesai | Tombol aksi di atas |
| Progress bar animasi | Klik untuk detail | Kembali dengan tombol back |

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Deskripsi |
|-----------|-----------|
| **HTML5** | Struktur dasar aplikasi |
| **CSS3** | Styling dengan glassmorphism, gradient, animasi |
| **JavaScript ES6** | Logika aplikasi, navigasi, localStorage |
| **Font Awesome** | Icon modern dan premium |
| **Google Fonts** | Font Inter yang elegan |
| **LocalStorage** | Penyimpanan data di perangkat |

---

## 📁 Struktur Folder

```
qolbul-quran/
├── index.html                 # Single Page App (SPA)
├── css/
│   └── style.css              # Stylesheet utama
├── js/
│   ├── data.js                # Data bacaan (isi sendiri)
│   ├── app.js                 # Aplikasi utama & navigasi
│   ├── dashboard.js           # Halaman Dashboard
│   ├── semua.js               # Halaman Semua Bacaan
│   ├── favorid.js             # Halaman Favorit
│   ├── selesai.js             # Halaman Selesai
│   └── pengaturan.js          # Halaman Pengaturan
├── html/                      # Multi Page files
│   ├── dashboard.html
│   ├── semua.html
│   ├── favorid.html
│   ├── selesai.html
│   ├── pengaturan.html
│   └── detail.html
├── assest/
│   └── style.css              # Copy dari css/style.css
└── README.md                  # Dokumentasi
```

---

## 💾 Penyimpanan Data (LocalStorage)

| Key | Deskripsi | Format |
|-----|-----------|--------|
| `favorit` | ID bacaan favorit | `[1, 3, 5, 7]` |
| `selesai` | ID bacaan selesai | `[2, 4, 6, 8]` |
| `theme` | Tema aplikasi | `'light'` atau `'dark'` |
| `textSize` | Ukuran teks | `'small'`, `'medium'`, `'large'`, `'xlarge'` |
| `lastDetailId` | ID terakhir dibaca | `7` |

---

## 🚀 Cara Menjalankan

### Single Page App (SPA)
```bash
1. Buka file index.html di browser
2. Aplikasi akan langsung berjalan
```

### Multi Page
```bash
1. Buka folder html/
2. Buka salah satu file: dashboard.html, semua.html, dll.
```

### Live Server (Rekomendasi)
```bash
# Menggunakan VS Code Live Server
1. Install ekstensi Live Server
2. Klik kanan index.html
3. Pilih "Open with Live Server"
```

---

## 📝 Cara Menambah Data Bacaan

### 1. Buka file `js/data.js`

### 2. Tambahkan data baru dengan format:

```javascript
{
    id: 16,  // ID UNIK (increment dari ID terakhir)
    title: "Nama Bacaan",
    subtitle: "Subtitle",
    category: "kategori",  // quran, tawasul, tahlil, wirid, dll
    verses: [
        {
            arabic: "نص عربي",
            latin: "Teks Latin",
            translation: "Terjemahan"
        },
        // Tambahkan ayat lainnya...
    ],
    totalVerses: 5  // Jumlah total ayat
}
```

### 3. Simpan file dan refresh browser

### Contoh Penambahan:

```javascript
// Di dalam window.READINGS_DATA = [ ... ]
{
    id: 16,
    title: "Surah Al-Kahfi",
    subtitle: "الكهف",
    category: "quran",
    verses: [
        {
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَنْزَلَ عَلَى عَبْدِهِ الْكِتَابَ",
            latin: "Alhamdu lillahil ladzi anzala 'ala 'abdihil kitab",
            translation: "Segala puji bagi Allah yang telah menurunkan Kitab (Al-Qur'an) kepada hamba-Nya"
        }
    ],
    totalVerses: 1
}
```

---

## 🎨 Desain & UI

### Glassmorphism
- Efek kaca dengan blur `16px`
- Background transparan dengan warna putih/ungu
- Shadow halus untuk kedalaman

### Gradient Ungu
- Dominasi warna ungu pastel
- Gradient `#7c3aed` ke `#4f46e5`
- Aksen pada hero, tombol, dan elemen penting

### Animasi
- **Loading Screen** - Progress bar dengan animasi
- **Fade Slide** - Transisi antar halaman
- **Shimmer** - Efek kilau pada progress bar
- **Hover/Active** - Micro interaction pada tombol

### Responsive
- Mendukung semua ukuran layar (320px - 430px+)
- Optimal untuk Android dan iPhone
- Touch-friendly dengan ukuran tombol yang nyaman

---

## 📱 Kompatibilitas

| Platform | Browser | Status |
|----------|---------|--------|
| Android | Chrome, Firefox, Samsung Internet | ✅ |
| iOS | Safari, Chrome | ✅ |
| Desktop | Chrome, Firefox, Edge, Safari | ✅ |
| Offline | Setelah pertama kali dibuka | ✅ |

---

## 🔧 Pengembangan

### Menambahkan Fitur Baru

1. **Tambah halaman baru**:
   - Buat file di `js/` (contoh: `halaman.js`)
   - Tambahkan fungsi render di `app.js`

2. **Tambah kategori baru**:
   - Tambahkan di `data.js` dengan category baru
   - Filter akan otomatis muncul

3. **Ubah tampilan**:
   - Edit `css/style.css`
   - Gunakan variabel CSS untuk konsistensi

### Debugging
```javascript
// Buka Console Browser (F12)
console.log('Data:', window.READINGS_DATA);
console.log('Favorit:', localStorage.getItem('favorit'));
console.log('Selesai:', localStorage.getItem('selesai'));
```

---

## ❓ FAQ

### Q: Bagaimana cara reset semua data?
**A:** Buka Pengaturan > Data > Reset Semua Data

### Q: Data hilang setelah refresh?
**A:** Tidak, semua data tersimpan di localStorage

### Q: Bagaimana cara menambahkan surah baru?
**A:** Edit file `js/data.js` dan tambahkan data baru

### Q: Aplikasi tidak bisa dibuka offline?
**A:** Pastikan sudah dibuka sekali dengan koneksi internet

### Q: Bagaimana cara mengganti ukuran teks?
**A:** Buka Pengaturan > Ukuran Teks > Pilih ukuran

---

## 📄 Lisensi

MIT License

Copyright (c) 2026 Qolbul Qur'an

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

## 🙏 Kontribusi

Kontribusi selalu diterima! Silakan buat pull request atau laporkan issue.

### Cara Berkontribusi:
1. Fork repository
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

---

## 📞 Kontak

- **Email**: support@qolbulquran.com
- **Website**: https://qolbulquran.com
- **GitHub**: https://github.com/qolbulquran

---

## 🙌 Terima Kasih

Terima kasih telah menggunakan Qolbul Qur'an. Semoga aplikasi ini bermanfaat untuk meningkatkan hafalan dan kecintaan kita kepada Al-Qur'an.

> "Dan sesungguhnya telah Kami mudahkan Al-Qur'an untuk pelajaran, maka adakah orang yang mau mengambil pelajaran?" - QS. Al-Qamar: 17

---

**© 2026 Qolbul Qur'an · Hafalan Qur'an**

---

## 📊 Version History

| Version | Tanggal | Perubahan |
|---------|---------|-----------|
| 1.0.0 | 2026-06-18 | Initial release |
| 1.0.1 | 2026-06-18 | Fix back button navigation |
| 1.0.2 | 2026-06-18 | Add text size feature |
| 1.0.3 | 2026-06-18 | Add rekomendasi & favorit teratas |

---
```

---

## 📄 README.md (VERSI SINGKAT)

Jika Anda menginginkan versi yang lebih ringkas:

```markdown
# 📖 Qolbul Qur'an

Aplikasi Web Mobile untuk Menghafal dan Mengelola Bacaan Qur'an

## Fitur
- 📊 Dashboard dengan statistik dan progress
- 📖 Semua bacaan dengan pencarian dan filter
- ❤️ Favorit dan ✅ Selesai
- ⚙️ Dark/Light mode & ukuran teks
- 💾 Penyimpanan localStorage

## Teknologi
- HTML5, CSS3, JavaScript ES6
- Glassmorphism & Gradient Ungu
- Font Awesome & Google Fonts

## Cara Menjalankan
Buka `index.html` di browser

## Struktur Folder
```
qolbul-quran/
├── index.html
├── css/style.css
├── js/
│   ├── data.js
│   ├── app.js
│   ├── dashboard.js
│   ├── semua.js
│   ├── favorid.js
│   ├── selesai.js
│   └── pengaturan.js
├── html/
│   ├── dashboard.html
│   ├── semua.html
│   ├── favorid.html
│   ├── selesai.html
│   ├── pengaturan.html
│   └── detail.html
└── README.md
```

## Cara Menambah Data
Edit `js/data.js` dengan format:
```javascript
{
    id: 16,
    title: "Nama Bacaan",
    subtitle: "Subtitle",
    category: "kategori",
    verses: [
        { arabic: "نص", latin: "Latin", translation: "Terjemahan" }
    ],
    totalVerses: 1
}
```

© 2026 Qolbul Qur'an · Hafalan Qur'an
```

---

Pilih salah satu versi README.md yang Anda suka. Versi lengkap lebih detail dan profesional, sedangkan versi singkat lebih padat dan mudah dibaca.