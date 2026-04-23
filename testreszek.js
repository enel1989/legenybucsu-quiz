const PARTS = [
  { key: "szem", label: "Szem 👁️" },
  { key: "ful", label: "Fül 👂" },
  { key: "nyak", label: "Nyak" },
  { key: "kez", label: "Kéz ✋" },
  { key: "konyok", label: "Könyök" },
  { key: "koldok", label: "Köldök" },
];

const GIRLS = ["dori", "kriszti", "zsuzsi"];
const GIRL_NAMES = { dori: "Dóri", kriszti: "Kriszti", zsuzsi: "Zsuzsi" };
const CORRECT = "dori";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const state = { index: 0, chose: null, correct: 0, rounds: shuffle(PARTS) };

const screens = {
  intro: document.getElementById("screen-intro"),
  quiz: document.getElementById("screen-quiz"),
  finish: document.getElementById("screen-finish"),
};

const els = {
  startBtn: document.getElementById("start-btn"),
  progress: document.getElementById("progress"),
  partLabel: document.getElementById("part-label"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  nextBtn: document.getElementById("next-btn"),
  score: document.getElementById("score"),
  finishLead: document.getElementById("finish-lead"),
  restartBtn: document.getElementById("restart-btn"),
};

function showScreen(name) {
  for (const k of Object.keys(screens)) {
    screens[k].classList.toggle("active", k === name);
  }
}

function renderRound() {
  const part = state.rounds[state.index];
  state.chose = null;

  els.progress.textContent = `${state.index + 1} / ${state.rounds.length}`;
  els.partLabel.textContent = part.label;
  els.choices.innerHTML = "";
  els.choices.classList.remove("revealed");
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.nextBtn.classList.add("hidden");

  const order = shuffle([...GIRLS]);
  for (const girl of order) {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.dataset.girl = girl;

    const img = document.createElement("img");
    img.src = `images/testreszek/${girl}/${part.key}.jpg`;
    img.alt = part.label;
    img.loading = "eager";
    btn.appendChild(img);

    const badge = document.createElement("span");
    badge.className = "badge";
    btn.appendChild(badge);

    btn.addEventListener("click", () => handleChoice(girl));
    els.choices.appendChild(btn);
  }
}

function handleChoice(girl) {
  if (state.chose) return;
  state.chose = girl;
  const right = girl === CORRECT;
  if (right) state.correct += 1;

  els.choices.classList.add("revealed");
  for (const btn of els.choices.querySelectorAll(".choice")) {
    const g = btn.dataset.girl;
    const badge = btn.querySelector(".badge");
    badge.textContent = GIRL_NAMES[g];
    if (g === CORRECT) btn.classList.add("correct");
    if (g === girl && !right) btn.classList.add("wrong-pick");
  }

  els.feedback.textContent = right ? "Eltaláltad! 🎯" : "Hoppá — nem ez volt!";
  els.feedback.classList.add(right ? "correct" : "wrong");
  els.nextBtn.classList.remove("hidden");
  els.nextBtn.textContent =
    state.index === state.rounds.length - 1 ? "Eredmény" : "Következő";
}

function handleNext() {
  if (state.index === state.rounds.length - 1) {
    showFinish();
  } else {
    state.index += 1;
    renderRound();
  }
}

function showFinish() {
  const total = state.rounds.length;
  els.score.textContent = `${state.correct} / ${total}`;
  if (state.correct === total) {
    els.finishLead.textContent = "Hibátlan! Tomi vakon is kiszúrná Dórit. 💘";
  } else if (state.correct >= total / 2) {
    els.finishLead.textContent = "Szép munka — Tomi jól ismeri Dórit!";
  } else {
    els.finishLead.textContent = "Hmm… Tomi, most már tanuld meg. 😏";
  }
  showScreen("finish");
  launchConfetti();
}

function startQuiz() {
  state.index = 0;
  state.correct = 0;
  state.rounds = shuffle(PARTS);
  renderRound();
  showScreen("quiz");
}

function restart() {
  showScreen("intro");
}

function launchConfetti() {
  const container = document.getElementById("confetti");
  container.innerHTML = "";
  const colors = ["#ff4d8d", "#ffd166", "#06d6a0", "#4cc9f0", "#b892ff"];
  for (let i = 0; i < 80; i++) {
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
els.nextBtn.addEventListener("click", handleNext);
els.restartBtn.addEventListener("click", restart);
