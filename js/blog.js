// js/blog.js
(function () {
  const POSTS = [
    {
      slug: "lanzamiento-nuevas-camisetas",
      titulo: "Lanzamos nuevas camisetas 24/25",
      fecha: "2025-09-01",
      cover: "assets/img/blog1.jpg",
      resumen: "Llegaron camisetas oficiales de las principales ligas.",
      html: `<p>Ya están disponibles las camisetas 24/25 de Premier League, LaLiga y más.
             Prepárate para la temporada con stock limitado.</p>`
    },
    {
      slug: "tips-cuidado-camisetas",
      titulo: "Cómo cuidar tu camiseta deportiva",
      fecha: "2025-08-20",
      cover: "assets/img/blog2.jpg",
      resumen: "Consejos de lavado y guardado para prolongar la vida útil.",
      html: `<ul><li>Lava con agua fría</li><li>Evita secadora</li><li>No planches la serigrafía</li></ul>`
    }
  ];

  function qs(k){ return new URLSearchParams(location.search).get(k); }

  function card(p){
    return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          ${p.cover ? `<img src="${p.cover}" class="card-img-top" alt="${p.titulo}">` : ""}
          <div class="card-body d-flex flex-column">
            <h3 class="h6">${p.titulo}</h3>
            <div class="text-muted small mb-2">${p.fecha}</div>
            <p class="text-muted flex-grow-1">${p.resumen}</p>
            <a href="blog.html?slug=${encodeURIComponent(p.slug)}" class="btn btn-outline-primary mt-auto">Leer</a>
          </div>
        </div>
      </div>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const listado = document.getElementById('listadoPosts');
    if (listado) listado.innerHTML = POSTS.map(card).join('');

    const slug = qs('slug');
    if (slug) {
      const post = POSTS.find(p => p.slug === slug);
      const el = document.getElementById('post');
      if (!post) {
        el.innerHTML = `<div class="alert alert-warning">Post no encontrado. <a href="blogs.html" class="alert-link">Volver</a></div>`;
        return;
      }
      document.title = post.titulo + " | Zona futbolera";
      el.innerHTML = `
        <header class="mb-3">
          <h1 class="h3">${post.titulo}</h1>
          <div class="text-muted small">${post.fecha}</div>
        </header>
        ${post.cover ? `<img src="${post.cover}" class="img-fluid rounded mb-3" alt="${post.titulo}">` : ""}
        <div class="content">${post.html}</div>
        <a href="blogs.html" class="btn btn-outline-secondary mt-3">Volver</a>
      `;
    }
  });
})();
