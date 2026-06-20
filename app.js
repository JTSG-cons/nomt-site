/* ============================================================================
   NOMT — app.js
   Data (i18n, building program, map config) + behaviour for the split-file
   build. Plain script (no ES modules) so it runs over file:// as well as http.
   Ported and extended from the original index.html inline script.
   ========================================================================== */
(function(){
  "use strict";
  var LANGS=['mn','zh','en'], STORE='nomt.lang';

  /* --------------------------------------------------------------------------
     SITE — client-editable map config.
     Exact parcel pin confirmed by the client: 47°55'48.3"N 106°55'32.7"E.
     Landmark coordinates are real/approximate central-UB references.
     -------------------------------------------------------------------------- */
  var SITE={
    lat:47.93008, lng:106.92575, zoom:14,
    landmarks:[
      {key:'lm.square', lat:47.9187,  lng:106.9176},
      {key:'lm.uni',    lat:47.9209,  lng:106.9189},
      {key:'lm.gov',    lat:47.9193,  lng:106.9175},
      {key:'lm.store',  lat:47.91703, lng:106.90625},
      {key:'lm.mall',   lat:47.9133,  lng:106.9215},
      {key:'lm.hosp',   lat:47.91639, lng:106.92447}
    ]
  };

  /* --------------------------------------------------------------------------
     I18N
     -------------------------------------------------------------------------- */
  var I18N={
    mn:{
      'a11y.skip':'Агуулга руу шилжих','nav.cta':'Танилцуулга авах',
      'nav.location':'Байршил','nav.building':'Барилга','nav.serviced':'Үйлчилгээт','nav.hotel':'Буудал','nav.market':'Зах зээл','nav.contact':'Холбоо барих',

      'hero.eyebrow':'JTSG ХХК-ИЙН ТӨСӨЛ · ТӨВ УЛААНБААТАР',
      'hero.headline':'Улаанбаатарын зүрхэнд — бүх хот ажиллахаар ирдэг газар.',
      'hero.sub':'Сүхбаатар дүүргийн төрийн, элчингийн, их сургуулийн цөмд байрлах 15 давхар олон зориулалттай цогцолбор: худалдах орон сууц, үйлчилгээт орон сууц, зочид буудал, оффис, худалдаа — нэг хаягт, зургаан орлогын урсгал.',
      'hero.cta1':'Танилцуулга авах','hero.cta2':'Байршлыг үзэх','hero.badge':'Уран сайхны төсөөлөл','hero.img.alt':'NOMT барилгын гадна төрх — уран сайхны төсөөлөл',
      'hero.stat1.v':'15','hero.stat1.l':'Давхар + B1','hero.stat2.v':'64','hero.stat2.l':'Орон сууц','hero.stat3.v':'6','hero.stat3.l':'Орлогын урсгал','hero.stat4.l':'Нийт талбай',

      'sec.location.eyebrow':'01 — БАЙРШИЛ','sec.location.title':'Цагирагийн дотор, захын суурьшилд биш.',
      'loc.intro':'NOMT нь Сүхбаатар дүүрэгт — Төрийн ордон, яамд, элчин сайдын яамдын төв, Монгол Улсын Их Сургуулийн хөршид, хотын түүхэн цөмийн дотор талд босно.',
      'loc.map.aria':'Сүхбаатар дүүрэг дэх NOMT-ийн байршлын интерактив газрын зураг',
      'loc.list.title':'Орчмын тулгуур цэгүүд','loc.list.note':'Зай нь ойролцоо. Метро ба BRT нь төлөвлөгдсөн дэд бүтэц — одоогоор ашиглалтад ороогүй.',
      'loc.cta':'Газрын зураг дээр харах','loc.dist.near':'Алхмын зайд','loc.dist.short':'Хэдхэн минутын зайд',
      'loc.fallback.title':'Газрын зураг ачаалагдсангүй','loc.fallback.body':'Сүхбаатар дүүрэг, 10-р хороо — Их Тойруугийн хойд тал, хотын төвөөс ~1.4 км.','loc.fallback.link':'Газрын зураг нээх',
      'lm.site':'NOMT','lm.square':'Чингисийн (Сүхбаатарын) талбай','lm.uni':'Монгол Улсын Их Сургууль','lm.gov':'Төрийн ордон · Элчингийн бүс','lm.store':'Улсын Их Дэлгүүр','lm.mall':'Шангри-Ла молл / Төв цамхаг','lm.hosp':'Улсын нэгдүгээр төв эмнэлэг',
      'lm.square.d':'~1.4 км · хотын төв','lm.uni.d':'Хөрш зэргэлдээ','lm.gov.d':'Засаг захиргааны цөм','lm.store.d':'Худалдааны төв','lm.mall.d':'Худалдаа, амралт','lm.hosp.d':'Эрүүл мэнд',
      'loc.transit.title':'Тээвэр · төлөвлөгдсөн','loc.transit.brt':'Шуурхай автобус (BRT) — Их Тойруу: ADB-ийн 60 сая ам.долларын зээл, 12.7 км, 17 буудал','loc.transit.metro':'Метроны 1-р шугам — 19.4 км, 15 буудал, 2026 оноос барина','loc.transit.ring':'Их Тойруу — шууд орц гарц',

      'sec.building.eyebrow':'02 — БАРИЛГА','sec.building.title':'Нэг барилга. Хоорондоо хамааралгүй зургаан урсгал.','sec.building.intro':'NOMT нэг 15 давхар цамхагт хамааралгүй зориулалтуудыг багтаана: нэг хэсэг сулрахад нөгөө нь орлогоо үргэлжлүүлнэ. Үйлчилгээт орон сууц ба зочид буудал нь тус тусдаа хоёр урсгал.',
      'streams.title':'Зургаан орлогын урсгал',
      'stream.residences':'Худалдах орон сууц','stream.serviced':'Үйлчилгээт орон сууц','stream.hotel':'Зочид буудал','stream.office':'Оффис','stream.commercial':'Худалдаа үйлчилгээ','stream.parking':'Авто зогсоол',
      'stream.res.note':'8–15 давхар · 64 нэгж','stream.serv.note':'A–H нэгж · удирдлагатай түрээс','stream.hotel.note':'2–6 давхар · шөнөөр','stream.off.note':'5–7 давхар · түрээс','stream.com.note':'1–4 давхар · гол түрээслэгч','stream.park.note':'B1 · 20 байр',
      'zone.res.tag':'Хөрөнгийн өгөөж','zone.hotel.tag':'Аяллын мөнгөн урсгал','zone.off.tag':'Түрээсийн орлого','zone.com.tag':'Гол түрээслэгчийн орлого','zone.park.tag':'Нэмэлт орлого',
      'zone.res.logic':'64 орон сууцны борлуулалт — хөрөнгийн үндсэн өгөөж; барилга дуусах тусам эрсдэл буурна. Эдгээр нэгжийг удирдлагатай үйлчилгээт түрээсийн санд оруулж болно.',
      'zone.hotel.logic':'2–6 давхрын зочид буудал шөнөөр төлбөртэй — нээлтийн өдрөөс эхлэх аяллын мөнгөн урсгал; зунд эрэлт өндөр.',
      'zone.off.logic':'Гэрээт түрээсийн орлого — бүтцийн тогтвортой дунд хэсэг.',
      'zone.com.logic':'Банк, хүүхдийн тоглоомын төв, ресторан, жижиглэн худалдаа; урт хугацаат гэрээтэй гол түрээслэгчид суурийг тогтворжуулна.',
      'zone.park.logic':'Оршин суугч, зочид, үйлчлүүлэгчдэд үйлчилнэ; дээрх давхар бүрийн үнэ цэнийг нэмэгдүүлнэ.',
      'label.floors':'Давхар','label.units':'Нэгж','label.billing':'Төлбөр','label.income':'Орлого','label.term':'Хугацаа','label.anchors':'Гол түрээслэгч','label.leases':'Түрээс','label.level':'Давхар','label.type':'Төрөл','label.spaces':'Байр','floor.area.l':'Талбай',
      'val.nightly':'Шөнөөр','val.lease':'Түрээс','val.longterm':'Урт хугацаат','val.automated':'Автомат','val.anchorlist':'Банк · Ресторан · Тоглоом · Худалдаа',
      'field.onrequest':'Хүсэлтээр',
      'explorer.units.title':'Энэ давхрын орон сууцууд','floor.full':'Бүтэн давхар','unit.title':'Орон сууцны хувилбар','unit.bed.1':'1 унтлагын','unit.bed.2':'2 унтлагын',
      'room.corridor':'Хонгил','room.bath':'Ариун цэврийн өрөө','room.kitchen':'Гал тогоо','room.bedroom':'Унтлагын өрөө','room.living':'Зочны өрөө','room.balcony':'Тагт',

      'sec.serv.eyebrow':'03 — ҮЙЛЧИЛГЭЭТ ОРОН СУУЦ','sec.serv.title':'Эдийн засгийг хөтөлдөг хүмүүст зориулсан үйлчилгээтэй амьдрал.',
      'serv.body':'A–H нэгжийг тавилгатай, цэвэрлэгээ, ресепшн, нэгдсэн төлбөртэйгээр удирдлагатай түрээсийн санд оруулна — уул уурхайн удирдлага, дипломатууд, урт хугацааны бизнес зочид яг үүнд илүү төлдөг. Зэрэгцэх чанартай нийлүүлэлт ховор.',
      'serv.b1.l':'Зорилтот түрээслэгч','serv.b1.v':'Уул уурхай, корпорацийн гадаад мэргэжилтэн, дипломат, урт хугацааны зочид',
      'serv.b2.l':'Бүтцийн эрэлт','serv.b2.v':'Зөвхөн Оюу Толгой ~20,000 ажилтан, ~17 тэрбум ам.долларын хөрөнгө оруулалттай',
      'serv.b3.l':'Түрээсийн өгөөж (нийт)','serv.b3.v':'Улаанбаатарт дунджаар ~10.75% (2025 Q4) — нийт, зардлын өмнө',
      'serv.b4.l':'Загвар','serv.b4.v':'Нэгж худалдаж ав → удирдлагатай үйлчилгээт сан → давтагдах түрээс',
      'serv.note':'Өгөөжийн тоо нь нийт дүн (сул орон тоо, удирдлага, татвар, ханшийн зөрүүний өмнө). Төслийн тооцоо танилцуулгад.',

      'sec.hotel.eyebrow':'04 — ЗОЧИД БУУДАЛ','sec.hotel.title':'Аялал жуулчлалын дээд амжилтын дунд ховор өрөөнүүд.',
      'hotel.body':'Улаанбаатарын брэнд таван одтой нийлүүлэлт нимгэн — голдуу 290 өрөөтэй Шангри-Ла, 99 өрөөтэй Кемпински. Тиймээс чанартай өрөө үнийн хүчтэй, ялангуяа зуны оргил үед. NOMT-д буудал нь 2–6 давхарт тусдаа урсгал.',
      'hotel.b1.l':'Жуулчдын тоо (дээд амжилт)','hotel.b1.v':'2025 онд ~846,103 гадаад зочин — шинэ дээд амжилт',
      'hotel.b2.l':'Аялал жуулчлалын орлого','hotel.b2.v':'2024 онд ~1.6 тэрбум ам.доллар (2023: 1.2 тэрбум)',
      'hotel.b3.l':'Улсын зорилт','hotel.b3.v':'2030 он гэхэд 2 сая зочин, 8 тэрбум ам.долларын орлого (засгийн зорилт)',
      'hotel.b4.l':'Брэндийн орц','hotel.b4.v':'Marriott (AC, ~2027), Hilton Conrad (~2028–29) Улаанбаатарт ороход бэлэн',
      'hotel.note':'Зочид буудал нь хамгийн улирлын чанартай урсгал — улирлын хэлбэлзлийг яг олон зориулалтат бүтэц зөөлрүүлдэг.',

      'sec.thesis.eyebrow':'05 — ТЕЗИС','sec.thesis.title':'Зургаан орлогын урсгал. Нэг хаяг. Азийн хамгийн хурдан өсөж буй нийслэлүүдийн нэг.',
      'thesis.1.title':'Олон талт мөнгөн урсгал','thesis.1.body':'Орон сууцны борлуулалт + үйлчилгээт түрээс + буудлын өрөө + оффисын түрээс + худалдаа + зогсоол — хоорондоо хамааралгүй хөдөлдөг, тэнцвэртэй багц шиг.',
      'thesis.2.title':'Өндөр орлого ба өсөлт','thesis.2.body':'Улаанбаатарын орон сууцны нийт түрээсийн өгөөж ~10.75% (2025 Q4); орон сууцны үнэ 2023–2025 онд тасралтгүй хоёр оронтой хувиар өссөн.',
      'thesis.3.title':'Макро түшиц','thesis.3.body':'ДНБ 2025 онд +6.9%; 2025 оны 10 сард Moody’s B1, S&P BB- болж зэрэглэл дээшилсэн — Монголын анхны “BB” зэрэглэл.',
      'thesis.4.title':'Тодорхой өмчлөл','thesis.4.body':'Гадаадын иргэд орон сууцыг бүрэн өмчилж, нутгийнхтай ижил гэрчилгээ авна; газрыг өмчлөхгүй — зөвхөн ашиглах эрх. (Худалдан авагч хууль зүйн дүгнэлт авахыг зөвлөж байна.)',
      'thesis.risk':'Эрсдэлийн тэмдэглэл: Монголын өсөлт, валют, үл хөдлөхийн эрэлт зэс, нүүрсэнд ихээхэн хамааралтай — түүхий эд эсвэл Хятадын эрэлтийн уналт нь гол эрсдэл; төгрөг ам.долларын эсрэг тогтмол суларсаар ирсэн.',

      'sec.market.eyebrow':'06 — ЗАХ ЗЭЭЛ','sec.market.title':'Бүтцийн өсөлтийн мөчлөгт буй нийслэл.','sec.market.intro':'Монгол 2024 онд дунд-дээд орлоготой орон болж, нэг сард хоёр удаа зэрэглэлээ дээшлүүлэв. Барилга өндөр хэвээр ч Улаанбаатарын үнэ өссөөр — эрэлт нийлүүлэлтээ давж байна.',
      'mkt.s1.l':'ДНБ-ийн бодит өсөлт','mkt.s1.src':'Дэлхийн банк · 2025',
      'mkt.s2.l':'Засгийн зэрэглэл','mkt.s2.src':'Moody’s / S&P · 2025.10',
      'mkt.s3.l':'Шинэ орон сууцны үнэ (УБ)','mkt.s3.src':'Global Property Guide / ҮСХ · 2026.02',
      'mkt.s4.l':'Орон сууцны үнийн индекс','mkt.s4.src':'ҮСХ · 2025.06',
      'mkt.s5.l':'Түрээсийн өгөөж (нийт)','mkt.s5.src':'Global Property Guide · 2025 Q4',
      'mkt.s6.l':'Гадаад жуулчид','mkt.s6.src':'ҮСХ / Montsame · 2025',
      'mkt.foot':'Тоонууд эх сурвалжтай, тухайн үеийнх. Өгөөж нийт дүн; ам.доллар/төгрөгийн ханш огнооноос хамаарна; метро ба BRT төлөвлөгдсөн.',

      'sec.numbers.eyebrow':'07 — ҮЗҮҮЛЭЛТ','sec.numbers.title':'Талбай, төлөвлөлт, санхүү — хүсэлтээр.','sec.numbers.intro':'Талбайн үзүүлэлт нийтэд ил. Санхүүгийн загвар — өртөг, орлого, өгөөж, төлбөрийн нөхцөл — шалгарсан хөрөнгө оруулагчдад танилцуулгаар.',
      'num.public.title':'Нийтэд ил','num.gated.title':'Танилцуулгад','num.gfa':'Нийт талбай','num.saleable':'Ашигтай талбай','num.land':'Газар','num.floors':'Давхар','num.residences':'Орон сууц','num.parking':'Авто зогсоол','num.hotelarea':'Буудлын талбай','num.grade':'Бүсийн зэрэглэл','num.grade.v':'А зэрэглэл',
      'num.cost':'Бүтээн байгуулалтын өртөг','num.revenue':'Нэгжийн үнэ ба өгөөж','num.irr':'Орлогын загвар ба IRR','num.gated.note':'Шалгарсан хөрөнгө оруулагч, түншүүдтэй хуваалцана.','num.unlock':'Санхүүг нээх',

      'sec.dev.eyebrow':'08 — ХӨГЖҮҮЛЭГЧ','sec.dev.title':'JTSG ХХК хэрэгжүүлж байна.','dev.legal':'ЖЭЙ ТИ ЭС Жи ХХК',
      'dev.body':'NOMT-ыг ЖЭЙ ТИ ЭС Жи ХХК хөгжүүлж байна. 3,175 м² талбай баталгаажсан, барилгын иж бүрэн зураг төсөл бэлэн (2026 оны 2 сар), барилга нь Улаанбаатарын уур амьсгалд тохирсон.',
      'trust.land':'Газар баталгаажсан · 3,175 m²','trust.set':'Зураг төсөл бэлэн · 2026.02','trust.seismic':'Газар хөдлөлт 8 балл · −36 °C','trust.grade':'А зэрэглэлийн байршил',
      'dev.spec.struct':'Цутгамал ТӨ хүрээ','dev.spec.facade':'Метал + шил фасад','dev.spec.fire':'Гал/бат бөх II зэрэг','dev.img.alt':'NOMT цогцолборын гадна төрх','dev.img.cap':'NOMT · Уран сайхны төсөөлөл',

      'sec.partner.eyebrow':'09 — ХАМТРАЛ','partner.head':'Бүрэн танилцуулгыг аваарай.','partner.body':'Төлөвлөлтийн зураг, орлогын загвар, өртөг ба өгөөжийн тооцоо, нэгжийн үнэ, төлбөрийн нөхцөл — шалгарсан хөрөнгө оруулагч, түншүүдэд хүсэлтээр илгээнэ.',
      'form.step.label':'Алхам 1 / 2','form.step.label2':'Алхам 2 / 2','form.name':'Нэр','form.email':'И-мэйл','form.company':'Байгууллага','form.phone':'Утас','form.type':'Сонирхол',
      'form.type.opt1':'Худалдах орон сууц','form.type.opt2':'Үйлчилгээт орон сууц','form.type.opt3':'Зочид буудал / оффис','form.type.opt4':'Сан / хамтрагч / хувь хүн',
      'form.next':'Үргэлжлүүлэх','form.back':'Буцах','form.submit':'Танилцуулга авах','form.visit':'Газар дээр нь үзэх',
      'form.success':'Баярлалаа — таны хүсэлт илгээхэд бэлэн. И-мэйл программ нээгдэнэ; бид биечлэн хариу өгнө.','form.required':'Нэр ба зөв и-мэйл оруулна уу.','form.privacy':'Бид таны мэдээллийг зөвхөн танилцуулга илгээх, хариу барихад ашиглана. Гуравдагч этгээдийн хяналт байхгүй.',
      'footer.descriptor':'ЖЭЙ ТИ ЭС Жи ХХК — Олон зориулалттай цогцолбор, Улаанбаатар','footer.contact':'Холбоо барих','footer.location.v':'Улаанбаатар, Монгол','footer.lang.l':'Хэл',
      'footer.disclaimer':'Энэ хуудас нь зөвхөн хэлэлцүүлгийн зорилготой жишиг танилцуулга. Энэ нь үнэт цаасны санал, хөрөнгө оруулах урилга, гэрээ биш. Бүх үзүүлэлт жишиг бөгөөд баталгаажуулалт шаардана. Зах зээлийн тоонууд эх сурвалжтай боловч NOMT-ийн өгөөжийн баталгаа биш.',
      'footer.rights':'© 2026 ЖЭЙ ТИ ЭС Жи ХХК. Бүх эрх хуулиар хамгаалагдсан.'
    },

    zh:{
      'a11y.skip':'跳至内容','nav.cta':'获取资料',
      'nav.location':'区位','nav.building':'建筑','nav.serviced':'服务式','nav.hotel':'酒店','nav.market':'市场','nav.contact':'联系',

      'hero.eyebrow':'JTSG 有限责任公司项目 · 乌兰巴托市中心',
      'hero.headline':'在乌兰巴托的心脏——全城都来此办公的地方。',
      'hero.sub':'坐落于苏赫巴托尔区——首都的政府、使馆与大学核心——的15层综合体：待售公寓、服务式公寓、酒店、办公与商业，一个地址，六条收入来源。',
      'hero.cta1':'获取投资资料','hero.cta2':'查看区位','hero.badge':'艺术效果图','hero.img.alt':'NOMT大厦外观艺术效果图',
      'hero.stat1.v':'15','hero.stat1.l':'层 + B1','hero.stat2.v':'64','hero.stat2.l':'套住宅','hero.stat3.v':'6','hero.stat3.l':'收入来源','hero.stat4.l':'总建筑面积',

      'sec.location.eyebrow':'01 — 区位','sec.location.title':'在环线之内，而非城市边缘。',
      'loc.intro':'NOMT位于苏赫巴托尔区——国家宫、各部委与使馆区所在地——紧邻蒙古国立大学，处于城市历史核心的内圈。',
      'loc.map.aria':'苏赫巴托尔区NOMT区位的交互地图',
      'loc.list.title':'周边核心节点','loc.list.note':'距离为约数。地铁与BRT为规划中的基础设施，尚未通车。',
      'loc.cta':'在地图上查看','loc.dist.near':'步行可达','loc.dist.short':'数分钟车程',
      'loc.fallback.title':'地图加载失败','loc.fallback.body':'苏赫巴托尔区第10小区——大环路以北，距市中心约1.4公里。','loc.fallback.link':'打开地图',
      'lm.site':'NOMT','lm.square':'成吉思（苏赫巴托尔）广场','lm.uni':'蒙古国立大学','lm.gov':'国家宫 · 使馆区','lm.store':'国营百货','lm.mall':'香格里拉购物中心 / 中央大厦','lm.hosp':'国家第一中心医院',
      'lm.square.d':'~1.4公里 · 市中心','lm.uni.d':'紧邻','lm.gov.d':'行政核心','lm.store.d':'商业中心','lm.mall.d':'购物休闲','lm.hosp.d':'医疗',
      'loc.transit.title':'交通 · 规划中','loc.transit.brt':'快速公交（BRT）— 大环路：亚行6000万美元贷款，12.7公里，17站','loc.transit.metro':'地铁1号线 — 19.4公里，15站，2026年起建设','loc.transit.ring':'大环路 — 直接出入',

      'sec.building.eyebrow':'02 — 建筑','sec.building.title':'一座建筑。六条互不联动的收入来源。','sec.building.intro':'NOMT将互不相关的用途集于一座15层大厦：某一板块走弱时，其他板块继续创收。服务式公寓与酒店是两条独立的收入来源。',
      'streams.title':'六条收入来源',
      'stream.residences':'待售住宅','stream.serviced':'服务式公寓','stream.hotel':'酒店','stream.office':'办公','stream.commercial':'商业','stream.parking':'停车',
      'stream.res.note':'8–15层 · 64套','stream.serv.note':'A–H户型 · 托管出租','stream.hotel.note':'2–6层 · 按夜','stream.off.note':'5–7层 · 租赁','stream.com.note':'1–4层 · 主力租户','stream.park.note':'B1 · 20车位',
      'zone.res.tag':'资本回报','zone.hotel.tag':'旅游现金流','zone.off.tag':'租赁收入','zone.com.tag':'主力租户收入','zone.park.tag':'附属收入',
      'zone.res.logic':'64套住宅的销售——主要资本回收；随竣工而降低风险。这些单元可纳入托管的服务式出租池。',
      'zone.hotel.logic':'2–6层酒店按夜计费——开业即产生旅游现金流；夏季需求旺盛。',
      'zone.off.logic':'合约租赁收入——结构中稳定的中段。',
      'zone.com.logic':'银行、儿童乐园、餐厅与零售；长租约主力租户稳固底盘。',
      'zone.park.logic':'服务住户、宾客与访客；提升其上每一层的价值。',
      'label.floors':'楼层','label.units':'户数','label.billing':'计费','label.income':'收入','label.term':'期限','label.anchors':'主力租户','label.leases':'租约','label.level':'楼层','label.type':'类型','label.spaces':'车位','floor.area.l':'面积',
      'val.nightly':'按夜','val.lease':'租赁','val.longterm':'长期','val.automated':'自动化','val.anchorlist':'银行 · 餐厅 · 乐园 · 零售',
      'field.onrequest':'索取提供',
      'explorer.units.title':'该层住宅户型','floor.full':'整层','unit.title':'住宅户型','unit.bed.1':'1居室','unit.bed.2':'2居室',
      'room.corridor':'走廊','room.bath':'卫生间','room.kitchen':'厨房','room.bedroom':'卧室','room.living':'客厅','room.balcony':'阳台',

      'sec.serv.eyebrow':'03 — 服务式公寓','sec.serv.title':'为驱动蒙古经济的人群提供酒店级居住。',
      'serv.body':'A–H户型可配以家具、保洁、礼宾与统一账单纳入托管出租池——这正是矿业高管、外交官与长住企业客愿意支付溢价的产品，而同等品质的供给依然稀缺。',
      'serv.b1.l':'目标租户','serv.b1.v':'矿业与企业外籍人员、外交官、长住商务客',
      'serv.b2.l':'结构性需求','serv.b2.v':'仅奥尤陶勒盖即支撑约2万人就业、约170亿美元投资',
      'serv.b3.l':'租金收益率（毛）','serv.b3.v':'乌兰巴托平均约10.75%（2025年Q4）——毛收益，未计费用',
      'serv.b4.l':'模式','serv.b4.v':'购入单元 → 托管服务式出租池 → 经常性租金',
      'serv.note':'收益率为毛值（未计空置、管理、税费、汇率）。项目测算见资料包。',

      'sec.hotel.eyebrow':'04 — 酒店','sec.hotel.title':'在创纪录的旅游热潮中，客房稀缺。',
      'hotel.body':'乌兰巴托的品牌五星供给薄弱——基本是290间的香格里拉与99间的凯宾斯基。因此优质客房具备实在的定价能力，夏季尤甚。在NOMT，酒店是2–6层的独立收入来源。',
      'hotel.b1.l':'游客人数（纪录）','hotel.b1.v':'2025年约846,103名外国游客——再创新高',
      'hotel.b2.l':'旅游收入','hotel.b2.v':'2024年约16亿美元（2023年12亿）',
      'hotel.b3.l':'国家目标','hotel.b3.v':'到2030年200万游客、80亿美元收入（政府目标）',
      'hotel.b4.l':'品牌进入','hotel.b4.v':'万豪（AC，约2027）、希尔顿康莱德（约2028–29）将进入乌兰巴托',
      'hotel.note':'酒店是最具季节性的收入来源——而多元用途结构正是用来对冲这种季节波动。',

      'sec.thesis.eyebrow':'05 — 论点','sec.thesis.title':'六条收入来源。一个地址。亚洲增长最快的首都之一。',
      'thesis.1.title':'多元现金流','thesis.1.body':'住宅销售 + 服务式租金 + 酒店客房 + 办公租金 + 商业 + 停车——彼此不同步波动，如同一个均衡的投资组合。',
      'thesis.2.title':'高收益与增值','thesis.2.body':'乌兰巴托住宅毛租金收益率约10.75%（2025年Q4）；房价在2023–2025年连续三年双位数上涨。',
      'thesis.3.title':'宏观顺风','thesis.3.body':'2025年GDP +6.9%；2025年10月获穆迪B1、标普BB-上调——蒙古首个“BB”级。',
      'thesis.4.title':'清晰产权','thesis.4.body':'外国人可完全拥有公寓，取得与本地人相同的产权证；但不拥有土地——仅有使用权。（建议买方取得书面法律意见。）',
      'thesis.risk':'风险提示：蒙古的增长、货币与房地产需求高度依赖铜与煤——大宗商品或中国需求的下行是主要风险；图格里克兑美元长期持续贬值。',

      'sec.market.eyebrow':'06 — 市场','sec.market.title':'处于结构性上行周期的首都。','sec.market.intro':'蒙古于2024年迈入中高收入国家，并在一个月内两次获评级上调。尽管在建量高企，乌兰巴托房价仍持续上涨——需求快于供给。',
      'mkt.s1.l':'GDP实际增长','mkt.s1.src':'世界银行 · 2025',
      'mkt.s2.l':'主权评级','mkt.s2.src':'穆迪 / 标普 · 2025.10',
      'mkt.s3.l':'新房价格（乌兰巴托）','mkt.s3.src':'Global Property Guide / 统计局 · 2026.02',
      'mkt.s4.l':'住房价格指数','mkt.s4.src':'统计局 · 2025.06',
      'mkt.s5.l':'租金收益率（毛）','mkt.s5.src':'Global Property Guide · 2025 Q4',
      'mkt.s6.l':'外国游客','mkt.s6.src':'统计局 / Montsame · 2025',
      'mkt.foot':'数据均有来源、标注时点。收益为毛值；美元/图格里克汇率取决于换算日期；地铁与BRT为规划中。',

      'sec.numbers.eyebrow':'07 — 指标','sec.numbers.title':'面积、平面与财务——按需提供。','sec.numbers.intro':'面积指标为公开信息。财务模型——成本、收入、收益率、付款条件——通过资料包向合格投资者提供。',
      'num.public.title':'公开信息','num.gated.title':'资料包内','num.gfa':'总建筑面积','num.saleable':'可用面积','num.land':'土地','num.floors':'楼层','num.residences':'住宅','num.parking':'停车位','num.hotelarea':'酒店面积','num.grade':'地段等级','num.grade.v':'A级',
      'num.cost':'开发成本','num.revenue':'单元价格与收益','num.irr':'收益模型与IRR','num.gated.note':'向合格投资者与合作伙伴提供。','num.unlock':'解锁财务',

      'sec.dev.eyebrow':'08 — 开发商','sec.dev.title':'由JTSG有限责任公司开发建设。','dev.legal':'JTSG 有限责任公司',
      'dev.body':'NOMT由JTSG LLC开发。3,175平方米地块已落实，全套建筑设计已于2026年2月完成，并针对乌兰巴托气候设计。',
      'trust.land':'土地已落实 · 3,175 m²','trust.set':'设计完成 · 2026.02','trust.seismic':'抗震8度 · −36 °C','trust.grade':'A级地段',
      'dev.spec.struct':'现浇钢混框架','dev.spec.facade':'金属 + 玻璃幕墙','dev.spec.fire':'防火/耐久II级','dev.img.alt':'NOMT综合体外观','dev.img.cap':'NOMT · 艺术效果图',

      'sec.partner.eyebrow':'09 — 合作','partner.head':'获取完整投资资料包。','partner.body':'平面图、收益模型、成本与回报预测、单元价格、付款条件——应合格投资者与合作伙伴的请求发送。',
      'form.step.label':'步骤 1 / 2','form.step.label2':'步骤 2 / 2','form.name':'姓名','form.email':'电子邮箱','form.company':'公司','form.phone':'电话','form.type':'意向',
      'form.type.opt1':'待售住宅','form.type.opt2':'服务式公寓','form.type.opt3':'酒店 / 办公','form.type.opt4':'基金 / 合作伙伴 / 个人',
      'form.next':'继续','form.back':'返回','form.submit':'获取资料','form.visit':'安排实地考察',
      'form.success':'谢谢——您的请求已准备发送。邮件应用将打开；我们将亲自跟进。','form.required':'请填写姓名与有效邮箱。','form.privacy':'我们仅使用您的信息发送资料并跟进。无第三方追踪。',
      'footer.descriptor':'JTSG有限公司——综合体，乌兰巴托','footer.contact':'联系','footer.location.v':'蒙古，乌兰巴托','footer.lang.l':'语言',
      'footer.disclaimer':'本页面仅为供讨论的示意性介绍，并非证券要约、投资邀请或合同。所有指标均为示意性，须经确认。市场数据虽有来源，但不构成对NOMT回报的保证。',
      'footer.rights':'© 2026 JTSG LLC. 保留所有权利。'
    },

    en:{
      'a11y.skip':'Skip to content','nav.cta':'Request the pack',
      'nav.location':'Location','nav.building':'Building','nav.serviced':'Serviced','nav.hotel':'Hotel','nav.market':'Market','nav.contact':'Contact',

      'hero.eyebrow':'A JTSG LLC DEVELOPMENT · CENTRAL ULAANBAATAR',
      'hero.headline':'In the heart of Ulaanbaatar, where the whole city already comes to work.',
      'hero.sub':"A 15-floor mixed-use tower in Sükhbaatar district — the capital's government, embassy and university core — combining homes for sale, serviced living, a hotel, offices and retail in one address: six income streams.",
      'hero.cta1':'Request the investor pack','hero.cta2':'Explore the location','hero.badge':"Artist's impression",'hero.img.alt':"Artist's impression of the NOMT tower",
      'hero.stat1.v':'15','hero.stat1.l':'Floors + B1','hero.stat2.v':'64','hero.stat2.l':'Residences','hero.stat3.v':'6','hero.stat3.l':'Income streams','hero.stat4.l':'Total GFA',

      'sec.location.eyebrow':'01 — LOCATION','sec.location.title':'Inside the ring, not the sprawl.',
      'loc.intro':'NOMT rises in Sükhbaatar district — the seat of the State Palace, the ministries and the embassy quarter — next door to the National University of Mongolia, on the inner edge of Ulaanbaatar’s historic core.',
      'loc.map.aria':"Interactive map of NOMT's location in Sükhbaatar district",
      'loc.list.title':'Key points around the site','loc.list.note':'Distances are approximate. The Metro and BRT are planned infrastructure — not yet in service.',
      'loc.cta':'Show on the map','loc.dist.near':'Walkable','loc.dist.short':'Minutes by car',
      'loc.fallback.title':'The map could not load','loc.fallback.body':'Sükhbaatar district, Khoroo 10 — north of the Big Ring Road, ~1.4 km from the city centre.','loc.fallback.link':'Open the map',
      'lm.site':'NOMT','lm.square':'Chinggis (Sükhbaatar) Square','lm.uni':'National University of Mongolia','lm.gov':'State Palace · Embassy quarter','lm.store':'State Department Store','lm.mall':'Shangri-La Mall / Central Tower','lm.hosp':'First Central Hospital',
      'lm.square.d':'~1.4 km · city centre','lm.uni.d':'Next door','lm.gov.d':'Administrative core','lm.store.d':'Shopping','lm.mall.d':'Retail & leisure','lm.hosp.d':'Healthcare',
      'loc.transit.title':'Transit · planned','loc.transit.brt':'Bus Rapid Transit (BRT) — Big Ring Road: USD 60M ADB loan, 12.7 km, 17 stops','loc.transit.metro':'Metro Line 1 — 19.4 km, 15 stations, construction from 2026','loc.transit.ring':'Big Ring Road — direct access',

      'sec.building.eyebrow':'02 — THE BUILDING','sec.building.title':"One building. Six streams that don't move together.",'sec.building.intro':'NOMT bundles uncorrelated uses inside a single 15-floor tower, so when one segment softens the others keep the building earning. Serviced apartments and the hotel run as two separate streams.',
      'streams.title':'Six income streams',
      'stream.residences':'For-sale residences','stream.serviced':'Serviced apartments','stream.hotel':'Hotel','stream.office':'Office','stream.commercial':'Commercial podium','stream.parking':'Parking',
      'stream.res.note':'Fl. 8–15 · 64 homes','stream.serv.note':'Units A–H · managed pool','stream.hotel.note':'Fl. 2–6 · nightly','stream.off.note':'Fl. 5–7 · leases','stream.com.note':'Fl. 1–4 · anchors','stream.park.note':'B1 · 20 spaces',
      'zone.res.tag':'Capital return','zone.hotel.tag':'Tourism cash flow','zone.off.tag':'Lease income','zone.com.tag':'Anchor lease income','zone.park.tag':'Ancillary revenue',
      'zone.res.logic':'Sell-through of 64 homes — the primary capital event; de-risks as construction completes. These units can also enter the managed serviced-rental pool.',
      'zone.hotel.logic':'Hotel on floors 2–6 billed nightly — tourism cash flow from opening day; demand peaks in summer.',
      'zone.off.logic':'Contracted lease income — the steady middle of the stack.',
      'zone.com.logic':'Bank, kids play centre, restaurant and retail; anchor tenants on long leases stabilise the base.',
      'zone.park.logic':'Serves residents, guests and visitors; lifts the value of every floor above.',
      'label.floors':'Floors','label.units':'Units','label.billing':'Billing','label.income':'Income','label.term':'Term','label.anchors':'Anchors','label.leases':'Leases','label.level':'Level','label.type':'Type','label.spaces':'Spaces','floor.area.l':'Floor area',
      'val.nightly':'Nightly','val.lease':'Lease','val.longterm':'Long-term','val.automated':'Automated','val.anchorlist':'Bank · Restaurant · Play · Retail',
      'field.onrequest':'On request',
      'explorer.units.title':'Homes on this floor','floor.full':'Full floor','unit.title':'Residence type','unit.bed.1':'1-bedroom','unit.bed.2':'2-bedroom',
      'room.corridor':'Corridor','room.bath':'Bathroom','room.kitchen':'Kitchen','room.bedroom':'Bedroom','room.living':'Living','room.balcony':'Balcony',

      'sec.serv.eyebrow':'03 — SERVICED APARTMENTS','sec.serv.title':"Hotel-grade living for the people who run Mongolia's economy.",
      'serv.body':'Units A–H can be furnished and run with housekeeping, concierge and bundled utilities inside a managed rental pool — exactly what mining executives, diplomats and long-stay corporate tenants pay a premium for, while comparable quality stock stays scarce.',
      'serv.b1.l':'Target tenants','serv.b1.v':'Mining & corporate expatriates, diplomats, long-stay business travellers',
      'serv.b2.l':'Structural demand','serv.b2.v':'Oyu Tolgoi alone supports a ~20,000-person workforce and ~USD 17bn of investment',
      'serv.b3.l':'Rental yield (gross)','serv.b3.v':'Ulaanbaatar averaged ~10.75% gross (Q4 2025) — before costs',
      'serv.b4.l':'The model','serv.b4.v':'Buy a unit → managed serviced-rental pool → recurring rent',
      'serv.note':'Yields are gross (before vacancy, management, tax and FX). Project-level figures are in the pack.',

      'sec.hotel.eyebrow':'04 — HOTEL','sec.hotel.title':'Scarce rooms in a record tourism run.',
      'hotel.body':"Ulaanbaatar's branded five-star supply is thin — essentially the 290-room Shangri-La and the 99-room Kempinski — so quality rooms hold real pricing power, especially around the summer peak. At NOMT the hotel is a separate stream on floors 2–6.",
      'hotel.b1.l':'Visitor arrivals (record)','hotel.b1.v':'~846,103 foreign visitors in 2025 — a new record',
      'hotel.b2.l':'Tourism revenue','hotel.b2.v':'~USD 1.6bn in 2024 (up from USD 1.2bn in 2023)',
      'hotel.b3.l':'National target','hotel.b3.v':'2 million visitors and USD 8bn revenue by 2030 (government ambition)',
      'hotel.b4.l':'Brands entering','hotel.b4.v':'Marriott (AC, ~2027) and Hilton’s Conrad (~2028–29) are entering UB',
      'hotel.note':'The hotel is the most seasonal stream — which is precisely what a diversified building is built to offset.',

      'sec.thesis.eyebrow':'05 — THESIS','sec.thesis.title':"Six income streams. One address. One of Asia's fastest-growing capitals.",
      'thesis.1.title':'Diversified cash flow','thesis.1.body':"Home sales + serviced rents + hotel keys + office leases + retail + parking don't move together — the property equivalent of a balanced portfolio.",
      'thesis.2.title':'High income & appreciation','thesis.2.body':'UB gross residential yields ~10.75% (Q4 2025); apartment values have risen double-digits three years running (2023–2025).',
      'thesis.3.title':'Macro tailwind','thesis.3.body':"GDP +6.9% in 2025; sovereign upgrades to Moody's B1 and S&P BB- in October 2025 — Mongolia's first-ever 'BB'.",
      'thesis.4.title':'Clear ownership','thesis.4.body':'Foreigners can own apartment units outright, on the same certificate as locals; land is not owned — use rights only. (Buyers should obtain a written legal opinion.)',
      'thesis.risk':"Risk note: Mongolia's growth, currency and property demand are heavily tied to copper and coal — a commodity or China-demand downturn is the dominant risk, and the tugrik has depreciated steadily against the USD.",

      'sec.market.eyebrow':'06 — MARKET','sec.market.title':'A capital in a structural upcycle.','sec.market.intro':'Mongolia crossed into upper-middle-income status in 2024 and earned two sovereign-rating upgrades in a single month. Yet — even with record construction — Ulaanbaatar prices keep rising, signalling demand that outpaces supply.',
      'mkt.s1.l':'Real GDP growth','mkt.s1.src':'World Bank · 2025',
      'mkt.s2.l':'Sovereign ratings','mkt.s2.src':'Moody’s / S&P · Oct 2025',
      'mkt.s3.l':'New-build price (UB)','mkt.s3.src':'Global Property Guide / NSO · Feb 2026',
      'mkt.s4.l':'Housing Price Index','mkt.s4.src':'NSO Mongolia · Jun 2025',
      'mkt.s5.l':'Rental yield (gross)','mkt.s5.src':'Global Property Guide · Q4 2025',
      'mkt.s6.l':'Foreign tourist arrivals','mkt.s6.src':'NSO / Montsame · 2025',
      'mkt.foot':'Figures are sourced and dated. Yields are gross; USD/MNT depends on the conversion date; the Metro and BRT are planned.',

      'sec.numbers.eyebrow':'07 — SPECIFICATIONS','sec.numbers.title':'Areas, plans and financials — on request.','sec.numbers.intro':'Area figures are public. The financial model — cost, revenue, yield and payment terms — is shared with qualified investors through the pack.',
      'num.public.title':'Public','num.gated.title':'In the pack','num.gfa':'Total GFA','num.saleable':'Useful area','num.land':'Land','num.floors':'Floors','num.residences':'Residences','num.parking':'Parking spaces','num.hotelarea':'Hotel area','num.grade':'District grade','num.grade.v':'A-grade',
      'num.cost':'Development cost','num.revenue':'Unit pricing & yield','num.irr':'Income model & IRR','num.gated.note':'Shared with qualified investors and partners.','num.unlock':'Unlock the financials',

      'sec.dev.eyebrow':'08 — DEVELOPER','sec.dev.title':'Built and delivered by JTSG LLC.','dev.legal':'JTSG LLC',
      'dev.body':'NOMT is developed by JTSG LLC. The 3,175 m² site is secured, the full architectural set is complete (February 2026), and the building is engineered for the Ulaanbaatar climate.',
      'trust.land':'Land secured · 3,175 m²','trust.set':'Architectural set complete · 2026.02','trust.seismic':'Seismic grade 8 · −36 °C','trust.grade':'A-grade location',
      'dev.spec.struct':'Cast RC frame','dev.spec.facade':'Metal + glass facade','dev.spec.fire':'Fire/durability grade II','dev.img.alt':'Exterior of the NOMT complex','dev.img.cap':"NOMT · Artist's impression",

      'sec.partner.eyebrow':'09 — PARTNER','partner.head':'Get the full investor pack.','partner.body':'Floor plans, the income model, cost and return projections, unit pricing and payment terms — sent to qualified investors and partners on request.',
      'form.step.label':'Step 1 / 2','form.step.label2':'Step 2 / 2','form.name':'Name','form.email':'Email','form.company':'Company','form.phone':'Phone','form.type':'Interest',
      'form.type.opt1':'For-sale residences','form.type.opt2':'Serviced apartments','form.type.opt3':'Hotel / office','form.type.opt4':'Fund / partner / individual',
      'form.next':'Continue','form.back':'Back','form.submit':'Get the pack','form.visit':'Arrange a site visit',
      'form.success':"Thank you — your request is ready to send. Your email app will open; we'll follow up personally.",'form.required':'Please enter a name and valid email.','form.privacy':'We use your details only to send the pack and follow up. No third-party tracking.',
      'footer.descriptor':'JTSG LLC — Mixed-use complex, Ulaanbaatar','footer.contact':'Contact','footer.location.v':'Ulaanbaatar, Mongolia','footer.lang.l':'Language',
      'footer.disclaimer':'This page is an indicative teaser for discussion only. It is not an offer of securities, an invitation to invest, or a contract. All figures are indicative and subject to confirmation. Market figures are sourced but are not a guarantee of NOMT returns.',
      'footer.rights':'© 2026 JTSG LLC. All rights reserved.'
    }
  };

  /* --------------------------------------------------------------------------
     BUILDING PROGRAM — explorer shows the 5 PHYSICAL zones (serviced is an
     operating overlay on the residences, covered in its own section).
     -------------------------------------------------------------------------- */
  var ZONES=[
    {key:'res',floors:'8–15',color:'#B58A2E',img:'assets/floor-res',grow:8,nameKey:'stream.residences',tagKey:'zone.res.tag',logicKey:'zone.res.logic',units:true,
      facts:[{l:'label.floors',t:'8–15'},{l:'label.units',t:'64'},{l:'floor.area.l',t:'564 m²'}]},
    {key:'off',floors:'5–7',color:'#3F6E8C',img:'assets/floor-off',grow:3,nameKey:'stream.office',tagKey:'zone.off.tag',logicKey:'zone.off.logic',
      facts:[{l:'label.floors',t:'5–7'},{l:'floor.area.l',t:'1,908 m²'},{l:'label.income',v:'val.lease'}]},
    {key:'hotel',floors:'2–6',color:'#7E4E6E',img:'assets/floor-serv',grow:5,nameKey:'stream.hotel',tagKey:'zone.hotel.tag',logicKey:'zone.hotel.logic',
      facts:[{l:'label.floors',t:'2–6'},{l:'floor.area.l',t:'740 m²'},{l:'label.billing',v:'val.nightly'}]},
    {key:'com',floors:'1–4',color:'#9A6E2E',img:'assets/floor-com',grow:4,nameKey:'stream.commercial',tagKey:'zone.com.tag',logicKey:'zone.com.logic',
      facts:[{l:'label.floors',t:'1–4'},{l:'label.anchors',v:'val.anchorlist'},{l:'label.leases',v:'val.longterm'}]},
    {key:'park',floors:'B1',color:'#5F7065',img:'assets/floor-park',grow:1,nameKey:'stream.parking',tagKey:'zone.park.tag',logicKey:'zone.park.logic',
      facts:[{l:'label.level',t:'B1'},{l:'label.spaces',t:'20'},{l:'label.type',v:'val.automated'}]}
  ];
  var UNITS={
    A:{m2:'74.32',bed:2,rooms:[['room.corridor','9.74'],['room.bath','5.15'],['room.kitchen','6.11'],['room.bedroom','12.72'],['room.living','19.52'],['room.bedroom','15.98'],['room.bath','3.68'],['room.balcony','1.42']]},
    B:{m2:'59.54',bed:1,rooms:[['room.corridor','4.43'],['room.bath','4.62'],['room.kitchen','7.84'],['room.living','27.35'],['room.bedroom','13.89'],['room.balcony','1.42']]},
    C:{m2:'79.29',bed:2,rooms:[['room.corridor','9.48'],['room.bath','4.62'],['room.kitchen','7.84'],['room.bedroom','11.70'],['room.living','24.74'],['room.bedroom','15.63'],['room.bath','3.85'],['room.balcony','1.44']]},
    D:{m2:'68.71',bed:1,rooms:[['room.corridor','4.40'],['room.bath','4.62'],['room.kitchen','10.03'],['room.living','35.03'],['room.bedroom','13.19'],['room.balcony','1.44']]},
    E:{m2:'74.55',bed:2,rooms:[['room.corridor','9.74'],['room.bath','5.15'],['room.kitchen','6.11'],['room.bedroom','12.72'],['room.living','19.52'],['room.bedroom','15.98'],['room.bath','3.92'],['room.balcony','1.42']]},
    F:{m2:'60.10',bed:1,rooms:[['room.corridor','4.39'],['room.bath','4.62'],['room.kitchen','7.97'],['room.living','27.81'],['room.bedroom','13.89'],['room.balcony','1.42']]},
    G:{m2:'79.29',bed:2,rooms:[['room.corridor','9.48'],['room.bath','4.62'],['room.kitchen','7.84'],['room.bedroom','11.70'],['room.living','24.74'],['room.bedroom','15.63'],['room.bath','3.85'],['room.balcony','1.44']]},
    H:{m2:'68.70',bed:1,rooms:[['room.corridor','4.33'],['room.bath','4.62'],['room.kitchen','10.03'],['room.living','35.09'],['room.bedroom','13.19'],['room.balcony','1.44']]}
  };

  var lang='mn', zone='res', unit=null, map=null, mapTried=false;
  var t=function(k){ return (I18N[lang]&&I18N[lang][k]!=null)?I18N[lang][k]:(I18N.mn[k]!=null?I18N.mn[k]:k); };
  var $=function(id){ return document.getElementById(id); };

  function applyLang(l){
    if(LANGS.indexOf(l)===-1) l='mn';
    lang=l;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n'), v=t(k), a=el.getAttribute('data-i18n-attr');
      if(a) el.setAttribute(a,v); else el.textContent=v;
    });
    document.documentElement.lang=l;
    document.documentElement.classList.toggle('font-cjk', l==='zh');
    document.querySelectorAll('[data-lang]').forEach(function(b){ b.setAttribute('aria-pressed', String(b.getAttribute('data-lang')===l)); });
    try{ localStorage.setItem(STORE,l); }catch(e){}
    try{ history.replaceState(null,'','/'+l); }catch(e){}
    renderPanel();
    renderLandmarks();
    setStepLabel();
    if(map){ try{ map.invalidateSize(); }catch(e){} updateMapPopups(); }
  }

  /* ---- building panel ---- */
  var tabs=[].slice.call(document.querySelectorAll('#stackTabs [role="tab"]'));
  function renderPanel(){
    var z=ZONES.filter(function(x){return x.key===zone;})[0]; if(!z) return;
    $('pDot').style.background=z.color; $('pTag').style.color=z.color;
    $('pTag').textContent=t(z.tagKey); $('pName').textContent=t(z.nameKey);
    $('pFloors').textContent=z.floors; $('pLogic').textContent=t(z.logicKey);
    z.facts.forEach(function(m,i){ $('pF'+i+'L').textContent=t(m.l); $('pF'+i+'V').textContent=(m.t!=null)?m.t:t(m.v); });
    $('bPanel').setAttribute('aria-labelledby','tab-'+zone);
    $('unitWrap').style.display = z.units ? '' : 'none';
    var indic = (lang==='zh'?'示意':lang==='en'?'Indicative':'Индикатив');
    if(z.units && unit){
      var u=UNITS[unit];
      $('pSource').setAttribute('srcset','assets/'+unit+'-1600.webp');
      $('pImg').setAttribute('src','assets/'+unit+'-1600.jpg');
      $('pImg').setAttribute('alt', t('unit.title')+' '+unit);
      $('pFloorTag').textContent=indic;
      $('unitDetail').classList.remove('hidden'); $('unitReset').classList.remove('hidden');
      $('uLetter').textContent=unit; $('uBed').textContent=t('unit.bed.'+u.bed);
      $('uArea').textContent=u.m2;
      $('uRooms').innerHTML=u.rooms.map(function(r){return '<div class="flex items-baseline justify-between gap-4 border-b border-hair/70 py-2"><dt class="text-mist">'+t(r[0])+'</dt><dd class="font-mono text-paper tnum">'+r[1]+' m²</dd></div>';}).join('');
    } else {
      $('pSource').setAttribute('srcset', z.img+'-1600.webp');
      $('pImg').setAttribute('src', z.img+'-1600.jpg');
      $('pImg').setAttribute('alt', t(z.nameKey));
      $('pFloorTag').textContent=indic;
      $('unitDetail').classList.add('hidden'); $('unitReset').classList.add('hidden');
    }
    document.querySelectorAll('[data-unit]').forEach(function(c){ c.setAttribute('aria-selected', String(c.getAttribute('data-unit')===unit)); });
  }
  function selZone(k,focus){
    zone=k; unit=null;
    tabs.forEach(function(tb){var on=tb.getAttribute('data-zone')===k; tb.setAttribute('aria-selected',String(on)); tb.setAttribute('tabindex',on?'0':'-1'); if(on&&focus) tb.focus();});
    renderPanel();
  }
  tabs.forEach(function(tb,idx){
    tb.addEventListener('click',function(){selZone(tb.getAttribute('data-zone'),false);});
    tb.addEventListener('keydown',function(e){var n=null;
      if(e.key==='ArrowUp'||e.key==='ArrowLeft') n=(idx-1+tabs.length)%tabs.length;
      else if(e.key==='ArrowDown'||e.key==='ArrowRight') n=(idx+1)%tabs.length;
      else if(e.key==='Home') n=0; else if(e.key==='End') n=tabs.length-1;
      if(n!==null){e.preventDefault(); selZone(tabs[n].getAttribute('data-zone'),true);}});
  });
  document.querySelectorAll('[data-unit]').forEach(function(c){ c.addEventListener('click',function(){ unit=c.getAttribute('data-unit'); renderPanel(); }); });
  if($('unitReset')) $('unitReset').addEventListener('click',function(){ unit=null; renderPanel(); });

  /* ---- language ---- */
  document.querySelectorAll('[data-lang]').forEach(function(b){ b.addEventListener('click',function(){applyLang(b.getAttribute('data-lang'));}); });

  /* ---- multi-step form ---- */
  var form=$('packForm'), msg=$('formMsg');
  function setStepLabel(){ if(!$('stepLabel'))return; var s2=!$('step2').classList.contains('hidden'); $('stepLabel').textContent = s2 ? t('form.step.label2') : t('form.step.label'); }
  function goStep(n){
    $('step1').classList.toggle('hidden', n!==1); $('step2').classList.toggle('hidden', n!==2);
    $('dot1').className='w-6 h-0.5 '+(n>=1?'bg-brass-500':'bg-hair'); $('dot2').className='w-6 h-0.5 '+(n>=2?'bg-brass-500':'bg-hair');
    setStepLabel();
  }
  var emailOk=function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };
  if(form){
    $('toStep2').addEventListener('click',function(){
      var n=(form.name.value||'').trim(), e=(form.email.value||'').trim();
      if(!n||!emailOk(e)){ msg.textContent=t('form.required'); msg.className='text-sm mt-5 min-h-[1.25rem] text-brass-300'; (!n?form.name:form.email).focus(); return; }
      msg.textContent=''; goStep(2);
    });
    $('toStep1').addEventListener('click',function(){ msg.textContent=''; goStep(1); });
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var n=(form.name.value||'').trim(), em=(form.email.value||'').trim();
      if(!n||!emailOk(em)){ goStep(1); msg.textContent=t('form.required'); msg.className='text-sm mt-5 min-h-[1.25rem] text-brass-300'; return; }
      var body=encodeURIComponent('Name: '+n+'\nCompany: '+(form.company.value||'')+'\nEmail: '+em+'\nPhone: '+(form.phone.value||'')+'\nInterest: '+(form.type.value||'')+'\n\nPlease send the NOMT investor pack.');
      window.location.href='mailto:lcdelgets@gmail.com?subject='+encodeURIComponent('NOMT — Investor pack request')+'&body='+body;
      msg.textContent=t('form.success'); msg.className='text-sm mt-5 min-h-[1.25rem] text-stream-serv'; form.reset(); goStep(1);
    });
  }

  /* ---- reveal + parallax + progress + section index ---- */
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target); }});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('[data-reveal], .img-cine').forEach(function(n){io.observe(n);});
    var st=$('stackTabs'); if(st){ var so=new IntersectionObserver(function(es){es.forEach(function(en){ if(en.isIntersecting){ st.classList.add('stack-anim'); so.unobserve(en.target); }});},{threshold:.2}); so.observe(st); }
  } else { document.querySelectorAll('[data-reveal], .img-cine').forEach(function(n){n.classList.add('is-in');}); }

  var idx=[].slice.call(document.querySelectorAll('[data-idx]'));
  var px=[].slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking=false;
  function onScroll(){
    if(ticking) return; ticking=true;
    requestAnimationFrame(function(){
      var h=document.documentElement; var p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);
      $('progress').style.setProperty('--p', Math.max(0,Math.min(1,p)));
      if(!reduce) px.forEach(function(im){ var r=im.getBoundingClientRect(); var off=(r.top+r.height/2-window.innerHeight/2)*-(parseFloat(im.dataset.parallax)||.1); im.style.transform='scale(1.12) translate3d(0,'+off.toFixed(1)+'px,0)'; });
      var cur=''; idx.forEach(function(a){ var el=document.querySelector(a.getAttribute('href')); if(el && el.getBoundingClientRect().top<window.innerHeight*0.5) cur=a.getAttribute('href'); });
      idx.forEach(function(a){a.setAttribute('aria-current', String(a.getAttribute('href')===cur));});
      ticking=false;
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true}); window.addEventListener('resize',onScroll);

  /* ---- LOCATION: landmark list + lazy Leaflet ---- */
  function renderLandmarks(){
    var box=$('lmList'); if(!box) return;
    box.innerHTML=SITE.landmarks.map(function(m,i){
      return '<li><button type="button" class="landmark btn w-full text-left bg-ink px-5 py-4 flex items-center gap-4" data-lm="'+i+'">'+
        '<span class="dot w-2.5 h-2.5 shrink-0 bg-brass-500"></span>'+
        '<span class="min-w-0 flex-1"><span class="block text-paper text-sm">'+t(m.key)+'</span>'+
        '<span class="block font-mono text-mist-dim text-xs tracking-[0.08em] mt-0.5">'+t(m.key+'.d')+'</span></span>'+
        '</button></li>';
    }).join('');
    box.querySelectorAll('[data-lm]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var i=+btn.getAttribute('data-lm'), m=SITE.landmarks[i];
        box.querySelectorAll('.landmark').forEach(function(x){x.setAttribute('aria-current','false');});
        btn.setAttribute('aria-current','true');
        if(map){ map[reduce?'setView':'flyTo']([m.lat,m.lng], 16); }
      });
    });
  }

  var markers=[];
  function siteIcon(isSite,label){
    return L.divIcon({className:'', html:'<div class="nomt-pin'+(isSite?' is-site':'')+'">'+(isSite?'<span class="pin-core"></span>':'')+'</div>'+(isSite?'<span class="nomt-lab">'+label+'</span>':''), iconSize:[isSite?26:18,isSite?26:18], iconAnchor:[isSite?13:9,isSite?13:9]});
  }
  function updateMapPopups(){
    markers.forEach(function(mk){ if(mk._lmKey){ mk.setPopupContent('<b>'+t(mk._lmKey)+'</b><br>'+t(mk._lmKey+'.d')); } });
    if(markers[0]&&markers[0]._isSite){ markers[0].setIcon(siteIcon(true,t('lm.site'))); markers[0].setPopupContent('<b>'+t('lm.site')+'</b><br>'+t('loc.fallback.body')); }
  }
  function mapFallback(){
    var el=$('map'); if(!el) return;
    var url='https://www.openstreetmap.org/?mlat='+SITE.lat+'&mlon='+SITE.lng+'#map='+SITE.zoom+'/'+SITE.lat+'/'+SITE.lng;
    el.innerHTML='<div class="h-full w-full grid place-items-center bg-ink-card p-8 text-center">'+
      '<div><p class="font-display text-display-md text-paper mb-3">'+t('loc.fallback.title')+'</p>'+
      '<p class="text-mist max-w-sm mx-auto mb-6">'+t('loc.fallback.body')+'</p>'+
      '<a href="'+url+'" target="_blank" rel="noopener" class="btn inline-flex items-center rounded-full border border-brass-500/60 hover:bg-brass-500/10 text-paper font-mono text-[12px] tracking-[0.16em] uppercase px-5 py-2.5">'+t('loc.fallback.link')+'</a></div></div>';
  }
  function buildMap(){
    if(typeof L==='undefined'){ mapFallback(); return; }
    try{
      map=L.map('map',{scrollWheelZoom:false,keyboard:true,attributionControl:true}).setView([SITE.lat,SITE.lng],SITE.zoom);
      var fail=0;
      var layer=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'});
      layer.on('tileerror',function(){ if(++fail>6 && !map._ok){ mapFallback(); } });
      layer.on('load',function(){ map._ok=true; });
      layer.addTo(map);
      var site=L.marker([SITE.lat,SITE.lng],{icon:siteIcon(true,t('lm.site')),keyboard:true,title:t('lm.site')}).addTo(map);
      site._isSite=true; site.bindPopup('<b>'+t('lm.site')+'</b><br>'+t('loc.fallback.body')); markers.push(site);
      SITE.landmarks.forEach(function(m){
        var mk=L.marker([m.lat,m.lng],{icon:siteIcon(false),title:t(m.key)}).addTo(map);
        mk._lmKey=m.key; mk.bindPopup('<b>'+t(m.key)+'</b><br>'+t(m.key+'.d')); markers.push(mk);
      });
      setTimeout(function(){ try{map.invalidateSize();}catch(e){} },200);
    }catch(e){ mapFallback(); }
  }
  function loadLeaflet(){
    if(mapTried) return; mapTried=true;
    var css=document.createElement('link'); css.rel='stylesheet';
    css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    css.integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='; css.crossOrigin='';
    document.head.appendChild(css);
    var js=document.createElement('script');
    js.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='; js.crossOrigin='';
    js.onload=buildMap; js.onerror=mapFallback;
    document.body.appendChild(js);
    setTimeout(function(){ if(!map && !$('map').firstChild) mapFallback(); }, 9000);
  }
  (function initMapLazy(){
    var el=$('map'); if(!el) return;
    if('IntersectionObserver' in window){
      var mo=new IntersectionObserver(function(es){es.forEach(function(en){ if(en.isIntersecting){ loadLeaflet(); mo.disconnect(); }});},{rootMargin:'300px'});
      mo.observe(el);
    } else { loadLeaflet(); }
  })();

  /* ---- init ---- */
  (function init(){
    var fp=(location.pathname||'').replace(/\/+$/,'').split('/').pop(), stored=null;
    try{ stored=localStorage.getItem(STORE); }catch(e){}
    renderLandmarks();
    applyLang(LANGS.indexOf(fp)>-1?fp:(LANGS.indexOf(stored)>-1?stored:'mn'));
    onScroll();
  })();
})();
