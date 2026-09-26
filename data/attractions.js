/* ============================================================
   ДАННЫЕ: достопримечательности Калининграда и области
   Все цены и часы работы — ориентировочные (уточняйте на месте).
   Категории: museum | architecture | nature | entertainment | city
   ============================================================ */
window.ATTRACTIONS = [
  /* ---------- Калининград: центр ---------- */
  {
    id: "cathedral",
    name: { ru: "Кафедральный собор", en: "Königsberg Cathedral" },
    desc: {
      ru: "Символ города на острове Канта. Готика XIV века, усыпальница Иммануила Канта у северной стены, музей собора и старинный орган. Летом здесь проходят концерты органной музыки.",
      en: "The city's landmark on Kant Island. 14th-century Gothic, Immanuel Kant's tomb by the northern wall, a cathedral museum and a historic organ. Summer organ concerts are held here."
    },
    address: { ru: "о. Канта, 2", en: "Kant Island, 2" },
    lat: 54.7045, lng: 20.5095,
    hours: { ru: "10:00–18:00, вт — выходной", en: "10:00–18:00, closed Tue" },
    price: 400, category: "museum", rating: 4.9, duration: 1.5,
    img: "https://picsum.photos/seed/kgsobor/800/600"
  },
  {
    id: "kant-island",
    name: { ru: "Остров Канта", en: "Kant Island (Kneiphof)" },
    desc: {
      ru: "Исторический остров Кнайпхоф, «сердце» старого Кёнигсберга. Парк с аллеями, скульптурами и видом на собор и Рыбную деревню — лучшее место для прогулки у Преголи.",
      en: "The historic Kneiphof island, the 'heart' of old Königsberg. A park with alleys, sculptures and views of the cathedral and the Fishing Village — the best spot for a stroll by the Pregel."
    },
    address: { ru: "остров Канта", en: "Kant Island" },
    lat: 54.7037, lng: 20.5105,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "city", rating: 4.8, duration: 1,
    img: "https://picsum.photos/seed/kantisl/800/600"
  },
  {
    id: "fishing-village",
    name: { ru: "Рыбная деревня", en: "Fishing Village" },
    desc: {
      ru: "Этнографический и торгово-ремесленный квартал в стилистике старого Кёнигсберга на набережной Преголи. Башня «Лихтман», мостовая, смотровая площадка, рестораны и сувенирные лавки.",
      en: "An ethnographic quarter in the style of old Königsberg on the Pregel embankment. The 'Lichtmann' tower, a drawbridge, a viewing platform, restaurants and souvenir shops."
    },
    address: { ru: "Октябрьская ул., 4", en: "Oktiabrskaya St., 4" },
    lat: 54.7034, lng: 20.5140,
    hours: { ru: "10:00–22:00", en: "10:00–22:00" },
    price: 0, category: "architecture", rating: 4.6, duration: 1.5,
    img: "https://picsum.photos/seed/fishvil/800/600"
  },
  {
    id: "amber-museum",
    name: { ru: "Музей янтаря", en: "Amber Museum" },
    desc: {
      ru: "Музей в башне Дона середины XIX века: уникальная коллекция балтийского янтаря — самородки весом в килограммы, изделия мастеров и инклюзы с древними насекомыми.",
      en: "A museum in the 19th-century Dohna Tower: a unique collection of Baltic amber — raw stones weighing kilograms, masterpieces and inclusions with ancient insects."
    },
    address: { ru: "пл. Маршала Василевского, 1", en: "Marshal Vasilevsky Sq., 1" },
    lat: 54.7102, lng: 20.5066,
    hours: { ru: "10:00–19:00, пн — выходной", en: "10:00–19:00, closed Mon" },
    price: 400, category: "museum", rating: 4.7, duration: 1.5,
    img: "https://picsum.photos/seed/ambermus/800/600"
  },
  {
    id: "world-ocean",
    name: { ru: "Музей Мирового океана", en: "Museum of the World Ocean" },
    desc: {
      ru: "Крупнейший океанариум-музей России: научно-исследовательское судно «Витязь», подводная лодка Б-413, Дворец науки «Пакгауз» с аквариумами и экспозициями о морских глубинах.",
      en: "Russia's largest ocean museum: the research vessel 'Vityaz', the B-413 submarine, the 'Pakgaus' science palace with aquariums and deep-sea exhibitions."
    },
    address: { ru: "наб. Петра Великого, 1", en: "Peter the Great Emb., 1" },
    lat: 54.7062, lng: 20.5104,
    hours: { ru: "10:00–18:00, пн — выходной", en: "10:00–18:00, closed Mon" },
    price: 600, category: "museum", rating: 4.7, duration: 2.5,
    img: "https://picsum.photos/seed/oceanmus/800/600"
  },
  {
    id: "fine-arts",
    name: { ru: "Музей изящных искусств", en: "Museum of Fine Arts" },
    desc: {
      ru: "Открытый в 2024 году музей в здании бывшей Кёнигсбергской художественной галереи: европейская живопись, графика и скульптура, восстановленные довоенные коллекции Кёнигсберга.",
      en: "Opened in 2024 in the former Königsberg Art Gallery building: European painting, graphics and sculpture, restored pre-war Königsberg collections."
    },
    address: { ru: "Ленинский пр., 83", en: "Leninsky Ave., 83" },
    lat: 54.7186, lng: 20.5022,
    hours: { ru: "10:00–18:00, пн — выходной", en: "10:00–18:00, closed Mon" },
    price: 350, category: "museum", rating: 4.7, duration: 1.5,
    img: "https://picsum.photos/seed/finemus/800/600"
  },
  {
    id: "history-museum",
    name: { ru: "Историко-художественный музей", en: "Kaliningrad Regional History and Art Museum" },
    desc: {
      ru: "Старейший музей области: история края от пруссов до наших дней, залы о штурме Кёнигсберга, живопись и археология в неоклассическом здании 1912 года.",
      en: "The region's oldest museum: history from the Prussians to the present, halls on the storming of Königsberg, painting and archaeology in a neoclassical 1912 building."
    },
    address: { ru: "Клиническая ул., 21", en: "Klinicheskaya St., 21" },
    lat: 54.7116, lng: 20.5122,
    hours: { ru: "10:00–18:30, пн — выходной", en: "10:00–18:30, closed Mon" },
    price: 300, category: "museum", rating: 4.5, duration: 1.5,
    img: "https://picsum.photos/seed/histmus/800/600"
  },

  /* ---------- Ворота и фортификация ---------- */
  {
    id: "brandenburg-gate",
    name: { ru: "Бранденбургские ворота", en: "Brandenburg Gate" },
    desc: {
      ru: "Единственные ворота Кёнигсберга, до сих пор использующиеся по прямому назначению — через них идёт транспорт. Краснокирпичная готика 1657 года с портальными залами.",
      en: "The only Königsberg gate still used for its original purpose — traffic passes through it. Red-brick 1657 Gothic with portal halls."
    },
    address: { ru: "Багратиона ул., 130", en: "Bagration St., 130" },
    lat: 54.6982, lng: 20.5236,
    hours: { ru: "круглосуточно (снаружи)", en: "Open 24/7 (exterior)" },
    price: 0, category: "architecture", rating: 4.5, duration: 0.5,
    img: "https://picsum.photos/seed/brandg/800/600"
  },
  {
    id: "king-gate",
    name: { ru: "Королевские ворота", en: "King's Gate" },
    desc: {
      ru: "Самые нарядные ворота города с тремя порталами и скульптурами королей. Здесь находится экспозиция «Великое посольство» о визите Петра I в Кёнигсберг.",
      en: "The city's most ornate gate with three portals and royal sculptures. Home to the 'Great Embassy' exhibition about Peter I's visit to Königsberg."
    },
    address: { ru: "Фрунзе ул., 112", en: "Frunze St., 112" },
    lat: 54.7142, lng: 20.5197,
    hours: { ru: "10:00–18:00, вт — выходной", en: "10:00–18:00, closed Tue" },
    price: 300, category: "museum", rating: 4.6, duration: 1,
    img: "https://picsum.photos/seed/kinggate/800/600"
  },
  {
    id: "friedland-gate",
    name: { ru: "Фридландские ворота", en: "Friedland Gate" },
    desc: {
      ru: "Отреставрированные ворота с музеем «Найденные в старом городе»: здесь хранятся артефакты, поднятые при раскопках Кёнигсберга, и воссозданы улицы старого города.",
      en: "Restored gates with the 'Found in the Old City' museum: artefacts unearthed in Königsberg excavations and recreated streets of the old town."
    },
    address: { ru: "Дзержинского ул., 30", en: "Dzerzhinsky St., 30" },
    lat: 54.6974, lng: 20.5141,
    hours: { ru: "10:00–18:00, пн — выходной", en: "10:00–18:00, closed Mon" },
    price: 200, category: "museum", rating: 4.5, duration: 1,
    img: "https://picsum.photos/seed/fridlgate/800/600"
  },
  {
    id: "sackheim-gate",
    name: { ru: "Закхаймские ворота", en: "Sackheim Gate" },
    desc: {
      ru: "Одни из семи сохранившихся городских ворот с тремя арочными проёмами. Сегодня внутри — арт-пространство «Ворота» с выставками и кофейней.",
      en: "One of the seven surviving city gates with three arches. Today it houses the 'Vorota' art space with exhibitions and a coffee shop."
    },
    address: { ru: "Литовский вал, 35", en: "Lithuanian Rampart, 35" },
    lat: 54.7159, lng: 20.5271,
    hours: { ru: "11:00–21:00", en: "11:00–21:00" },
    price: 0, category: "architecture", rating: 4.4, duration: 0.5,
    img: "https://picsum.photos/seed/sackg/800/600"
  },
  {
    id: "dohna-tower",
    name: { ru: "Башня Дона и площадь Победы", en: "Dohna Tower & Victory Square" },
    desc: {
      ru: "Круглая башня в стиле неоготики на главной площади города. Рядом — стела «Калининград» и торговый центр «Кловер», а внизу холма — Амалиенау.",
      en: "A neo-Gothic round tower on the city's main square. Nearby are the 'Kaliningrad' stele and the Clover mall, and below the hill lies Amalienau."
    },
    address: { ru: "пл. Победы", en: "Victory Square" },
    lat: 54.7106, lng: 20.5083,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "city", rating: 4.3, duration: 0.5,
    img: "https://picsum.photos/seed/dohna/800/600"
  },
  {
    id: "grolman-bastion",
    name: { ru: "Бастион Грольман", en: "Grolman Bastion" },
    desc: {
      ru: "Часть второго вального укрепления XIX века: мощные земляные валы, казематы и бронзовые скульптуры. Атмосферное место для прогулки вдоль Литовского вала.",
      en: "Part of the 19th-century second rampart fortification: massive earthworks, casemates and bronze sculptures. An atmospheric walk along the Lithuanian Rampart."
    },
    address: { ru: "Литовский вал", en: "Lithuanian Rampart" },
    lat: 54.7180, lng: 20.5233,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "architecture", rating: 4.4, duration: 0.5,
    img: "https://picsum.photos/seed/grolman/800/600"
  },
  {
    id: "fort5",
    name: { ru: "Форт №5 «Король Фридрих Вильгельм III»", en: "Fort No. 5 'King Frederick William III'" },
    desc: {
      ru: "Лучше всего сохранившийся форт кольца обороны Кёнигсберга. Музей под открытым небом: рвы, казематы, военная техника и следы штурма апреля 1945 года.",
      en: "The best-preserved fort of the Königsberg defence ring. An open-air museum: moats, casemates, military hardware and traces of the April 1945 assault."
    },
    address: { ru: "пр. Александра Невского, 133", en: "Alexander Nevsky Ave., 133" },
    lat: 54.7424, lng: 20.4654,
    hours: { ru: "10:00–18:00, пн — выходной", en: "10:00–18:00, closed Mon" },
    price: 200, category: "museum", rating: 4.6, duration: 1,
    img: "https://picsum.photos/seed/fort5/800/600"
  },
  {
    id: "kronprinz",
    name: { ru: "Казарма «Кронпринц»", en: "Kronprinz Barracks" },
    desc: {
      ru: "Грандиозная оборонительная казарма конца XIX века, столетие служившая военным городком. Сегодня здесь работают художественная резиденция и культурные проекты.",
      en: "A grand 19th-century defensive barracks that served as a military town for a century. It now hosts an art residency and cultural projects."
    },
    address: { ru: "ул. Малоземельная, 2а", en: "Malozemelnaya St., 2a" },
    lat: 54.7220, lng: 20.5240,
    hours: { ru: "снаружи — круглосуточно", en: "Exterior: 24/7" },
    price: 0, category: "architecture", rating: 4.3, duration: 0.5,
    img: "https://picsum.photos/seed/kronpr/800/600"
  },

  /* ---------- Городские кварталы и парки ---------- */
  {
    id: "amalienau",
    name: { ru: "Амалиенау", en: "Amalienau" },
    desc: {
      ru: "Район вилл начала XX века в западной части города: живописные улицы с черепичными крышами, садами и немецкой архитектурой. Идеален для неспешной прогулки.",
      en: "A district of early-20th-century villas in the western part of the city: picturesque streets with tiled roofs, gardens and German architecture. Perfect for a leisurely walk."
    },
    address: { ru: "район ул. Кутузова и пр. Победы", en: "Around Kutuzov St. and Pobedy Ave." },
    lat: 54.7165, lng: 20.4858,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "architecture", rating: 4.7, duration: 1,
    img: "https://picsum.photos/seed/amalia/800/600"
  },
  {
    id: "house-soviets",
    name: { ru: "Площадь Победы и Дом Советов", en: "Victory Square & House of Soviets" },
    desc: {
      ru: "Дом Советов — «закопанный робот», символ города на месте Королевского замка. В 2024 году здание демонтировано; на площади возводится новый архитектурный ансамбль.",
      en: "The House of Soviets — the 'buried robot', a city symbol built on the site of the Königsberg Castle. Demolished in 2024; a new architectural ensemble is being built on the square."
    },
    address: { ru: "пл. Победы", en: "Pobedy Square" },
    lat: 54.7188, lng: 20.5090,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "city", rating: 4.2, duration: 0.5,
    img: "https://picsum.photos/seed/housesov/800/600"
  },
  {
    id: "zoo",
    name: { ru: "Калининградский зоопарк", en: "Kaliningrad Zoo" },
    desc: {
      ru: "Один из старейших зоопарков России (1896) с довоенными павильонами и рвами. Более 2000 животных, вечерняя подсветка и исторические башенки главного входа.",
      en: "One of Russia's oldest zoos (1896) with pre-war pavilions and moats. Over 2,000 animals, evening lighting and historic turrets at the main entrance."
    },
    address: { ru: "пр. Мира, 26", en: "Mira Ave., 26" },
    lat: 54.7221, lng: 20.4924,
    hours: { ru: "9:00–19:00 (летом)", en: "9:00–19:00 (summer)" },
    price: 600, category: "entertainment", rating: 4.4, duration: 2.5,
    img: "https://picsum.photos/seed/zookgd/800/600"
  },
  {
    id: "central-park",
    name: { ru: "Центральный парк (парк Луизы)", en: "Central Park (Louise Park)" },
    desc: {
      ru: "Старейший парк города на месте кафе «Луизенваль»: колесо обозрения, аллеи, пруд и детский городок. Рядом — Театр кукол в кирхе памяти королевы Луизы.",
      en: "The city's oldest park on the site of the 'Luisenwahl' café: a Ferris wheel, alleys, a pond and a children's area. Nearby is the Puppet Theatre in the Queen Louise memorial church."
    },
    address: { ru: "пр. Мира, 1–15", en: "Mira Ave., 1–15" },
    lat: 54.7233, lng: 20.4998,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "city", rating: 4.5, duration: 1,
    img: "https://picsum.photos/seed/cenpark/800/600"
  },
  {
    id: "yuditten-church",
    name: { ru: "Кирха Юдиттен (Свято-Никольский храм)", en: "Juditten Church (St. Nicholas)" },
    desc: {
      ru: "Старейшее здание Калининграда — кирха конца XIII века в Амалиенау. Уцелела в войне, сегодня это действующий православный храм с монастырём.",
      en: "The oldest building in Kaliningrad — a late 13th-century church in Amalienau. It survived the war and today is an active Orthodox church with a monastery."
    },
    address: { ru: "Тенистая аллея, 9", en: "Tenistaya Alleya, 9" },
    lat: 54.7213, lng: 20.4747,
    hours: { ru: "9:00–18:00", en: "9:00–18:00" },
    price: 0, category: "architecture", rating: 4.6, duration: 0.5,
    img: "https://picsum.photos/seed/yuditt/800/600"
  },
  {
    id: "bunker",
    name: { ru: "Бункер генерала Ляша", en: "General Lasch's Bunker" },
    desc: {
      ru: "Подземный бункер, где 9 апреля 1945 года подписана капитуляция гарнизона Кёнигсберга. Внутри — восстановленная обстановка штаба и диорама штурма города.",
      en: "The underground bunker where the Königsberg garrison surrendered on April 9, 1945. Inside — a restored command post and a diorama of the city's assault."
    },
    address: { ru: "Университетская ул., 3а", en: "Universitetskaya St., 3a" },
    lat: 54.7126, lng: 20.5154,
    hours: { ru: "10:00–17:00, экскурсии по сеансам", en: "10:00–17:00, tours by session" },
    price: 250, category: "museum", rating: 4.5, duration: 0.5,
    img: "https://picsum.photos/seed/bunker/800/600"
  },

  /* ---------- Курорты и побережье ---------- */
  {
    id: "curonian-spit",
    name: { ru: "Национальный парк «Куршская коса»", en: "Curonian Spit National Park" },
    desc: {
      ru: "Песчаная коса длиной 98 км между Балтикой и Куршским заливом: дюна Эфа, «танцующий лес», высота Эрентауэрн, орнитологическая станция Фрингилла. Объект ЮНЕСКО.",
      en: "A 98-km sandy spit between the Baltic and the Curonian Lagoon: the Epha dune, the 'Dancing Forest', the Erentauern height, the Fringilla bird station. A UNESCO site."
    },
    address: { ru: "Зеленоградский р-н, пос. Лесной", en: "Zelenogradsk district, Lesnoy village" },
    lat: 55.1071, lng: 20.8502,
    hours: { ru: "круглосуточно, въезд платный", en: "Open 24/7, entry fee" },
    price: 300, category: "nature", rating: 5.0, duration: 8,
    img: "https://picsum.photos/seed/kossa/800/600"
  },
  {
    id: "zelenogradsk",
    name: { ru: "Зеленоградск", en: "Zelenogradsk (Cranz)" },
    desc: {
      ru: "Курортный городок котов и Балтийского моря: старый променад, кирха, рестораны с морепродуктами и ворота в Куршскую косу. Символ города — рыжие коты.",
      en: "A resort town of cats and the Baltic Sea: the old promenade, a church, seafood restaurants and the gateway to the Curonian Spit. A city where cats are the local symbol."
    },
    address: { ru: "г. Зеленоградск", en: "Zelenogradsk" },
    lat: 54.9597, lng: 20.1575,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "city", rating: 4.8, duration: 4,
    img: "https://picsum.photos/seed/zelgrad/800/600"
  },
  {
    id: "svetlogorsk",
    name: { ru: "Светлогорск", en: "Svetlogorsk (Rauschen)" },
    desc: {
      ru: "Самый «европейский» курорт области: водогрязелечебница «Янтарь», солнечные часы, канатная дорога к морю, променад с скульптурой «Нимфа» и водопадом.",
      en: "The region's most 'European' resort: the 'Yantar' bathhouse, a sundial, a cable car to the sea, a promenade with the 'Nymph' sculpture and a waterfall."
    },
    address: { ru: "г. Светлогорск", en: "Svetlogorsk" },
    lat: 54.9413, lng: 20.1355,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "city", rating: 4.8, duration: 5,
    img: "https://picsum.photos/seed/svetlog/800/600"
  },
  {
    id: "baltiysk",
    name: { ru: "Балтийск", en: "Baltiysk (Pillau)" },
    desc: {
      ru: "Самый западный город России: маяк 1813 года, шведская крепость, длинный мол и набережная с памятником императрице Елизавете Петровне на коне.",
      en: "Russia's westernmost city: an 1813 lighthouse, a Swedish fortress, a long breakwater and an embankment with the equestrian monument to Empress Elizabeth."
    },
    address: { ru: "г. Балтийск", en: "Baltiysk" },
    lat: 54.6510, lng: 19.9150,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "city", rating: 4.6, duration: 4,
    img: "https://picsum.photos/seed/baltiysk/800/600"
  },
  {
    id: "yantarny",
    name: { ru: "Янтарный", en: "Yantarny (Palmnicken)" },
    desc: {
      ru: "Мировая «янтарная столица»: янтарный комбинат, смотровая площадка карьера и единственный в области пляж с «голубым флагом» — самый широкий на побережье.",
      en: "The world's 'amber capital': the amber combine, a quarry viewpoint and the region's only 'Blue Flag' beach — the widest on the coast."
    },
    address: { ru: "пос. Янтарный", en: "Yantarny village" },
    lat: 54.8630, lng: 19.9330,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "nature", rating: 4.7, duration: 4,
    img: "https://picsum.photos/seed/yantarn/800/600"
  },
  {
    id: "dune-efa",
    name: { ru: "Дюна Эфа", en: "Epha Dune" },
    desc: {
      ru: "Одна из высочайших дюн Куршской косы (64 м) с деревянными настилами и панорамой на залив и Балтику. Рядом — знаменитый «танцующий лес».",
      en: "One of the highest dunes of the Curonian Spit (64 m) with wooden boardwalks and a panorama of the lagoon and the Baltic. The famous 'Dancing Forest' is nearby."
    },
    address: { ru: "Куршская коса, 42-й км", en: "Curonian Spit, 42nd km" },
    lat: 55.0677, lng: 20.7644,
    hours: { ru: "9:00–20:00", en: "9:00–20:00" },
    price: 100, category: "nature", rating: 4.9, duration: 1.5,
    img: "https://picsum.photos/seed/dunefa/800/600"
  },
  {
    id: "dancing-forest",
    name: { ru: "Танцующий лес", en: "Dancing Forest" },
    desc: {
      ru: "Кольцевая тропа через сосны, изогнутые причудливыми петлями. Одна из самых загадочных достопримечательностей косы; сходить с настила запрещено.",
      en: "A circular trail through pines twisted into bizarre loops. One of the most mysterious sights of the spit; leaving the boardwalk is prohibited."
    },
    address: { ru: "Куршская коса, 37-й км", en: "Curonian Spit, 37th km" },
    lat: 55.0558, lng: 20.7330,
    hours: { ru: "9:00–20:00", en: "9:00–20:00" },
    price: 100, category: "nature", rating: 4.8, duration: 1,
    img: "https://picsum.photos/seed/dancefor/800/600"
  },

  /* ---------- Замки и область ---------- */
  {
    id: "shaaken",
    name: { ru: "Замок Шаакен", en: "Schakenhof Castle (Shaaken)" },
    desc: {
      ru: "Рыцарский замок Ордена XIII века у пос. Некрасово. Отреставрирован: музей пыточных инструментов, постоялый двор, средневековые фестивали и клетка для ведьм.",
      en: "A 13th-century Teutonic Order castle near Nekrasovo village. Restored: a torture museum, an inn, medieval festivals and a witch cage."
    },
    address: { ru: "пос. Некрасово", en: "Nekrasovo village" },
    lat: 54.7760, lng: 20.6110,
    hours: { ru: "10:00–18:00", en: "10:00–18:00" },
    price: 300, category: "architecture", rating: 4.5, duration: 1.5,
    img: "https://picsum.photos/seed/shaaken/800/600"
  },
  {
    id: "tapiau",
    name: { ru: "Замок Тапиау (Гвардейск)", en: "Tapiau Castle (Gvardeysk)" },
    desc: {
      ru: "Один из самых сохранившихся орденских замков, старейшая крепость области (XIII в.). Пока закрыт для посещения, но впечатляет снаружи; по выходным проводятся экскурсии.",
      en: "One of the best-preserved Order castles, the region's oldest fortress (13th c.). Currently closed inside, but impressive from outside; weekend tours are sometimes available."
    },
    address: { ru: "г. Гвардейск", en: "Gvardeysk" },
    lat: 54.6540, lng: 21.0670,
    hours: { ru: "снаружи — круглосуточно", en: "Exterior: 24/7" },
    price: 0, category: "architecture", rating: 4.4, duration: 1,
    img: "https://picsum.photos/seed/tapiau/800/600"
  },
  {
    id: "insterburg",
    name: { ru: "Замок Инстербург (Черняховск)", en: "Insterburg Castle (Chernyakhovsk)" },
    desc: {
      ru: "Замок 1336 года в центре Черняховска. Проводятся турниры и фестивали; в башне — смотровая площадка, вокруг — рынок и конный завод Георгиенбург.",
      en: "A 1336 castle in the centre of Chernyakhovsk. Tournaments and festivals are held here; the tower has a viewing platform, with the Georgenburg stud farm nearby."
    },
    address: { ru: "г. Черняховск", en: "Chernyakhovsk" },
    lat: 54.6300, lng: 21.8130,
    hours: { ru: "10:00–18:00", en: "10:00–18:00" },
    price: 200, category: "architecture", rating: 4.3, duration: 1.5,
    img: "https://picsum.photos/seed/inster/800/600"
  },
  {
    id: "sovetsk",
    name: { ru: "Советск и мост Королевы Луизы", en: "Sovetsk & Queen Louise Bridge" },
    desc: {
      ru: "Второй по величине город области (быв. Тильзит) на границе с Литвой: мост Королевы Луизы, изящная немецкая архитектура и панорама с берега Немана.",
      en: "The region's second-largest city (former Tilsit) on the Lithuanian border: the Queen Louise Bridge, elegant German architecture and a panorama from the Neman bank."
    },
    address: { ru: "г. Советск", en: "Sovetsk" },
    lat: 55.0820, lng: 21.8840,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "city", rating: 4.3, duration: 3,
    img: "https://picsum.photos/seed/sovetsk/800/600"
  },
  {
    id: "pravdinsk",
    name: { ru: "Правдинск (Фридланд)", en: "Pravdinsk (Friedland)" },
    desc: {
      ru: "Тихий городок с доминантой кирхи 1410 года и плотиной на реке Лава. Здесь разместился гидроузел и живописная водная гладь — популярное место у рыбаков.",
      en: "A quiet town dominated by a 1410 church and a dam on the Lava River. The hydro complex and calm waters make it popular with fishermen."
    },
    address: { ru: "г. Правдинск", en: "Pravdinsk" },
    lat: 54.6440, lng: 21.0220,
    hours: { ru: "круглосуточно", en: "Open 24/7" },
    price: 0, category: "city", rating: 4.2, duration: 2,
    img: "https://picsum.photos/seed/pravd/800/600"
  }
];

/* Категории для фильтров */
window.CATEGORIES = {
  museum:        { ru: "Музеи",           en: "Museums",        icon: "🏛️" },
  architecture:  { ru: "Архитектура",     en: "Architecture",   icon: "🏰" },
  nature:        { ru: "Природа",         en: "Nature",         icon: "🌲" },
  entertainment: { ru: "Развлечения",     en: "Entertainment",  icon: "🎡" },
  city:          { ru: "Городские места", en: "City spots",     icon: "🌉" }
};
