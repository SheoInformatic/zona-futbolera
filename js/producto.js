// js/producto.js
(function () {
  function q(k){ return new URLSearchParams(location.search).get(k); }
  function CLP(v){ return new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(v); }

 function render(p){
  if(!p){
    document.getElementById('producto').innerHTML = `
      <div class="alert alert-warning">Producto no encontrado. <a href="productos.html" class="alert-link">Volver</a></div>`;
    return;
  }
  document.title = p.name + " | Zona futbolera";
  document.getElementById('producto').innerHTML = `
    <div class="row g-4">
      <div class="col-md-6">
        <img src="${p.img}" alt="${p.name}" class="img-fluid rounded shadow">
      </div>

      <div class="col-md-6">
        <!-- 🔥 Bloque con fondo negro -->
        <div class="bg-dark text-white rounded-4 p-4 p-md-5 producto-desc shadow-sm">
          <h1 class="h3 mb-2">${p.name}</h1>
          <p class="fs-4 fw-bold text-warning mb-3">
            ${new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(p.price)}
          </p>
          <p class="mb-3">${p.desc}</p>
          <ul class="list-unstyled mb-4">
            ${p.specs.map(s=>`<li>• ${s}</li>`).join('')}
          </ul>
          <div class="d-flex gap-2">
            <button class="btn btn-primary"
                    data-id="${p.id}" data-name="${p.name}" data-price="${p.price}"
                    onclick="agregarAlCarrito(this)">Agregar al carrito 🛒</button>
            <a class="btn btn-outline-light" href="productos.html">Volver</a>
          </div>
        </div>
      </div>
    </div>`;
}


  document.addEventListener('DOMContentLoaded', () => {
    const id = Number(q('id'));
    const prod = (window.CATALOGO || []).find(x => Number(x.id) === id);
    render(prod);
  });
})();
