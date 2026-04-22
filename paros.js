const QUESTIONS = [
  { q: "Ki kezdeményezte az első csókot?", type: "text", a: "Tomi" },
  {
    q: "Mi volt az első ajándék, amit tőle kaptál?",
    type: "list",
    a: ["Tárgy: bokalánc", "Élmény: ráckevei hajózás"],
  },
  {
    q: "Mi volt az első benyomása rólad?",
    type: "text",
    a: "Nagyon cserfes — a nézésed és az óriási szemeid fogták meg.",
  },
  {
    q: "Mikor mondta először, hogy szeret?",
    type: "text",
    a: "Szeptember elején, a XIII. kerületi albim teraszán.",
  },
  {
    q: "Mi volt a legviccesebb közös élményetek?",
    type: "text",
    a: "Nehéz választani — legyen mondjuk a lánykérés.",
    note: "„Fhú, hát van nagyon sok…”",
  },
  { q: "Mi volt a legnagyobb vitátok?", type: "text", a: "Robin szülinapja" },
  {
    q: "Mi volt szerinte a legromantikusabb pillanatotok?",
    type: "text",
    a: "A ráckevei hajózás — olyan randi-ötlet volt, amire évekig várt, hogy a megfelelő lányt vigye el.",
  },
  {
    q: "Mikor tudta biztosan, hogy feleségül vesz?",
    type: "text",
    a: "Amikor összejöttek — „csak úgy nem kezdek bele egy kapcsolatba.”",
  },
  {
    q: "Mi a legidegesítőbb szokásod szerinte?",
    type: "text",
    a: "A hirtelen felháborodás.",
  },
  {
    q: "Mi az ő legidegesítőbb szokása?",
    type: "text",
    a: "Szétszórt, feledékeny.",
  },
  {
    q: "Mi az a kaja, amit szeretsz, ő viszont utál?",
    type: "text",
    a: "Nyers vagy véresebb húsi — pl. steak vagy a kolbász.",
  },
  { q: "Mi az, amire mindig pénzt költ?", type: "text", a: "Utazás ✈️" },
  {
    q: "Mi a kedvenc közös programotok?",
    type: "list",
    a: ["Utazás", "Baráti találkozók", "Otthon: sorozatozás"],
  },
  { q: "Mi az a dolog, amin mindig összevesztek?", type: "text", a: "Anyám 😅" },
  {
    q: "Mi a legfurább szokása?",
    type: "text",
    a: "Lábköröm letépése — talán.",
  },
  {
    q: "Mi volt az első gondolata, amikor meglátott?",
    type: "text",
    a: "„Én valahonnan ismerem ezt a lányt.”",
  },
  {
    q: "Mi az, amit mindig csinál Dóri, amikor részeg?",
    type: "list",
    a: ["Hány 🤢", "De komolyan: hangosan magyaráz és nevet"],
  },
  {
    q: "Mi volt a legromantikusabb dolog, amit Dóri érted csinált?",
    type: "text",
    a: "Hát, hogy dobta érted az exét 💔",
  },
  {
    q: "Mi benned a kedvenc tulajdonsága Tominak?",
    type: "text",
    a: "Az unblock kisugárzásod ✨",
  },
  {
    q: "Milyen szokásodat találja viccesnek Tomi?",
    type: "list",
    a: [
      "A szemtelenségedet",
      "A beszólogatásaidat",
      "Ahogy félnek tőled a barátai",
    ],
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
