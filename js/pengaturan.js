// ============================================
// QOLBUL QUR'AN - PENGATURAN
// ============================================

function renderPengaturan(container) {
    var isDark = document.body.classList.contains('dark');
    var currentSize = localStorage.getItem('textSize') || 'medium';
    var data = getAllData();
    
    var showLatin = localStorage.getItem('showLatin') !== 'false';
    var showTranslation = localStorage.getItem('showTranslation') !== 'false';

    var html = '';
    html += '<h3 class="page-title">Pengaturan</h3>';
    html += '<div class="card card-glass">';

    // TEMA
    html += '  <div class="setting-group">';
    html += '    <h4>Tema</h4>';
    html += '    <div class="setting-item">';
    html += '      <span>Mode Gelap</span>';
    html += '      <div class="toggle' + (isDark ? ' active' : '') + '" id="themeToggle"></div>';
    html += '    </div>';
    html += '  </div>';

    // TAMPILAN
    html += '  <div class="setting-group">';
    html += '    <h4>Tampilan</h4>';
    
    html += '    <div class="setting-item">';
    html += '      <div class="toggle-label" id="toggleLatinLabel">';
    html += '        <span>Tampilkan Latin</span>';
    html += '        <div class="toggle-sm' + (showLatin ? ' active' : '') + '" id="toggleLatin"></div>';
    html += '      </div>';
    html += '    </div>';
    
    html += '    <div class="setting-item">';
    html += '      <div class="toggle-label" id="toggleTranslationLabel">';
    html += '        <span>Tampilkan Terjemahan</span>';
    html += '        <div class="toggle-sm' + (showTranslation ? ' active' : '') + '" id="toggleTranslation"></div>';
    html += '      </div>';
    html += '    </div>';
    
    html += '  </div>';

    // UKURAN TEKS
    html += '  <div class="setting-group">';
    html += '    <h4>Ukuran Teks</h4>';
    html += '    <div class="text-size-buttons">';

    var sizes = [
        { value: 'small', label: 'Kecil', icon: 'A', fs: '12px' },
        { value: 'medium', label: 'Sedang', icon: 'A', fs: '16px' },
        { value: 'large', label: 'Besar', icon: 'A', fs: '20px' },
        { value: 'xlarge', label: 'Sangat Besar', icon: 'A', fs: '24px' }
    ];

    sizes.forEach(function(size) {
        var active = currentSize === size.value ? 'active' : '';
        html += '  <button class="text-size-btn ' + active + '" data-size="' + size.value + '">';
        html += '    <span class="size-icon" style="font-size:' + size.fs + ';">' + size.icon + '</span>';
        html += '    <span class="size-label">' + size.label + '</span>';
        html += '  </button>';
    });

    html += '    </div>';
    html += '  </div>';

    // DATA
    html += '  <div class="setting-group">';
    html += '    <h4>Data</h4>';
    html += '    <div class="setting-item">';
    html += '      <span>Reset Favorit</span>';
    html += '      <button class="danger" id="resetFav">Reset</button>';
    html += '    </div>';
    html += '    <div class="setting-item">';
    html += '      <span>Reset Selesai</span>';
    html += '      <button class="danger" id="resetDone">Reset</button>';
    html += '    </div>';
    html += '    <div class="setting-item">';
    html += '      <span>Reset Semua Data</span>';
    html += '      <button class="danger" id="resetAll">Reset Semua</button>';
    html += '    </div>';
    html += '  </div>';

    // INFORMASI
    html += '  <div class="setting-group">';
    html += '    <h4>Informasi</h4>';
    html += '    <div class="setting-item"><span>Versi</span><span>1.0.0</span></div>';
    html += '    <div class="setting-item"><span>Total Bacaan</span><span>' + data.length + '</span></div>';
    html += '    <div class="setting-item"><span>Qolbul Qur\'an</span><span>✨</span></div>';
    html += '  </div>';

    html += '  <div class="version">© 2026 Qolbul Qur\'an · Ainul Hasan</div>';
    html += '</div>';

    container.innerHTML = html;

    // ============================================
    // EVENT LISTENERS
    // ============================================

    // THEME
    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            toggleTheme();
            this.classList.toggle('active');
        });
    }

    // TOGGLE LATIN
    var toggleLatin = document.getElementById('toggleLatin');
    var toggleLatinLabel = document.getElementById('toggleLatinLabel');
    
    function setLatinVisibility(show) {
        if (show) {
            document.body.classList.remove('hide-latin');
            localStorage.setItem('showLatin', 'true');
        } else {
            document.body.classList.add('hide-latin');
            localStorage.setItem('showLatin', 'false');
        }
        if (toggleLatin) {
            toggleLatin.classList.toggle('active', show);
        }
    }

    if (toggleLatin) {
        toggleLatin.addEventListener('click', function(e) {
            e.stopPropagation();
            var show = !this.classList.contains('active');
            setLatinVisibility(show);
        });
    }
    if (toggleLatinLabel) {
        toggleLatinLabel.addEventListener('click', function() {
            var show = !toggleLatin.classList.contains('active');
            setLatinVisibility(show);
        });
    }

    // TOGGLE TERJEMAHAN
    var toggleTranslation = document.getElementById('toggleTranslation');
    var toggleTranslationLabel = document.getElementById('toggleTranslationLabel');
    
    function setTranslationVisibility(show) {
        if (show) {
            document.body.classList.remove('hide-translation');
            localStorage.setItem('showTranslation', 'true');
        } else {
            document.body.classList.add('hide-translation');
            localStorage.setItem('showTranslation', 'false');
        }
        if (toggleTranslation) {
            toggleTranslation.classList.toggle('active', show);
        }
    }

    if (toggleTranslation) {
        toggleTranslation.addEventListener('click', function(e) {
            e.stopPropagation();
            var show = !this.classList.contains('active');
            setTranslationVisibility(show);
        });
    }
    if (toggleTranslationLabel) {
        toggleTranslationLabel.addEventListener('click', function() {
            var show = !toggleTranslation.classList.contains('active');
            setTranslationVisibility(show);
        });
    }

    // TEXT SIZE
    container.querySelectorAll('.text-size-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var size = this.dataset.size;
            setTextSize(size);
            container.querySelectorAll('.text-size-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // RESET BUTTONS
    document.getElementById('resetFav').addEventListener('click', function() {
        if (confirm('Hapus semua favorit?')) {
            setFavorit([]);
            alert('Favorit berhasil direset!');
        }
    });

    document.getElementById('resetDone').addEventListener('click', function() {
        if (confirm('Hapus semua data selesai?')) {
            setSelesai([]);
            alert('Data selesai berhasil direset!');
        }
    });

    document.getElementById('resetAll').addEventListener('click', function() {
        if (confirm('Reset semua data (favorit & selesai)?')) {
            setFavorit([]);
            setSelesai([]);
            alert('Semua data berhasil direset!');
        }
    });
}

// ============================================
// FUNGSI UNTUK MENERAPKAN SETTING
// ============================================

function applyVisibilitySettings() {
    var showLatin = localStorage.getItem('showLatin') !== 'false';
    var showTranslation = localStorage.getItem('showTranslation') !== 'false';
    
    if (!showLatin) {
        document.body.classList.add('hide-latin');
    } else {
        document.body.classList.remove('hide-latin');
    }
    
    if (!showTranslation) {
        document.body.classList.add('hide-translation');
    } else {
        document.body.classList.remove('hide-translation');
    }
}