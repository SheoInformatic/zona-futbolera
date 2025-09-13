# Zona Futbolera — Convenciones de Trabajo

Este documento define las **reglas de trabajo**, **flujo de ramas**, **convenciones de commits**, **proceso de Pull Requests**, y **estructura de carpetas** del proyecto *Zona Futbolera*.

---

## 1) Estrategia de ramas (GitFlow simplificado)

* **main** → rama estable de producción.
* **develop** → rama de integración (pre‑producción).
* **feature/** → ramas para nuevas funcionalidades.
* **hotfix/** → ramas para arreglos urgentes en producción.
* **docs/** → documentación (por ej: `docs/conventions`).

### Naming de ramas

* `feature/<slug>` → p.ej. `feature/login`, `feature/contacto-form`.
* `hotfix/<slug>` → p.ej. `hotfix/navbar-titulo`, `hotfix/error-500`.
* `docs/<slug>` → p.ej. `docs/conventions`.

> Usa **kebab-case** (minúsculas con guiones), nombres cortos y descriptivos.

---

## 2) Convención de commits (Conventional Commits)

Formato: `tipo(opcional-alcance): mensaje breve en presente`

Tipos más usados:

* **feat**: nueva funcionalidad (usuario la percibe).
* **fix**: corrección de bug.
* **docs**: documentación.
* **style**: cambios de formato (lint, espacios) sin tocar lógica.
* **refactor**: refactor sin cambiar comportamiento.
* **perf**: mejoras de rendimiento.
* **test**: pruebas, mocks.
* **chore**: tareas de build, dependencias, configs.

Ejemplos:

* `feat(login): agregar formulario con Firebase Auth`
* `fix: corregir botón que no abre modal de login`
* `docs(readme): agregar pasos de Firebase`

> Mensaje en **imperativo** y breve; si necesitas detalle, añade descripción en el cuerpo del commit.

---

## 3) Flujo de trabajo / Pull Requests

1. Crea rama desde `develop` (o desde `main` si es *hotfix*):

   * `feature/<slug>` → PR a **develop**.
   * `hotfix/<slug>` → PR a **main**.
2. Haz commits pequeños y atómicos siguiendo la convención.
3. **Sube la rama** y abre **Pull Request (PR)** en GitHub.
4. **Revisión**: mínimo **1 aprobación** de un compañero.
5. **Merge**:

   * Features → `develop`.
   * Hotfixes → `main` (y back-merge a `develop` si aplica).
6. **Borrar la rama** después del merge.

### Política de revisión

* Revisor valida: estilo, accesibilidad, responsividad, errores en consola, cumplimiento de requerimientos.
* Autor resuelve comentarios y actualiza el PR.

---

## 4) Estructura de carpetas sugerida

```
/ (raíz)
├─ index.html
├─ /css
│  └─ styles.css
├─ /js
│  └─ script.js
├─ /assets
│  ├─ img/   (imágenes del sitio)
│  └─ icons/ (favicons, svg)
├─ /docs
│  └─ README.md (este archivo u otros docs)
└─ /pages (opcionales: páginas internas)
   ├─ productos.html
   ├─ contacto.html
   └─ carrito.html
```

> Mantén nombres en **minúsculas** y sin espacios.

---

## 5) Reglas de estilo y calidad

* **Bootstrap 5** como base de UI.
* Evitar CSS inline salvo utilidades/bootstrap; centralizar en `css/styles.css`.
* Nombres de clases y `id` en **kebab-case**.
* Validar HTML (atributos `alt`, `aria-*`, semántica básica).
* Evitar warnings/errores en la consola del navegador.

---

## 6) Entorno local y despliegue

### Desarrollo local (VS Code)

* Usar **Live Server** para servir el sitio (no abrir con `file://`).
* URL típica: `http://localhost:5500`.

### Firebase Authentication (frontend)

1. Crear proyecto en Firebase Console.
2. Registrar app web (icono `</>`), copiar **firebaseConfig**.
3. Habilitar proveedores en *Authentication → Sign-in method* (Email/Password, Google).
4. Agregar `localhost` a *Authorized domains* si desarrollas en local.
5. Reemplazar `firebaseConfig` en el `<script type="module">` del proyecto.

> Para proteger secciones, usar `onAuthStateChanged` y bloquear acciones si `!user`.

---

## 7) Lanzamientos y versionado

* Taggear releases en `main` con **SemVer**: `v1.0.0`, `v1.1.0`.
* Changelog breve en el PR de release.

---

## 8) Hotfixes en producción

1. `git checkout main && git pull --rebase`
2. `git checkout -b hotfix/<slug>`
3. Corregir, testear local.
4. PR → `main`. Tras merge, **back-merge a `develop`**.

---

## 9) Git: comandos útiles

```bash
# crear ramas base
git checkout -b develop

git checkout -b feature/login
# ... cambios ...
git add .
git commit -m "feat(login): formulario con Firebase Auth"
git push -u origin feature/login

# abrir PR en GitHub: feature/login -> develop

# integrar develop a main (release)
git checkout main
git pull --rebase origin main
git merge --no-ff develop -m "release: integrar cambios de develop"
git push origin main

# crear hotfix
git checkout main
git checkout -b hotfix/corregir-titulo
# ... cambios ...
git commit -m "fix: corregir título"
git push -u origin hotfix/corregir-titulo
# PR: hotfix -> main
```

---

## 10) .gitignore recomendado

```
# Sistema
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Dependencias (si usas build tools luego)
node_modules/
dist/
```

---

## 11) Responsables y comunicación

* PRs requieren al menos 1 revisor.
* Todo cambio visible al usuario debe estar en un PR (evitar push directo a `main`).
* Issues para bugs y mejoras; asignar responsable y etiqueta (bug/feature/docs).
