/* HCI Exam Trainer — quiz engine */

const $  = (s) => document.querySelector(s);
const el = (tag, cls, txt) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (txt !== undefined) n.textContent = txt;
  return n;
};

const LS_SCORES = "hci-trainer-scores";
const LS_OPTS   = "hci-trainer-opts";
const LS_THEME  = "hci-trainer-theme";

const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* private mode */ }
  }
};

const shuffled = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const uniq = (arr) => [...new Set(arr)];

/* text answers: lowercase, strip accents & punctuation, collapse spaces */
const norm = (s) => (s || "")
  .toLowerCase()
  .normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9äöüß ]+/gi, " ")
  .replace(/\s+/g, " ")
  .trim();

/* ------------------------------------------------------------- state */
let state = null;   // { test, questions, answers, index }
let opts  = store.get(LS_OPTS, { shuffleQ: false, shuffleA: true });

/* -------------------------------------------------------------- theme */
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  store.set(LS_THEME, t);
}
applyTheme(store.get(LS_THEME, window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
$("#themeBtn").onclick = () =>
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");

/* --------------------------------------------------------------- menu */
function showView(id) {
  ["menu", "quiz", "result"].forEach((v) => $("#" + v).classList.toggle("hidden", v !== id));
  window.scrollTo(0, 0);
}

function maxPoints(q) {
  switch (q.type) {
    case "single": return 1;
    case "multi":  return q.options.filter((o) => o.c).length;
    case "match":  return q.pairs.length;
    case "text":   return q.blanks.length;
    case "number": return 1;
  }
  return 1;
}

function renderMenu() {
  const scores = store.get(LS_SCORES, {});
  const list = $("#testList");
  list.innerHTML = "";

  TESTS.forEach((test, i) => {
    const pts = test.questions.reduce((s, q) => s + maxPoints(q), 0);
    const card = el("button", "card");
    card.type = "button";
    card.append(el("div", "num", String(i + 1)));

    const body = el("div", "body");
    body.append(el("div", "t", test.title));
    body.append(el("div", "s", `${test.questions.length} questions · ${pts} points · ${test.subtitle}`));
    card.append(body);

    const best = scores[test.id];
    const b = el("div", "best");
    if (best === undefined) b.textContent = "not tried yet";
    else { b.append(document.createTextNode("best ")); b.append(el("b", null, best + "%")); }
    card.append(b);

    card.onclick = () => startTest(test);
    list.append(card);
  });

  $("#crumb").textContent = "";
}

$("#optShuffleQ").checked = opts.shuffleQ;
$("#optShuffleA").checked = opts.shuffleA;
$("#optShuffleQ").onchange = (e) => { opts.shuffleQ = e.target.checked; store.set(LS_OPTS, opts); };
$("#optShuffleA").onchange = (e) => { opts.shuffleA = e.target.checked; store.set(LS_OPTS, opts); };

$("#resetScores").onclick = () => {
  if (confirm("Delete all saved best scores?")) { store.set(LS_SCORES, {}); renderMenu(); }
};
$("#homeBtn").onclick = () => {
  if (state && !confirm("Leave this test? Your answers are lost.")) return;
  state = null; renderMenu(); showView("menu");
};

/* --------------------------------------------------------------- quiz */
function startTest(test) {
  const questions = (opts.shuffleQ ? shuffled(test.questions) : test.questions).map((q) => {
    const c = { ...q };
    if (c.options) c.options = opts.shuffleA ? shuffled(c.options) : c.options;
    if (c.pairs) {
      c.pairs = opts.shuffleA ? shuffled(c.pairs) : c.pairs;
      c.pool  = shuffled(uniq([...c.pairs.map((p) => p.r), ...(c.distractors || [])]));
    }
    return c;
  });

  state = {
    test,
    questions,
    index: 0,
    answers: questions.map((q) => {
      if (q.type === "multi") return [];
      if (q.type === "match") return q.pairs.map(() => "");
      if (q.type === "text")  return q.blanks.map(() => "");
      return null;
    })
  };

  $("#crumb").textContent = test.title;
  showView("quiz");
  renderQuestion();
}

function isAnswered(i) {
  const q = state.questions[i], a = state.answers[i];
  if (q.type === "multi") return a.length > 0;
  if (q.type === "match" || q.type === "text") return a.some((v) => v !== "" && v !== null);
  return a !== null && a !== "";
}

function renderDots() {
  const dots = $("#dots");
  dots.innerHTML = "";
  state.questions.forEach((_, i) => {
    const d = el("button", "dot", String(i + 1));
    d.type = "button";
    if (isAnswered(i)) d.classList.add("answered");
    if (i === state.index) d.classList.add("current");
    d.onclick = () => { state.index = i; renderQuestion(); };
    dots.append(d);
  });
}

function renderQuestion() {
  const i = state.index, q = state.questions[i], a = state.answers[i];
  const card = $("#qCard");
  card.innerHTML = "";

  card.append(el("div", "qtitle", `Question ${i + 1} — ${q.title}`));
  card.append(el("p", "qprompt", q.prompt));
  if (q.promptDe) card.append(el("p", "qprompt-de", q.promptDe));

  if (q.image) {
    const fig = el("div", "qfig");
    const img = el("img");
    img.src = q.image;
    img.alt = q.title;
    fig.append(img);
    card.append(fig);
  }
  if (q.note) card.append(el("div", "qnote", q.note));

  if (q.type === "single" || q.type === "multi") {
    const box = el("div", "opts");
    q.options.forEach((o, oi) => {
      const lab = el("label", "opt");
      const inp = el("input");
      inp.type = q.type === "single" ? "radio" : "checkbox";
      inp.name = "q" + i;
      inp.checked = q.type === "single" ? a === oi : a.includes(oi);
      if (inp.checked) lab.classList.add("sel");

      inp.onchange = () => {
        if (q.type === "single") {
          state.answers[i] = oi;
        } else {
          const cur = state.answers[i];
          if (inp.checked) {
            if (q.maxSelect && cur.length >= q.maxSelect) {
              inp.checked = false;
              alert(`You may select at most ${q.maxSelect} answers.`);
              return;
            }
            cur.push(oi);
          } else {
            state.answers[i] = cur.filter((x) => x !== oi);
          }
        }
        /* update highlighting in place — a full re-render would drop keyboard focus */
        box.querySelectorAll(".opt").forEach((l) =>
          l.classList.toggle("sel", l.querySelector("input").checked));
        renderDots();
      };

      lab.append(inp, el("span", null, o.t));
      box.append(lab);
    });
    card.append(box);
  }

  if (q.type === "match") {
    const box = el("div", "pairs");
    q.pairs.forEach((p, pi) => {
      const row = el("div", "pair");
      row.append(el("div", "l", p.l));
      const sel = el("select");
      sel.append(new Option("— choose —", ""));
      q.pool.forEach((v) => sel.append(new Option(v, v)));
      sel.value = a[pi];
      sel.onchange = () => { state.answers[i][pi] = sel.value; renderDots(); };
      row.append(sel);
      box.append(row);
    });
    card.append(box);
  }

  if (q.type === "text") {
    const box = el("div", "blanks");
    q.blanks.forEach((b, bi) => {
      const row = el("div", "blank");
      row.append(el("div", "lbl", b.label));
      const inp = el("input");
      inp.type = "text";
      inp.value = a[bi];
      inp.oninput = () => { state.answers[i][bi] = inp.value; renderDots(); };
      row.append(inp);
      box.append(row);
    });
    card.append(box);
  }

  if (q.type === "number") {
    const box = el("div", "numwrap");
    const inp = el("input");
    inp.type = "number";
    inp.step = "any";
    inp.value = a === null ? "" : a;
    inp.oninput = () => { state.answers[i] = inp.value === "" ? null : inp.value; renderDots(); };
    box.append(inp);
    if (q.unit) box.append(el("span", "unit", q.unit));
    card.append(box);
  }

  const last = i === state.questions.length - 1;
  $("#prevBtn").disabled = i === 0;
  $("#nextBtn").classList.toggle("hidden", last);
  $("#submitBtn").classList.toggle("hidden", !last);
  $("#qCounter").textContent = `${i + 1} / ${state.questions.length}`;
  $("#progressBar").style.width = ((i + 1) / state.questions.length * 100) + "%";
  renderDots();
}

$("#prevBtn").onclick = () => { if (state.index > 0) { state.index--; renderQuestion(); } };
$("#nextBtn").onclick = () => { if (state.index < state.questions.length - 1) { state.index++; renderQuestion(); } };
$("#submitBtn").onclick = () => {
  const open = state.questions.map((_, i) => i).filter((i) => !isAnswered(i));
  if (open.length && !confirm(`${open.length} question(s) are still unanswered (${open.map((i) => i + 1).join(", ")}). Hand in anyway?`)) return;
  grade();
};

/* ------------------------------------------------------------ grading */
function gradeQuestion(q, a) {
  const max = maxPoints(q);
  const lines = [];
  let got = 0;

  if (q.type === "single") {
    q.options.forEach((o, oi) => {
      const picked = a === oi;
      if (o.c && picked) got = 1;
      if (o.c || picked) {
        lines.push({
          good: !!o.c,
          tag: o.c ? (picked ? "your answer · correct" : "correct answer") : "your answer · wrong",
          text: o.t
        });
      }
    });
    if (a === null) lines.push({ good: false, tag: "you left this blank", text: "—" });
  }

  if (q.type === "multi") {
    let hit = 0, miss = 0;
    q.options.forEach((o, oi) => {
      const picked = a.includes(oi);
      if (o.c && picked) hit++;
      if (!o.c && picked) miss++;
      lines.push({
        good: o.c,
        tag: o.c ? (picked ? "correct · you picked it" : "correct · you missed it")
                 : (picked ? "wrong · you picked it" : "wrong · correctly left out"),
        text: o.t,
        neutral: !o.c && !picked
      });
    });
    got = Math.max(0, hit - miss);
  }

  if (q.type === "match") {
    q.pairs.forEach((p, pi) => {
      const ok = a[pi] === p.r;
      if (ok) got++;
      lines.push({
        good: ok,
        tag: ok ? "correct" : `you said: ${a[pi] || "—"} · correct:`,
        text: ok ? `${p.l} → ${p.r}` : `${p.l} → ${p.r}`
      });
    });
  }

  if (q.type === "text") {
    q.blanks.forEach((b, bi) => {
      const ok = b.accept.some((acc) => norm(acc) === norm(a[bi]));
      if (ok) got++;
      lines.push({
        good: ok,
        tag: ok ? "correct" : `you wrote: “${a[bi] || "—"}” · correct:`,
        text: `${b.label} ${b.show}`,
        softText: !ok
      });
    });
  }

  if (q.type === "number") {
    const v = parseFloat(a);
    const ok = !isNaN(v) && v >= q.answer.min && v <= q.answer.max;
    if (ok) got = 1;
    lines.push({
      good: ok,
      tag: ok ? `your answer: ${a} · accepted` : `you answered: ${a ?? "—"} · correct:`,
      text: q.answer.show
    });
  }

  return { got, max, lines };
}

function grade() {
  const results = state.questions.map((q, i) => ({ q, i, ...gradeQuestion(q, state.answers[i]) }));
  state.results = results;
  renderResult();
}

function renderResult() {
  const results = state.results;
  const got = results.reduce((s, r) => s + r.got, 0);
  const max = results.reduce((s, r) => s + r.max, 0);
  const pct = Math.round(got / max * 100);

  $("#scorePct").textContent = pct + "%";
  const ring = $("#scoreRing");
  ring.style.setProperty("--pct", pct + "%");
  ring.style.setProperty("--ring-color",
    pct >= 80 ? "var(--ok)" : pct >= 50 ? "var(--warn)" : "var(--bad)");

  $("#scoreTitle").textContent =
    pct === 100 ? "Perfect." : pct >= 80 ? "Strong." : pct >= 50 ? "Getting there." : "Needs another round.";
  $("#scoreLine").textContent =
    `${got} of ${max} points · ${results.filter((r) => r.got === r.max).length} of ${results.length} questions fully correct · ${state.test.title}`;

  const scores = store.get(LS_SCORES, {});
  if (scores[state.test.id] === undefined || pct > scores[state.test.id]) {
    scores[state.test.id] = pct;
    store.set(LS_SCORES, scores);
  }

  const rev = $("#review");
  rev.innerHTML = "";
  results.forEach((r) => {
    const cls = r.got === r.max ? "ok" : r.got === 0 ? "bad" : "part";
    const box = el("div", "rev " + cls);

    const head = el("div", "rev-head");
    head.append(el("span", "mark", r.got === r.max ? "✓" : r.got === 0 ? "✕" : "~"));
    head.append(el("span", null, `Question ${r.i + 1} — ${r.q.title}`));
    head.append(el("span", "pts", `${r.got} / ${r.max} pts`));
    box.append(head);

    box.append(el("div", "rev-q", r.q.prompt));

    const list = el("div", "rev-list");
    r.lines.forEach((ln) => {
      const row = el("div", "ln" + (ln.neutral ? "" : ln.good ? " good" : " wrong"));
      row.append(el("span", "tag", ln.tag));
      row.append(document.createTextNode(ln.text));
      list.append(row);
    });
    box.append(list);

    if (r.q.explain) box.append(el("div", "rev-explain", r.q.explain));

    /* free-text answers are matched literally — let the user correct the grader */
    if (r.q.type === "text" && r.got < r.max) {
      const lab = el("label", "override");
      const cb = el("input");
      cb.type = "checkbox";
      cb.onchange = () => {
        r.got = cb.checked ? r.max : gradeQuestion(r.q, state.answers[r.i]).got;
        renderResult();
      };
      lab.append(cb, el("span", null, "My wording was right — count this question as fully correct"));
      box.append(lab);
    }

    rev.append(box);
  });

  showView("result");
}

$("#retryBtn").onclick = () => startTest(state.test);
$("#menuBtn").onclick  = () => { state = null; renderMenu(); showView("menu"); };

/* --------------------------------------------------------------- init */
renderMenu();
