/* shared-layout.js — injecte la sidebar, la topbar et gère l'immobilité et le mode mobile */
function getActivePage() {
  const path = window.location.pathname.split('/').pop();
  const map = {
    'tableau-de-bord.html': 'dashboard',
    'commandes.html': 'commandes',
    'rendez-vous.html': 'rdv',
    'statistiques.html': 'stats',
    'produits.html': 'produits',
    'clients.html': 'clients',
    'contenu.html': 'contenu',
    'parametres.html': 'parametres'
  };
  return map[path] || 'dashboard';
}

function navItem(page, label, iconPath, hasBadge) {
  const active = getActivePage() === page;
  const badge = hasBadge ? `<span class="nav-badge" id="badge-cmd">3</span>` : '';
  return `
    <a href="${pageUrl(page)}" class="nav-item ${active ? 'active' : ''}">
      <span class="nav-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconPath}</svg>
      </span>
      ${label}${badge}
    </a>`;
}

function pageUrl(page) {
  const map = {
    dashboard: 'tableau-de-bord.html',
    commandes: 'commandes.html',
    rdv: 'rendez-vous.html',
    stats: 'statistiques.html',
    produits: 'produits.html',
    clients: 'clients.html',
    contenu: 'contenu.html',
    parametres: 'parametres.html'
  };
  return map[page] || '#';
}

function renderLayout(pageTitle) {
  const icons = {
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    commandes: '<path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>',
    rdv: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    stats: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
    produits: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    clients: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    contenu: '<path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    parametres: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>'
  };

  /* Ajout de id="app-sidebar" requis pour le script et du bouton de fermeture mobile */
  const sidebar = `
<aside class="sidebar" id="app-sidebar">
  <div class="sidebar-logo">
    <div class="logo-mark">
      <div class="logo-icon">🍩</div>
      <div>
        <div class="logo-text">B!SKUIT</div>
        <div class="logo-sub">Administration</div>
      </div>
    </div>
    <button class="sidebar-close-btn" onclick="toggleMobileSidebar()"><i class="fa-solid fa-xmark"></i></button>
  </div>
  <nav class="nav">
    <div class="nav-section">Principal</div>
    ${navItem('dashboard','Tableau de bord', icons.dashboard)}
    ${navItem('commandes','Commandes', icons.commandes, true)}
    ${navItem('rdv','Rendez-vous', icons.rdv)}
    ${navItem('stats','Statistiques', icons.stats)}
    <div class="nav-section">Catalogue</div>
    ${navItem('produits','Produits', icons.produits)}
    ${navItem('clients','Clients', icons.clients)}
    <div class="nav-section">Contenu</div>
    ${navItem('contenu','Textes & Images', icons.contenu)}
    ${navItem('parametres','Paramètres', icons.parametres)}
  </nav>
  <div class="sidebar-footer">
    <a href="parametres.html" class="admin-card">
      <div class="admin-avatar">A</div>
      <div>
        <div class="admin-name">Administrateur</div>
        <div class="admin-role">Sweet Ring</div>
      </div>
    </a>
  </div>
</aside>
<div class="sidebar-overlay" id="sidebar-overlay" onclick="toggleMobileSidebar()"></div>`;

  /* Injection du bouton .menu-trigger (icône bars Font Awesome) à gauche du titre de la page */
  const topbar = `
<div class="topbar">
  <div class="topbar-left">
    <button class="menu-trigger" onclick="toggleMobileSidebar()"><i class="fa-solid fa-bars"></i></button>
    <div class="page-title">${pageTitle}</div>
  </div>
  <div class="topbar-actions">
    <div class="search-wrap" style="position:relative">
      <span class="search-icon" style="position:absolute;left:13px;top:50%;transform:translateY(-50%);pointer-events:none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      </span>
      <input type="text" placeholder="Rechercher..." style="width:200px;padding-left:40px;background:var(--bg);border:1.5px solid var(--border)">
    </div>
    <button class="topbar-icon-btn" onclick="showToast('<i class=\\'fa-solid fa-arrows-rotate\\'></i> Site mis à jour !')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
    </button>
    <button class="topbar-icon-btn" style="position:relative">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
      <span class="notif-dot"></span>
    </button>
    <button class="btn btn-primary" onclick="openModal('modal-quick-add')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
      Ajouter
    </button>
    <a href="parametres.html" class="topbar-avatar">A</a>
  </div>
</div>`;

  document.getElementById('sidebar-slot').innerHTML = sidebar;
  document.getElementById('topbar-slot').innerHTML = topbar;
}

// ── FONCTION D'INTERACTION DE LA SIDEBAR (OUVERTURE ET FERMETURE MOBILE) ──
function toggleMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  }
}

// ── SHARED JS UTILS ──
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = msg; /* innerHTML gère les icônes vectorielles dans vos toasts */
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
  });
});