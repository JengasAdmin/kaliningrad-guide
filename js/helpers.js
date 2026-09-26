/* ============================================================
   Хелперы: DOM, карта, форматирование, модалки, тосты
   ============================================================ */

/** esc — безопасная вставка пользовательского текста */
function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function fmtRub(n) {
  return new Intl.NumberFormat(I18N.current() === "ru" ? "ru-RU" : "en-US",
    { maximumFractionDigits: 0 }).format(Math.round(n));
}

/** расстояние между координатами, км (гаверсинус) */
function distKm(lat1, lng1, lat2, lng2) {
  const R = 6371, rad = d => d * Math.PI / 180;
  const dLat = rad(lat2 - lat1), dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const CITY_CENTER = { lat: 54.7104, lng: 20.4522 };

function fromCenterKm(p) {
  return distKm(CITY_CENTER.lat, CITY_CENTER.lng, p.lat, p.lng);
}

/* ---------- Тост ---------- */
let toastTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- Модальное окно ---------- */
const Modal = {
  open(html) {
    const m = document.getElementById("modal");
    document.getElementById("modalContent").innerHTML = html;
    m.hidden = false;
    document.body.style.overflow = "hidden";
  },
  close() {
    document.getElementById("modal").hidden = true;
    document.body.style.overflow = "";
  }
};
document.addEventListener("click", e => {
  if (e.target.closest("[data-modal-close]")) Modal.close();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") Modal.close();
});

/* ---------- Аккордеон (делегирование) ---------- */
document.addEventListener("click", e => {
  const head = e.target.closest(".accordion__head");
  if (!head) return;
  const item = head.parentElement;
  const body = item.querySelector(".accordion__body");
  const open = item.classList.toggle("open");
  body.style.maxHeight = open ? body.scrollHeight + "px" : "0";
  head.setAttribute("aria-expanded", open);
});

/* ---------- Карточка места (модалка с деталями) ---------- */
function openPlaceModal(id) {
  const p = window.ATTRACTIONS.find(a => a.id === id);
  if (!p) return;
  const viewed = Store.markViewed(id);
  const isFav = Store.isFav(id);
  const inRoute = Store.getRoutePicks().includes(id);
  const cat = window.CATEGORIES[p.category];

  Modal.open(`
    <img class="place-photo" src="${p.img}" alt="${esc(I18N.L(p.name))}" loading="lazy">
    <div class="pad">
      <span class="place-card__cat">${cat.icon} ${esc(I18N.L(cat))}</span>
      <h2 id="modalTitle" style="margin-top:.3em">${esc(I18N.L(p.name))}</h2>
      <p>${esc(I18N.L(p.desc))}</p>
      <dl>
        <dt>${I18N.t("address")}</dt><dd>${esc(I18N.L(p.address))}</dd>
        <dt>${I18N.t("hours")}</dt><dd>${esc(I18N.L(p.hours))}</dd>
        <dt>${I18N.t("ticket")}</dt><dd>${p.price ? fmtRub(p.price) + " ₽" : I18N.t("free")}</dd>
        <dt>${I18N.t("duration")}</dt><dd>≈ ${p.duration} ${I18N.t("hoursShort")}</dd>
        <dt>GPS</dt><dd>${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}</dd>
      </dl>
      <div class="modal__actions">
        <button class="btn btn--amber btn--sm" data-fav-btn="${p.id}">${isFav ? "★ " + I18N.t("inFav") : "☆ " + I18N.t("addFav")}</button>
        <button class="btn btn--primary btn--sm" data-route-btn="${p.id}">${inRoute ? "✓ " + I18N.t("toRoute") : "+ " + I18N.t("toRoute")}</button>
      </div>
    </div>`);

  // слушатели действий внутри модалки
  document.querySelector("#modal [data-fav-btn]")?.addEventListener("click", ev => {
    const on = Store.toggleFav(p.id);
    ev.currentTarget.textContent = on ? "★ " + I18N.t("inFav") : "☆ " + I18N.t("addFav");
    document.querySelectorAll(`[data-fav="${p.id}"]`).forEach(b => {
      b.classList.toggle("on", on);
      b.textContent = on ? "★" : "☆";
    });
    toast(on ? I18N.t("inFav") : I18N.t("addFav"));
  });
  document.querySelector("#modal [data-route-btn]")?.addEventListener("click", ev => {
    const picks = Store.getRoutePicks();
    const i = picks.indexOf(p.id);
    if (i === -1) picks.push(p.id); else picks.splice(i, 1);
    Store.setRoutePicks(picks);
    ev.currentTarget.innerHTML = i === -1 ? "✓ " + I18N.t("toRoute") : "+ " + I18N.t("toRoute");
    toast(i === -1 ? I18N.t("toRoute") : I18N.t("routeClear"));
  });

  // обновить прогресс-бары, если они на странице
  document.querySelectorAll("[data-progress]").forEach(bar => {
    bar.style.width = Math.round(viewed / window.ATTRACTIONS.length * 100) + "%";
  });
  document.querySelectorAll("[data-progress-label]").forEach(l => {
    l.textContent = I18N.t("clDone", { n: viewed, m: window.ATTRACTIONS.length });
  });
}
