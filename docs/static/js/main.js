// Theme toggle: remembers the viewer's choice, otherwise follows the OS setting.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');

  function stored() {
    try { return localStorage.getItem('papa-theme'); } catch (e) { return null; }
  }

  function apply(theme) {
    if (theme === 'dark' || theme === 'light') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function current() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  apply(stored());

  if (btn) {
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('papa-theme', next); } catch (e) { /* private mode */ }
    });
  }
})();

// Highlight the nav entry for the section currently in view.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.topbar nav a'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (id) byId[id] = a;
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var a = byId[entry.target.id];
      if (!a) return;
      a.style.color = entry.isIntersecting ? 'var(--accent)' : '';
    });
  }, { rootMargin: '-50% 0px -45% 0px' });

  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
