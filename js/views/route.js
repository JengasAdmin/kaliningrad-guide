/* ============================================================
   ВИД: Конструктор маршрута
   Выбор мест → оптимизация по дням → карта → drag-and-drop
   ============================================================ */
window.Views = window.Views || {};
Views.route = {
  map: null, line: null,
  MAX_HOURS: 9,    // насыщенность дня с переездами
  SPEED: 45,       // средняя скорость между точками, км/ч

  render(el) {
    const t = I18N.t;
    const picks = Store.getRoutePicks().filter(id => window.ATTRACTIONS.some(a => a.id === id));

    el.innerHTML = `
      <section class="section">
        <div class="section-head reveal">
          <h1>${t("routeTitle")}</h1>
          <p>${t("routeSub")}</p>
        </div>
        <div class="route-layout">
          <div class="reveal">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem;margin-bottom:.7rem;flex-wrap:wrap">
              <b data-count>${t("routeSelected", { n: picks.length })}</b>
              <div style="display:flex;gap:.4rem;flex-wrap:wrap">
                <button class="btn btn--ghost btn--sm" id="rFromFav">${t("routeFromFav")}</button>
                <button class="btn btn--ghost btn--sm" id="rClear">${t("routeClear")}</button>
              </div>
            </div>
            <div class="route-pick-list">
              ${window.ATTRACTIONS.map(p => {
                const name = (I18N.current() === "ru" ? p.name.ru : p.name.en);
                const on = picks.includes(p.id);
                return `<label class="route-pick ${on ? "on" : ""}" data-pick="${p.id}">
                  <input type="checkbox" ${on ? "checked" : ""} aria-label="${esc(name)}">
                  <span>${esc(name)}</span>
                  <span class="dur">≈ ${p.duration} ${t("hoursShort")}</span>
                </label>`;
              }).join("")}
            </div>
            <button class="btn btn--amber" id="rBuild" style="width:100%;margin-top:1rem">${t("routeBuild")}</button>
          </div>
          <div class="reveal">
            <div data-plan></div>
            <div class="map map--route" data-map style="margin-top:1rem"></div>
            <div style="display:flex;gap:.6rem;margin-top:1rem;flex-wrap:wrap">
              <button class="btn btn--primary btn--sm" id="rSave">${t("routeSave")}</button>
              <button class="btn btn--ghost btn--sm" id="rPrint">${t("routePrint")}</button>
            </div>
          </div>
        </div>
      </section>`;

    this.plan = Store.getRoute() || [];
    this.bind(el);
    this.renderPlan(el);
    App.bindCommon(el);
    App.observeReveals(el);
  },

  bind(el) {
    el.querySelector(".route-pick-list").addEventListener("change", e => {
      const label = e.target.closest("[data-pick]");
      if (!label) return;
      const id = label.dataset.pick;
      const picks = Store.getRoutePicks();
      const i = picks.indexOf(id);
      if (i === -1) picks.push(id); else picks.splice(i, 1);
      Store.setRoutePicks(picks);
      label.classList.toggle("on", i === -1);
      el.querySelector("[data-count]").textContent =
        I18N.t("routeSelected", { n: picks.length });
    });
    el.querySelector("#rFromFav").addEventListener("click", () => {
      const picks = new Set(Store.getRoutePicks());
      Store.getFav().forEach(id => picks.add(id));
      Store.setRoutePicks([...picks]);
      this.render(el.closest("#app"));
    });
    el.querySelector("#rClear").addEventListener("click", () => {
      Store.setRoutePicks([]); Store.clearRoute(); this.plan = [];
      this.render(el.closest("#app"));
    });
    el.querySelector("#rBuild").addEventListener("click", () => {
      const picks = Store.getRoutePicks();
      if (!picks.length) { toast(I18N.t("routeEmpty")); return; }
      this.plan = this.optimize(picks);
      this.renderPlan(el);
    });
    el.querySelector("#rSave").addEventListener("click", () => {
      Store.saveRoute(this.plan);
      toast(I18N.t("routeSaved"));
    });
    el.querySelector("#rPrint").addEventListener("click", () => window.print());
  },

  /** Жадная оптимизация: от центра к ближайшему (nearest neighbour) */
  optimize(ids) {
    const items = ids.map(id => window.ATTRACTIONS.find(a => a.id === id));
    const days = [];
    let day = [], cur = CITY_CENTER, left = this.MAX_HOURS;
    // сортируем по удалённости: дальние области — в первые дни, город — в конец
    const queue = items.slice().sort((a, b) => fromCenterKm(b) - fromCenterKm(a));
    while (queue.length) {
      // ближайший к текущей точке
      let bi = 0;
      for (let i = 1; i < queue.length; i++) {
        const da = distKm(cur.lat, cur.lng, queue[i].lat, queue[i].lng);
        const db = distKm(cur.lat, cur.lng, queue[bi].lat, queue[bi].lng);
        if (da < db) bi = i;
      }
      const next = queue[bi];
      const travelH = distKm(cur.lat, cur.lng, next.lat, next.lng) / this.SPEED;
      if (day.length && left - next.duration - travelH < 0) {
        days.push(day); day = []; left = this.MAX_HOURS; cur = CITY_CENTER;
        continue; // не берём next из очереди — начнём новый день с ближайшего
      }
      day.push(next); left -= next.duration + travelH;
      cur = next; queue.splice(bi, 1);
    }
    if (day.length) days.push(day);
    return days;
  },

  renderPlan(el) {
    const t = I18N.t;
    const box = el.querySelector("[data-plan]");
    const mapEl = el.querySelector("[data-map]");
    if (typeof L !== "undefined" && this.map) { this.map.remove(); this.map = null; }

    if (!this.plan.length) {
      box.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem 0">${t("routeEmpty")}</p>`;
      return;
    }

    let allKm = 0;
    box.innerHTML = this.plan.map((stops, di) => {
      let prev = CITY_CENTER; // каждый день начинается от центра города
      return `
        <div class="route-day" data-day="${di}">
          <h3><span class="badge">${t("routeDay", { n: di + 1 })}</span></h3>
          <p style="font-size:.78rem;color:var(--muted)">${t("routeDragHint")}</p>
          ${stops.map((p, si) => {
            const km = distKm(prev.lat, prev.lng, p.lat, p.lng);
            allKm += km;
            prev = p;
            const mins = Math.round(km / this.SPEED * 60);
            return `${si > 0 && mins > 10 ? `<div class="route-transfer">🚗 ${t("routeTravel", { n: mins })}</div>` : ""}
              <div class="route-stop" draggable="true" data-day="${di}" data-idx="${si}">
                <span class="num">${si + 1}</span>
                <span>${esc(I18N.L(p.name))}</span>
                <span class="dur">≈ ${p.duration} ${t("hoursShort")}</span>
              </div>`;
          }).join("")}
        </div>`;
    }).join("") + `<p style="font-weight:700">${t("routeTotalDist", { n: Math.round(allKm) })}</p>`;

    this.initMap(mapEl, this.plan);
    this.bindDrag(box);
  },

  initMap(container, plan) {
    if (typeof L === "undefined") return;
    this.map = L.map(container, { scrollWheelZoom: false }).setView([54.75, 20.51], 9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18, attribution: "© OpenStreetMap"
    }).addTo(this.map);

    const pts = [];
    if (plan.length) pts.push([CITY_CENTER.lat, CITY_CENTER.lng]);
    plan.forEach(day => day.forEach(p => pts.push([p.lat, p.lng])));

    if (pts.length > 1) {
      L.polyline(pts, { color: "#e8a020", weight: 3, dashArray: "8 8", opacity: .9 }).addTo(this.map);
    }
    plan.flat().forEach(p => {
      L.marker([p.lat, p.lng]).addTo(this.map)
        .bindPopup(`<b>${esc(I18N.L(p.name))}</b>`);
    });
    if (pts.length > 1) this.map.fitBounds(L.latLngBounds(pts).pad(.15));
  },

  bindDrag(box) {
    let dragged = null;
    box.querySelectorAll(".route-stop").forEach(stop => {
      stop.addEventListener("dragstart", () => { dragged = stop; stop.classList.add("dragging"); });
      stop.addEventListener("dragend", () => { stop.classList.remove("dragging"); dragged = null; });
      stop.addEventListener("dragover", e => {
        e.preventDefault();
        const target = e.currentTarget;
        if (dragged && dragged !== target && dragged.dataset.day === target.dataset.day) {
          const parent = target.parentElement;
          const rect = target.getBoundingClientRect();
          const after = e.clientY > rect.top + rect.height / 2;
          parent.insertBefore(dragged, after ? target.nextSibling : target);
        }
      });
      stop.addEventListener("drop", e => { e.preventDefault(); this.syncOrder(box); });
    });
    // на случай drop вне элемента
    box.addEventListener("drop", () => this.syncOrder(box));
  },

  /** после перетаскивания — пересобрать this.plan из DOM */
  syncOrder(box) {
    box.querySelectorAll(".route-day").forEach((dayEl, di) => {
      if (!this.plan[di]) return;
      const names = [...dayEl.querySelectorAll(".route-stop span:nth-child(2)")].map(s => s.textContent);
      this.plan[di] = names.map(n =>
        window.ATTRACTIONS.find(a => I18N.L(a.name) === n || a.name.ru === n || a.name.en === n)
      ).filter(Boolean);
    });
    Store.saveRoute(this.plan);
  }
};
