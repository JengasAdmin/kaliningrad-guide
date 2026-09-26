/* ============================================================
   i18n: перевод интерфейса без перезагрузки
   ============================================================ */
const I18N = (() => {
  let lang = localStorage.getItem("kg_lang") || "ru";

  /** t("key") — перевод; поддерживает {n}/{m} в строках */
  function t(key, vars) {
    let s = (window.I18N[lang] && window.I18N[lang][key]) ??
            window.I18N.ru[key] ?? key;
    if (vars) for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll("{" + k + "}", v);
    }
    return s;
  }

  /** L(obj) — выбрать поле {ru,en} из данных */
  function L(obj) {
    return obj ? (obj[lang] ?? obj.ru) : "";
  }

  function current() { return lang; }

  function setLang(newLang) {
    lang = newLang;
    localStorage.setItem("kg_lang", lang);
    document.documentElement.lang = lang;
    applyStatic();
    // перерисовать активный вид
    if (window.App) App.rerender();
  }

  /** Применить переводы к статичной разметке (data-i18n / data-i18n-aria) */
  function applyStatic(root = document) {
    root.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-aria]").forEach(el => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });
    root.querySelectorAll("[data-i18n-ph]").forEach(el => {
      el.placeholder = t(el.dataset.i18nPh);
    });
    document.querySelectorAll(".lang-switch").forEach(sw => {
      sw.querySelectorAll(".lang-switch__btn").forEach(b =>
        b.classList.toggle("active", b.dataset.lang === lang));
    });
  }

  return { t, L, current, setLang, applyStatic };
})();
