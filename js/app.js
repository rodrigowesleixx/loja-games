function createGameCard(game) {
  const badgeHTML = game.badge
    ? `<span class="game-badge ${game.badge}">${game.badge === 'new' ? 'Novo' : 'Oferta'}</span>`
    : '';

  return `
    <div class="game-card" onclick="window.location.href='pages/produto.html?id=${game.id}'" style="cursor:pointer">
      <div class="game-thumb">
        <img src="${game.cover}" alt="${game.name}" onerror="this.style.display='none';this.parentElement.classList.add('no-cover')">
        ${badgeHTML}
      </div>
      <div class="game-info">
        <div class="game-name">${game.name}</div>
        <div class="game-genre">${game.genre}</div>
        <div class="game-footer">
          <span class="game-price">R$ ${game.price.toFixed(2).replace('.', ',')}</span>
          <button class="game-add" onclick="event.stopPropagation(); addToCart('${game.name}', ${game.price})" title="Adicionar ao carrinho">+</button>
        </div>
      </div>
    </div>
  `;
}

function filterCategory(cat) {
  window.location.href = `pages/catalogo.html?categoria=${encodeURIComponent(cat)}`;
}

// Auth helpers
function getUser() {
  try { return JSON.parse(localStorage.getItem('nexus_user')); } catch { return null; }
}

function updateNavAuth() {
  const user = getUser();
  const loginBtn = document.getElementById('nav-login-btn');
  const userMenu = document.getElementById('nav-user-menu');
  const userNameEl = document.getElementById('nav-username');
  if (!loginBtn) return;

  if (user) {
    loginBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'flex';
    if (userNameEl) userNameEl.textContent = user.name.split(' ')[0];
  } else {
    loginBtn.style.display = 'flex';
    if (userMenu) userMenu.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('nexus_user');
  updateNavAuth();
  showToast('Até logo! 👋');
}

document.addEventListener('DOMContentLoaded', () => {
  const featuredGrid = document.getElementById('featured-grid');
  const bestsellersGrid = document.getElementById('bestsellers-grid');

  if (featuredGrid) {
    const featured = GAMES.filter(g => g.featured).slice(0, 4);
    featuredGrid.innerHTML = featured.map(createGameCard).join('');
  }

  if (bestsellersGrid) {
    const bestsellers = GAMES.filter(g => g.bestseller).slice(0, 4);
    bestsellersGrid.innerHTML = bestsellers.map(createGameCard).join('');
  }

  updateNavAuth();
});
