function loadPartial(placeholderId, url, readyEvent) {
  const el = document.getElementById(placeholderId);
  if (!el) { console.error('No existe #' + placeholderId); return; }
  fetch(url)
    .then(r => { if (!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.text(); })
    .then(html => { el.innerHTML = html; if (readyEvent) document.dispatchEvent(new Event(readyEvent)); })
    .catch(err => console.error('Error cargando ' + url + ':', err));
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartial('navbar-placeholder', 'navbar.html', 'navbar:ready');
  loadPartial('footer-placeholder', 'footer.html', 'footer:ready');
});

document.addEventListener('footer:ready', () => {
  const y = document.getElementById('zf-year');
  if (y) y.textContent = new Date().getFullYear();
});
