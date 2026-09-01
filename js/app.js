(function () {
  const slides = [...document.querySelectorAll(".slide")];
  const dots = document.getElementById("dots");
  const counter = document.getElementById("counter");
  const timerEl = document.getElementById("timer");
  const notesEl = document.getElementById("notes");
  const notesBody = document.getElementById("notes-body");
  const help = document.getElementById("help");
  const overview = document.getElementById("overview");
  const cycleMode = document.getElementById("cycle-mode");
  const rpSlider = document.getElementById("rp");
  const rpValue = document.getElementById("rp-value");

  let index = 0;
  let rp = 12;
  let plantMode = "abierto";
  let t0 = null;
  let elapsed = 0;
  let ticking = false;
  let raf = null;

  const notes = slides.map((s) => s.dataset.notes || "");

  function fit() {
    const deck = document.querySelector(".deck");
    const sx = window.innerWidth / 1920;
    const sy = window.innerHeight / 1080;
    const s = Math.min(sx, sy);
    deck.style.transform = `scale(${s})`;
    deck.style.left = `${(window.innerWidth - 1920 * s) / 2}px`;
    deck.style.top = `${(window.innerHeight - 1080 * s) / 2}px`;
  }

  function fmt(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function paintTimer() {
    const now = ticking ? performance.now() - t0 + elapsed : elapsed;
    timerEl.textContent = fmt(now);
    timerEl.classList.toggle("warn", now >= 8.5 * 60000);
    timerEl.classList.toggle("late", now >= 9.5 * 60000);
  }

  function loop() {
    paintTimer();
    raf = requestAnimationFrame(loop);
  }

  function toggleTimer() {
    if (ticking) {
      elapsed += performance.now() - t0;
      ticking = false;
      cancelAnimationFrame(raf);
      paintTimer();
    } else {
      t0 = performance.now();
      ticking = true;
      loop();
    }
  }

  function renderDiagrams() {
    const tsA = document.getElementById("chart-ts");
    const pv = document.getElementById("chart-pv");
    const plant = document.getElementById("chart-plant");
    const tsEq = document.getElementById("chart-ts-mini");
    const curves = document.getElementById("chart-curves");
    const tsReal = document.getElementById("chart-ts-real");
    const regen = document.getElementById("chart-regen");
    const comb = document.getElementById("chart-combined");

    if (plant) Diagrams.drawPlant(plant, plantMode);
    if (tsA) Diagrams.drawTs(tsA, rp);
    if (pv) Diagrams.drawPv(pv, rp);
    if (tsEq) Diagrams.drawTs(tsEq, rp);
    if (curves) Diagrams.drawCurves(curves, rp);
    if (tsReal) Diagrams.drawTs(tsReal, Math.min(rp, 10), { real: true });
    if (regen) Diagrams.drawRegen(regen);
    if (comb) Diagrams.drawCombined(comb);

    const S = Brayton.state(rp);
    const set = (id, v) => {
      const n = document.getElementById(id);
      if (n) n.textContent = v;
    };
    set("stat-eta", `${(S.eta * 100).toFixed(1)} %`);
    set("stat-w", `${S.wNet.toFixed(0)} kJ/kg`);
    set("stat-t2", `${S.T2.toFixed(0)} K`);
    set("stat-t4", `${S.T4.toFixed(0)} K`);
    set("stat-rbw", `${(S.rbw * 100).toFixed(0)} %`);
    const chip = document.getElementById("regen-chip");
    if (chip) {
      chip.classList.toggle("on", S.regenPossible);
      chip.textContent = S.regenPossible
        ? `T₄ > T₂ → la regeneración sí recupera calor a este rₚ.`
        : `T₄ ≤ T₂ → a este rₚ ya no conviene regenerar.`;
    }
  }

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("active", k === index));
    [...dots.querySelectorAll("button")].forEach((d, k) => d.classList.toggle("on", k === index));
    counter.textContent = `${String(index + 1).padStart(2, "0")}  /  ${String(slides.length).padStart(2, "0")}`;
    notesBody.textContent = notes[index];
    overview.classList.remove("show");
    if (location.hash !== `#${index + 1}`) {
      history.replaceState(null, "", `#${index + 1}`);
    }
    requestAnimationFrame(() => {
      renderDiagrams();
      bootMath();
    });
  }

  function buildChrome() {
    slides.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.title = s.dataset.title || `Diapositiva ${i + 1}`;
      b.addEventListener("click", () => show(i));
      dots.appendChild(b);
      const ob = document.createElement("button");
      ob.type = "button";
      ob.innerHTML = `<strong>${s.dataset.title || ""}</strong><span>${String(i + 1).padStart(2, "0")}</span>`;
      ob.addEventListener("click", () => show(i));
      overview.appendChild(ob);
    });
  }

  function onKey(e) {
    const k = e.key;
    if (k === "ArrowRight" || k === " " || k === "PageDown") {
      e.preventDefault();
      show(index + 1);
    } else if (k === "ArrowLeft" || k === "PageUp") {
      e.preventDefault();
      show(index - 1);
    } else if (k === "Home") show(0);
    else if (k === "End") show(slides.length - 1);
    else if (k === "n" || k === "N") notesEl.classList.toggle("show");
    else if (k === "o" || k === "O") overview.classList.toggle("show");
    else if (k === "?" || k === "h" || k === "H") help.classList.toggle("show");
    else if (k === "t" || k === "T") toggleTimer();
    else if (k === "f" || k === "F") {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      else document.exitFullscreen();
    } else if (k === "Escape") {
      help.classList.remove("show");
      overview.classList.remove("show");
      notesEl.classList.remove("show");
    }
  }

  function bind() {
    window.addEventListener("resize", fit);
    window.addEventListener("hashchange", () => {
      const n = Number(location.hash.slice(1));
      if (n >= 1 && n <= slides.length) show(n - 1);
    });
    window.addEventListener("keydown", onKey);
    timerEl.addEventListener("click", toggleTimer);
    document.getElementById("help-close").addEventListener("click", () => help.classList.remove("show"));

    let touchX = null;
    document.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].screenX; }, { passive: true });
    document.addEventListener("touchend", (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].screenX - touchX;
      if (dx < -50) show(index + 1);
      if (dx > 50) show(index - 1);
      touchX = null;
    });

    if (rpSlider) {
      rpSlider.addEventListener("input", () => {
        rp = Number(rpSlider.value);
        rpValue.textContent = rp.toFixed(1);
        renderDiagrams();
      });
    }
    if (cycleMode) {
      cycleMode.addEventListener("change", () => {
        plantMode = cycleMode.value;
        renderDiagrams();
      });
    }

    document.querySelectorAll(".qa").forEach((card) => {
      card.addEventListener("click", () => card.classList.toggle("open"));
    });
  }

  function bootMath() {
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
        ],
        throwOnError: false,
      });
    }
  }

  buildChrome();
  bind();
  fit();
  const start = Number(location.hash.slice(1));
  show(start >= 1 && start <= slides.length ? start - 1 : 0);
  paintTimer();
  bootMath();
  window.addEventListener("load", bootMath);
})();
