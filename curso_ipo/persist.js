/* Persistencia del curso IPO (localStorage): páginas visitadas, progreso global,
   y última página. Compartido por todas las pantallas. */
(function () {
  var PAGES = ["accesibilidad-01-interfaces.html", "accesibilidad-01-practica.html", "accesibilidad-02-necesidad-general.html", "accesibilidad-02-practica.html", "accesibilidad-03-internet.html", "accesibilidad-03-practica.html", "accesibilidad-04-motivos.html", "accesibilidad-04-practica.html", "accesibilidad.html", "modulo-2-01-practica.html", "modulo-2-02-percepcion.html", "modulo-2-02-practica.html", "modulo-2-03-memoria.html", "modulo-2-03-practica.html", "modulo-2.html", "modulo-3-02-1-normativa.html", "modulo-3-02-1-practica.html", "modulo-3-02-2-contextual.html", "modulo-3-02-2-practica.html", "modulo-3-02-3-enfoques.html", "modulo-3-02-3-practica.html", "modulo-3-02-teoria.html", "modulo-3-03-modelo-mpiua.html", "modulo-3-fase-diseno-01-objetivos.html", "modulo-3-fase-diseno-01-practica.html", "modulo-3-fase-diseno-02-factores-humanos.html", "modulo-3-fase-diseno-02-practica.html", "modulo-3-fase-diseno-03-modelo-mental.html", "modulo-3-fase-diseno-03-practica.html", "modulo-3-fase-diseno.html", "modulo-3-fase-implementacion.html", "modulo-3-fase-lanzamiento.html", "modulo-3.html", "pilares.html", "usabilidad-01-definicion.html", "usabilidad-01-practica.html", "usabilidad-02-importancia.html", "usabilidad-02-practica.html", "usabilidad-03-beneficios.html", "usabilidad-03-practica.html", "usabilidad-04-atributos.html", "usabilidad-04-practica.html", "usabilidad-05-calidad-software.html", "usabilidad-05-practica.html", "usabilidad-06-practica.html", "usabilidad-06-usabilidad-web.html", "usabilidad.html", "ux-practica.html", "ux.html"];           // páginas que cuentan para el progreso (sin la home)
  var K_VISITED = 'ipo_visited', K_LAST = 'ipo_last_page', K_SCROLL = 'ipo_scroll', K_PROG = 'ipo_user_progress';

  function read(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }


  // 0) la cabecera fija nunca debe tapar el contenido: si es más alta que el relleno superior del <main>, se amplía
  function fixTopPadding() {
    var h = document.querySelector('body > header'), m = document.querySelector('main');
    if (!h || !m || getComputedStyle(h).position !== 'fixed') return;
    var hh = h.getBoundingClientRect().height, cur = parseFloat(getComputedStyle(m).paddingTop) || 0;
    if (cur < hh) m.style.paddingTop = Math.ceil(hh) + 'px';
  }
  window.addEventListener('load', fixTopPadding);
  window.addEventListener('resize', fixTopPadding);
  fixTopPadding();
  var page = (location.pathname.split('/').pop() || 'index.html');

  function percent() {
    var v = read(K_VISITED, {});
    var n = PAGES.filter(function (p) { return v[p]; }).length;
    return Math.round(n / PAGES.length * 100);
  }
  function paintProgress() {
    var p = percent();
    try { localStorage.setItem(K_PROG, String(p)); } catch (e) {}
    var el = document.getElementById('global-progress-value');
    if (el) el.textContent = p + '%';
  }

  // 1) registrar visita (la home no cuenta como lección, pero sí como "última")
  var visited = read(K_VISITED, {});
  if (PAGES.indexOf(page) !== -1) { visited[page] = Date.now(); write(K_VISITED, visited); }
  if (page !== 'index.html') write(K_LAST, page);
  paintProgress();

  // 2) el scroll NO se guarda: cada página se abre siempre arriba del todo
  try { localStorage.removeItem(K_SCROLL); } catch (e) {}          // borra posiciones guardadas antes
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  if (!location.hash) window.addEventListener('load', function () { window.scrollTo(0, 0); });

  // 3) marca ✓ en los enlaces a páginas ya visitadas (solo en las listas de lecciones)
  document.querySelectorAll('a[href$=".html"]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (visited[h] && /^\s*0\d\b|^\s*3\.2\.\d/.test(a.textContent)) {
      a.setAttribute('title', 'Visitada');
      a.style.setProperty('box-shadow', 'inset 3px 0 0 #0059b5');
    }
  });

  // 4) home: botón "Continuar donde lo dejaste" y reinicio del progreso
  if (page === 'index.html') {
    var last = read(K_LAST, null);
    if (last && PAGES.indexOf(last) !== -1) {
      var b = document.createElement('a');
      b.href = last;
      b.textContent = 'Continuar donde lo dejaste →';
      b.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:9999;background:#0059b5;color:#fff;' +
        'padding:10px 16px;border-radius:9999px;font:600 14px Inter,system-ui,sans-serif;text-decoration:none;' +
        'box-shadow:0 4px 14px rgba(0,0,0,.25)';
      document.body.appendChild(b);
    }
    var reset = document.getElementById('btn-reset-progress');
    if (reset) reset.addEventListener('click', function () {
      [K_VISITED, K_LAST, K_SCROLL].forEach(function (k) { try { localStorage.removeItem(k); } catch (e) {} });
      visited = {}; paintProgress();
      var c = document.querySelector('a[href][style*="Continuar"]'); if (c) c.remove();
      if (b && b.parentNode) b.remove();
    });
  }
})();

/* Accesibilidad compartida por todas las pantallas:
   1) enlace "Saltar al contenido", 2) foco de teclado siempre visible,
   3) botón de menú cuando la barra de navegación se oculta (pantallas estrechas / zoom alto). */
(function () {
  function init() {
    var css = document.createElement('style');
    css.id = 'ipo-a11y';
    css.textContent =
      'html{scroll-padding-top:176px}' +
      '.ipo-skip{position:fixed;left:8px;top:-100px;z-index:10000;background:#0059b5;color:#fff;padding:12px 20px;border-radius:8px;font:600 15px Inter,system-ui,sans-serif;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.3)}' +
      '.ipo-skip:focus{top:8px;outline:3px solid #fff;outline-offset:2px}' +
      'a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,summary:focus-visible,[tabindex]:focus-visible{outline:3px solid #0059b5 !important;outline-offset:3px !important;box-shadow:0 0 0 6px #fff !important;border-radius:6px}' +
      'main:focus{outline:none}' +
      '.ipo-top .ipo-burger{display:none}' +
      '@media(max-width:1279.98px){' +
        '.ipo-top{position:relative}' +
        '.ipo-top .ipo-burger{display:flex}' +
        '.ipo-top .ipo-nav.ipo-open{display:flex;flex-direction:column;align-items:stretch;gap:0;position:absolute;left:0;right:0;top:calc(100% + 4px);background:#fff;border:1px solid #e3e2e7;border-radius:16px;box-shadow:0 12px 32px -4px rgba(0,0,0,.18);padding:8px;z-index:200;max-height:70vh;overflow-y:auto}' +
        '.ipo-top .ipo-nav.ipo-open>a,.ipo-top .ipo-nav.ipo-open .ipo-ddb{padding:12px 8px;font-size:15px}' +
        '.ipo-top .ipo-nav.ipo-open .ipo-dd{display:block;align-self:auto}' +
        '.ipo-top .ipo-nav.ipo-open .ipo-ddb svg{display:none}' +
        '.ipo-top .ipo-nav.ipo-open .ipo-menu{display:block;position:static;width:auto;border:0;box-shadow:none;padding:0 0 0 12px}' +
        '.ipo-top .ipo-nav.ipo-open .ipo-ml{max-height:none;overflow:visible}' +
      '}' +
      '@media(max-width:520px){.ipo-top{gap:8px}.ipo-top .ipo-right{gap:8px}.ipo-top .ipo-av{display:none}}' +
      '@media(max-width:420px){.ipo-top .ipo-bt{display:none}.ipo-top .ipo-brand{gap:0}}';
    document.head.appendChild(css);

    // 1) saltar al contenido
    var target = document.querySelector('main') || document.querySelector('h1');
    if (target) {
      if (!target.id) target.id = 'contenido-principal';
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      var skip = document.createElement('a');
      skip.className = 'ipo-skip';
      skip.href = '#' + target.id;
      skip.textContent = 'Saltar al contenido';
      skip.addEventListener('click', function (e) { e.preventDefault(); target.focus(); target.scrollIntoView(); });
      document.body.insertBefore(skip, document.body.firstChild);
    }

    // 3) botón de menú
    var nav = document.querySelector('.ipo-top .ipo-nav'), right = document.querySelector('.ipo-top .ipo-right');
    if (nav && right) {
      if (!nav.id) nav.id = 'ipo-nav-principal';
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'ipo-ic ipo-burger';
      b.setAttribute('aria-label', 'Abrir menú de navegación');
      b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', nav.id);
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
      right.insertBefore(b, right.firstChild);
      var set = function (open) {
        nav.classList.toggle('ipo-open', open);
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
        b.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      };
      b.addEventListener('click', function () { set(!nav.classList.contains('ipo-open')); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('ipo-open')) { set(false); b.focus(); }
      });
      document.addEventListener('click', function (e) {
        if (nav.classList.contains('ipo-open') && !nav.contains(e.target) && !b.contains(e.target)) set(false);
      });
      window.addEventListener('resize', function () { if (window.innerWidth >= 1280) set(false); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* Modo noche: botón de la luna en todas las pantallas. Guarda la preferencia (ipo_theme) y carga dark.css. */
(function () {
  var KEY = 'ipo_theme', root = document.documentElement;
  var MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"></path></svg>';
  var SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>';
  if (!document.querySelector('link[href^="dark.css"]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = 'dark.css?v=1';
    document.head.appendChild(link);
  }
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function paint() {
    var dark = root.classList.contains('dark');
    var b = document.getElementById('theme-toggle-btn');
    if (!b) return;
    b.innerHTML = dark ? SUN : MOON;
    b.setAttribute('aria-pressed', dark ? 'true' : 'false');
    b.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo noche');
    b.setAttribute('title', dark ? 'Modo claro' : 'Modo noche');
  }
  if (saved() === 'dark') root.classList.add('dark');
  // captura: sustituye el manejador antiguo que tenían algunas páginas, para que no se invierta dos veces
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('#theme-toggle-btn');
    if (!b) return;
    e.stopImmediatePropagation(); e.preventDefault();
    var dark = root.classList.toggle('dark');
    try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch (err) {}
    paint();
  }, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', paint); else paint();
})();
