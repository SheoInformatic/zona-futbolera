// js/registro.js
(function () {
  // Ejemplo inicial (amplía esta lista con tus regiones/comunas)
  const REGIONES = [
    { nombre: "Región Metropolitana", comunas: ["Santiago", "Las Condes", "Providencia", "Puente Alto", "Maipú"] },
    { nombre: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Concón", "Quillota"] },
    { nombre: "Región del Biobío", comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante"] },
  ];

  const $region = document.getElementById('region');
  const $comuna = document.getElementById('comuna');
  const $form = document.getElementById('formRegistro');
  const $out = document.getElementById('resultado');

  function cargarRegiones() {
    $region.innerHTML = `<option value="">Selecciona región...</option>` +
      REGIONES.map(r => `<option value="${r.nombre}">${r.nombre}</option>`).join('');
  }

  function cargarComunas(regionNombre) {
    const reg = REGIONES.find(r => r.nombre === regionNombre);
    const comunas = reg ? reg.comunas : [];
    $comuna.innerHTML = comunas.map(c => `<option>${c}</option>`).join('');
    $comuna.disabled = comunas.length === 0;
  }

  $region?.addEventListener('change', () => cargarComunas($region.value));

  $form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('password').value;
    const pass2 = document.getElementById('password2').value;
    if (pass !== pass2) {
      alert('Las contraseñas no coinciden');
      return;
    }
    $out.innerHTML = `<div class="alert alert-success">Cuenta creada (demo). ¡Bienvenido/a!</div>`;
    $form.reset();
    $comuna.disabled = true;
  });

  document.addEventListener('DOMContentLoaded', cargarRegiones);
})();
