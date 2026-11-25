/* Curso IPO v2 — script común a todas las páginas.
   1) Estructura del curso (fuente única para menús, navegación, buscador y progreso)
   2) Identificación del usuario (sesión simulada) y modo invitado
   3) Cabecera: cuenta, enlace activo y buscador
   4) Navegación de módulo unificada (escalable a N partes) y paginador inferior */
(function () {
  // ---------------------------------------------------------------- 1) CURSO
  var MODULES = [
    { id: 'm1', n: '01', title: 'Fundamentos', href: 'pilares.html', parts: [
      { t: 'Pilares de la IPO', d: 'Usabilidad, UX y accesibilidad', href: 'pilares.html' },
      { t: 'Usabilidad', d: 'ISO 9241-11 y Nielsen', href: 'usabilidad.html', lessons: [
        { t: 'Definición', href: 'usabilidad-01-definicion.html', practice: 'usabilidad-01-practica.html' },
        { t: 'Importancia', href: 'usabilidad-02-importancia.html', practice: 'usabilidad-02-practica.html' },
        { t: 'Beneficios', href: 'usabilidad-03-beneficios.html', practice: 'usabilidad-03-practica.html' },
        { t: 'Atributos', href: 'usabilidad-04-atributos.html', practice: 'usabilidad-04-practica.html' },
        { t: 'Calidad de software', href: 'usabilidad-05-calidad-software.html', practice: 'usabilidad-05-practica.html' },
        { t: 'Usabilidad web', href: 'usabilidad-06-usabilidad-web.html', practice: 'usabilidad-06-practica.html' }] },
      { t: 'Experiencia de usuario', d: 'UX más allá de la interfaz', href: 'ux.html', practice: 'ux-practica.html' },
      { t: 'Accesibilidad', d: 'Diseño para todas las personas', href: 'accesibilidad.html', lessons: [
        { t: 'Accesibilidad de las interfaces', href: 'accesibilidad-01-interfaces.html', practice: 'accesibilidad-01-practica.html' },
        { t: 'Una necesidad general', href: 'accesibilidad-02-necesidad-general.html', practice: 'accesibilidad-02-practica.html' },
        { t: 'Accesibilidad en Internet', href: 'accesibilidad-03-internet.html', practice: 'accesibilidad-03-practica.html' },
        { t: 'Motivos del diseño accesible', href: 'accesibilidad-04-motivos.html', practice: 'accesibilidad-04-practica.html' }] }] },
    { id: 'm2', n: '02', title: 'El factor humano', href: 'modulo-2.html', parts: [
      { t: 'Introducción', d: 'Bases y conceptos clave', href: 'modulo-2.html', practice: 'modulo-2-01-practica.html' },
      { t: 'Percepción', d: 'Sentidos y leyes de la Gestalt', href: 'modulo-2-02-percepcion.html', practice: 'modulo-2-02-practica.html' },
      { t: 'Memoria humana', d: 'MCP, MLP y carga cognitiva', href: 'modulo-2-03-memoria.html', practice: 'modulo-2-03-practica.html' }] },
    { id: 'm3', n: '03', title: 'Diseño Centrado en el Usuario', href: 'modulo-3.html', parts: [
      { t: 'Introducción al DCU', d: 'Fundamentos y conceptos clave', href: 'modulo-3.html' },
      { t: 'Teoría del DCU', d: 'Normativa, principios y contexto', href: 'modulo-3-02-teoria.html', lessons: [
        { t: 'Normativa y principios', href: 'modulo-3-02-1-normativa.html', practice: 'modulo-3-02-1-practica.html' },
        { t: 'Diseño contextual', href: 'modulo-3-02-2-contextual.html', practice: 'modulo-3-02-2-practica.html' },
        { t: 'Enfoques de diseño', href: 'modulo-3-02-3-enfoques.html', practice: 'modulo-3-02-3-practica.html' }] },
      { t: 'Modelo MPIu+a', d: 'Proceso, fases e iteración', href: 'modulo-3-03-modelo-mpiua.html', lessons: [
        { t: 'Fase de diseño', href: 'modulo-3-fase-diseno.html' },
        { t: 'Diseño: objetivos', href: 'modulo-3-fase-diseno-01-objetivos.html', practice: 'modulo-3-fase-diseno-01-practica.html' },
        { t: 'Diseño: factores humanos', href: 'modulo-3-fase-diseno-02-factores-humanos.html', practice: 'modulo-3-fase-diseno-02-practica.html' },
        { t: 'Diseño: modelo mental', href: 'modulo-3-fase-diseno-03-modelo-mental.html', practice: 'modulo-3-fase-diseno-03-practica.html' },
        { t: 'Fase de implementación', href: 'modulo-3-fase-implementacion.html' },
        { t: 'Fase de lanzamiento', href: 'modulo-3-fase-lanzamiento.html' }] }] },
    { id: 'm4', n: '04', title: 'Análisis de requisitos', soon: true },
    { id: 'm5', n: '05', title: 'Prototipado', soon: true },
    { id: 'm6', n: '06', title: 'Evaluación', soon: true },
    { id: 'm7a', n: '07.1', title: 'Estilos de interacción', soon: true },
    { id: 'm7b', n: '07.2', title: 'Diseño de interfaces', soon: true }
  ];
  // Módulo de ejemplo con 10 partes (solo para enseñar cómo escala la navegación)
  var DEMO = { id: 'demo', n: '04', title: 'Análisis de requisitos (ejemplo con 10 partes)', href: 'demo-10-partes.html?p=1', demo: true, parts: [
    'Qué es un requisito', 'Usuarios y partes interesadas', 'Entrevistas', 'Cuestionarios', 'Observación y etnografía',
    'Personas', 'Escenarios', 'Análisis de tareas (HTA)', 'Requisitos de usabilidad', 'Requisitos de accesibilidad'
  ].map(function (t, i) { return { t: t, href: 'demo-10-partes.html?p=' + (i + 1) }; }) };

  // Índice de páginas: href -> posición en el curso. SEQ = orden lineal de lectura (solo teoría).
  var INFO = {}, SEQ = [];
  [].concat(MODULES, [DEMO]).forEach(function (m) {
    (m.parts || []).forEach(function (p, pi) {
      INFO[p.href] = { m: m, pi: pi, li: p.lessons ? 0 : -1 };
      if (!m.demo) SEQ.push(p.href);
      if (p.practice) INFO[p.practice] = { m: m, pi: pi, li: -1, practice: true };
      (p.lessons || []).forEach(function (l, li) {
        INFO[l.href] = { m: m, pi: pi, li: li + 1 };
        if (!m.demo) SEQ.push(l.href);
        if (l.practice) INFO[l.practice] = { m: m, pi: pi, li: li + 1, practice: true };
      });
    });
  });
  // Páginas que cuentan para el progreso (teoría + práctica) de cada módulo
  function modulePages(m) {
    var out = [];
    (m.parts || []).forEach(function (p) {
      out.push(p.href); if (p.practice) out.push(p.practice);
      (p.lessons || []).forEach(function (l) { out.push(l.href); if (l.practice) out.push(l.practice); });
    });
    return out;
  }
  var ALL_PAGES = [];
  MODULES.forEach(function (m) { ALL_PAGES = ALL_PAGES.concat(modulePages(m)); });

  var file = location.pathname.split('/').pop() || 'index.html';
  var page = INFO[file + location.search] ? file + location.search : file;
  var here = INFO[page] || null;

  // ------------------------------------------------------- 2) IDENTIFICACIÓN
  function read(store, k, d) { try { var v = store.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function write(store, k, v) { try { store.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var LS = window.localStorage, SS = window.sessionStorage;

  var Auth = {
    session: function () { return read(LS, 'ipo_session', null); },
    accounts: function () { return read(LS, 'ipo_accounts', {}); },
    // datos de progreso del usuario actual; el invitado solo guarda en la pestaña (sessionStorage)
    data: function () {
      var s = Auth.session();
      if (!s) return read(SS, 'ipo_guest', { visited: {}, last: null });
      return Auth.accounts()[s.user] || { name: s.name, visited: {}, last: null };
    },
    save: function (d) {
      var s = Auth.session();
      if (!s) return write(SS, 'ipo_guest', d);
      var a = Auth.accounts(); a[s.user] = d; write(LS, 'ipo_accounts', a);
    },
    login: function (user, name) {
      var a = Auth.accounts(), acc = a[user] || { name: name, visited: {}, last: null };
      acc.name = name || acc.name;
      // lo visitado como invitado en esta pestaña se incorpora a la cuenta
      var g = read(SS, 'ipo_guest', null), merged = 0;
      if (g) {
        Object.keys(g.visited || {}).forEach(function (p) { if (!acc.visited[p]) { acc.visited[p] = g.visited[p]; merged++; } });
        if (g.last) acc.last = g.last;
        try { SS.removeItem('ipo_guest'); } catch (e) {}
      }
      a[user] = acc; write(LS, 'ipo_accounts', a);
      write(LS, 'ipo_session', { user: user, name: acc.name });
      return merged;
    },
    logout: function () { try { LS.removeItem('ipo_session'); } catch (e) {} }
  };
  window.IPO = { Auth: Auth, MODULES: MODULES, INFO: INFO, SEQ: SEQ, modulePages: modulePages, progress: progress, moduleProgress: moduleProgress };

  function progress() {
    var v = Auth.data().visited;
    var n = ALL_PAGES.filter(function (p) { return v[p]; }).length;
    return Math.round(n / ALL_PAGES.length * 100);
  }
  function moduleProgress(m) {
    var v = Auth.data().visited, pages = modulePages(m);
    if (!pages.length) return 0;
    return Math.round(pages.filter(function (p) { return v[p]; }).length / pages.length * 100);
  }

  // registrar la visita (la home y las páginas generales no cuentan como lección)
  var data = Auth.data();
  if (ALL_PAGES.indexOf(page) !== -1) { data.visited[page] = Date.now(); data.last = page; Auth.save(data); }

  // ------------------------------------------------------------ 3) CABECERA
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function initials(name) { return (name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join(''); }
  var loginHref = 'login.html?next=' + encodeURIComponent(page);

  // enlace activo del menú principal
  var navTarget = here && !here.m.demo ? 'pilares.html' : ({ 'mpiua.html': 'mpiua.html', 'recursos.html': 'recursos.html', 'blog.html': 'blog.html', 'index.html': 'index.html' })[file];
  document.querySelectorAll('.ipo-nav > a, .ipo-nav .ipo-ddb').forEach(function (a) {
    a.classList.toggle('on', a.getAttribute('href') === navTarget);
  });

  function renderAccount() {
    var box = document.getElementById('ipo-account');
    if (!box) return;
    var s = Auth.session();
    if (!s) {
      box.innerHTML = '<span class="acc-guest" title="No has iniciado sesión: tu progreso no se guarda">Invitado</span>' +
        '<a class="acc-login" href="' + loginHref + '">Iniciar sesión</a>';
      return;
    }
    box.innerHTML =
      '<span class="acc-prog" title="Progreso en el curso"><span class="acc-bar"><i style="width:' + progress() + '%"></i></span>' + progress() + '%</span>' +
      '<div class="acc-dd"><button type="button" class="acc-av" aria-haspopup="true" aria-expanded="false" aria-label="Cuenta de ' + esc(s.name) + '">' + esc(initials(s.name)) + '</button>' +
      '<div class="acc-menu" role="menu" hidden><div class="acc-who"><b>' + esc(s.name) + '</b><small>' + esc(s.user) + '@alumnes.udl.cat</small></div>' +
      '<a role="menuitem" href="index.html#mi-progreso">Mi progreso <span>' + progress() + '%</span></a>' +
      (data.last ? '<a role="menuitem" href="' + data.last + '">Continuar donde lo dejaste</a>' : '') +
      '<button role="menuitem" type="button" id="acc-logout">Cerrar sesión</button></div></div>';
    var btn = box.querySelector('.acc-av'), menu = box.querySelector('.acc-menu');
    function toggle(open) { menu.hidden = !open; btn.setAttribute('aria-expanded', open); }
    btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(menu.hidden); });
    document.addEventListener('click', function (e) { if (!box.contains(e.target)) toggle(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
    box.querySelector('#acc-logout').addEventListener('click', function () { Auth.logout(); location.href = 'index.html'; });
  }
  renderAccount();

  // mensaje de una sola vez (p. ej. tras iniciar sesión)
  var flash = null;
  try { flash = SS.getItem('ipo_flash'); SS.removeItem('ipo_flash'); } catch (e) {}
  if (flash) {
    var t = document.createElement('div');
    t.className = 'ipo-toast'; t.setAttribute('role', 'status'); t.textContent = flash;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 6000);
  }

  // ---- buscador (mismo en todas las páginas)
  var CONCEPTS = [
    ['Leyes de la Gestalt', 'Percepción', 'modulo-2-02-percepcion.html'],
    ['Heurísticas de Nielsen', 'Usabilidad', 'usabilidad-02-importancia.html'],
    ['ISO 9241-11: eficacia, eficiencia y satisfacción', 'Usabilidad', 'usabilidad-01-definicion.html'],
    ['Learnability (facilidad de aprendizaje)', 'Usabilidad', 'usabilidad-01-definicion.html'],
    ['Retorno de la inversión (ROI)', 'Usabilidad', 'usabilidad-03-beneficios.html'],
    ['ISO 25010 y calidad de software', 'Usabilidad', 'usabilidad-05-calidad-software.html'],
    ['Pautas WCAG y principios POUR', 'Accesibilidad', 'accesibilidad-03-internet.html'],
    ['W3C y WAI', 'Accesibilidad', 'accesibilidad-03-internet.html'],
    ['Diversidad funcional', 'Accesibilidad', 'accesibilidad-02-necesidad-general.html'],
    ['Affordance', 'Factor humano', 'modulo-2-03-memoria.html'],
    ['Carga cognitiva', 'Factor humano', 'modulo-2-03-memoria.html'],
    ['ISO 13407 / ISO 9241-210', 'DCU', 'modulo-3-02-1-normativa.html'],
    ['Diseño contextual', 'DCU', 'modulo-3-02-2-contextual.html'],
    ['Modelo mental y modelo conceptual', 'MPIu+a', 'modulo-3-fase-diseno-03-modelo-mental.html'],
    ['Prototipado', 'MPIu+a', 'modulo-3-03-modelo-mpiua.html'],
    ['Modelo de proceso MPIu+a', 'MPIu+a', 'mpiua.html']
  ];
  var SEARCH = [];
  MODULES.forEach(function (m) {
    (m.parts || []).forEach(function (p) {
      SEARCH.push([p.t, 'Módulo ' + m.n + ' · ' + m.title, p.href]);
      (p.lessons || []).forEach(function (l) { SEARCH.push([l.t, 'Módulo ' + m.n + ' · ' + p.t, l.href]); });
    });
  });
  SEARCH = SEARCH.concat(CONCEPTS, [['Recursos: bibliografía, normas y herramientas', 'Recursos', 'recursos.html'], ['Blog del curso', 'Blog', 'blog.html']]);
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  var modal;
  function buildSearch() {
    modal = document.createElement('div');
    modal.className = 'srch';
    modal.hidden = true;
    modal.innerHTML = '<div class="srch-box" role="dialog" aria-modal="true" aria-label="Buscar en el curso">' +
      '<div class="srch-in"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
      '<input type="search" placeholder="Busca una lección o un concepto (Gestalt, WCAG, Nielsen…)" aria-label="Texto de búsqueda" autocomplete="off">' +
      '<button type="button" class="srch-x" aria-label="Cerrar buscador">Esc</button></div>' +
      '<ul class="srch-res" role="listbox"></ul></div>';
    document.body.appendChild(modal);
    var input = modal.querySelector('input'), list = modal.querySelector('.srch-res');
    function render() {
      var q = norm(input.value.trim());
      var res = SEARCH.filter(function (r) { return !q || norm(r[0] + ' ' + r[1]).indexOf(q) !== -1; }).slice(0, 12);
      list.innerHTML = res.length ? res.map(function (r, i) {
        return '<li><a href="' + r[2] + '"' + (i === 0 ? ' class="is-sel"' : '') + '><b>' + esc(r[0]) + '</b><small>' + esc(r[1]) + '</small></a></li>';
      }).join('') : '<li class="srch-none">No hay resultados para «' + esc(input.value) + '».</li>';
    }
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      var links = [].slice.call(list.querySelectorAll('a')), i = links.findIndex(function (a) { return a.classList.contains('is-sel'); });
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); if (!links.length) return;
        if (i >= 0) links[i].classList.remove('is-sel');
        i = (i + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
        links[i].classList.add('is-sel'); links[i].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter' && links[i]) { location.href = links[i].getAttribute('href'); }
    });
    modal.addEventListener('click', function (e) { if (e.target === modal) closeSearch(); });
    modal.querySelector('.srch-x').addEventListener('click', closeSearch);
    modal._render = render;
  }
  function openSearch() {
    if (!modal) buildSearch();
    modal.hidden = false; var i = modal.querySelector('input'); i.value = ''; modal._render(); i.focus();
  }
  function closeSearch() { if (modal) modal.hidden = true; }
  var sbtn = document.getElementById('cmd-search-btn');
  if (sbtn) sbtn.addEventListener('click', openSearch);
  document.addEventListener('keydown', function (e) {
    var typing = /INPUT|TEXTAREA|SELECT/.test((e.target.tagName || '')) || e.target.isContentEditable;
    if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !typing)) { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape') closeSearch();
  });

  // ------------------------------------------- 4) NAVEGACIÓN DE MÓDULO
  // La cabecera fija pasa a medir siempre lo mismo: el <main> arranca justo debajo
  function fixTopPadding() {
    var h = document.querySelector('body > header'), first = document.querySelector('body > .cn') || main;
    if (h && first && getComputedStyle(h).position === 'fixed') first.style.paddingTop = Math.ceil(h.getBoundingClientRect().height) + 'px';
  }

  function stepList(items, current, cls) {
    // items: [{t, d, href, done}] — con más de 5 elementos pasa a modo compacto (solo números, salvo el actual)
    var compact = items.length > 5;
    return '<ol class="cn-steps' + (compact ? ' is-compact' : '') + (cls ? ' ' + cls : '') + '" style="--n:' + items.length + '">' +
      items.map(function (it, i) {
        var cur = i === current;
        var st = cur ? ' is-current' : (it.done ? ' is-done' : '');
        return '<li><a class="cn-step' + st + '" href="' + it.href + '"' + (cur ? ' aria-current="step"' : '') +
          ' title="' + esc((i + 1) + '. ' + it.t) + '"><span class="cn-num">' + (it.done && !cur ? '<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>' : String(i + 1).padStart(2, '0')) + '</span>' +
          '<span class="cn-txt"><b>' + esc(it.t) + '</b>' + (it.d ? '<small>' + esc(it.d) + '</small>' : '') + '</span></a></li>';
      }).join('') + '</ol>';
  }

  function buildCourseNav() {
    var m = here.m, part = m.parts[here.pi], v = Auth.data().visited;
    var parts = m.parts.map(function (p) {
      var pages = [p.href].concat((p.lessons || []).map(function (l) { return l.href; }));
      return { t: p.t, d: p.d, href: p.href, done: pages.every(function (x) { return v[x]; }) };
    });
    var lessonItem = here.li > 0 ? part.lessons[here.li - 1] : (here.li === -1 ? part : null);
    var crumbs = '<a href="index.html">Inicio</a><span>/</span><a href="' + m.href + '">Módulo ' + m.n + ': ' + esc(m.title) + '</a>' +
      (here.li > 0 || here.practice ? '<span>/</span><a href="' + part.href + '">' + esc(part.t) + '</a>' : '') +
      (here.li > 0 ? '<span>/</span><span aria-current="page">' + esc(part.lessons[here.li - 1].t) + '</span>' : '') +
      (here.practice ? '<span>/</span><span aria-current="page">Práctica</span>' : '');
    var stepBtn = function (dir) {
      var i = here.pi + dir, p = m.parts[i];
      return p ? '<a class="cn-arrow" href="' + p.href + '" aria-label="' + (dir < 0 ? 'Parte anterior' : 'Parte siguiente') + ': ' + esc(p.t) + '">' +
        '<svg viewBox="0 0 24 24"><path d="' + (dir < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6') + '"/></svg></a>'
        : '<span class="cn-arrow is-off" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="' + (dir < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6') + '"/></svg></span>';
    };
    var html = '<div class="cn-in">' +
      '<div class="cn-top"><nav class="cn-crumbs" aria-label="Estás aquí">' + crumbs + '</nav>' +
      (m.demo ? '' : '<span class="cn-modprog">Módulo completado: <b>' + moduleProgress(m) + '%</b></span>') + '</div>' +
      '<div class="cn-head"><h2 class="cn-title">Módulo ' + m.n + ' · ' + esc(m.title) + '</h2>' +
      '<div class="cn-pager"><span>Parte <b>' + (here.pi + 1) + '</b> de ' + m.parts.length + '</span>' + stepBtn(-1) + stepBtn(1) + '</div></div>' +
      stepList(parts, here.pi);
    if (part.lessons) {
      var les = [{ t: 'Presentación', href: part.href, done: !!v[part.href] }].concat(part.lessons.map(function (l) {
        return { t: l.t, href: l.href, done: !!v[l.href] };
      }));
      html += '<div class="cn-sub"><span class="cn-sublabel">Lecciones de «' + esc(part.t) + '» · ' + part.lessons.length + '</span>' + stepList(les, here.li, 'is-sub') + '</div>';
    }
    if (lessonItem && lessonItem.practice) {
      html += '<div class="cn-mode" role="group" aria-label="Tipo de contenido">' +
        '<a href="' + lessonItem.href + '"' + (here.practice ? '' : ' aria-current="page"') + '>Teoría</a>' +
        '<a href="' + lessonItem.practice + '"' + (here.practice ? ' aria-current="page"' : '') + '>Práctica: test y actividades</a></div>';
    }
    if (!Auth.session()) {
      html += '<div class="cn-guest" role="note"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>' +
        '<span>Estás como <b>invitado</b>: puedes ver todo el contenido, pero ' + (here.practice ? 'tu progreso y tus resultados no se guardarán' : 'tu progreso no se guardará') + ' al cerrar el navegador.</span>' +
        '<a href="' + loginHref + '">Iniciar sesión</a></div>';
    }
    html += '</div>';
    var nav = document.createElement('section');
    nav.className = 'cn';
    nav.setAttribute('aria-label', 'Navegación del módulo');
    nav.innerHTML = html;
    return nav;
  }

  function buildPager() {
    // orden de lectura: la práctica va justo después de su teoría
    var seq = here.m.demo ? here.m.parts.map(function (p) { return p.href; }) : SEQ;
    var idx = seq.indexOf(here.practice ? theoryOf(page) : page);
    var prev = here.practice ? theoryOf(page) : seq[idx - 1];
    var nextHref = seq[idx + 1];
    var ownPractice = !here.practice && practiceOf(page);
    var next = ownPractice || nextHref;
    function label(h) {
      if (!h) return '';
      var i = INFO[h], p = i.m.parts[i.pi], t = i.li > 0 ? p.lessons[i.li - 1].t : p.t;
      return (i.practice ? 'Práctica · ' : '') + t;
    }
    if (!prev && !next) return null;
    var el = document.createElement('nav');
    el.className = 'cn-foot';
    el.setAttribute('aria-label', 'Lección anterior y siguiente');
    el.innerHTML = (prev ? '<a class="cn-foot-prev" href="' + prev + '"><small>Anterior</small><b>' + esc(label(prev)) + '</b></a>' : '<span></span>') +
      (next ? '<a class="cn-foot-next" href="' + next + '"><small>' + (ownPractice ? 'Ahora practica' : 'Siguiente') + '</small><b>' + esc(label(next)) + '</b></a>' : '<span></span>');
    return el;
  }
  function theoryOf(pr) {
    var i = INFO[pr], p = i.m.parts[i.pi];
    return i.li > 0 ? p.lessons[i.li - 1].href : p.href;
  }
  function practiceOf(h) {
    var i = INFO[h], p = i.m.parts[i.pi];
    return i.li > 0 ? p.lessons[i.li - 1].practice : p.practice;
  }

  // Quita las navegaciones antiguas (cada página traía la suya) para que solo quede la común
  function removeLegacyNav(main) {
    var top = document.querySelector('.ipo-top'), n = top;
    while (n && n.tagName !== 'HEADER') {
      while (n.nextElementSibling) n.nextElementSibling.remove();
      n = n.parentElement;
      if (n.tagName !== 'HEADER') n.style.height = 'auto';      // algunas cabeceras tenían altura fija para la sub-barra
    }
    main.querySelectorAll('section').forEach(function (s) {
      var links = [].slice.call(s.querySelectorAll('a[href$=".html"]')).filter(function (a) { return INFO[a.getAttribute('href')]; });
      var active = [].some.call(s.querySelectorAll('div,span'), function (e) { return /^\s*activo\s*$/i.test(e.textContent); });
      if (links.length >= 2 && active && s.textContent.length < 1600) s.remove();
    });
    // barras de píldoras de las prácticas: bloques cortos hechos casi solo de enlaces a lecciones
    // (dentro del <main> o sueltas entre la cabecera y el <main>)
    var between = [], b = document.querySelector('body > header');
    while (b && (b = b.nextElementSibling) && b !== main) between.push(b);
    between.concat([].slice.call(main.querySelectorAll('nav, section, div'))).forEach(function (el) {
      if (!el.isConnected || el.querySelector('h1')) return;
      var links = [].slice.call(el.querySelectorAll('a[href$=".html"]')).filter(function (a) { return INFO[a.getAttribute('href')]; });
      if (links.length >= 2 && el.textContent.trim().length < links.length * 60 + 40) el.remove();
    });
    main.querySelectorAll('nav[aria-label="Ruta de migas de pan"]').forEach(function (x) { (x.closest('section') || x).remove(); });
    main.querySelectorAll('a').forEach(function (a) { if (/Volver a Pilares/i.test(a.textContent)) a.remove(); });
  }

  var hdr = document.querySelector('body > header');
  var main = document.querySelector('main');
  if (!main && hdr && hdr.nextElementSibling) {          // alguna práctica no tenía <main>
    main = document.createElement('main');
    hdr.parentNode.insertBefore(main, hdr.nextElementSibling);
    main.appendChild(main.nextElementSibling);
  }
  if (main && here) {
    removeLegacyNav(main);
    // la barra va fuera del <main> para tener siempre el ancho completo, sea cual sea el contenedor de la página
    var courseNav = buildCourseNav();
    main.parentNode.insertBefore(courseNav, main);
    main.style.paddingTop = '8px';
    var pager = buildPager();
    if (pager) main.appendChild(pager);
    var curStep = courseNav.querySelectorAll('.cn-steps .is-current');
    curStep.forEach(function (c) { var ol = c.closest('ol'); ol.scrollLeft = c.offsetLeft - ol.clientWidth / 2 + c.clientWidth / 2; });
  }
  fixTopPadding();
  window.addEventListener('load', fixTopPadding);
  window.addEventListener('resize', fixTopPadding);

  // cada página se abre arriba del todo (salvo anclas)
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  if (!location.hash) window.addEventListener('load', function () { window.scrollTo(0, 0); });

  document.dispatchEvent(new CustomEvent('ipo:ready'));
})();
