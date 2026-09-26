/* ============================================================
   ВИД: Главная (hero, статистика, избранные места, о городе)
   ============================================================ */
window.Views = window.Views || {};
Views.home = {
  render(el) {
    const t = I18N.t, L = I18N.L;
    const featured = window.ATTRACTIONS
      .slice().sort((a, b) => b.rating - a.rating).slice(0, 6);
    const stats = window.CITY_STATS.map(s => `
      <div class="stat reveal">
        <div class="stat__value">${s.value.toLocaleString(I18N.current() === "ru" ? "ru-RU" : "en-US")}${s.suffix}</div>
        <div class="stat__label">${I18N.current() === "ru" ? s.ru : s.en}</div>
      </div>`).join("");

    el.innerHTML = `
      <section class="hero" id="hero">
        <div class="hero__layer hero__layer--waves" data-parallax="0.25"></div>
        <div class="hero__inner container">
          <div class="hero__content">
            <h1 data-parallax="0.08">${t("heroTitle")}</h1>
            <p class="hero__sub">${t("heroSub")}</p>
            <div class="hero__cta">
              <a class="btn btn--amber" href="#attractions" data-route="attractions">${t("ctaExplore")}</a>
              <a class="btn btn--ghost" href="#budget" data-route="budget">${t("ctaPlan")}</a>
            </div>
          </div>
          <div class="stats">${stats}</div>
          <div class="hero__scroll">${t("heroScroll")}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-head reveal">
          <h2>${t("featuredTitle")}</h2>
          <p>${t("featuredSub")}</p>
        </div>
        <div class="place-grid">
          ${featured.map(p => Views.placeCard(p)).join("")}
        </div>
        <p style="margin-top:1.4rem">
          <a class="btn btn--primary" href="#attractions" data-route="attractions">${t("allPlaces")}</a>
        </p>
      </section>

      <section class="section section--tint">
        <div class="reveal">
          <h2>${t("aboutPreviewTitle")}</h2>
          <p>${t("aboutPreviewText")}</p>
          <a class="btn btn--primary" href="#about" data-route="about">${t("aboutMore")}</a>
        </div>
      </section>`;

    App.bindCommon(el);
    App.initParallax(el.querySelector(".hero"));
    App.observeReveals(el);
  }
};

/** Универсальная карточка места (используется и на главной) */
Views.placeCard = function (p) {
  const t = I18N.t, L = I18N.L;
  const cat = window.CATEGORIES[p.category];
  const fav = Store.isFav(p.id);
  return `
    <article class="place-card reveal" data-place="${p.id}" tabindex="0" role="button"
      aria-label="${esc(L(p.name))}">
      <button class="place-card__fav ${fav ? "on" : ""}" data-fav="${p.id}"
        aria-label="${t("addFav")}" title="${t("addFav")}">${fav ? "★" : "☆"}</button>
      <img class="place-card__img" src="${p.img}" alt="${esc(L(p.name))}" loading="lazy">
      <div class="place-card__body">
        <div class="place-card__top">
          <h3 class="place-card__title">${esc(L(p.name))}</h3>
          <span class="place-card__cat">${cat.icon} ${L(cat)}</span>
        </div>
        <p class="place-card__desc">${esc(L(p.desc))}</p>
        <div class="place-card__meta">
          <span class="rating">★ ${p.rating}</span>
          <span>≈ ${p.duration} ${t("hoursShort")}</span>
          <span>${p.price ? fmtRub(p.price) + " " + t("rub") : "🎁 " + t("free")}</span>
        </div>
      </div>
    </article>`;
};
