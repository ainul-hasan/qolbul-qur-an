// ============================================
// QOLBUL QUR'AN - MAIN APPLICATION v2.0
// ============================================

var navigationHistory = ['dashboard'];
var currentPage = 'dashboard';
var currentData = null;

// ============================================
// PWA - INSTALL PROMPT
// ============================================

let deferredPrompt = null;
let installBannerShown = false;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
});

window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed successfully');
    hideInstallBanner();
});

function showInstallBanner() {
    if (installBannerShown) return;
    if (localStorage.getItem('pwa_install_dismissed') === 'true') return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (!deferredPrompt) return;
    
    const banner = document.createElement('div');
    banner.className = 'pwa-install-banner show';
    banner.id = 'pwaInstallBanner';
    banner.innerHTML = `
        <div class="banner-icon">
            <i class="fas fa-download"></i>
        </div>
        <div class="banner-content">
            <div class="banner-title">Install Qolbul Qur'an</div>
            <div class="banner-desc">Akses lebih cepat & offline</div>
        </div>
        <div class="banner-actions">
            <button class="banner-btn primary" id="installPwaBtn">Install</button>
            <button class="banner-btn" id="dismissPwaBtn">✕</button>
        </div>
    `;
    
    document.body.appendChild(banner);
    installBannerShown = true;
    
    document.getElementById('installPwaBtn').addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('[PWA] User accepted install');
                } else {
                    console.log('[PWA] User dismissed install');
                }
                deferredPrompt = null;
                hideInstallBanner();
            });
        }
    });
    
    document.getElementById('dismissPwaBtn').addEventListener('click', () => {
        hideInstallBanner();
        localStorage.setItem('pwa_install_dismissed', 'true');
    });
}

function hideInstallBanner() {
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 400);
    }
    installBannerShown = false;
}

// ============================================
// PWA - ONLINE/OFFLINE DETECTION
// ============================================

window.addEventListener('online', () => {
    console.log('[PWA] Online');
    showPwaToast('Kembali online! 🎉', 'success');
});

window.addEventListener('offline', () => {
    console.log('[PWA] Offline');
    showPwaToast('Mode offline - data tersimpan', 'warning');
});

function showPwaToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'pwa-toast ' + type;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 3000);
}

// ============================================
// VISIBILITY SETTINGS (LATIN & TERJEMAHAN)
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

// ============================================
// DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen (kalau ada)
    setTimeout(function() {
        var loading = document.getElementById('loadingScreen');
        if (loading) loading.classList.add('hidden');
    }, 1500);

    // Init theme
    initTheme();
    initTextSize();
    
    // Terapkan setting latin & terjemahan
    applyVisibilitySettings();

    // Navigation
    var navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var page = this.dataset.page;
            navigateTo(page);
        });
    });

    // Handle Back Button
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page) {
            handleBackNavigation(event.state.page, event.state.data);
        } else {
            handleBackButton();
        }
    });

    // Load default page
    navigateTo('dashboard');
});

// ============================================
// NAVIGATION WITH HISTORY
// ============================================

function navigateTo(page, data) {
    if (page !== currentPage) {
        var currentIndex = navigationHistory.indexOf(currentPage);
        if (currentIndex !== -1 && currentIndex < navigationHistory.length - 1) {
            navigationHistory = navigationHistory.slice(0, currentIndex + 1);
        }
        navigationHistory.push(page);
        var stateData = { page: page, data: data || null };
        history.pushState(stateData, '', '#' + page);
    }

    currentPage = page;
    currentData = data;

    document.querySelectorAll('.nav-item').forEach(function(el) {
        el.classList.remove('active');
    });
    var activeNav = document.querySelector('.nav-item[data-page="' + page + '"]');
    if (activeNav) activeNav.classList.add('active');

    var content = document.getElementById('content');
    if (!content) return;

    switch(page) {
        case 'dashboard': 
            if (typeof renderDashboard === 'function') renderDashboard(content); 
            break;
        case 'semua': 
            if (typeof renderSemua === 'function') renderSemua(content); 
            break;
        case 'favorid': 
            if (typeof renderFavorid === 'function') renderFavorid(content); 
            break;
        case 'selesai': 
            if (typeof renderSelesai === 'function') renderSelesai(content); 
            break;
        case 'pengaturan': 
            if (typeof renderPengaturan === 'function') renderPengaturan(content); 
            break;
        case 'detail': 
            if (data) {
                if (typeof renderDetail === 'function') renderDetail(content, data);
                localStorage.setItem('lastDetailId', data);
            } else {
                var lastId = localStorage.getItem('lastDetailId');
                if (lastId) {
                    if (typeof renderDetail === 'function') renderDetail(content, parseInt(lastId));
                } else {
                    navigateTo('semua');
                }
            }
            break;
        default: 
            content.innerHTML = '<p>Halaman tidak ditemukan</p>';
    }
}

// ============================================
// HANDLE BACK NAVIGATION
// ============================================

function handleBackNavigation(page, data) {
    if (navigationHistory.length > 1) {
        navigationHistory.pop();
    }
    var prevPage = navigationHistory[navigationHistory.length - 1];
    
    if (prevPage === 'detail') {
        var lastId = localStorage.getItem('lastDetailId');
        if (lastId) {
            navigateTo('detail', parseInt(lastId));
        } else {
            navigateTo('semua');
        }
    } else {
        navigateTo(prevPage);
    }
}

function handleBackButton() {
    if (navigationHistory.length > 1) {
        navigationHistory.pop();
        var prevPage = navigationHistory[navigationHistory.length - 1];
        
        if (prevPage === 'detail') {
            var lastId = localStorage.getItem('lastDetailId');
            if (lastId) {
                navigateTo('detail', parseInt(lastId));
            } else {
                navigateTo('semua');
            }
        } else {
            navigateTo(prevPage);
        }
    } else {
        showExitConfirmation();
    }
}

function showExitConfirmation() {
    if (document.querySelector('.exit-overlay')) return;
    
    var overlay = document.createElement('div');
    overlay.className = 'exit-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;

    overlay.innerHTML = `
        <div style="
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            border-radius: 28px;
            padding: 32px 28px;
            max-width: 320px;
            width: 90%;
            text-align: center;
            border: 1px solid var(--border-color);
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        ">
            <div style="font-size: 48px; margin-bottom: 16px; color: var(--primary);">
                <i class="fas fa-book-quran"></i>
            </div>
            <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px; color: var(--text-primary);">
                Keluar dari Aplikasi?
            </h3>
            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">
                Apakah Anda yakin ingin keluar dari Qolbul Qur'an?
            </p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button onclick="closeExitConfirmation()" style="
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 40px;
                    padding: 12px 32px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    color: var(--text-primary);
                    flex: 1;
                ">
                    Batal
                </button>
                <button onclick="closeExitConfirmation(); if (window.close) window.close(); else history.back();" style="
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 40px;
                    padding: 12px 32px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    flex: 1;
                ">
                    Keluar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeExitConfirmation();
        }
    });
}

function closeExitConfirmation() {
    var overlay = document.querySelector('.exit-overlay');
    if (overlay) overlay.remove();
}

// ============================================
// THEME
// ============================================

function initTheme() {
    var saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') document.body.classList.add('dark');
}

function toggleTheme() {
    var isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    var toggle = document.querySelector('.toggle');
    if (toggle) toggle.classList.toggle('active', isDark);
}

// ============================================
// TEXT SIZE
// ============================================

function setTextSize(size) {
    document.body.classList.remove('text-small', 'text-medium', 'text-large', 'text-xlarge');
    if (size !== 'medium') {
        document.body.classList.add('text-' + size);
    }
    localStorage.setItem('textSize', size);
}

function initTextSize() {
    var saved = localStorage.getItem('textSize') || 'medium';
    setTextSize(saved);
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

function getData(key, fallback) {
    try {
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : (fallback || []);
    } catch(e) {
        return fallback || [];
    }
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFavorit() { return getData('favorit', []); }
function setFavorit(data) { setData('favorit', data); }
function getSelesai() { return getData('selesai', []); }
function setSelesai(data) { setData('selesai', data); }

function toggleFavorit(id) {
    var fav = getFavorit();
    var idx = fav.indexOf(id);
    if (idx > -1) fav.splice(idx, 1);
    else fav.push(id);
    setFavorit(fav);
    return fav;
}

function toggleSelesai(id) {
    var done = getSelesai();
    var idx = done.indexOf(id);
    if (idx > -1) done.splice(idx, 1);
    else done.push(id);
    setSelesai(done);
    return done;
}

function getAllData() {
    return window.READINGS_DATA || [];
}

function getDataById(id) {
    var data = getAllData();
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) return data[i];
    }
    return null;
}

// ============================================
// EXPORT SEMUA FUNGSI KE WINDOW (WAJIB!)
// ============================================

window.navigateTo = navigateTo;
window.handleBackButton = handleBackButton;
window.handleBackNavigation = handleBackNavigation;
window.closeExitConfirmation = closeExitConfirmation;

window.getDataById = getDataById;
window.getFavorit = getFavorit;
window.setFavorit = setFavorit;
window.getSelesai = getSelesai;
window.setSelesai = setSelesai;
window.toggleFavorit = toggleFavorit;
window.toggleSelesai = toggleSelesai;
window.getAllData = getAllData;
window.getData = getData;
window.setData = setData;

window.initTheme = initTheme;
window.toggleTheme = toggleTheme;
window.setTextSize = setTextSize;
window.initTextSize = initTextSize;
window.applyVisibilitySettings = applyVisibilitySettings;
window.showPwaToast = showPwaToast;

window.getCurrentPage = function() { return currentPage; };

console.log('[App] Semua fungsi berhasil di-export ke window');
