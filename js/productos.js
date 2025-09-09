// js/productos.js
(function () {
  function CLP(v){ return new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(v); }
  function card(p){
    return `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="card h-100">
        <a href="producto.html?id=${encodeURIComponent(p.id)}" class="text-decoration-none text-reset">
          <img src="${p.img}" class="card-img-top" alt="${p.name}">
        </a>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="fw-bold text-primary mb-2">${CLP(p.price)}</p>
          <p class="card-text text-muted flex-grow-1">${p.desc}</p>
          <div class="d-flex gap-2 mt-auto">
            <a href="producto.html?id=${encodeURIComponent(p.id)}" class="btn btn-outline-secondary">Ver</a>
            <button class="btn btn-primary"
                    data-id="${p.id}" data-name="${p.name}" data-price="${p.price}"
                    onclick="agregarAlCarrito(this)">Agregar 🛒</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gridProductos');
    grid.innerHTML = (window.CATALOGO || []).map(card).join('');
  });
})();
