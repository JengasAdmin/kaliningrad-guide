/* ============================================================
   Хранилище: обёртка над localStorage (избранное, прогресс,
   маршрут, чек-лист, отзывы, бюджет, тема, язык, дата поездки)
   ============================================================ */
const Store = (() => {
  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  };
  const write = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  /* --- избранное --- */
  const getFav = () => read("kg_favorites", []);
  const isFav = id => getFav().includes(id);
  const toggleFav = id => {
    const fav = getFav();
    const i = fav.indexOf(id);
    i === -1 ? fav.push(id) : fav.splice(i, 1);
    write("kg_favorites", fav);
    return i === -1;
  };

  /* --- изученные места (прогресс) --- */
  const getViewed = () => read("kg_viewed", []);
  const markViewed = id => {
    const v = getViewed();
    if (!v.includes(id)) { v.push(id); write("kg_viewed", v); }
    return v.length;
  };

  /* --- маршрут --- */
  const getRoute = () => read("kg_route", null);
  const saveRoute = r => write("kg_route", r);
  const clearRoute = () => localStorage.removeItem("kg_route");

  /* --- выбранные для маршрута места --- */
  const getRoutePicks = () => read("kg_route_picks", []);
  const setRoutePicks = ids => write("kg_route_picks", ids);

  /* --- чек-лист --- */
  const getChecklist = () => read("kg_checklist", []);
  const setChecklist = arr => write("kg_checklist", arr);

  /* --- отзывы пользователей --- */
  const getReviews = () => read("kg_reviews", []);
  const addReview = r => write("kg_reviews", [r, ...getReviews()]);

  /* --- бюджет --- */
  const getBudget = () => read("kg_budget", null);
  const saveBudget = b => write("kg_budget", b);

  /* --- дата поездки (таймер) --- */
  const getTripDate = () => localStorage.getItem("kg_trip_date") || "";
  const setTripDate = d => localStorage.setItem("kg_trip_date", d);

  /* --- тема --- */
  const getTheme = () => localStorage.getItem("kg_theme") || "light";
  const setTheme = th => { localStorage.setItem("kg_theme", th); };

  return {
    getFav, isFav, toggleFav,
    getViewed, markViewed,
    getRoute, saveRoute, clearRoute,
    getRoutePicks, setRoutePicks,
    getChecklist, setChecklist,
    getReviews, addReview,
    getBudget, saveBudget,
    getTripDate, setTripDate,
    getTheme, setTheme
  };
})();
