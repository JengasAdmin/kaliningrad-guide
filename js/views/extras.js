/* ============================================================
   ВИДЫ: Отзывы (карусель + форма) и FAQ (аккордеон)
   ============================================================ */
window.Views = window.Views || {};

/* ---------- Отзывы ---------- */
Views.reviews = {
  index: 0,

  render(el) {
    const t = I18N.t;
    const userReviews = Store.getReviews();
    const all = [...userReviews, ...window.REVIEWS];

    el.innerHTML = `
      <section class="section">
        <div class="section-head section-head--center reveal">
          <h1>${t("revTitle")}</h1>
          <p>${t("revSub")}</p>
        </div>

        <div class="reviews-carousel reveal" data-carousel style="max-width:960px;margin-inline:auto">
          <div class="reviews-track" data-track>
            ${all.map(r => `
              <div class="review-slide">
                <div class="review-card">
                  <div class="stars" aria-label="${r.stars} / 5">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
                  <p>«${esc(I18N.current() === "ru" ? r.ru : r.en)}»</p>
                  <div class="who">${esc(r.name)}</div>
                </div>
              </div>`).join("")}
          </div>
          <div class="carousel-nav">
            <button data-prev aria-label="${t("revPrev")}">←</button>
            <button data-next aria-label="${t("revNext")}">→</button>
          </div>
        </div>

        <div class="panel reveal" style="max-width:640px;margin:2.5rem auto 0">
          <h3>✍️ ${t("revForm")}</h3>
          <form class="form-grid" id="revForm">
            <div class="form-row">
              <input type="text" id="revName" placeholder="${t("revName")}" required maxlength="40">
              <input type="text" id="revText" placeholder="${t("revText")}" required maxlength="400">
            </div>
            <button class="btn btn--amber" type="submit">${t("revSubmit")}</button>
          </form>
        </div>
      </section>`;

    // карусель
    const track = el.querySelector("[data-track]");
    const slides = all.length;
    const step = () => (window.innerWidth >= 760 ? 2 : 1);
    const go = i => {
      this.index = Math.max(0, Math.min(i, Math.ceil(slides / step()) - 1));
      track.style.transform = `translateX(-${this.index * 100}%)`;
    };
    el.querySelector("[data-prev]").addEventListener("click", () => go(this.index - 1));
    el.querySelector("[data-next]").addEventListener("click", () => go(this.index + 1));
    go(0);

    // форма
    el.querySelector("#revForm").addEventListener("submit", e => {
      e.preventDefault();
      const name = el.querySelector("#revName").value.trim();
      const text = el.querySelector("#revText").value.trim();
      if (!name || !text) return;
      Store.addReview({ name, text, stars: 5 });
      toast(t("revThanks"));
      this.render(el.closest("#app"));
    });

    App.bindCommon(el);
    App.observeReveals(el);
  }
};

/* ---------- FAQ ---------- */
Views.faq = {
  render(el) {
    const t = I18N.t;
    el.innerHTML = `
      <section class="section" style="max-width:820px;margin-inline:auto">
        <div class="section-head reveal">
          <h1>${t("faqTitle")}</h1>
          <p>${t("faqSub")}</p>
        </div>
        <div class="accordion reveal">
          ${window.FAQ.map(f => `
            <div class="accordion__item">
              <button class="accordion__head" aria-expanded="false">
                <span>${I18N.current() === "ru" ? f.q_ru : f.q_en}</span>
                <span class="chev" aria-hidden="true">▾</span>
              </button>
              <div class="accordion__body">
                <div class="accordion__body-inner">${I18N.current() === "ru" ? f.a_ru : f.a_en}</div>
              </div>
            </div>`).join("")}
        </div>
      </section>`;
    App.bindCommon(el);
    App.observeReveals(el);
  }
};
