(function (global) {
  const NS = "http://www.w3.org/2000/svg";
  const C = {
    gold: "#CCB244",
    gold2: "#E3CA75",
    ink: "#D7E0EC",
    muted: "#A8B0BC",
    sage: "#5A64BF",
    clay: "#D7E0EC",
    indigo: "#485199",
    dim: "rgba(215,224,236,0.18)",
    fill: "rgba(204,178,68,0.12)",
    fillSage: "rgba(90,100,191,0.16)",
    real: "rgba(90,100,191,0.95)",
  };

  function el(tag, attrs, text) {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v !== undefined && v !== null) node.setAttribute(k, String(v));
    });
    if (text != null) node.textContent = text;
    return node;
  }

  function svgRoot(host, vb) {
    host.innerHTML = "";
    const svg = el("svg", {
      viewBox: vb || "0 0 800 560",
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
    });
    host.appendChild(svg);
    return svg;
  }

  function mapLinear(a, b, c, d) {
    return (x) => c + ((x - a) * (d - c)) / (b - a);
  }

  function pathFrom(points, close) {
    if (!points.length) return "";
    const head = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
    const rest = points.slice(1).map((p) => `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
    return close ? `${head} ${rest} Z` : `${head} ${rest}`;
  }

  function axes(svg, x0, y0, x1, y1, xLabel, yLabel) {
    svg.appendChild(el("line", { x1: x0, y1: y0, x2: x1, y2: y0, stroke: C.dim, "stroke-width": 1 }));
    svg.appendChild(el("line", { x1: x0, y1: y0, x2: x0, y2: y1, stroke: C.dim, "stroke-width": 1 }));
    svg.appendChild(el("text", { x: x1, y: y0 + 28, fill: C.muted, "font-size": 16, "text-anchor": "end", "font-family": "Outfit, sans-serif" }, xLabel));
    svg.appendChild(el("text", { x: x0 - 12, y: y1 + 6, fill: C.muted, "font-size": 16, "text-anchor": "end", "font-family": "Outfit, sans-serif" }, yLabel));
  }

  function stateDot(svg, x, y, label, dy) {
    svg.appendChild(el("circle", { cx: x, cy: y, r: 4.5, fill: C.gold2, stroke: "#303030", "stroke-width": 1.5 }));
    svg.appendChild(el("text", {
      x: x + 8, y: y + (dy || -10), fill: C.ink, "font-size": 16,
      "font-family": "Cormorant Garamond, serif", "font-style": "italic",
    }, label));
  }

  function drawTs(host, rp, opts) {
    const o = Object.assign({ real: false, width: 800, height: 560 }, opts || {});
    const B = Brayton.state(rp);
    const svg = svgRoot(host, `0 0 ${o.width} ${o.height}`);
    const pad = { l: 70, r: 36, t: 52, b: 52 };
    const sMin = -0.05;
    const sMax = Math.max(B.s3, 0.95) + (o.real ? 0.28 : 0.14);
    const tMin = 220;
    const tMax = 1550;
    const x = mapLinear(sMin, sMax, pad.l, o.width - pad.r);
    const y = mapLinear(tMin, tMax, o.height - pad.b, pad.t);
    axes(svg, pad.l, o.height - pad.b, o.width - pad.r, pad.t, "s", "T");

    const add = Brayton.isobarTs(B.T2, B.T3, B.s2);
    const rej = Brayton.isobarTs(B.T4, B.T1, B.s4);
    const addPts = add.map((p) => [x(p.s), y(p.T)]);
    const rejPts = rej.map((p) => [x(p.s), y(p.T)]);
    const p1 = [x(B.s1), y(B.T1)];
    const p2 = [x(B.s2), y(B.T2)];
    const p3 = [x(B.s3), y(B.T3)];
    const p4 = [x(B.s4), y(B.T4)];

    const area = [p1, p2, ...addPts, p3, p4, ...rejPts];
    svg.appendChild(el("path", { d: pathFrom(area, true), fill: C.fill, stroke: "none" }));
    svg.appendChild(el("line", { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: C.gold, "stroke-width": 2.2 }));
    svg.appendChild(el("path", { d: pathFrom(addPts), fill: "none", stroke: C.sage, "stroke-width": 2.2 }));
    svg.appendChild(el("line", { x1: p3[0], y1: p3[1], x2: p4[0], y2: p4[1], stroke: C.gold2, "stroke-width": 2.2 }));
    svg.appendChild(el("path", { d: pathFrom(rejPts), fill: "none", stroke: C.clay, "stroke-width": 2.2 }));

    if (o.real) {
      const p2r = [x(B.s2 + 0.06), y(B.T2 + 28)];
      const p4r = [x(B.s4 + 0.06), y(B.T4 + 32)];
      svg.appendChild(el("line", {
        x1: p1[0], y1: p1[1], x2: p2r[0], y2: p2r[1],
        stroke: C.real, "stroke-width": 1.8, "stroke-dasharray": "6 5",
      }));
      svg.appendChild(el("line", {
        x1: p2r[0], y1: p2r[1], x2: p3[0], y2: p3[1],
        stroke: C.real, "stroke-width": 1.2, "stroke-dasharray": "6 5",
      }));
      svg.appendChild(el("line", {
        x1: p3[0], y1: p3[1], x2: p4r[0], y2: p4r[1],
        stroke: C.real, "stroke-width": 1.8, "stroke-dasharray": "6 5",
      }));
      svg.appendChild(el("text", { x: p2r[0] + 8, y: p2r[1] - 6, fill: C.clay, "font-size": 15, "font-family": "Cormorant Garamond, serif", "font-style": "italic" }, "2"));
      svg.appendChild(el("text", { x: p4r[0] + 10, y: p4r[1] + 6, fill: C.clay, "font-size": 15, "font-family": "Cormorant Garamond, serif", "font-style": "italic" }, "4"));
      svg.appendChild(el("text", { x: p2[0] - 22, y: p2[1] - 8, fill: C.muted, "font-size": 14, "font-family": "Cormorant Garamond, serif", "font-style": "italic" }, "2s"));
      svg.appendChild(el("text", { x: p4[0] - 22, y: p4[1] + 16, fill: C.muted, "font-size": 14, "font-family": "Cormorant Garamond, serif", "font-style": "italic" }, "4s"));
    }

    svg.appendChild(el("text", { x: (p2[0] + p3[0]) / 2, y: Math.min(p3[1], p2[1]) - 14, fill: C.sage, "font-size": 15, "text-anchor": "middle", "font-family": "Outfit, sans-serif" }, "Q̇in"));
    svg.appendChild(el("text", { x: (p1[0] + p4[0]) / 2 + 8, y: Math.max(p1[1], p4[1]) + 22, fill: C.clay, "font-size": 15, "text-anchor": "middle", "font-family": "Outfit, sans-serif" }, "Q̇out"));

    stateDot(svg, p1[0], p1[1], "1", 18);
    stateDot(svg, p2[0], p2[1], o.real ? "" : "2", -10);
    stateDot(svg, p3[0], p3[1], "3", -10);
    stateDot(svg, p4[0], p4[1], o.real ? "" : "4", 18);

    svg.appendChild(el("text", { x: pad.l + 10, y: y(B.T3) + 5, fill: C.muted, "font-size": 13 }, "T₃"));
    svg.appendChild(el("text", { x: pad.l + 10, y: y(B.T1) + 5, fill: C.muted, "font-size": 13 }, "T₁"));
    return B;
  }

  function drawPv(host, rp) {
    const B = Brayton.state(rp);
    const svg = svgRoot(host, "0 0 800 560");
    const pad = { l: 70, r: 36, t: 52, b: 52 };
    const vMin = 0;
    const vMax = Math.max(B.v1, B.v4) * 1.15;
    const pMin = 0;
    const pMax = B.P2 * 1.18;
    const x = mapLinear(vMin, vMax, pad.l, 800 - pad.r);
    const y = mapLinear(pMin, pMax, 560 - pad.b, pad.t);
    axes(svg, pad.l, 560 - pad.b, 800 - pad.r, pad.t, "v", "P");

    const c12 = Brayton.isentropicPv(B.v1, B.P1, B.v2).map((p) => [x(p.v), y(p.P)]);
    const c34 = Brayton.isentropicPv(B.v3, B.P3, B.v4).map((p) => [x(p.v), y(p.P)]);
    const p1 = [x(B.v1), y(B.P1)];
    const p2 = [x(B.v2), y(B.P2)];
    const p3 = [x(B.v3), y(B.P3)];
    const p4 = [x(B.v4), y(B.P4)];

    const area = [...c12, p3, ...c34, p1];
    svg.appendChild(el("path", { d: pathFrom(area, true), fill: C.fill, stroke: "none" }));
    svg.appendChild(el("path", { d: pathFrom(c12), fill: "none", stroke: C.gold, "stroke-width": 2.2 }));
    svg.appendChild(el("line", { x1: p2[0], y1: p2[1], x2: p3[0], y2: p3[1], stroke: C.sage, "stroke-width": 2.2 }));
    svg.appendChild(el("path", { d: pathFrom(c34), fill: "none", stroke: C.gold2, "stroke-width": 2.2 }));
    svg.appendChild(el("line", { x1: p4[0], y1: p4[1], x2: p1[0], y2: p1[1], stroke: C.clay, "stroke-width": 2.2 }));

    svg.appendChild(el("text", {
      x: (p2[0] + p3[0]) / 2, y: y(B.P2) - 12, fill: C.muted, "font-size": 14, "text-anchor": "middle", "font-family": "Outfit, sans-serif",
    }, "rₚ = P₂ / P₁"));

    stateDot(svg, p1[0], p1[1], "1", 18);
    stateDot(svg, p2[0], p2[1], "2", -10);
    stateDot(svg, p3[0], p3[1], "3", -10);
    stateDot(svg, p4[0], p4[1], "4", 18);
    return B;
  }

  function drawPlant(host, mode) {
    const svg = svgRoot(host, "0 0 980 420");
    const closed = mode === "cerrado";

    function machine(x, y, w, h, title, sub) {
      svg.appendChild(el("rect", {
        x, y, width: w, height: h, rx: 2,
        fill: "rgba(48,48,48,0.45)", stroke: C.gold, "stroke-width": 1.2,
      }));
      svg.appendChild(el("text", {
        x: x + w / 2, y: y + h / 2 - 2, fill: C.ink, "font-size": 16,
        "text-anchor": "middle", "font-family": "Outfit, sans-serif",
      }, title));
      svg.appendChild(el("text", {
        x: x + w / 2, y: y + h / 2 + 18, fill: C.muted, "font-size": 12,
        "text-anchor": "middle", "font-family": "Outfit, sans-serif",
      }, sub));
    }

    const y = 150;
    const boxes = [
      { x: 80, t: "Compresor", s: "1 → 2   s = cte" },
      { x: 360, t: "Cámara", s: "2 → 3   P = cte" },
      { x: 640, t: "Turbina", s: "3 → 4   s = cte" },
    ];
    boxes.forEach((b) => machine(b.x, y, 200, 110, b.t, b.s));

    function arrow(x1, y1, x2, y2, label, color) {
      svg.appendChild(el("line", { x1, y1, x2, y2, stroke: color || C.gold, "stroke-width": 1.4 }));
      const ang = Math.atan2(y2 - y1, x2 - x1);
      const ah = 8;
      svg.appendChild(el("polygon", {
        points: `${x2},${y2} ${x2 - ah * Math.cos(ang - 0.4)},${y2 - ah * Math.sin(ang - 0.4)} ${x2 - ah * Math.cos(ang + 0.4)},${y2 - ah * Math.sin(ang + 0.4)}`,
        fill: color || C.gold,
      }));
      if (label) {
        svg.appendChild(el("text", {
          x: (x1 + x2) / 2, y: y1 - 10, fill: C.muted, "font-size": 13,
          "text-anchor": "middle", "font-family": "Outfit, sans-serif",
        }, label));
      }
    }

    arrow(30, 205, 80, 205, closed ? "gas" : "aire");
    arrow(280, 205, 360, 205, "2");
    arrow(560, 205, 640, 205, "3");
    arrow(840, 205, 930, 205, closed ? "4" : "escape");

    svg.appendChild(el("line", { x1: 180, y1: 260, x2: 180, y2: 320, stroke: C.dim, "stroke-width": 1.2 }));
    svg.appendChild(el("line", { x1: 740, y1: 260, x2: 740, y2: 320, stroke: C.dim, "stroke-width": 1.2 }));
    svg.appendChild(el("line", { x1: 180, y1: 320, x2: 740, y2: 320, stroke: C.gold, "stroke-width": 1.4 }));
    svg.appendChild(el("text", {
      x: 460, y: 348, fill: C.gold2, "font-size": 14, "text-anchor": "middle", "font-family": "Outfit, sans-serif",
    }, "eje  ·  Ẇturbina → Ẇcompresor + Ẇneto"));
    arrow(460, 320, 460, 380, "", C.gold2);
    svg.appendChild(el("text", {
      x: 472, y: 390, fill: C.gold2, "font-size": 16, "font-family": "Cormorant Garamond, serif", "font-style": "italic",
    }, "Ẇneto"));

    arrow(460, 90, 460, 150, "Q̇in", C.sage);
    if (closed) {
      svg.appendChild(el("rect", {
        x: 860, y: 80, width: 90, height: 60, rx: 2,
        fill: "none", stroke: C.clay, "stroke-width": 1.1,
      }));
      svg.appendChild(el("text", {
        x: 905, y: 115, fill: C.clay, "font-size": 12, "text-anchor": "middle", "font-family": "Outfit, sans-serif",
      }, "Q̇out"));
      svg.appendChild(el("path", {
        d: "M 930 205 C 960 205 970 80 905 80",
        fill: "none", stroke: C.clay, "stroke-width": 1.2, "stroke-dasharray": "5 4",
      }));
      svg.appendChild(el("path", {
        d: "M 905 140 C 40 140 30 205 30 205",
        fill: "none", stroke: C.dim, "stroke-width": 1.2, "stroke-dasharray": "5 4",
      }));
    } else {
      svg.appendChild(el("text", {
        x: 900, y: 236, fill: C.clay, "font-size": 13, "font-family": "Outfit, sans-serif",
      }, "Q̇out"));
    }
  }

  function drawCurves(host, rp) {
    const svg = svgRoot(host, "0 0 900 560");
    const pad = { l: 70, r: 70, t: 52, b: 56 };
    const minRp = 2;
    const maxRp = 30;
    const pts = Brayton.curve(minRp, maxRp, 80);
    const maxW = Math.max(...pts.map((p) => p.wNet));
    const x = mapLinear(minRp, maxRp, pad.l, 900 - pad.r);
    const yEta = mapLinear(0, 0.7, 560 - pad.b, pad.t);
    const yW = mapLinear(0, maxW * 1.08, 560 - pad.b, pad.t);

    svg.appendChild(el("line", { x1: pad.l, y1: 560 - pad.b, x2: 900 - pad.r, y2: 560 - pad.b, stroke: C.dim, "stroke-width": 1 }));
    svg.appendChild(el("line", { x1: pad.l, y1: 560 - pad.b, x2: pad.l, y2: pad.t, stroke: C.dim, "stroke-width": 1 }));
    svg.appendChild(el("line", { x1: 900 - pad.r, y1: 560 - pad.b, x2: 900 - pad.r, y2: pad.t, stroke: C.dim, "stroke-width": 1 }));

    const zx1 = x(10);
    const zx2 = x(20);
    svg.appendChild(el("rect", {
      x: zx1, y: pad.t, width: zx2 - zx1, height: 560 - pad.b - pad.t,
      fill: "rgba(90,100,191,0.12)", stroke: "none",
    }));
    svg.appendChild(el("text", {
      x: (zx1 + zx2) / 2, y: pad.t + 20, fill: C.sage, "font-size": 13,
      "text-anchor": "middle", "font-family": "Outfit, sans-serif",
    }, "zona típica 10–20"));

    const etaPath = pts.map((p) => [x(p.rp), yEta(p.eta)]);
    const wPath = pts.map((p) => [x(p.rp), yW(p.wNet)]);
    svg.appendChild(el("path", { d: pathFrom(etaPath), fill: "none", stroke: C.gold, "stroke-width": 2.3 }));
    svg.appendChild(el("path", { d: pathFrom(wPath), fill: "none", stroke: C.sage, "stroke-width": 2.3 }));

    const rpOpt = Brayton.rpOptWork();
    svg.appendChild(el("line", {
      x1: x(rpOpt), y1: pad.t, x2: x(rpOpt), y2: 560 - pad.b,
      stroke: C.dim, "stroke-width": 1, "stroke-dasharray": "4 5",
    }));
    svg.appendChild(el("text", {
      x: x(rpOpt) + 6, y: pad.t + 40, fill: C.muted, "font-size": 13, "font-family": "Outfit, sans-serif",
    }, "rₚ ópt. trabajo"));

    const cur = Brayton.state(rp);
    svg.appendChild(el("circle", { cx: x(rp), cy: yEta(cur.eta), r: 5.5, fill: C.gold2 }));
    svg.appendChild(el("circle", { cx: x(rp), cy: yW(cur.wNet), r: 5.5, fill: C.sage }));
    svg.appendChild(el("line", {
      x1: x(rp), y1: pad.t, x2: x(rp), y2: 560 - pad.b,
      stroke: "rgba(227,202,117,0.40)", "stroke-width": 1,
    }));

    svg.appendChild(el("text", { x: 900 - pad.r, y: 560 - pad.b + 30, fill: C.muted, "font-size": 15, "text-anchor": "end", "font-family": "Outfit, sans-serif" }, "rₚ"));
    svg.appendChild(el("text", { x: pad.l, y: 22, fill: C.gold, "font-size": 14, "font-family": "Outfit, sans-serif" }, "ηth  (eje izq.)"));
    svg.appendChild(el("text", { x: 900 - pad.r, y: 22, fill: C.sage, "font-size": 14, "text-anchor": "end", "font-family": "Outfit, sans-serif" }, "wneto  kJ/kg  (eje der.)"));

    for (const tick of [5, 10, 15, 20, 25, 30]) {
      svg.appendChild(el("text", {
        x: x(tick), y: 560 - pad.b + 20, fill: C.muted, "font-size": 12, "text-anchor": "middle",
      }, String(tick)));
    }
    return cur;
  }

  function drawRegen(host) {
    const svg = svgRoot(host, "0 0 980 420");
    const nodes = [
      { x: 70, y: 170, t: "Compresor", s: "1 → 2" },
      { x: 340, y: 170, t: "Regenerador", s: "2 → 5  y  4 → 6" },
      { x: 620, y: 80, t: "Cámara", s: "5 → 3" },
      { x: 620, y: 250, t: "Turbina", s: "3 → 4" },
    ];
    nodes.forEach((n) => {
      svg.appendChild(el("rect", {
        x: n.x, y: n.y, width: 200, height: 88, rx: 2,
        fill: n.t === "Regenerador" ? C.fillSage : "rgba(48,48,48,0.45)",
        stroke: n.t === "Regenerador" ? C.sage : C.gold, "stroke-width": 1.2,
      }));
      svg.appendChild(el("text", {
        x: n.x + 100, y: n.y + 38, fill: C.ink, "font-size": 16, "text-anchor": "middle", "font-family": "Outfit, sans-serif",
      }, n.t));
      svg.appendChild(el("text", {
        x: n.x + 100, y: n.y + 60, fill: C.muted, "font-size": 13, "text-anchor": "middle", "font-family": "Outfit, sans-serif",
      }, n.s));
    });
    const line = (x1, y1, x2, y2, color) => {
      svg.appendChild(el("line", { x1, y1, x2, y2, stroke: color || C.gold, "stroke-width": 1.3 }));
    };
    line(270, 214, 340, 214, C.gold);
    line(540, 200, 620, 124, C.sage);
    line(720, 168, 720, 250, C.gold2);
    line(620, 294, 540, 228, C.clay);
    svg.appendChild(el("text", {
      x: 490, y: 150, fill: C.sage, "font-size": 14, "font-family": "Outfit, sans-serif",
    }, "precalienta si T₄ > T₂"));
    svg.appendChild(el("text", {
      x: 70, y: 60, fill: C.muted, "font-size": 15, "font-family": "Cormorant Garamond, serif", "font-style": "italic",
    }, "El escape calienta el aire comprimido. El combustible solo cubre 5 → 3."));
  }

  function drawCombined(host) {
    const svg = svgRoot(host, "0 0 980 460");
    svg.appendChild(el("text", {
      x: 40, y: 36, fill: C.gold, "font-size": 13, "letter-spacing": "3", "font-family": "Outfit, sans-serif",
    }, "CICLO COMBINADO"));

    function box(x, y, w, h, title, sub, stroke) {
      const isIndigo = stroke === C.sage || stroke === C.indigo;
      svg.appendChild(el("rect", {
        x, y, width: w, height: h, rx: 2,
        fill: isIndigo ? C.fillSage : "rgba(48,48,48,0.45)",
        stroke: stroke || C.gold, "stroke-width": 1.15,
      }));
      svg.appendChild(el("text", {
        x: x + w / 2, y: y + h / 2 - 2, fill: C.ink, "font-size": 16, "text-anchor": "middle", "font-family": "Outfit, sans-serif",
      }, title));
      if (sub) {
        svg.appendChild(el("text", {
          x: x + w / 2, y: y + h / 2 + 18, fill: C.muted, "font-size": 12, "text-anchor": "middle", "font-family": "Outfit, sans-serif",
        }, sub));
      }
    }

    box(40, 70, 180, 80, "Compresor", "Brayton", C.gold);
    box(280, 70, 180, 80, "Cámara", "Q̇in", C.sage);
    box(520, 70, 180, 80, "Turbina gas", "Ẇel, gas", C.gold);
    box(760, 70, 180, 80, "Generador", "", C.gold2);

    box(280, 250, 180, 80, "Caldera rec.", "500–650 °C", C.sage);
    box(520, 250, 180, 80, "Turbina vapor", "Ẇel, vapor", C.sage);
    box(760, 250, 180, 80, "Condensador", "Rankine", C.indigo);

    const conn = (x1, y1, x2, y2, color) => {
      svg.appendChild(el("line", { x1, y1, x2, y2, stroke: color || C.gold, "stroke-width": 1.25 }));
    };
    conn(220, 110, 280, 110, C.gold);
    conn(460, 110, 520, 110, C.gold);
    conn(700, 110, 760, 110, C.gold2);
    conn(610, 150, 610, 250, C.clay);
    conn(460, 290, 520, 290, C.sage);
    conn(700, 290, 760, 290, C.sage);

    svg.appendChild(el("text", {
      x: 624, y: 210, fill: C.clay, "font-size": 13, "font-family": "Outfit, sans-serif",
    }, "gases de escape"));
    svg.appendChild(el("text", {
      x: 40, y: 420, fill: C.muted, "font-size": 16, "font-family": "Cormorant Garamond, serif", "font-style": "italic",
    }, "Brayton toma la alta temperatura. Rankine aprovecha el calor que el Brayton simple tiraría."));
    svg.appendChild(el("text", {
      x: 940, y: 420, fill: C.gold2, "font-size": 18, "text-anchor": "end", "font-family": "Cormorant Garamond, serif", "font-style": "italic",
    }, "η planta > 60 %"));
  }

  global.Diagrams = { drawTs, drawPv, drawPlant, drawCurves, drawRegen, drawCombined };
})(window);
