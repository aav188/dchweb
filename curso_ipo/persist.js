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
