/* ============================================================
   ВИД: Планировщик бюджета
   Калькулятор + диаграммы (Chart.js) + сравнение со средним
   ============================================================ */
window.Views = window.Views || {};
Views.budget = {
  charts: [],
  state: null,

  defaults() {
    return { days: 5, people: 2, cls: "comfort", style: "active", extra: 12,
      fixed: { flights: 12000, museums: 5000, souvenirs: 4000, insurance: 1500 },
      daily: null }; // daily перезаписывается из класса
  },

  classDaily(cls) {
    const c = window.BUDGET_CLASSES[cls];
    return { lodging: c.lodging, food: c.food, local: c.transportLocal, ent: c.entertainment };
  },

  render(el) {
    const t = I18N.t;
    const saved = Store.getBudget();
    this.state = saved ? { ...this.defaults(), ...saved } : this.defaults();
    if (!this.state.daily) this.state.daily = this.classDaily(this.state.cls);
    const s = this.state;

    el.innerHTML = `
      <section class="section">
        <div class="section-head reveal">
          <h1>${t("budTitle")}</h1>
          <p>${t("budSub")}</p>
        </div>

        <div class="budget-layout">
          <div class="panel reveal">
            <h3>🎛 ${t("budClass")}</h3>
            <div class="form-row" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));margin-bottom:1rem">
              <div class="field"><label for="bDays">${t("budDays")}</label>
                <input type="number" id="bDays" min="1" max="30" value="${s.days}"></div>
              <div class="field"><label for="bPeople">${t("budPeople")}</label>
                <input type="number" id="bPeople" min="1" max="12" value="${s.people}"></div>
              <div class="field"><label for="bClass">${t("budClass")}</label>
                <select id="bClass">${Object.entries(window.BUDGET_CLASSES).map(([id, c]) =>
                  `<option value="${id}" ${s.cls === id ? "selected" : ""}>${I18N.L(c.label)}</option>`).join("")}</select></div>
              <div class="field"><label for="bStyle">${t("budStyle")}</label>
                <select id="bStyle">${Object.entries(window.BUDGET_STYLES).map(([id, st]) =>
                  `<option value="${id}" ${s.style === id ? "selected" : ""}>${I18N.L(st.label)}</option>`).join("")}</select></div>
            </div>

            <h3>🧮 ${t("budLodging").split(",")[0]} · ${t("budFood").split(",")[0]}</h3>
            <div class="slider-row"><div class="field-row"><span>🏨 ${t("budLodging")}</span><input type="number" data-daily="lodging" value="${s.daily.lodging}"></div>
              <input type="range" data-daily="lodging" min="0" max="30000" step="100" value="${s.daily.lodging}" aria-label="${t("budLodging")}"></div>
            <div class="slider-row"><div class="field-row"><span>🍽 ${t("budFood")}</span><input type="number" data-daily="food" value="${s.daily.food}"></div>
              <input type="range" data-daily="food" min="0" max="15000" step="100" value="${s.daily.food}" aria-label="${t("budFood")}"></div>
            <div class="slider-row"><div class="field-row"><span>🚌 ${t("budLocal")}</span><input type="number" data-daily="local" value="${s.daily.local}"></div>
              <input type="range" data-daily="local" min="0" max="5000" step="50" value="${s.daily.local}" aria-label="${t("budLocal")}"></div>
            <div class="slider-row"><div class="field-row"><span>🎟 ${t("budEnt")}</span><input type="number" data-daily="ent" value="${s.daily.ent}"></div>
              <input type="range" data-daily="ent" min="0" max="10000" step="100" value="${s.daily.ent}" aria-label="${t("budEnt")}"></div>

            <h3 style="margin-top:1.4em">🧾 ${t("budFixed")}</h3>
            ${Object.entries(window.BUDGET_FIXED).map(([id, f]) => `
              <div class="slider-row"><div class="field-row"><span>${I18N.current() === "ru" ? f.ru : f.en}</span>
                <input type="number" data-fixed="${id}" value="${s.fixed[id]}"></div></div>`).join("")}

            <div class="slider-row"><div class="field-row">
              <span>${t("budExtra")} — ${t("budExtraHint")}</span><b data-extra-label>${s.extra}%</b></div>
              <input type="range" id="bExtra" min="0" max="25" value="${s.extra}" aria-label="${t("budExtra")}"></div>

            <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem">
              <button class="btn btn--amber btn--sm" id="bSave">${t("budSave")}</button>
              <button class="btn btn--ghost btn--sm" id="bReset">${t("budReset")}</button>
            </div>
          </div>

          <div class="reveal">
            <div class="total-card">
              <div style="font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;opacity:.7">${t("budTotal")}</div>
              <div class="total-card__num" data-total>— ₽</div>
              <div class="total-card__sub" data-total-sub></div>
            </div>
            <div class="compare panel" style="margin-top:1rem">
              <div style="text-align:center">
                <div style="font-size:.8rem;color:var(--muted)">${t("budCompareYou")}</div>
                <b data-cmp-you>—</b>
                <div class="compare__bar" style="margin-top:.4rem"><div class="compare__fill" data-cmp-bar style="width:50%"></div></div>
              </div>
              <span class="compare__vs">vs</span>
              <div style="text-align:center">
                <div style="font-size:.8rem;color:var(--muted)">${t("budCompareAvg")}</div>
                <b>${fmtRub(window.AVG_TOURIST_PER_DAY)} ₽</b>
                <div class="compare__bar" style="margin-top:.4rem"><div class="compare__fill" style="width:65%;opacity:.45"></div></div>
              </div>
              <p data-cmp-note style="grid-column:1/-1;text-align:center;margin:0;font-weight:700"></p>
            </div>
          </div>
        </div>

        <div class="charts" style="margin-top:1.5rem">
          <div class="chart-box reveal"><canvas data-chart="cat" aria-label="${t("chartByCat")}"></canvas></div>
          <div class="chart-box reveal"><canvas data-chart="day" aria-label="${t("chartByDay")}"></canvas></div>
        </div>
      </section>`;

    this.charts.forEach(c => c.destroy());
    this.charts = [];
    this.bind(el);
    this.recalc(el);
    App.bindCommon(el);
    App.observeReveals(el);
  },

  bind(el) {
    const s = this.state;
    const recalc = () => this.recalc(el);

    el.querySelector("#bDays").addEventListener("input", e => { s.days = +e.target.value || 1; recalc(); });
    el.querySelector("#bPeople").addEventListener("input", e => { s.people = +e.target.value || 1; recalc(); });
    el.querySelector("#bClass").addEventListener("change", e => {
      s.cls = e.target.value;
      s.daily = this.classDaily(s.cls); // применить пресет класса
      this.syncInputs(el); recalc();
    });
    el.querySelector("#bStyle").addEventListener("change", e => { s.style = e.target.value; recalc(); });
    el.querySelectorAll("[data-daily]").forEach(inp => inp.addEventListener("input", () => {
      s.daily[inp.dataset.daily] = +inp.value || 0;
      el.querySelectorAll(`[data-daily="${inp.dataset.daily}"]`).forEach(x => { if (x !== inp) x.value = inp.value; });
      recalc();
    }));
    el.querySelectorAll("[data-fixed]").forEach(inp => inp.addEventListener("input", () => {
      s.fixed[inp.dataset.fixed] = +inp.value || 0; recalc();
    }));
    el.querySelector("#bExtra").addEventListener("input", e => {
      s.extra = +e.target.value;
      el.querySelector("[data-extra-label]").textContent = s.extra + "%";
      recalc();
    });
    el.querySelector("#bSave").addEventListener("click", () => {
      Store.saveBudget(s);
      toast(I18N.t("budSaved"));
    });
    el.querySelector("#bReset").addEventListener("click", () => {
      localStorage.removeItem("kg_budget");
      this.render(el);
    });
  },

  syncInputs(el) {
    const s = this.state;
    el.querySelectorAll("[data-daily]").forEach(x => x.value = s.daily[x.dataset.daily]);
  },

  calc() {
    const s = this.state;
    const mult = window.BUDGET_STYLES[s.style].mult;
    const dailyAll = {
      lodging: s.daily.lodging * s.days,
      food: s.daily.food * s.days,
      local: s.daily.local * s.days,
      ent: s.daily.ent * mult * s.days
    };
    const perPerson = { ...dailyAll, ...s.fixed };
    const peopleSum = Object.values(perPerson).reduce((a, b) => a + b, 0) * s.people;
    const extraSum = peopleSum * (s.extra / 100);
    const total = peopleSum + extraSum;
    return { dailyAll, perPerson, total, extraSum,
      perPersonPerDay: total / s.people / s.days };
  },

  recalc(el) {
    const t = I18N.t;
    const s = this.state;
    const { perPerson, total, perPersonPerDay, dailyAll } = this.calc();

    el.querySelector("[data-total]").textContent = fmtRub(total) + " ₽";
    el.querySelector("[data-total-sub]").textContent =
      fmtRub(total / s.people) + " ₽ " + t("budPerPerson") + " · " +
      fmtRub(total / s.days) + " ₽ " + t("budPerDay");

    // сравнение со средним
    const avg = window.AVG_TOURIST_PER_DAY;
    el.querySelector("[data-cmp-you]").textContent = fmtRub(perPersonPerDay) + " ₽";
    el.querySelector("[data-cmp-bar]").style.width =
      Math.min(100, perPersonPerDay / avg * 65) + "%";
    el.querySelector("[data-cmp-note]").textContent =
      perPersonPerDay <= avg ? t("budBelowAvg") : t("budAboveAvg");

    this.drawCatChart(el, perPerson, dailyAll, total);
    this.drawDayChart(el);
  },

  drawCatChart(el, perPerson, dailyAll, total) {
    const t = I18N.t, s = this.state;
    const people = s.people;
    const cat = window.BUDGET_CLASSES[s.cls];
    const labels = [
      (I18N.current() === "ru" ? cat.lodgingName.ru : cat.lodgingName.en),
      (I18N.current() === "ru" ? cat.foodName.ru : cat.foodName.en),
      t("budLocal").split(",")[0],
      t("budEnt").split(",")[0],
      ...Object.values(window.BUDGET_FIXED).map(f => I18N.current() === "ru" ? f.ru : f.en),
      t("budExtra")
    ];
    const values = [
      dailyAll.lodging * people, dailyAll.food * people,
      dailyAll.local * people, dailyAll.ent * people,
      ...Object.values(s.fixed).map(v => v * people),
      total - Object.values(perPerson).reduce((a, b) => a + b, 0) * people
    ];
    const colors = ["#0e4a5c", "#2f8fa3", "#7fc4cf", "#e8a020", "#f3c96b", "#c9820a", "#8a6d3b", "#d5682e", "#5d707d"];

    const canvas = el.querySelector('[data-chart="cat"]');
    if (this.charts[0]) this.charts[0].destroy();
    this.charts[0] = new Chart(canvas, {
      type: "doughnut",
      data: { labels, datasets: [{ data: values, backgroundColor: colors, borderWidth: 0 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: t("chartByCat"), color: getComputedStyle(document.body).color },
          legend: { position: "right", labels: { boxWidth: 12, color: getComputedStyle(document.body).color } }
        }
      }
    });
  },

  drawDayChart(el) {
    const t = I18N.t, s = this.state;
    const mult = window.BUDGET_STYLES[s.style].mult;
    const perDay = [];
    for (let d = 1; d <= s.days; d++) {
      perDay.push((s.daily.lodging + s.daily.food + s.daily.local + s.daily.ent * mult) * s.people);
    }
    const canvas = el.querySelector('[data-chart="day"]');
    if (this.charts[1]) this.charts[1].destroy();
    this.charts[1] = new Chart(canvas, {
      type: "bar",
      data: {
        labels: perDay.map((_, i) => (I18N.current() === "ru" ? "День " : "Day ") + (i + 1)),
        datasets: [{ data: perDay, backgroundColor: "#e8a020", borderRadius: 6 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: t("chartByDay"), color: getComputedStyle(document.body).color },
          legend: { display: false }
        },
        scales: {
          y: { ticks: { color: getComputedStyle(document.body).color, callback: v => (v / 1000) + "k" }, grid: { color: "rgba(128,128,128,.15)" } },
          x: { ticks: { color: getComputedStyle(document.body).color }, grid: { display: false } }
        }
      }
    });
  }
};
