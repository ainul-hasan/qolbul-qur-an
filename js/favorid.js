// ============================================
// QOLBUL QUR'AN - FAVORIT
// ============================================

function renderFavorid(container) {
    var data = getAllData();
    var favorit = getFavorit();

    // ===== DAFTAR KATEGORI YANG TIDAK DITAMPILKAN =====
    var kategoriDihapus = [
        'Doa Qolbul Qur\'an',
        'يَارَبَّنَاعتَرَفنَا',
        'Sholawat Dengan Niat Hajat'
    ];

    // Filter favorit - hapus yang kategorinya dihapus
    var favData = data.filter(function(item) {
        return favorit.indexOf(item.id) > -1 && 
               kategoriDihapus.indexOf(item.category) === -1;
    });

    function renderList() {
        if (favData.length === 0) {
            return '<div class="empty-state">' +
                '<i class="fas fa-heart"></i>' +
                '<h4>Belum ada favorit</h4>' +
                '<p>Tambahkan bacaan favoritmu dari halaman Semua</p>' +
                '</div>';
        }

        var html = '';
        favData.forEach(function(item) {
            var totalAyat = item.totalVerses || (item.verses ? item.verses.length : 0);
            html += '<div class="item-card" data-id="' + item.id + '">';
            html += '  <div class="info">';
            html += '    <h4>' + item.title + '</h4>';
            html += '    <p>' + item.category + ' · ' + totalAyat + ' ayat</p>';
            if (item.subtitle) {
                html += '    <p class="subtitle">' + item.subtitle + '</p>';
            }
            html += '  </div>';
            html += '  <div class="item-actions">';
            html += '    <button class="fav-btn fav-active" data-id="' + item.id + '">';
            html += '      <i class="fas fa-heart"></i>';
            html += '    </button>';
            html += '  </div>';
            html += '</div>';
        });

        return html;
    }

    function attachEvents() {
        container.querySelectorAll('.item-card').forEach(function(card) {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.item-actions')) return;
                var id = parseInt(this.dataset.id);
                navigateTo('detail', id);
            });
        });

        container.querySelectorAll('.fav-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = parseInt(this.dataset.id);
                toggleFavorit(id);
                renderFavorid(container);
            });
        });
    }

    var html = '';
    html += '<h3 class="page-title">Favorit</h3>';
    html += '<div id="favList">' + renderList() + '</div>';
    container.innerHTML = html;

    attachEvents();
}