// ============================================
// QOLBUL QUR'AN - DETAIL PAGE
// ============================================

function renderDetail(container, id) {
    var item = getDataById(id);
    
    // Simpan ID terakhir untuk back button
    localStorage.setItem('lastDetailId', id);

    if (!item) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-circle"></i><h4>Data tidak ditemukan</h4><p>Kembali ke halaman sebelumnya</p></div>';
        return;
    }

    var verses = item.verses || [];
    var favorit = getFavorit();
    var selesai = getSelesai();
    var isFav = favorit.indexOf(item.id) > -1;
    var isDone = selesai.indexOf(item.id) > -1;

    var html = '';

    html += '<div class="detail-page">';
    html += '  <div class="detail-header">';
    html += '    <button class="back-btn" onclick="handleBackButton()">';
    html += '      <i class="fas fa-arrow-left"></i>';
    html += '    </button>';
    html += '    <div class="title-section">';
    html += '      <h2>' + item.title + '</h2>';
    html += '      <p>' + item.category + ' · ' + verses.length + ' ayat</p>';
    if (item.subtitle) {
        html += '      <p style="font-size:calc(12px * var(--text-size-multiplier));color:var(--text-light);">' + item.subtitle + '</p>';
    }
    html += '    </div>';
    html += '  </div>';

    // Action buttons di detail
    html += '  <div style="display:flex; gap:12px; margin-bottom:16px;">';
    
    // Tombol Favorit
    html += '  <button onclick="toggleFavoritDetail(' + item.id + ')" style="';
    html += '    flex:1; padding:12px; border-radius:40px; border:2px solid ' + (isFav ? '#ef4444' : 'var(--glass-border)') + ';';
    html += '    background: ' + (isFav ? 'rgba(239,68,68,0.1)' : 'var(--card-bg)') + ';';
    html += '    color: ' + (isFav ? '#ef4444' : 'var(--text-secondary)') + ';';
    html += '    font-weight:600; cursor:pointer; transition:0.2s; font-size:calc(13px * var(--text-size-multiplier));';
    html += '    display:flex; align-items:center; justify-content:center; gap:8px;';
    html += '  ">';
    html += '    <i class="fas fa-heart"></i> ' + (isFav ? 'Hapus Favorit' : 'Tambah Favorit');
    html += '  </button>';

    // Tombol Selesai
    html += '  <button onclick="toggleSelesaiDetail(' + item.id + ')" style="';
    html += '    flex:1; padding:12px; border-radius:40px; border:2px solid ' + (isDone ? '#22c55e' : 'var(--glass-border)') + ';';
    html += '    background: ' + (isDone ? 'rgba(34,197,94,0.1)' : 'var(--card-bg)') + ';';
    html += '    color: ' + (isDone ? '#22c55e' : 'var(--text-secondary)') + ';';
    html += '    font-weight:600; cursor:pointer; transition:0.2s; font-size:calc(13px * var(--text-size-multiplier));';
    html += '    display:flex; align-items:center; justify-content:center; gap:8px;';
    html += '  ">';
    html += '    <i class="fas fa-check-circle"></i> ' + (isDone ? 'Batalkan Selesai' : 'Tandai Selesai');
    html += '  </button>';

    html += '  </div>';

    // Daftar ayat
    verses.forEach(function(verse, index) {
        html += '  <div class="verse-item">';
        html += '    <div class="verse-number">' + (index + 1) + '</div>';
        if (verse.arabic) {
            html += '    <div class="arabic">' + verse.arabic + '</div>';
        }
        if (verse.latin) {
            html += '    <div class="latin">' + verse.latin + '</div>';
        }
        if (verse.translation) {
            html += '    <div class="translation">' + verse.translation + '</div>';
        }
        html += '  </div>';
    });

    html += '</div>';

    container.innerHTML = html;
}

// ============================================
// FUNGSI UNTUK DETAIL
// ============================================

function toggleFavoritDetail(id) {
    toggleFavorit(id);
    // Refresh detail
    var content = document.getElementById('content');
    renderDetail(content, id);
    // Update dashboard jika perlu
    updateDashboardStats();
}

function toggleSelesaiDetail(id) {
    toggleSelesai(id);
    // Refresh detail
    var content = document.getElementById('content');
    renderDetail(content, id);
    // Update dashboard jika perlu
    updateDashboardStats();
}

function updateDashboardStats() {
    // Update jika dashboard sedang aktif
    if (currentPage === 'dashboard') {
        var content = document.getElementById('content');
        renderDashboard(content);
    }
}