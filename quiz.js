const QUESTIONS = [
  {
    q: "Mi az a trash-műsor, amit Dóri csak akkor néz, ha nem vagy otthon, mert annyira gáz?",
    type: "list",
    a: ["Heated Rivalry", "Too Hot to Handle"],
  },
  {
    q: "Melyik volt az a közös programotok, ami annyira katasztrofálisan sült el, hogy azóta is csak röhögtök rajta?",
    type: "text",
    a: "Hullámvasútazás",
  },
  {
    q: "Szerinted a vőlegény mennyire lesz papucs férj, 1-10 között?",
    type: "text",
    a: "8",
  },
  {
    q: "Mi az első kép Dóri telefonjában rólad?",
    type: "image",
    a: "images/iqos.jpg",
  },
  {
    q: "Utánozd a párod legviccesebb tipikus mondatait!",
    type: "list",
    a: ["Jövök a pillanaton!", "Tho tho Tomi, mikor csikized"],
  },
  {
    q: "Mi az első dolog, amit Dóri megtanítana neked a leendő anyósod kezeléséről?",
    type: "text",
    a: "Meg kell kérdezni, hogy miben segíthetek",
  },
  {
    q: "Mi az a hobbija Dórinak, amit Tomi támogat, de valójában mindig keresztbe tesz neki?",
    type: "text",
    a: "Olvasás",
  },
  {
    q: "Dóri szerint ki az új kedvenc rokonod, akit neki köszönhetsz?",
    type: "text",
    a: "A keresztfiad",
  },
  {
    q: "Ha Dóri választana magának egy „munkaruhát” egy pajzán estére, az mi lenne?",
    type: "text",
    a: "Diáklány",
  },
  {
    q: "Melyik az a terhelő kép rólad Tomi, amit ha egy másik lány meglátna, nem engedne be a hálószobába?",
    type: "image",
    a: "images/pizsama.jpg",
  },
  {
    q: "Mi az a dolog, amit részegen csinál Dóri, de józanon elítél?",
    type: "text",
    a: "Közterületen pisilés",
  },
  {
    q: "Mi Tomi titkos fegyvere, amivel leveszi Dórit a lábáról?",
    type: "text",
    a: "A csikizés",
  },
  {
    q: "Mi volt a legkevésbé izgató mondat, amit az ágyban mondtál Dórinak?",
    type: "text",
    a: "Boldog nőnapot",
  },
  {
    q: "Ha Dóri kitörölhetne egyetlen közös emléket, melyik lenne az?",
    type: "text",
    a: "Az első kávézás",
  },
  {
    q: "Mi az a szokása Tominak, amit Dóri sose fog megérteni?",
    type: "text",
    a: "Amikor Dóri szemébe nézve fingik",
  },
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
    img.alt = "Leleplező kép";
    els.answer.appendChild(img);
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
els.actionBtn.addEventListener("click", handleAction);
els.restartBtn.addEventListener("click", restart);
