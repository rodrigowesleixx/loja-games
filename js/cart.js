let cart = JSON.parse(localStorage.getItem('nexus-cart') || '[]');

function saveCart() {
  localStorage.setItem('nexus-cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.length;
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = count;
    countEl.classList.toggle('visible', count > 0);
  }

  const itemsEl = document.getElementById('cart-items');
  const footerEl = document.getElementById('cart-footer');
  const totalEl = document.getElementById('cart-total');

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  itemsEl.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  if (footerEl) footerEl.style.display = 'block';
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartUI();
  showToast(`${name} adicionado ao carrinho!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', updateCartUI);
