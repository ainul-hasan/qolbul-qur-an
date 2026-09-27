// ============================================
// QOLBUL QUR'AN - DASHBOARD (LAYOUT BARU)
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
        day: 'numeric', month: 'long', year: 'numeric'
    });
    var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var namaHari = hari[now.getDay()];

    function getHijri(callback) {
    // Cek cache dulu — kalau sudah ada untuk hari ini, langsung pakai
    var cached = localStorage.getItem('hijriDate');
    var cachedDate = localStorage.getItem('hijriDateCached');
    if (cached && cachedDate === now.toDateString()) {
        callback(cached);
        return;
    }

    // Ambil dari API mabims.dev
    fetch('https://api.mabims.dev/api/v1/today')
        .then(function(r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(function(res) {
            // Struktur respons mabims.dev:
            // { output: { day: 11, month_name: 'Rabiul Akhir', year: 1448, ... } }
            if (res && res.output && res.output.day && res.output.month_name && res.output.year) {
                var h = res.output;
                var hijri = h.day + ' ' + h.month_name + ' ' + h.year + ' H';

                // Simpan ke cache
                localStorage.setItem('hijriDate', hijri);
                localStorage.setItem('hijriDateCached', now.toDateString());

                callback(hijri);
            } else {
                throw new Error('Struktur respons tidak dikenali');
            }
        })
        .catch(function(err) {
            console.warn('[Hijri] Gagal ambil dari mabims.dev:', err.message);

            // Fallback 1: cache lama (meski beda hari)
            var cached = localStorage.getItem('hijriDate');
            if (cached) {
                callback(cached);
                return;
            }

            // Fallback 2: hardcode terakhir
            callback('19 Safar 1448 H');
        });
    }

    var hijri = 'Memuat...';
    getHijri(function(result) {
        hijri = result;
        var el = document.getElementById('heroHijri');
        if (el) el.textContent = hijri;
    });

    var quotes = [
        { text: "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya", source: "HR. Bukhari" },
        { text: "Bacalah Al-Qur'an, karena ia akan datang pada hari kiamat sebagai pemberi syafaat", source: "HR. Muslim" },
        { text: "Barang siapa yang membaca satu huruf dari Al-Qur'an maka baginya satu kebaikan", source: "HR. Tirmidzi" },
        { text: "Al-Qur'an adalah obat bagi hati yang gelisah dan penyejuk jiwa yang rindu", source: "-" }
    ];
    var rq = quotes[Math.floor(Math.random() * quotes.length)];

    var belumSelesai = data.filter(function(item) { return selesai.indexOf(item.id) === -1; });
    var rekomendasi = [];
    if (belumSelesai.length > 0) {
        var shuffled = belumSelesai.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
        }
        rekomendasi = shuffled.slice(0, 3);
    }

    var favoritData = data.filter(function(item) { return favorit.indexOf(item.id) > -1; }).slice(0, 3);

    var progressText = 'Mulai perjalanan hafalanmu';
    if (progress >= 1 && progress < 30) progressText = 'Semangat, teruskan!';
    else if (progress >= 30 && progress < 60) progressText = 'Bagus, kamu hebat!';
    else if (progress >= 60 && progress < 90) progressText = 'Hampir selesai!';
    else if (progress >= 90) progressText = 'Luar biasa!';

    var html = '';

    // 1. PROFILE HEADER
    html += '<div class="profile-header">';
    html += '  <div class="profile-row">';
    html += '    <div class="profile-greeting">';
    html += '      <span class="profile-day">' + namaHari + '</span>';
    html += '      <h1>Assalamu\'alaikum</h1>';
    html += '      <p class="profile-sub">Pondok Pesantren Ainul Hasan</p>';
    html += '    </div>';
    html += '    <div class="profile-avatar"><i class="fas fa-mosque"></i></div>';
    html += '  </div>';
    html += '  <div class="profile-date">';
    html += '    <i class="fas fa-calendar-alt"></i>';
    html += '    <span>' + masehi + '</span>';
    html += '    <span class="dot">·</span>';
    html += '    <span id="heroHijri">' + hijri + '</span>';
    html += '  </div>';
    html += '</div>';

    // 2. STATS PILL
    html += '<div class="stats-pill-wrap">';
    html += '  <div class="stats-pill">';
    html += '    <div class="stat-pill-item">';
    html += '      <div class="stat-pill-icon green"><i class="fas fa-book-quran"></i></div>';
    html += '      <div class="stat-pill-text"><strong>' + total + '</strong><span>Bacaan</span></div>';
    html += '    </div>';
    html += '    <div class="stat-pill-divider"></div>';
    html += '    <div class="stat-pill-item">';
    html += '      <div class="stat-pill-icon red"><i class="fas fa-heart"></i></div>';
    html += '      <div class="stat-pill-text"><strong>' + totalFav + '</strong><span>Favorit</span></div>';
    html += '    </div>';
    html += '    <div class="stat-pill-divider"></div>';
    html += '    <div class="stat-pill-item">';
    html += '      <div class="stat-pill-icon gold"><i class="fas fa-check-circle"></i></div>';
    html += '      <div class="stat-pill-text"><strong>' + totalDone + '</strong><span>Selesai</span></div>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';

    // 3. PROGRESS
    html += '<div class="progress-clean">';
    html += '  <div class="progress-clean-top">';
    html += '    <div class="progress-clean-label"><i class="fas fa-chart-line"></i><span>Progress Hafalan</span></div>';
    html += '    <div class="progress-clean-percent">' + progress + '<span>%</span></div>';
    html += '  </div>';
    html += '  <div class="progress-clean-bar"><div class="progress-clean-fill" style="width:' + progress + '%"></div></div>';
    html += '  <div class="progress-clean-info"><span>' + progressText + '</span><span>' + totalDone + '/' + total + '</span></div>';
    html += '</div>';

    // 4. QUOTE
    html += '<div class="quote-mini">';
    html += '  <i class="fas fa-quote-right quote-mini-icon"></i>';
    html += '  <p>"' + rq.text + '"</p>';
    html += '  <span>— ' + rq.source + '</span>';
    html += '</div>';

    // 5. REKOMENDASI
    if (rekomendasi.length > 0) {
        html += '<div class="section-clean">';
        html += '  <div class="section-clean-head">';
        html += '    <h3><span class="dot-green"></span>Rekomendasi</h3>';
        html += '    <button class="btn-text-link" onclick="navigateTo(\'semua\')">Semua <i class="fas fa-chevron-right"></i></button>';
        html += '  </div>';
        rekomendasi.forEach(function(item) {
            var jml = item.totalVerses || (item.verses ? item.verses.length : 0);
            html += '<div class="row-item" onclick="navigateTo(\'detail\',' + item.id + ')">';
            html += '  <div class="row-icon green"><i class="fas fa-book"></i></div>';
            html += '  <div class="row-body">';
            html += '    <div class="row-title">' + item.title + '</div>';
            html += '    <div class="row-meta">' + (item.category || 'Umum') + ' · ' + jml + ' ayat</div>';
            html += '  </div>';
            html += '  <i class="fas fa-chevron-right row-arrow"></i>';
            html += '</div>';
        });
        html += '</div>';
    }

    // 6. FAVORIT
    if (favoritData.length > 0) {
        html += '<div class="section-clean">';
        html += '  <div class="section-clean-head">';
        html += '    <h3><span class="dot-red"></span>Favorit</h3>';
        html += '    <button class="btn-text-link" onclick="navigateTo(\'favorid\')">Semua <i class="fas fa-chevron-right"></i></button>';
        html += '  </div>';
        favoritData.forEach(function(item) {
            var jml = item.totalVerses || (item.verses ? item.verses.length : 0);
            html += '<div class="row-item" onclick="navigateTo(\'detail\',' + item.id + ')">';
            html += '  <div class="row-icon red"><i class="fas fa-heart"></i></div>';
            html += '  <div class="row-body">';
            html += '    <div class="row-title">' + item.title + '</div>';
            html += '    <div class="row-meta">' + (item.category || 'Umum') + ' · ' + jml + ' ayat</div>';
            html += '  </div>';
            html += '  <i class="fas fa-chevron-right row-arrow"></i>';
            html += '</div>';
        });
        html += '</div>';
    }
    
    
    // ============================================
    // KALENDER HIJRIAH - MABIMS.DEV API
    // ============================================

    var _kalenderState = {
        offsetBulan: 0,
        todayHijri: null,
        todayMasehi: null
    };

    function initKalenderHijriah() {
        var todayMasehi = new Date();
        _kalenderState.todayMasehi = todayMasehi;

        fetch('https://api.mabims.dev/api/v1/today')
            .then(function(r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            })
            .then(function(res) {
                if (res && res.output && res.output.day && res.output.month_name && res.output.year) {
                    _kalenderState.todayHijri = {
                        day: res.output.day,
                        month: res.output.month,
                        month_name: res.output.month_name,
                        year: res.output.year
                    };
                    renderKalenderBulan();
                } else {
                    throw new Error('Struktur tidak dikenali');
                }
            })
            .catch(function(err) {
                console.warn('[Kalender] Gagal:', err.message);
                _kalenderState.todayHijri = {
                    day: 1, month: 1, month_name: 'Muharram', year: 1448
                };
                renderKalenderBulan();
            });
    }

    function changeKalenderBulan(delta) {
        _kalenderState.offsetBulan += delta;
        renderKalenderBulan();
    }

    function renderKalenderBulan() {
        var grid = document.getElementById('kalenderGrid');
        var monthLabel = document.getElementById('kalenderMonthLabel');
        if (!grid || !_kalenderState.todayHijri) return;

        var th = _kalenderState.todayHijri;
        var targetMonth = th.month + _kalenderState.offsetBulan;
        var targetYear = th.year;
        while (targetMonth < 1) { targetMonth += 12; targetYear -= 1; }
        while (targetMonth > 12) { targetMonth -= 12; targetYear += 1; }

        var namaBulan = getNamaBulanHijriah(targetMonth);
        monthLabel.textContent = namaBulan + ' ' + targetYear + ' H';

        var totalHari = 30;
        var kolomAwal = (th.day - 1) % 7;

        var html = '';
        for (var k = 0; k < kolomAwal; k++) {
            html += '<span class="kalender-day empty"></span>';
        }
        for (var d = 1; d <= totalHari; d++) {
            var isToday = (_kalenderState.offsetBulan === 0) && (d === th.day);
            var cls = 'kalender-day' + (isToday ? ' today' : '');
            html += '<span class="' + cls + '">' + d + '</span>';
        }
        grid.innerHTML = html;
    }

    function getNamaBulanHijriah(bulan) {
        var nama = [
            'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
            'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Syaban',
            'Ramadan', 'Syawal', 'Zulkaidah', 'Zulhijjah'
        ];
        return nama[bulan - 1] || '—';
    }
    

    container.innerHTML = html;
}
