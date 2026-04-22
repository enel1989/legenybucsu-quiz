const QUESTIONS = [
  { q: "Hogyan issza a kávét?", type: "text", a: "Tejjel, cukor nélkül (cappuccino)" },
  { q: "Milyen állat lenne, ha lehetne?", type: "text", a: "Cápa" },
  { q: "Mi a kedvenc autómárkája?", type: "text", a: "Mercedes" },
  { q: "Mi az álommunka számára?", type: "text", a: "Forgatókönyvíró" },
  { q: "Mikor volt először lánnyal?", type: "text", a: "17 évesen" },
  { q: "Melyik testrészedet szereti a leginkább?", type: "text", a: "A lábaidat ;)" },
  { q: "Melyik filmet láttátok először együtt?", type: "text", a: "Talán az Interstellar", note: "De nem 100% :)" },
  { q: "Kutya vagy macska?", type: "text", a: "Imádja mindkettőt, de kutya" },
  { q: "Mikor rúgott be először?", type: "text", a: "15 évesen" },
  { q: "Mi akart lenni kiskorában?", type: "text", a: "Válogatott vízilabdás" },
  { q: "Hogy hívják a gyerekkori szerelmét?", type: "text", a: "Adél" },
  { q: "Hány gyereket szeretne?", type: "text", a: "2" },
  { q: "Mit vinne magával egy lakatlan szigetre?", type: "list", a: ["Kést", "Egy „Hogyan élj túl” könyvet"], note: "Sorry, jobb nem jutott eszébe :)" },
  { q: "Mi a kedvenc reggelije?", type: "list", a: ["Görögjoghurt granolával", "…vagy ZAKUSZKAAA"] },
  { q: "Milyen nevet adna a születendő gyerekének?", type: "list", a: ["Lány: Luca", "Fiú: Tamás"] },
  { q: "Milyen házimunkát csinál a legszívesebben?", type: "text", a: "Hűtőbe pakolás" },
  { q: "Mi az a szó, amit a legjobban utál?", type: "text", a: "Fidesz" },
  { q: "Melyik a legfurább szokása a barátaival?", type: "text", a: "Politizálás?!" },
  { q: "Mi a legfurább étel, amit megeszik?", type: "text", a: "Mindenféle tengeri herkentyű" },
  { q: "Mit tart a kocsija kesztyűtartójában?", type: "list", a: ["Napszemüveg", "Forgalmi"] },
  { q: "Mit mond, ha káromkodik?", type: "text", a: "„Hát a faszomat”" },
  { q: "Hogy hívta anyukája gyerekkorában?", type: "text", a: "Totó" },
  {
    q: "Mi volt a legcikibb élménye kamaszkorából?",
    type: "link",
    a: "Mikor szerelmi bánattal, berúgva hazafelé a szilveszteri buliból letépett egy táblát — és felvette a kamera.",
    href: "https://www.youtube.com/watch?v=UpXcZVVK640",
    linkLabel: "Megnézem a bizonyítékot ▶"
  },
  { q: "Ha híres ember lenne, miről lenne híres?", type: "text", a: "Sport — talán vízilabda" },
  { q: "Mi volt a jele az oviban?", type: "text", a: "Lufi 🎈" },
  { q: "Melyik korban élne a legszívesebben?", type: "text", a: "„Nekem jó most”" },
  { q: "Ki a legjobb barátja?", type: "text", a: "Nehéz kérdés — Cibire testvéreként gondol, de jelenleg Bence" },
  { q: "Hány naponta borotválkozik?", type: "text", a: "Csak szakállt nyír, kb. heti 1x" },
  { q: "Melyik a kedvenc együttese?", type: "list", a: ["Nincs igazi kedvenc, csak előadók", "Queen", "Khruangbin"] },
  { q: "Hány évesen szerezte a jogsiját?", type: "text", a: "17 évesen" },
  { q: "Volt eltörve csontja életében? Ha igen, mi?", type: "text", a: "Nem volt" },
  { q: "Mi az az étel, amit soha nem enne meg?", type: "text", a: "Mazsola" },
  {
    q: "Mi az, amit sosem osztana meg veled?",
    type: "text",
    a: "Ha kiderülne, hogy roma — akkor valószínűleg elhagyna",
    note: "(És mégis: Szabolcsi Dóri 😅)"
  },
  { q: "Hason vagy háton fekve alszik?", type: "text", a: "Hason" },
  { q: "Mi volt a legrövidebb munkája?", type: "text", a: "Sziget — 1 hét mixerkedés (de egyben a legjobb is :D)" },
  { q: "Milyen koncerten volt életében először és hány évesen?", type: "text", a: "Gáspár Laci — 8–10 évesen :D" },
  { q: "Mi az, amit egy lányon/lányban nem bír elviselni?", type: "text", a: "„Ha buta, mint a segg”" },
  { q: "Mi az a bakancslistás hely, ahova mindenképp szeretne eljutni?", type: "text", a: "Afrikaaa 🌍" },
  { q: "Mi a legrosszabb ital, amit valaha megkóstolt?", type: "text", a: "Ukrán ablaklemosó ízű vodka" },
  { q: "Mi a hobbija?", type: "list", a: ["Dolgozni a saját kis appján", "Barátokkal lenni"] },
  { q: "Hogy hívták a nagymamáit?", type: "list", a: ["Jolán", "Irén"] },
  { q: "Van-e olyan zöldség, amit utál? Melyik az?", type: "text", a: "Lidl-es uborka (az ubit egyébként szereti, de az borzasztó)" },
  { q: "Mi az, ami nélkül nem tudna élni?", type: "text", a: "Ha tárgy: a laptopja" },
  { q: "Savas vagy mentes víz?", type: "text", a: "Savas" },
  {
    q: "Mit tenne egy időkapszulába, amit a 20 évvel idősebb önmagának szán?",
    type: "text",
    a: "Videót venne magáról: a jelenlegi életéről, a fontos emberekről, és arról, mit szeretne elérni a következő 20 évben."
  },
  { q: "Mi a kedvenc könyve?", type: "text", a: "Nincs ilyen" },
  {
    q: "Milyen magas?",
    type: "text",
    a: "190 cm",
    note: "🍹 Ha 188-at mer mondani → duplán iszik!"
  },
  { q: "Mi a kedvenc színe?", type: "text", a: "Kék" },
  { q: "Mikor született? (óra, perc)", type: "text", a: "1996. 04. 25. — 9:10" },
  { q: "Ha az életének lenne főcímdala, mi lenne az?", type: "text", a: "Never stop" },
  { q: "Mit gondol az ananászról a pizzán?", type: "text", a: "„Mindenféle szart szeretek, úgyhogy ezt is szívesen megeszem.”" },
  { q: "Tojáskérdés: rántotta / omlett / főtt / tükör?", type: "text", a: "Dóri-féle rántotta 💗" },
  {
    q: "Minek szereti, ha hívod?",
    type: "list",
    a: ["Cicus — ha valami huncutságot csinált, de nem túl rosszat :DDD", "Mókus is elfogadható :)"]
  },
  { q: "Milyen sör?", type: "text", a: "Blanc" },
  { q: "Hány grammal született?", type: "text", a: "4000 g" },
  { q: "Melyik szemével szokott kacsintani?", type: "text", a: "Bal" },
  { q: "Mivel lehet lenyugtatni, ha mérges?", type: "list", a: ["Nyugicumival :D", "…komolyra fordítva: megértő beszélgetéssel és ölelgetéssel"] },
  { q: "Mitől pirul el a leghamarabb?", type: "text", a: "„Fhuu passz, nem szoktam nagyon.” Amikor még ismerkedtek és zavarban volt melletted — az biztos." },
  { q: "Imitáld, ahogy fütyül!", type: "text", a: "Van egy tipikus dallama — Zsuzsi biztos tudni fogja 🎶" },
  { q: "Szerinte hány kérdésre tudtál válaszolni?", type: "text", a: "33 / 60" },
];

const state = { index: 0, revealed: false };

const screens = {
  intro: document.getElementById("screen-intro"),
  quiz: document.getElementById("screen-quiz"),
  finish: document.getElementById("screen-finish"),
};

const els = {
  startBtn: document.getElementById("start-btn"),
  progress: document.getElementById("progress"),
  question: document.getElementById("question"),
  answer: document.getElementById("answer"),
  actionBtn: document.getElementById("action-btn"),
  restartBtn: document.getElementById("restart-btn"),
};

function showScreen(name) {
  for (const k of Object.keys(screens)) {
    screens[k].classList.toggle("active", k === name);
  }
}

function renderAnswer(item) {
  els.answer.innerHTML = "";

  if (item.type === "text") {
    const p = document.createElement("p");
    p.className = "answer-text";
    p.textContent = item.a;
    els.answer.appendChild(p);
  } else if (item.type === "list") {
    const ul = document.createElement("ul");
    ul.className = "answer-list";
    for (const line of item.a) {
      const li = document.createElement("li");
      li.textContent = line;
      ul.appendChild(li);
    }
    els.answer.appendChild(ul);
  } else if (item.type === "image") {
    const img = document.createElement("img");
    img.className = "answer-image";
    img.src = item.a;
    img.alt = "Kép";
    els.answer.appendChild(img);
  } else if (item.type === "link") {
    const wrap = document.createElement("div");
    wrap.className = "answer-link-wrap";
    const p = document.createElement("p");
    p.className = "answer-text";
    p.textContent = item.a;
    wrap.appendChild(p);
    const a = document.createElement("a");
    a.className = "answer-link";
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = item.linkLabel || "Megnyitás";
    wrap.appendChild(a);
    els.answer.appendChild(wrap);
  }

  if (item.note) {
    const note = document.createElement("p");
    note.className = "answer-note";
    note.textContent = item.note;
    els.answer.appendChild(note);
  }
}

function renderQuestion() {
  const item = QUESTIONS[state.index];
  els.progress.textContent = `${state.index + 1} / ${QUESTIONS.length}`;
  els.question.textContent = item.q;
  els.answer.innerHTML = "";
  els.answer.classList.remove("visible");
  els.actionBtn.textContent = "Felfedés";
  els.actionBtn.dataset.mode = "reveal";
  state.revealed = false;
}

function handleAction() {
  if (!state.revealed) {
    renderAnswer(QUESTIONS[state.index]);
    requestAnimationFrame(() => els.answer.classList.add("visible"));
    els.actionBtn.textContent =
      state.index === QUESTIONS.length - 1 ? "Befejezés" : "Következő";
    els.actionBtn.dataset.mode = "next";
    state.revealed = true;
  } else {
    if (state.index === QUESTIONS.length - 1) {
      showScreen("finish");
      launchConfetti();
    } else {
      state.index += 1;
      renderQuestion();
    }
  }
}

function startQuiz() {
  state.index = 0;
  renderQuestion();
  showScreen("quiz");
}

function restart() {
  showScreen("intro");
}

function launchConfetti() {
  const container = document.getElementById("confetti");
  container.innerHTML = "";
  const colors = ["#ff2d87", "#ff4fd8", "#a855ff", "#ff6a00", "#fff200", "#00e5ff"];
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = Math.random() * 2 + "s";
    piece.style.animationDuration = 2.5 + Math.random() * 2 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
  }
}

els.startBtn.addEventListener("click", startQuiz);
els.actionBtn.addEventListener("click", handleAction);
els.restartBtn.addEventListener("click", restart);
