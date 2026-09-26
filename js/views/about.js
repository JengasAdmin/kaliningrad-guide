/* ============================================================
   ВИД: О городе (история, таймлайн, транспорт, гастро, советы)
   ============================================================ */
window.Views = window.Views || {};
Views.about = {
  render(el) {
    const t = I18N.t;

    el.innerHTML = `
      <section class="section">
        <div class="section-head reveal">
          <h1>${t("aboutTitle")}</h1>
          <p>${t("aboutSub")}</p>
        </div>

        <div class="budget-layout">
          <div class="reveal">
            <h2>${t("storyTitle")}</h2>
            <p>${t("story1")}</p>
            <p>${t("story2")}</p>
            <p>${t("story3")}</p>
            <h2 style="margin-top:1.5em">${t("geoTitle")}</h2>
            <p>${t("geoText")}</p>
          </div>
          <div class="reveal">
            <h2>${t("timelineTitle")}</h2>
            <ul class="timeline">
              ${window.TIMELINE.map(ev => `
                <li><span class="year">${ev.year}</span><br>${I18N.current() === "ru" ? ev.ru : ev.en}</li>`).join("")}
            </ul>
          </div>
        </div>
      </section>

      <section class="section section--tint">
        <div class="section-head reveal"><h2>${t("transportTitle")}</h2></div>
        <div class="tile-grid">
          ${window.TRANSPORT.map(tr => `
            <div class="tile reveal">
              <div class="tile__icon" aria-hidden="true">${tr.icon}</div>
              <h3>${I18N.current() === "ru" ? tr.ru : tr.en}</h3>
              <p>${I18N.current() === "ru" ? tr.d_ru : tr.d_en}</p>
            </div>`).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head reveal"><h2>${t("gastroTitle")}</h2></div>
        <div class="tile-grid">
          ${window.GASTRO.map(g => `
            <div class="tile reveal">
              <div class="tile__icon" aria-hidden="true">${g.icon}</div>
              <h3>${I18N.current() === "ru" ? g.ru : g.en}</h3>
              <p>${I18N.current() === "ru" ? g.d_ru : g.d_en}</p>
            </div>`).join("")}
        </div>
      </section>

      <section class="section section--tint">
        <div class="section-head reveal"><h2>${t("tipsTitle")}</h2></div>
        <div class="tile-grid">
          ${window.TIPS.map(tip => `
            <div class="tile reveal">
              <div class="tile__icon" aria-hidden="true">${tip.icon}</div>
              <h3>${I18N.current() === "ru" ? tip.ru : tip.en}</h3>
              <p>${I18N.current() === "ru" ? tip.d_ru : tip.d_en}</p>
            </div>`).join("")}
        </div>
      </section>`;

    App.bindCommon(el);
    App.observeReveals(el);
  }
};
