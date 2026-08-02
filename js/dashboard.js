// ============================================
// QOLBUL QUR'AN - DASHBOARD PREMIUM
// ============================================

function renderDashboard(container) {
    var data = getAllData();
    var favorit = getFavorit();
    var selesai = getSelesai();

    var total = data.length;
    var totalFav = favorit.length;
    var totalDone = selesai.length;
    var progress = total > 0 ? Math.round((totalDone / total) * 100) : 0;

    var now = new Date();
    var masehi = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var namaHari = hari[now.getDay()];

    // ============================================
    // AMBIL TANGGAL HIJRIAH DARI API MYQURAN
    // ============================================
    function getHijriFromAPI(callback) {
        var url = 'https://api.myquran.com/v3/cal/today';
        
        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network error');
                }
                return response.json();
            })
            .then(function(data) {
                console.log('[Hijri] API Response:', data);
                
                if (data && data.status && data.data && data.data.hijr) {
                    var h = data.data.hijr;
                    var hijri = h.today || (h.day + ' ' + h.monthName + ' ' + h.year + ' H');
                    
                    // Simpan ke localStorage (cache)
                    localStorage.setItem('hijriDate', hijri);
                    localStorage.setItem('hijriDateCached', now.toDateString());
                    
                    if (callback) callback(hijri);
                } else {
                    throw new Error('Invalid data');
                }
            })
            .catch(function(error) {
                console.log('[Hijri] Error:', error);
                // Cek cache dulu
                var cachedHijri = localStorage.getItem('hijriDate');
                var cachedDate = localStorage.getItem('hijriDateCached');
                
                if (cachedHijri && cachedDate === now.toDateString()) {
                    if (callback) callback(cachedHijri);
                } else {
                    // Fallback hardcode (Safar 1448 H)
                    if (callback) callback('19 Safar 1448 H');
                }
            });
    }

    // Ambil Hijriah dari API
    var hijri = 'Memuat...';
    getHijriFromAPI(function(result) {
        hijri = result;
        // Update tampilan jika sudah dirender
        var dateBadge = document.querySelector('.date-badge');
        if (dateBadge) {
            dateBadge.innerHTML = '<i class="fas fa-calendar-alt"></i> ' + masehi + ' · ' + hijri;
        }
    });

    // Motivasi quotes
    var quotes = [
        { text: "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya", source: "HR. Bukhari" },
        { text: "Bacalah Al-Qur'an, karena ia akan datang pada hari kiamat sebagai pemberi syafaat", source: "HR. Muslim" },
        { text: "Barang siapa yang membaca satu huruf dari Al-Qur'an maka baginya satu kebaikan", source: "HR. Tirmidzi" },
        { text: "Al-Qur'an adalah obat bagi hati yang gelisah dan penyejuk jiwa yang rindu", source: "-" },
        { text: "Jadikanlah Al-Qur'an sebagai teman terbaik dalam perjalanan hidupmu", source: "-" }
    ];
    var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Ambil bacaan yang belum selesai (rekomendasi)
    var belumSelesai = data.filter(function(item) {
        return selesai.indexOf(item.id) === -1;
    });

    var rekomendasi = [];
    if (belumSelesai.length > 0) {
        var shuffled = belumSelesai.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        rekomendasi = shuffled.slice(0, 4);
    }

    var favoritData = data.filter(function(item) {
        return favorit.indexOf(item.id) > -1;
    });

    var progressText = '';
    if (progress === 0) progressText = 'Mulai perjalanan hafalanmu';
    else if (progress < 30) progressText = 'Semangat, teruskan!';
    else if (progress < 60) progressText = 'Bagus, kamu hebat!';
    else if (progress < 90) progressText = 'Hampir selesai!';
    else progressText = 'Luar biasa!';

    var html = '';

    // ===== HERO =====
    html += '<div class="dash-hero">';
    html += '  <div class="greeting">' + namaHari + '</div>';
    html += '  <h1>Pondok Pesantren Ainul Hasan</h1>';
    html += '  <div class="subtitle">Selamat datang di Qolbul Qur\'an Ainul Hasan</div>';
    html += '  <div class="date-badge">';
    html += '    <i class="fas fa-calendar-alt"></i> ' + masehi + ' · ' + hijri;
    html += '  </div>';
    html += '</div>';

    // ===== MOTIVATIONAL QUOTE =====
    html += '<div class="motivation-card">';
    html += '  <div class="quote">" ' + randomQuote.text + ' "</div>';
    html += '  <div class="quote-source">— ' + randomQuote.source + '</div>';
    html += '</div>';

    // ===== STATS =====
    html += '<div class="dash-stats">';
    html += '  <div class="stat-item">';
    html += '    <span class="stat-icon purple"><i class="fas fa-book-quran"></i></span>';
    html += '    <h3>' + total + '</h3>';
    html += '    <p>Total Bacaan</p>';
    html += '  </div>';
    html += '  <div class="stat-item">';
    html += '    <span class="stat-icon red"><i class="fas fa-heart"></i></span>';
    html += '    <h3>' + totalFav + '</h3>';
    html += '    <p>Favorit</p>';
    html += '  </div>';
    html += '  <div class="stat-item">';
    html += '    <span class="stat-icon green"><i class="fas fa-check-circle"></i></span>';
    html += '    <h3>' + totalDone + '</h3>';
    html += '    <p>Selesai</p>';
    html += '  </div>';
    html += '</div>';

    // ===== PROGRESS =====
    html += '<div class="progress-wrap">';
    html += '  <div class="progress-label">';
    html += '    <span><i class="fas fa-chart-line" style="color:var(--primary);margin-right:8px;"></i> Progress Hafalan</span>';
    html += '    <span class="progress-percent">' + progress + '%</span>';
    html += '  </div>';
    html += '  <div class="progress-bar">';
    html += '    <div class="progress-fill" style="width:' + progress + '%"></div>';
    html += '  </div>';
    html += '  <div class="progress-info">';
    html += '    <span>' + progressText + '</span>';
    html += '    <span>' + totalDone + ' dari ' + total + ' bacaan</span>';
    html += '  </div>';
    html += '</div>';

    // ===== REKOMENDASI =====
    if (rekomendasi.length > 0) {
        html += '<div class="card card-glass">';
        html += '  <h4 style="margin-bottom:14px; font-weight:700; font-size:calc(16px * var(--text-size-multiplier)); display:flex; align-items:center; gap:8px;">';
        html += '    <i class="fas fa-lightbulb" style="color:#f59e0b;"></i> Rekomendasi Bacaan';
        html += '  </h4>';
        html += '  <div class="rekomendasi-list">';

        rekomendasi.forEach(function(item) {
            var totalAyat = item.totalVerses || (item.verses ? item.verses.length : 0);

            html += '  <div class="rekomendasi-item" data-id="' + item.id + '">';
            html += '    <div class="rekomendasi-info">';
            html += '      <div class="rekomendasi-title">' + item.title + '</div>';
            html += '      <div class="rekomendasi-meta">' + item.category + ' · ' + totalAyat + ' ayat</div>';
            html += '    </div>';
            html += '    <div class="rekomendasi-action">';
            html += '      <button class="rekomendasi-btn" onclick="event.stopPropagation();navigateTo(\'detail\',' + item.id + ')">';
            html += '        <i class="fas fa-arrow-right"></i>';
            html += '      </button>';
            html += '    </div>';
            html += '  </div>';
        });

        html += '  </div>';
        html += '  <div style="margin-top:12px; text-align:center;">';
        html += '    <button class="lihat-semua-btn" onclick="navigateTo(\'semua\')">Lihat Semua Bacaan</button>';
        html += '  </div>';
        html += '</div>';
    }

    // ===== FAVORIT =====
    if (favoritData.length > 0) {
        html += '<div class="card card-glass">';
        html += '  <h4 style="margin-bottom:14px; font-weight:700; font-size:calc(16px * var(--text-size-multiplier)); display:flex; align-items:center; gap:8px;">';
        html += '    <i class="fas fa-heart" style="color:#ef4444;"></i> Favorit Teratas';
        html += '  </h4>';
        html += '  <div class="favorit-list">';

        var topFavorit = favoritData.slice(0, 3);
        topFavorit.forEach(function(item) {
            var totalAyat = item.totalVerses || (item.verses ? item.verses.length : 0);

            html += '  <div class="favorit-item" data-id="' + item.id + '">';
            html += '    <div class="favorit-info">';
            html += '      <div class="favorit-title">' + item.title + '</div>';
            html += '      <div class="favorit-meta">' + item.category + ' · ' + totalAyat + ' ayat</div>';
            html += '    </div>';
            html += '    <div class="favorit-action">';
            html += '      <button class="favorit-btn" onclick="event.stopPropagation();navigateTo(\'detail\',' + item.id + ')">';
            html += '        <i class="fas fa-book-open"></i>';
            html += '      </button>';
            html += '    </div>';
            html += '  </div>';
        });

        html += '  </div>';
        html += '  <div style="margin-top:12px; text-align:center;">';
        html += '    <button class="lihat-semua-btn" onclick="navigateTo(\'favorid\')">Lihat Semua Favorit</button>';
        html += '  </div>';
        html += '</div>';
    }

    container.innerHTML = html;

    // Events untuk klik
    container.querySelectorAll('.rekomendasi-item').forEach(function(el) {
        el.addEventListener('click', function() {
            var id = parseInt(this.dataset.id);
            navigateTo('detail', id);
        });
    });

    container.querySelectorAll('.favorit-item').forEach(function(el) {
        el.addEventListener('click', function() {
            var id = parseInt(this.dataset.id);
            navigateTo('detail', id);
        });
    });
}