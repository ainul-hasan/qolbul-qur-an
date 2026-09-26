// ============================================
// QOLBUL QUR'AN - SELESAI
// ============================================

function renderSelesai(container) {
    var data = getAllData();
    var selesai = getSelesai();

    function renderList() {
        var doneData = data.filter(function(item) {
            return selesai.indexOf(item.id) > -1;
        });

        if (doneData.length === 0) {
            return '<div class="empty-state">' +
                '<i class="fas fa-check-circle"></i>' +
                '<h4>Belum ada yang selesai</h4>' +
                '<p>Tandai bacaan yang sudah selesai dari halaman Semua</p>' +
                '</div>';
        }

        var html = '';
        doneData.forEach(function(item) {
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
            html += '    <button class="done-btn done-active" data-id="' + item.id + '">';
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

        container.querySelectorAll('.done-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = parseInt(this.dataset.id);
                toggleSelesai(id);
                renderSelesai(container);
            });
        });
    }

    var html = '';
    html += '<h3 class="page-title">Selesai</h3>';
    html += '<div id="doneList">' + renderList() + '</div>';
    container.innerHTML = html;

    attachEvents();
}