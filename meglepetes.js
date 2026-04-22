const QUESTIONS = [
  {
    asker: "Adri",
    q: "Amikor beültünk spontán a …-ba iszogatni, megtudtam rólad, hogy borszakértő vagy. Aznap azt is megtudtam, hogy én bírom a legrosszabbul a piát — nektek a rákövetkező Aperolok sem kottyantak meg.",
    a: "Hadik",
  },
  {
    asker: "Merci",
    q: "„Amikor a Bagolyvár kollégiumban készülődtünk az estére, Magdi néni házi készítésű …-jából mindig ehettem egy jót — és ez nagyon jól jött buli előtt.”",
    a: "Zakuszka",
  },
  {
    asker: "Bini",
    q: "Hány shot járt ingyen a mallorcai bárokban, amikor próbáltak minket beinvitálni?",
    a: "Kettő",
  },
  {
    asker: "Greta",
    q: "Közös sulis éveink alatt — amíg épp nem ültettek szét bennünket, mert Te nem bírtad ki csendben — …-t játszottunk.",
    a: "Amőba",
  },
  {
    asker: "Kriszti",
    q: "Krisztivel az irodában szenvedtünk, hogy szar az élet, aztán megálmodtuk a megoldást: kell nekünk egy jó …-i bor. És így is lett — 1 hónap múlva már ittuk, és instant be is rúgtunk tőle délben.",
    a: "Porto",
  },
  {
    asker: "Eszter",
    q: "Eszter tisztán emlékszik, hogy a gimis filmklubban és filmtáborban a … filmeken mindig elszorítottad a kezét a félelemtől. 🤣",
    a: "Hitchcock",
  },
  {
    asker: "Klau",
    q: "Hogy hívták az „én kiveszem, te bekapod” srácot?",
    a: "Martin",
  },
  {
    asker: "Zsuzsi",
    q: "Zsuzsival a legjobb beszélgetések helyszíne (bár rég volt)?",
    a: "Fürdőkád",
  },
];

const SECRET = "ALICANTE";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LETTERS = shuffle(SECRET.split(""));

const state = {
  index: 0,
  revealed: false,
  guess: [],
  pool: [],
};

const screens = {
  intro: document.getElementById("screen-intro"),
  quiz: document.getElementById("screen-quiz"),
  unscramble: document.getElementById("screen-unscramble"),
  finish: document.getElementById("screen-finish"),
};

const els = {
  startBtn: document.getElementById("start-btn"),
  progress: document.getElementById("progress"),
  lettersBank: document.getElementById("letters-bank"),
  asker: document.getElementById("asker"),
  question: document.getElementById("question"),
  answer: document.getElementById("answer"),
  actionBtn: document.getElementById("action-btn"),
  guessRow: document.getElementById("guess-row"),
  poolRow: document.getElementById("pool-row"),
  checkBtn: document.getElementById("check-btn"),
  giveupBtn: document.getElementById("giveup-btn"),
  unscrambleMsg: document.getElementById("unscramble-msg"),
  finishLead: document.getElementById("finish-lead"),
  restartBtn: document.getElementById("restart-btn"),
};

function showScreen(name) {
  for (const k of Object.keys(screens)) {
    screens[k].classList.toggle("active", k === name);
  }
}

function revealedCount() {
  return state.revealed ? state.index + 1 : state.index;
}

function renderLettersBank() {
  els.lettersBank.innerHTML = "";
  const filled = revealedCount();
  for (let i = 0; i < LETTERS.length; i++) {
    const slot = document.createElement("span");
    slot.className = "letter-slot";
    if (i < filled) {
      slot.textContent = LETTERS[i];
      slot.classList.add("filled");
      if (i === filled - 1 && state.revealed) slot.classList.add("new");
    }
    els.lettersBank.appendChild(slot);
  }
}

function renderQuestion() {
  const item = QUESTIONS[state.index];
  els.progress.textContent = `${state.index + 1} / ${QUESTIONS.length}`;
  els.asker.textContent = `${item.asker} kérdezi`;
  els.question.textContent = item.q;
  els.answer.innerHTML = "";
  els.answer.classList.remove("visible");
  els.actionBtn.textContent = "Felfedés";
  els.actionBtn.dataset.mode = "reveal";
  state.revealed = false;
  renderLettersBank();
}

function renderAnswer(item) {
  els.answer.innerHTML = "";
  const p = document.createElement("p");
  p.className = "answer-text";
  p.textContent = item.a;
  els.answer.appendChild(p);
}

function handleAction() {
  if (!state.revealed) {
    renderAnswer(QUESTIONS[state.index]);
    requestAnimationFrame(() => els.answer.classList.add("visible"));
    state.revealed = true;
    renderLettersBank();
    els.actionBtn.textContent =
      state.index === QUESTIONS.length - 1 ? "Meglepetés!" : "Következő";
    els.actionBtn.dataset.mode = "next";
  } else {
    if (state.index === QUESTIONS.length - 1) {
      startUnscramble();
    } else {
      state.index += 1;
      renderQuestion();
    }
  }
}

function startQuiz() {
  state.index = 0;
  state.revealed = false;
  renderQuestion();
  showScreen("quiz");
}

function startUnscramble() {
  state.guess = [];
  state.pool = LETTERS.map((letter, i) => ({ letter, id: i }));
  renderUnscramble();
  showScreen("unscramble");
  els.unscrambleMsg.textContent = "";
  els.unscrambleMsg.className = "unscramble-msg";
}

function renderUnscramble() {
  els.poolRow.innerHTML = "";
  els.guessRow.innerHTML = "";

  for (const tile of state.pool) {
    const btn = document.createElement("button");
    btn.className = "tile tile-pool";
    btn.textContent = tile.letter;
    btn.addEventListener("click", () => moveToGuess(tile.id));
    els.poolRow.appendChild(btn);
  }

  for (let i = 0; i < LETTERS.length; i++) {
    const slot = document.createElement("div");
    slot.className = "tile-slot";
    if (state.guess[i]) {
      const btn = document.createElement("button");
      btn.className = "tile tile-guess";
      btn.textContent = state.guess[i].letter;
      btn.addEventListener("click", () => moveToPool(i));
      slot.appendChild(btn);
    } else {
      slot.classList.add("tile-slot-empty");
    }
    els.guessRow.appendChild(slot);
  }
}

function moveToGuess(id) {
  if (state.guess.length >= LETTERS.length) return;
  const i = state.pool.findIndex((t) => t.id === id);
  if (i === -1) return;
  const [tile] = state.pool.splice(i, 1);
  state.guess.push(tile);
  renderUnscramble();
}

function moveToPool(guessIndex) {
  const tile = state.guess[guessIndex];
  if (!tile) return;
  state.guess.splice(guessIndex, 1);
  state.pool.push(tile);
  renderUnscramble();
}

function checkGuess() {
  const word = state.guess.map((t) => t.letter).join("");
  if (word.length < LETTERS.length) {
    flashMsg("Rakd ki mind a 8 betűt!", "warn");
    return;
  }
  if (word === SECRET) {
    showScreen("finish");
    els.finishLead.textContent = "Eltaláltad! Oda repültök lánybúcsúzni! 🌅🍷";
    launchConfetti();
  } else {
    els.guessRow.classList.remove("shake");
    void els.guessRow.offsetWidth;
    els.guessRow.classList.add("shake");
    flashMsg("Nem stimmel — próbáld újra!", "warn");
  }
}

function giveUp() {
  showScreen("finish");
  els.finishLead.textContent =
    "Feladtad — de nem baj! Ez a meglepetés: oda repültök lánybúcsúzni! 🌅🍷";
  launchConfetti();
}

function flashMsg(text, kind) {
  els.unscrambleMsg.textContent = text;
  els.unscrambleMsg.className = "unscramble-msg " + (kind || "");
}

function restart() {
  showScreen("intro");
}

function launchConfetti() {
  const container = document.getElementById("confetti");
  container.innerHTML = "";
  const colors = ["#ff2d87", "#ff4fd8", "#a855ff", "#ff6a00", "#fff200", "#00e5ff"];
  for (let i = 0; i < 120; i++) {
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
els.checkBtn.addEventListener("click", checkGuess);
els.giveupBtn.addEventListener("click", giveUp);
els.restartBtn.addEventListener("click", restart);
