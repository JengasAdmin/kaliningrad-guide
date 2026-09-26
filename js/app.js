/* ============================================================
   ЯДРО: роутер, тема, язык, меню, параллакс, анимации
   ============================================================ */
const App = (() => {
  const ROUTES = {
    home:       () => Views.home.render(appEl()),
    about:      () => Views.about.render(appEl()),
    attractions:() => Views.attractions.render(appEl()),
    budget:     () => Views.budget.render(appEl()),
    route:      () => Views.route.render(appEl()),
    tools:      () => Views.tools.render(appEl()),
    reviews:    () => Views.reviews.render(appEl()),
    faq:        () => Views.faq.render(appEl())
  };

  function appEl() { return document.getElementById("app"); }

  /* ---------- Роутер (hash-based) ---------- */
  function currentRoute() {
    const h = location.hash.replace(/^#\/?/, "").split("?")[0];
    return ROUTES[h] ? h : "home";
  }

  function navigate() {
    const route = currentRoute();
    ROUTES[route]();
    document.querySelectorAll("[data-route]").forEach(a =>
      a.classList.toggle("active", a.dataset.route === route));
    // закрыть мобильное меню
    document.getElementById("nav").classList.remove("open");
    document.getElementById("burger").classList.remove("open");
    document.getElementById("burger").setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* ---------- Тема ---------- */
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    Store.setTheme(theme);
    document.querySelectorAll(".theme-toggle .theme-toggle__icon").forEach(i => {
      i.textContent = theme === "dark" ? "☀️" : "🌙";
    });
    document.querySelectorAll(".theme-toggle").forEach(b => {
      b.setAttribute("aria-label", theme === "dark" ? I18N.t("themeToLight") : I18N.t("themeToDark"));
    });
  }

  function toggleTheme() {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  }

  /* ---------- Общие биндинги внутри видов ---------- */
  function bindCommon(root) {
    root.querySelectorAll("[data-route]").forEach(a =>
      a.addEventListener("click", e => {
        // hash-ссылки работают сами; только подсветим активность
        document.querySelectorAll("[data-route]").forEach(x =>
          x.classList.toggle("active", x.dataset.route === a.dataset.route));
      }));
  }

  /* ---------- Появление при скролле ---------- */
  let observer = null;
  function observeReveals(root) {
    const els = [...root.querySelectorAll(".reveal:not(.visible)")];

    // Надёжный фолбэк: показываем всё, что в зоне видимости,
    // и досматриваем при скролле (работает даже без IntersectionObserver)
    const check = () => {
      let pending = false;
      els.forEach(el => {
        if (el.classList.contains("visible")) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.classList.add("visible");
        else pending = true;
      });
      return pending;
    };

    if ("IntersectionObserver" in window) {
      observer = observer || new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add("visible"); observer.unobserve(en.target); }
        });
      }, { threshold: .12 });
      els.forEach(el => observer.observe(el));
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
  }

  /* ---------- Параллакс в hero ---------- */
  function initParallax(hero) {
    if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = hero.querySelectorAll("[data-parallax]");
    hero.addEventListener("mousemove", e => {
      const x = (e.clientX / window.innerWidth - .5);
      const y = (e.clientY / window.innerHeight - .5);
      layers.forEach(l => {
        const k = +l.dataset.parallax * 18;
        l.style.transform = `translate(${x * k}px, ${y * k}px)`;
      });
    });
    window.addEventListener("scroll", () => {
      if (!document.body.contains(hero)) return;
      const sy = window.scrollY;
      layers.forEach(l => {
        const k = +l.dataset.parallax * -0.4;
        if (sy < window.innerHeight)
          l.style.transform = `translateY(${sy * k}px)`;
      });
    }, { passive: true });
  }

  /* ---------- Инициализация ---------- */
  function init() {
    // тема
    applyTheme(Store.getTheme());
    document.querySelectorAll(".theme-toggle").forEach(b =>
      b.addEventListener("click", toggleTheme));

    // язык
    document.documentElement.lang = I18N.current();
    I18N.applyStatic();
    document.querySelectorAll(".lang-switch__btn").forEach(b =>
      b.addEventListener("click", () => {
        if (b.dataset.lang !== I18N.current()) I18N.setLang(b.dataset.lang);
      }));

    // меню-бургер
    const burger = document.getElementById("burger");
    burger.addEventListener("click", () => {
      const open = document.getElementById("nav").classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
    });

    // кнопка «наверх» и тень шапки
    const toTop = document.getElementById("toTop");
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
      toTop.classList.toggle("show", window.scrollY > 600);
      header.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // первый маршрут + реакция на hash
    window.addEventListener("hashchange", navigate);
    navigate();
  }

  function rerender() { navigate(); }

  document.addEventListener("DOMContentLoaded", init);

  const App = { navigate, rerender, bindCommon, observeReveals, initParallax };
  window.App = App; // i18n.setLang вызывает App.rerender()
  return App;
})();
