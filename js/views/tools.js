/* ============================================================
   ВИД: Инструменты путешественника
   Отсчёт, чек-лист, случайное место, факт дня, погода, прогресс
   ============================================================ */
window.Views = window.Views || {};
Views.tools = {
  cdTimer: null,

  render(el) {
    const t = I18N.t;
    const saved = Store.getChecklist();
    const viewed = Store.getViewed().length;

    el.innerHTML = `
      <section class="section">
        <div class="section-head reveal">
          <h1>${t("toolsTitle")}</h1>
          <p>${t("toolsSub")}</p>
        </div>

        <div class="tools-grid">
          <!-- Отсчёт до поездки -->
          <div class="panel reveal">
            <h3>⏳ ${t("cdTitle")}</h3>
            <div class="form-row">
              <input type="date" id="cdDate" value="${Store.getTripDate()}" aria-label="${t("cdPick")}">
              <button class="btn btn--primary btn--sm" id="cdSet">${t("cdSet")}</button>
            </div>
            <div data-cd-body>
              <p style="text-align:center;color:var(--muted)">${t("cdEmpty")}</p>
            </div>
          </div>

          <!-- Погода (демо) -->
          <div class="panel reveal">
            <h3>🌤 ${t("wxTitle")}</h3>
            <div class="weather">
              <div class="weather__icon" aria-hidden="true">⛅</div>
              <div>
                <div class="weather__temp">+18°C</div>
                <div class="weather__meta">
                  ${t("wxWind")}: 4 м/с, З<br>${t("wxWater")}: +19°C
                </div>
              </div>
            </div>
            <p style="font-size:.75rem;color:var(--muted);margin:.8rem 0 0">* ${t("wxNote")}</p>
          </div>

          <!-- Случайное место -->
          <div class="panel reveal">
            <h3>🎲 ${t("rndTitle")}</h3>
            <div data-rnd-body style="min-height:84px">
              <p style="color:var(--muted);font-size:.9rem">—</p>
            </div>
            <button class="btn btn--amber btn--sm" id="rndBtn">${t("rndBtn")}</button>
          </div>

          <!-- Факт дня -->
          <div class="panel reveal">
            <h3>💡 ${t("factTitle")}</h3>
            <p data-fact style="font-size:.95rem"></p>
            <button class="btn btn--primary btn--sm" id="factBtn">${t("factBtn")}</button>
          </div>

          <!-- Прогресс -->
          <div class="panel reveal">
            <h3>📈 ${t("progTitle")}</h3>
            <div class="progress"><div class="progress__bar" data-progress
              style="width:${Math.round(viewed / window.ATTRACTIONS.length * 100)}%"></div></div>
            <p style="font-size:.8rem;color:var(--muted)" data-progress-label>${t("clDone", { n: viewed, m: window.ATTRACTIONS.length })} — ${t("viewed")}</p>
            <p style="font-size:.8rem;color:var(--muted)">${t("exploreHint")}</p>
          </div>

          <!-- Чек-лист -->
          <div class="panel reveal">
            <h3>🎒 ${t("clTitle")}</h3>
            <p style="font-size:.8rem;color:var(--muted)" data-cl-label></p>
            <div class="checklist" data-checklist>
              ${window.CHECKLIST.map((item, i) => `
                <label class="check-item ${saved.includes(i) ? "done" : ""}">
                  <input type="checkbox" data-cl="${i}" ${saved.includes(i) ? "checked" : ""}>
                  <span aria-hidden="true">${item.icon}</span> ${I18N.current() === "ru" ? item.ru : item.en}
                </label>`).join("")}
            </div>
            <button class="btn btn--ghost btn--sm" id="clReset" style="margin-top:.8rem">${t("clReset")}</button>
          </div>
        </div>
      </section>`;

    this.bind(el);
    if (Store.getTripDate()) this.startCountdown(el);
    this.randomFact(el.querySelector("[data-fact]"));
    App.bindCommon(el);
    App.observeReveals(el);
  },

  bind(el) {
    const t = I18N.t;

    /* отсчёт */
    el.querySelector("#cdSet").addEventListener("click", () => {
      const v = el.querySelector("#cdDate").value;
      if (!v) return;
      Store.setTripDate(v);
      this.startCountdown(el);
    });

    /* случайное место */
    el.querySelector("#rndBtn").addEventListener("click", () => {
      const p = window.ATTRACTIONS[Math.floor(Math.random() * window.ATTRACTIONS.length)];
      el.querySelector("[data-rnd-body]").innerHTML = `
        <b>${esc(I18N.L(p.name))}</b>
        <p style="font-size:.85rem;color:var(--muted);margin:.3rem 0 .6rem">${esc(I18N.L(p.desc)).slice(0, 110)}…</p>
        <button class="btn btn--primary btn--sm" data-open-place="${p.id}">${t("rndGo")}</button>`;
    });

    /* факт дня */
    el.querySelector("#factBtn").addEventListener("click", () => this.randomFact(el.querySelector("[data-fact]")));

    /* чек-лист */
    const updateCl = () => {
      const arr = [...el.querySelectorAll("[data-cl]")].filter(c => c.checked).map(c => +c.dataset.cl);
      Store.setChecklist(arr);
      el.querySelectorAll(".check-item").forEach((l, i) => l.classList.toggle("done", arr.includes(i)));
      el.querySelector("[data-cl-label]").textContent =
        t("clDone", { n: arr.length, m: window.CHECKLIST.length });
    };
    el.querySelector("[data-checklist]").addEventListener("change", updateCl);
    updateCl();
    el.querySelector("#clReset").addEventListener("click", () => {
      Store.setChecklist([]);
      this.render(el.closest("#app"));
    });
  },

  randomFact(target) {
    const f = window.FACTS[Math.floor(Math.random() * window.FACTS.length)];
    target.textContent = I18N.current() === "ru" ? f.ru : f.en;
  },

  startCountdown(el) {
    clearInterval(this.cdTimer);
    const body = el.querySelector("[data-cd-body]");
    const target = new Date(Store.getTripDate() + "T09:00:00").getTime();
    const t = I18N.t;
    if (isNaN(target)) return;

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        body.innerHTML = `<p style="text-align:center;font-weight:800">🎉</p>`;
        clearInterval(this.cdTimer);
        return;
      }
      const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24,
            m = Math.floor(diff / 6e4) % 60, sec = Math.floor(diff / 1e3) % 60;
      const labels = I18N.current() === "ru"
        ? ["дн.", "час.", "мин.", "сек."] : ["days", "hrs", "min", "sec"];
      body.innerHTML = `
        <p style="text-align:center;font-size:.8rem;color:var(--muted)">${t("cdLeft")}</p>
        <div class="countdown">
          <div class="cd-cell"><b>${d}</b><span>${labels[0]}</span></div>
          <div class="cd-cell"><b>${h}</b><span>${labels[1]}</span></div>
          <div class="cd-cell"><b>${m}</b><span>${labels[2]}</span></div>
          <div class="cd-cell"><b>${sec}</b><span>${labels[3]}</span></div>
        </div>`;
    };
    tick();
    this.cdTimer = setInterval(tick, 1000);
  }
};
