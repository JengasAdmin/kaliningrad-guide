/* ============================================================
   ВИД: Достопримечательности
   Фильтры, поиск, сортировка, сетка/список/карта, избранное
   ============================================================ */
window.Views = window.Views || {};
Views.attractions = {
  state: { q: "", cat: "all", price: "all", sort: "rating", view: "grid", favOnly: false },
  map: null,
  markers: null,

  render(el) {
    const t = I18N.t;
    const s = this.state;

    el.innerHTML = `
      <section class="section">
        <div class="section-head reveal">
          <h1>${t("attTitle")}</h1>
          <p>${t("attSub")}</p>
          <div style="max-width:420px;margin-top:1rem">
            <p style="margin:0;font-size:.85rem;color:var(--muted)">${t("viewed")}</p>
            <div class="progress" style="margin-top:.4rem"><div class="progress__bar" data-progress></div></div>
            <p style="margin:.3rem 0 0;font-size:.78rem;color:var(--muted)" data-progress-label></p>
          </div>
        </div>

        <div class="filterbar reveal">
          <div class="field">
            <label for="fSearch">${t("searchPh").split("…")[0]}</label>
            <input id="fSearch" type="search" placeholder="${t("searchPh")}" value="${esc(s.q)}">
          </div>
          <div class="field">
            <label for="fCat">${t("filterCategory")}</label>
            <select id="fCat">
              <option value="all">${t("allCategories")}</option>
              ${Object.entries(window.CATEGORIES).map(([id, c]) =>
                `<option value="${id}" ${s.cat === id ? "selected" : ""}>${c.icon} ${I18N.L(c)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="fPrice">${t("filterPrice")}</label>
            <select id="fPrice">
              <option value="all" ${s.price === "all" ? "selected" : ""}>${t("allCategories")}</option>
              <option value="free" ${s.price === "free" ? "selected" : ""}>${t("free")}</option>
              <option value="paid" ${s.price === "paid" ? "selected" : ""}>${t("paid")}</option>
            </select>
          </div>
          <div class="field">
            <label for="fSort">${t("filterSort")}</label>
            <select id="fSort">
              <option value="rating" ${s.sort === "rating" ? "selected" : ""}>${t("sortRating")}</option>
              <option value="priceAsc" ${s.sort === "priceAsc" ? "selected" : ""}>${t("sortPriceAsc")}</option>
              <option value="priceDesc" ${s.sort === "priceDesc" ? "selected" : ""}>${t("sortPriceDesc")}</option>
              <option value="duration" ${s.sort === "duration" ? "selected" : ""}>${t("sortDuration")}</option>
              <option value="distance" ${s.sort === "distance" ? "selected" : ""}>${t("sortDistance")}</option>
            </select>
          </div>
          <div class="field" style="flex-direction:row;align-items:center;gap:1rem;flex-wrap:wrap">
            <div class="view-toggle" role="group" aria-label="View">
              <button data-view="grid" class="${s.view === "grid" ? "active" : ""}">▦ ${t("viewGrid")}</button>
              <button data-view="list" class="${s.view === "list" ? "active" : ""}">☰ ${t("viewList")}</button>
              <button data-view="map" class="${s.view === "map" ? "active" : ""}">🗺 ${t("viewMap")}</button>
            </div>
            <label class="check-item" style="border:0;padding:0;margin:0">
              <input type="checkbox" id="fFav" ${s.favOnly ? "checked" : ""}> ${t("favOnly")}
            </label>
          </div>
        </div>

        <p class="result-count" data-count style="color:var(--muted);font-size:.88rem"></p>
        <div data-results></div>
      </section>`;

    // слушатели фильтров
    el.querySelector("#fSearch").addEventListener("input", e => { s.q = e.target.value; this.renderResults(el); });
    el.querySelector("#fCat").addEventListener("change", e => { s.cat = e.target.value; this.renderResults(el); });
    el.querySelector("#fPrice").addEventListener("change", e => { s.price = e.target.value; this.renderResults(el); });
    el.querySelector("#fSort").addEventListener("change", e => { s.sort = e.target.value; this.renderResults(el); });
    el.querySelector("#fFav").addEventListener("change", e => { s.favOnly = e.target.checked; this.renderResults(el); });
    el.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => {
      s.view = b.dataset.view;
      el.querySelectorAll("[data-view]").forEach(x => x.classList.toggle("active", x === b));
      this.renderResults(el);
    }));

    this.renderResults(el);
    this.bindResults(el.querySelector("[data-results]"));
    // прогресс «изучено мест»
    const viewed = Store.getViewed().length;
    el.querySelector("[data-progress]").style.width =
      Math.round(viewed / window.ATTRACTIONS.length * 100) + "%";
    el.querySelector("[data-progress-label]").textContent =
      t("clDone", { n: viewed, m: window.ATTRACTIONS.length });
    App.bindCommon(el);
    App.observeReveals(el);
  },

  /** отфильтрованный и отсортированный список */
  filtered() {
    const s = this.state;
    const q = s.q.trim().toLowerCase();
    let list = window.ATTRACTIONS.filter(p => {
      if (s.favOnly && !Store.isFav(p.id)) return false;
      if (s.cat !== "all" && p.category !== s.cat) return false;
      if (s.price === "free" && p.price > 0) return false;
      if (s.price === "paid" && p.price === 0) return false;
      if (q) {
        const hay = (p.name.ru + " " + p.name.en + " " + p.desc.ru + " " + p.desc.en).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const sorts = {
      rating: (a, b) => b.rating - a.rating,
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      duration: (a, b) => a.duration - b.duration,
      distance: (a, b) => fromCenterKm(a) - fromCenterKm(b)
    };
    return list.sort(sorts[s.sort]);
  },

  renderResults(el) {
    const t = I18N.t;
    const list = this.filtered();
    const box = el.querySelector("[data-results]");
    el.querySelector("[data-count]").textContent = t("found", { n: list.length });

    if (this.map) { this.map.remove(); this.map = null; }

    if (!list.length) {
      box.innerHTML = `<p class="reveal visible" style="text-align:center;padding:3rem 0;color:var(--muted)">${t("noResults")}</p>`;
      return;
    }

    if (this.state.view === "grid") {
      box.innerHTML = `<div class="place-grid">${list.map(Views.placeCard).join("")}</div>`;
    } else if (this.state.view === "list") {
      box.innerHTML = `<div class="place-list">${list.map(p => this.row(p)).join("")}</div>`;
    } else {
      box.innerHTML = `
        <p style="font-size:.85rem;color:var(--muted)">${t("mapCenterHint")}</p>
        <div class="map" data-map></div>`;
      this.initMap(box.querySelector("[data-map]"), list);
    }

    App.observeReveals(box);
  },

  row(p) {
    const t = I18N.t, L = I18N.L;
    const cat = window.CATEGORIES[p.category];
    const fav = Store.isFav(p.id);
    return `
      <article class="place-row reveal" data-place="${p.id}" tabindex="0" role="button" aria-label="${esc(L(p.name))}">
        <img src="${p.img}" alt="${esc(L(p.name))}" loading="lazy">
        <div>
          <strong>${esc(L(p.name))}</strong>
          <div class="place-row__meta">
            <span>${cat.icon} ${L(cat)}</span>
            <span class="rating">★ ${p.rating}</span>
            <span>${p.price ? fmtRub(p.price) + " " + t("rub") : t("free")}</span>
            <span>≈ ${p.duration} ${t("hoursShort")}</span>
          </div>
        </div>
        <button class="place-card__fav ${fav ? "on" : ""}" style="position:static" data-fav="${p.id}"
          aria-label="${t("addFav")}">${fav ? "★" : "☆"}</button>
      </article>`;
  },

  /* ---------- Leaflet-карта ---------- */
  initMap(container, list) {
    if (typeof L === "undefined") { container.textContent = "Map unavailable (offline)"; return; }
    this.map = L.map(container, { scrollWheelZoom: false }).setView([54.75, 20.51], 9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18, attribution: "© OpenStreetMap"
    }).addTo(this.map);
    this.markers = L.layerGroup().addTo(this.map);

    list.forEach(p => {
      const m = L.marker([p.lat, p.lng]).addTo(this.markers);
      m.bindPopup(`<b>${esc(I18N.L(p.name))}</b><br>
        ${p.price ? fmtRub(p.price) + " ₽" : I18N.t("free")} · ★ ${p.rating}<br>
        <a href="#" data-open="${p.id}">${I18N.current() === "ru" ? "Подробнее" : "Details"}</a>`);
    });
    this.markers.eachLayer(m => m.on("popupopen", e => {
      const link = e.popup.getElement().querySelector("[data-open]");
      link?.addEventListener("click", ev => {
        ev.preventDefault();
        openPlaceModal(link.dataset.open);
      });
    }));

    if (list.length === 1) this.focusOn(list[0]);
  },

  focusOn(p) {
    if (!this.map) return;
    this.map.setView([p.lat, p.lng], 12, { animate: true });
    this.map.scrollWheelZoom.enable();
  },

  /* ---------- события результатов ---------- */
  bindResults(box) {
    box.addEventListener("click", e => {
      const fav = e.target.closest("[data-fav]");
      if (fav) {
        e.stopPropagation();
        const on = Store.toggleFav(fav.dataset.fav);
        fav.classList.toggle("on", on);
        fav.textContent = on ? "★" : "☆";
        if (this.state.favOnly) this.renderResults(box.closest("#app"));
        return;
      }
      const card = e.target.closest("[data-place]");
      if (card) openPlaceModal(card.dataset.place);
    });
    box.addEventListener("keydown", e => {
      if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-place]")) {
        e.preventDefault();
        openPlaceModal(e.target.dataset.place);
      }
    });
  }
};
