/* ============================================================
   ДАННЫЕ: информация о городе, факты, FAQ, отзывы, чек-лист,
   конфигурация калькулятора бюджета
   ============================================================ */

/* Живая статистика на главной */
window.CITY_STATS = [
  { id: "sights",  value: 33,   suffix: "+",  ru: "достопримечательностей",  en: "attractions" },
  { id: "temp",    value: 8.2,  suffix: "°C", ru: "средняя температура года", en: "average yearly temp" },
  { id: "baltic",  value: 39,   suffix: " км", ru: "до Балтийского моря",     en: "to the Baltic Sea" },
  { id: "founded", value: 1255, suffix: "",   ru: "год основания",           en: "year founded" }
];

/* Таймлайн истории */
window.TIMELINE = [
  { year: "1255", ru: "Тевтонский орден основывает крепость Кёнигсберг на месте прусского поселения Тувангсте.", en: "The Teutonic Order founds the Königsberg fortress on the site of the Prussian settlement Twangste." },
  { year: "1340", ru: "Кёнигсберг вступает в Ганзейский союз и становится крупным торговым портом Балтики.", en: "Königsberg joins the Hanseatic League, becoming a major Baltic trading port." },
  { year: "1544", ru: "Герцог Альберт основывает Кёнигсбергский университет «Альбертина».", en: "Duke Albert founds the University of Königsberg, the 'Albertina'." },
  { year: "1701", ru: "В Кёнигсберге коронуется первый король Пруссии Фридрих I.", en: "Frederick I, the first King of Prussia, is crowned in Königsberg." },
  { year: "1724", ru: "Рождение Иммануила Канта — величайшего уроженца города.", en: "Birth of Immanuel Kant — the city's greatest native son." },
  { year: "1845", ru: "Начало строительства укреплений: башни Дона, Врангеля и городские ворота.", en: "Fortification works begin: the Dohna and Wrangel towers and the city gates." },
  { year: "1945", ru: "Штурм Кёнигсберга; город переходит к СССР и в 1946-м переименован в Калининград.", en: "The storming of Königsberg; the city passes to the USSR and is renamed Kaliningrad in 1946." },
  { year: "1967", ru: "Начало строительства Дома Советов — «закопанного робота».", en: "Construction of the House of Soviets — the 'buried robot' — begins." },
  { year: "2018", ru: "Калининград — город-хозяин матчей чемпионата мира по футболу.", en: "Kaliningrad hosts matches of the FIFA World Cup." },
  { year: "2024", ru: "Демонтаж Дома Советов; открыт Музей изящных искусств.", en: "The House of Soviets is demolished; the Museum of Fine Arts opens." }
];

/* Факты о городе */
window.FACTS = [
  { ru: "Кёнигсберг исторически делится на три города: Альтштадт, Лёбенихт и Кнайпхоф. Знаменитая задача о семи кёнигсбергских мостах, решённая Эйлером, родила теорию графов.", en: "Königsberg historically consisted of three towns: Altstadt, Löbenicht and Kneiphof. Euler's famous Seven Bridges problem, solved here, gave birth to graph theory." },
  { ru: "В Калининграде добывают около 90% мировых запасов янтаря.", en: "About 90% of the world's amber reserves are extracted in the Kaliningrad region." },
  { ru: "Здесь находится самый западный город России — Балтийск, а также единственный районный музей с коллекцией шлемов XVIII века.", en: "It is home to Russia's westernmost city, Baltiysk, and a unique collection of 18th-century helmets." },
  { ru: "Кант похоронен у стен Кафедрального собора, и его могила осталась нетронутой даже во время штурма 1945 года.", en: "Kant is buried by the walls of the Cathedral, and his tomb remained untouched even during the 1945 assault." },
  { ru: "Калининградский зоопарк старше Московского: он основан в 1896 году как Кёнигсбергский.", en: "The Kaliningrad Zoo is older than the Moscow Zoo: it was founded in 1896 as the Königsberg Zoo." },
  { ru: "Готические кирхи области оказались настолько прочными, что их передавали кинотеатрам, домам культуры и даже ангару для ракет.", en: "The region's Gothic churches proved so sturdy that they were converted into cinemas, cultural centres and even a rocket hangar." },
  { ru: "Калининградская область — самый маленький субъект РФ по площади после города федерального значения Севастополя.", en: "The Kaliningrad region is the smallest federal subject of Russia by area after the federal city of Sevastopol." },
  { ru: "Балтийская коса и Куршская коса — две песчаные стрелы, на которых растут сосны, посаженные руками школьников ещё в XIX веке.", en: "The Baltic and Curonian spits are two sandy arrows where pines planted by schoolchildren in the 19th century still grow." },
  { ru: "Слово «марципан» пришло в Европу из Кёнигсберга: местные кондитеры спорят с Любеком за право называться его родиной.", en: "The word 'marzipan' entered Europe via Königsberg: local confectioners rival Lübeck for the title of its birthplace." },
  { ru: "На Куршской косе более 340 км туристических троп, а сезон птичьего перелёта приносит сюда до 2 миллионов птиц в год.", en: "The Curonian Spit has over 340 km of trails, and the migration season brings up to 2 million birds a year." }
];

/* Гастрономия */
window.GASTRO = [
  { icon: "🍬", ru: "Марципан", en: "Marzipan", d_ru: "Кёнигсбергский марципан из «Марципанового музея» — исторический десерт города с 1809 года.", d_en: "Königsberg marzipan from the Marzipan Museum — the city's historic dessert since 1809." },
  { icon: "🍖", ru: "Клопсы по-кёнигсбергски", en: "Königsberg Klops", d_ru: "Тушёные тефтели в каперсовом соусе — визитная карточка старой прусской кухни.", d_en: "Braised meatballs in caper sauce — the signature dish of old Prussian cuisine." },
  { icon: "🐟", ru: "Балтийская рыба", en: "Baltic fish", d_ru: "Копчёный угорь из залива, балтийская салака и камбала — попробуйте в Зеленоградске.", d_en: "Smoked eel from the lagoon, Baltic herring and flounder — try them in Zelenogradsk." },
  { icon: "🍺", ru: "Янтарное пиво и сыры", en: "Amber beer & cheese", d_ru: "Локальные крафтовые сорта «Кёнигсберг» и сыры «Альтштадт» с янтарной обсыпкой.", d_en: "Local craft beers 'Königsberg' and 'Altstadt' cheeses dusted with amber." }
];

/* Транспорт */
window.TRANSPORT = [
  { icon: "✈️", ru: "Самолёт", en: "Plane", d_ru: "Аэропорт «Храброво» (KGD) в 24 км от города: регулярные рейсы из Москвы, Петербурга и городов России. «Аэроэкспресс» и автобусы до центра.", d_en: "Khrabrovo Airport (KGD), 24 km from the city: regular flights from Moscow, St. Petersburg and other Russian cities. Aeroexpress and buses to the centre." },
  { icon: "🚆", ru: "Поезд", en: "Train", d_ru: "Южный вокзал: поезда из Москвы (~21 ч), Петербурга (~31 ч), Адлера и Челябинска. Купе поезда — целый маршрут по России.", d_en: "The Southern Railway Station: trains from Moscow (~21 h), St. Petersburg (~31 h), Adler and Chelyabinsk." },
  { icon: "🚗", ru: "Авто", en: "Car", d_ru: "Трасса «Приморское кольцо» — платная, быстрая и живописная дорога к курортам. Въезд из Литвы — через МАПП Чернышевское или Советск.", d_en: "The 'Primorskoye Koltso' ring road — a toll, fast and scenic route to the resorts. Entry from Lithuania via Chernyshevskoye or Sovetsk border crossings." },
  { icon: "🚌", ru: "Внутри города", en: "Getting around", d_ru: "Автобусы, маршрутки и трамваи №3, 4, 6 (исторические!). Такси — от 150 ₽, каршеринг — Делимобиль и Citydrive, велопрокат у набережной.", d_en: "Buses, minibuses and trams No. 3, 4, 6 (historic!). Taxis from 150 ₽, carsharing (Delimobil, Citydrive) and bike rentals by the embankment." }
];

/* Советы туристам */
window.TIPS = [
  { icon: "🛂", ru: "Виза и пропуск", en: "Visa & permits", d_ru: "Для граждан РФ внутренние документы не нужны — область полностью доступна. Иностранцам нужен визовый режим РФ; на Куршскую косу — экологический сбор.", d_en: "Russian citizens need no internal permits — the region is fully accessible. Foreigners need a Russian visa; the Curonian Spit charges an ecological fee." },
  { icon: "💳", ru: "Деньги", en: "Money", d_ru: "Российский рубль. Карты принимают почти везде, но в маленьких деревнях области лучше иметь наличные. Обмен — в банках на Ленинском проспекте.", d_en: "Russian rouble. Cards are accepted almost everywhere, but carry cash in small villages. Exchange offices are on Leninsky Ave." },
  { icon: "🧥", ru: "Погода", en: "Weather", d_ru: "Морской климат переменчив: даже летом возьмите ветровку. Купальный сезон — июль–август (+20…+22°C вода), лучший сезон прогулок — май и сентябрь.", d_en: "A changeable maritime climate: bring a windbreaker even in summer. Swimming season is July–August (water +20…+22°C); May and September are ideal for walks." },
  { icon: "🛡️", ru: "Безопасность", en: "Safety", d_ru: "Город безопасен. Пограничная зона на Балтийской косе — берите паспорт. На косе не сходите с троп: клещи активны с апреля по сентябрь.", d_en: "The city is safe. The Baltic Spit border zone requires a passport. Stay on trails on the spit: ticks are active April–September." }
];

/* FAQ */
window.FAQ = [
  { q_ru: "Нужен ли пропуск для поездки в Калининград?", q_en: "Do I need a permit to visit Kaliningrad?",
    a_ru: "Гражданам России — нет, область полностью открыта для путешествий по внутреннему паспорту. Иностранцам необходима российская виза; для посещения некоторых приграничных территорий (например, Балтийской косы) требуется паспорт.", a_en: "For Russian citizens — no, the region is fully open with an internal passport. Foreigners need a Russian visa; some border areas (like the Baltic Spit) require a passport." },
  { q_ru: "Как добраться до Калининграда?", q_en: "How do I get to Kaliningrad?",
    a_ru: "Самолётом до аэропорта «Храброво» (2 часа из Москвы), поездом с Южного вокзала (~21 час из Москвы) или автомобилем. Прямой наземной дороги через Литву без визы нет — учитывайте транзит.", a_en: "By plane to Khrabrovo Airport (2 hours from Moscow), by train (~21 hours from Moscow) or by car. There is no visa-free land route through Lithuania — plan transit accordingly." },
  { q_ru: "Когда лучше ехать?", q_en: "When is the best time to visit?",
    a_ru: "Для пляжей — июль и август. Для прогулок, косы и городов — май–июнь и сентябрь: тепло, мало туристов. Зимой город тоже атмосферен: рождественские ярмарки и катки.", a_en: "For beaches — July and August. For walking, the spit and cities — May–June and September: warm, fewer tourists. Winter is atmospheric too: Christmas markets and ice rinks." },
  { q_ru: "Где менять деньги?", q_en: "Where can I exchange money?",
    a_ru: "В отделениях банков на Ленинском проспекте и в аэропорту. Карты российских банков работают повсеместно; для небольших деревень области возьмите наличные.", a_en: "At bank branches on Leninsky Avenue and at the airport. Russian bank cards work everywhere; carry cash for small villages." },
  { q_ru: "Сколько дней закладывать на поездку?", q_en: "How many days should I plan?",
    a_ru: "3 дня — центр Калининграда и ближайшие курорты. 5–7 дней — плюс Куршская коса, Балтийск, Янтарный и замки. Наш конструктор маршрута поможет распределить дни.", a_en: "3 days — central Kaliningrad and nearby resorts. 5–7 days — plus the Curonian Spit, Baltiysk, Yantarny and the castles. Our route builder will help you spread the days." },
  { q_ru: "Можно ли доехать до Куршской косы на общественном транспорте?", q_en: "Can I reach the Curonian Spit by public transport?",
    a_ru: "Да: автобус 593 из Калининграда идёт через Зеленоградск до пос. Морское. На машине — по «Приморскому кольцу», въезд платный (экологический сбор).", a_en: "Yes: bus 593 from Kaliningrad runs via Zelenogradsk to Morskoye. By car — via the Primorskoye Koltso road; entry requires an ecological fee." }
];

/* Отзывы */
window.REVIEWS = [
  { name: "Анна, Москва", stars: 5, ru: "Куршская коса — это что-то невероятное. Танцующий лес и дюна Эфа запомнятся навсегда. Обязательно берите пару дней, а не одну экскурсию!", en: "The Curonian Spit is incredible. The Dancing Forest and the Epha dune will stay with you forever. Take a couple of days, not just one tour!" },
  { name: "Дмитрий, Санкт-Петербург", stars: 5, ru: "Город удивил: готика, немецкие кварталы, янтарь на каждом шагу. Амалиенау — как маленькая Европа. А клопсы в Рыбной деревне — топ!", en: "The city surprised me: Gothic architecture, German quarters, amber everywhere. Amalienau feels like a little Europe. And the klops in the Fishing Village — top!" },
  { name: "Elena, Italy", stars: 4, ru: "Была в сентябре — тепло, солнечно, пусто. Зеленоградск с котами и променадом очарователен. Советую весь день гулять по острову Канта.", en: "Visited in September — warm, sunny, uncrowded. Zelenogradsk with its cats and promenade is charming. Spend a whole day on Kant Island." },
  { name: "Михаил, Казань", stars: 5, ru: "Съездили на выходные: собор, музей океана, форт №5. Успели всё благодаря маршруту из этого сайта. Возврат билетов не понадобился 😄", en: "A weekend trip: the cathedral, the ocean museum, Fort No. 5. We saw everything thanks to the route from this site. No cancelled plans 😄" }
];

/* Чек-лист вещей в дорогу */
window.CHECKLIST = [
  { icon: "🪪", ru: "Паспорт и документы", en: "Passport & documents" },
  { icon: "🧥", ru: "Ветровка (даже летом!)", en: "Windbreaker (even in summer!)" },
  { icon: "👟", ru: "Удобная обувь для дюн", en: "Comfortable shoes for dunes" },
  { icon: "🔋", ru: "Пауэрбанк", en: "Power bank" },
  { icon: "🧴", ru: "Солнцезащитный крем", en: "Sunscreen" },
  { icon: "🦟", ru: "Репеллент от клещей", en: "Tick repellent" },
  { icon: "🩱", ru: "Купальник (июль–август)", en: "Swimsuit (July–August)" },
  { icon: "💸", ru: "Наличные для деревень", en: "Cash for villages" },
  { icon: "📷", ru: "Камера — виды невероятные", en: "Camera — the views are stunning" },
  { icon: "🚲", ru: "Бронь велосипеда на косу", en: "Bike booking for the spit" }
];

/* ---------- КОНФИГУРАЦИЯ КАЛЬКУЛЯТОРА БЮДЖЕТА (₽) ---------- */
window.BUDGET_CLASSES = {
  budget: {
    label: { ru: "Бюджет", en: "Budget" },
    lodging: 1500,   food: 1200,  transportLocal: 250, entertainment: 400,
    lodgingName: { ru: "Хостел / гостевой дом", en: "Hostel / guesthouse" },
    foodName: { ru: "Столовые и кафе", en: "Canteens & cafés" }
  },
  comfort: {
    label: { ru: "Комфорт", en: "Comfort" },
    lodging: 4500,   food: 2500,  transportLocal: 500, entertainment: 900,
    lodgingName: { ru: "Отель 3–4★ / апартаменты", en: "3–4★ hotel / apartments" },
    foodName: { ru: "Кафе и рестораны", en: "Cafés & restaurants" }
  },
  lux: {
    label: { ru: "Люкс", en: "Luxury" },
    lodging: 12000,  food: 6000,  transportLocal: 1200, entertainment: 2500,
    lodgingName: { ru: "Отель 5★ / вилла", en: "5★ hotel / villa" },
    foodName: { ru: "Рестораны, гастротуры", en: "Restaurants, food tours" }
  }
};

/* Стиль отдыха: множители развлечений */
window.BUDGET_STYLES = {
  calm:   { label: { ru: "Спокойный", en: "Relaxed" },        mult: 0.8 },
  active: { label: { ru: "Активный", en: "Active" },          mult: 1.3 },
  family: { label: { ru: "Семейный", en: "Family" },          mult: 1.15 }
};

/* Разовые расходы (на поездку) */
window.BUDGET_FIXED = {
  flights:  { ru: "Дорога (авиа/поезд)", en: "Travel (flight/train)", budget: 6000,  comfort: 12000, lux: 25000 },
  museums:  { ru: "Музеи и экскурсии",   en: "Museums & tours",       budget: 2000,  comfort: 5000,  lux: 10000 },
  souvenirs:{ ru: "Сувениры и янтарь",   en: "Souvenirs & amber",     budget: 1500,  comfort: 4000,  lux: 15000 },
  insurance:{ ru: "Страховка и связь",   en: "Insurance & mobile",    budget: 700,   comfort: 1500,  lux: 3000 }
};

/* Средний бюджет туриста за день (для сравнения) */
window.AVG_TOURIST_PER_DAY = 7500;
