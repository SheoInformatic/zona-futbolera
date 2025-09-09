// js/cart.js
(() => {
  const CART_KEY = 'zf_cart';
  const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  // ---- store helpers ----
  function read() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  }
  function write(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items } }));
  }

  // ---- badge ----
  function updateBadge() {
    const badge = document.getElementById('badgeCarrito');
    if (!badge) return;
    const total = read().reduce((a, it) => a + Number(it.qty || 0), 0);
    badge.textContent = total;
  }

  // ---- ops ----
  function add(id, name, price, qty = 1, img = null) {
    id = Number(id); price = Number(price); qty = Number(qty) || 1;

    // Si no viene img, intenta obtenerla desde el catálogo
    if (!img) {
      const found = (window.CATALOGO || []).find(x => Number(x.id) === id);
      img = found?.img || `assets/img/${id}.jpg`;
    }

    const items = read();
    const i = items.findIndex(x => Number(x.id) === id);
    if (i >= 0) {
      items[i].qty = Number(items[i].qty || 0) + qty;
      // si el item no tenía img guardada, complétala
      if (!items[i].img) items[i].img = img;
    } else {
      items.push({ id, name, price, qty, img });
    }
    write(items);
  }

  function remove(id) {
    id = Number(id);
    write(read().filter(x => Number(x.id) !== id));
  }

  function clear() {
    localStorage.removeItem(CART_KEY);
    updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items: [] } }));
  }

  // ---- botones HTML ----
  function addFromButton(btn) {
    const { id, name, price, qty, img } = btn.dataset;
    // si no trae data-img, add() buscará en CATALOGO o usará assets/img/<id>.jpg
    add(id, name, price, qty || 1, img);

    // feedback
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Agregado ✓';
    setTimeout(() => { btn.disabled = false; btn.textContent = original || 'Agregar al carrito 🛒'; }, 900);
  }

  // ---- API pública ----
  function items() { return read(); }
  function total() { return read().reduce((s, it) => s + Number(it.price) * Number(it.qty), 0); }
  function format(amount) { return CLP.format(Number(amount) || 0); }

  window.agregarAlCarrito = addFromButton;
  window.zfCart = { add, remove, clear, items, total, format, updateBadge };

  document.addEventListener('navbar:ready', updateBadge);
  document.addEventListener('DOMContentLoaded', updateBadge);
})();
