// ============================================
// QOLBUL QUR'AN - SEMUA BACAAAN
// ============================================

function renderSemua(container) {
    var data = getAllData();
    var filterKategori = 'Semua';
    var searchQuery = '';

    var categories = ['Semua'];
    data.forEach(function(item) {
        if (categories.indexOf(item.category) === -1) {
            categories.push(item.category);
        }
    });

    function renderList() {
        var filtered = data.slice();

        if (filterKategori !== 'Semua') {
            filtered = filtered.filter(function(item) {
                return item.category === filterKategori;
            });
        }

        if (searchQuery.trim()) {
            var q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(function(item) {
                return item.title.toLowerCase().indexOf(q) > -1 ||
                    (item.subtitle && item.subtitle.toLowerCase().indexOf(q) > -1);
            });
        }

        if (filtered.length === 0) {
            return '<div class="empty-state">' +
                '<i class="fas fa-search"></i>' +
                '<h4>Tidak ada data</h4>' +
                '<p>Coba ubah kata kunci atau filter</p>' +
                '</div>';
        }

        var favorit = getFavorit();
        var selesai = getSelesai();
        var html = '';

        filtered.forEach(function(item) {
            var isFav = favorit.indexOf(item.id) > -1;
            var isDone = selesai.indexOf(item.id) > -1;
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
            html += '    <button class="fav-btn ' + (isFav ? 'fav-active' : '') + '" data-id="' + item.id + '">';
            html += '      <i class="fas fa-heart"></i>';
            html += '    </button>';
            html += '    <button class="done-btn ' + (isDone ? 'done-active' : '') + '" data-id="' + item.id + '">';
            html += '      <i class="fas fa-check-circle"></i>';
            html += '    </button>';
            html += '  </div>';
            html += '</div>';
        });

        return html;
    }

    function attachEvents() {
        // Click on card to open detail
        container.querySelectorAll('.item-card').forEach(function(card) {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.item-actions')) return;
                var id = parseInt(this.dataset.id);
                navigateTo('detail', id);
            });
        });

        container.querySelectorAll('.fav-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var id = parseInt(this.dataset.id);
                toggleFavorit(id);
                buildUI();
            });
        });

        container.querySelectorAll('.done-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var id = parseInt(this.dataset.id);
                toggleSelesai(id);
                buildUI();
            });
        });
    }

    function buildUI() {
        var html = '';
        html += '<h3 class="page-title">Semua Bacaan</h3>';
        html += '<div class="search-bar">';
        html += '  <input type="text" id="searchInput" placeholder="Cari bacaan..." value="' + searchQuery + '" />';
        html += '</div>';
        html += '<div class="filter-group" id="filterGroup">';

        categories.forEach(function(cat) {
            var active = filterKategori === cat ? 'active' : '';
            html += '  <button class="filter-chip ' + active + '" data-kategori="' + cat + '">' + cat + '</button>';
        });

        html += '</div>';
        html += '<div id="listContainer">' + renderList() + '</div>';

        container.innerHTML = html;

        var searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                searchQuery = this.value;
                document.getElementById('listContainer').innerHTML = renderList();
                attachEvents();
            });
        }

        container.querySelectorAll('.filter-chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                filterKategori = this.dataset.kategori;
                buildUI();
            });
        });

        attachEvents();
    }

    buildUI();
}