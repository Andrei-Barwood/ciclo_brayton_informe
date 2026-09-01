/* Ciclo Brayton — aire estándar frío. Unidades SI: K, kPa, kJ/kg. */
(function (global) {
  const GAMMA = 1.4;
  const K = (GAMMA - 1) / GAMMA;
  const CP = 1.005;
  const R = 0.287;
  const T1 = 300;
  const T3 = 1400;
  const P1 = 100;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function state(rp) {
    const r = clamp(rp, 1.2, 40);
    const T2 = T1 * Math.pow(r, K);
    const T4 = T3 / Math.pow(r, K);
    const P2 = P1 * r;
    const P3 = P2;
    const P4 = P1;
    const v1 = (R * T1) / P1;
    const v2 = (R * T2) / P2;
    const v3 = (R * T3) / P3;
    const v4 = (R * T4) / P4;
    const s1 = 0;
    const s2 = s1;
    const s3 = s2 + CP * Math.log(T3 / T2);
    const s4 = s3;
    const qIn = CP * (T3 - T2);
    const qOut = CP * (T4 - T1);
    const wComp = CP * (T2 - T1);
    const wTurb = CP * (T3 - T4);
    const wNet = wTurb - wComp;
    const eta = qIn > 0 ? wNet / qIn : 0;
    const rbw = wTurb > 0 ? wComp / wTurb : 0;
    const regenPossible = T4 > T2 + 1;
    return {
      rp: r,
      T1, T2, T3, T4,
      P1, P2, P3, P4,
      v1, v2, v3, v4,
      s1, s2, s3, s4,
      qIn, qOut, wComp, wTurb, wNet, eta, rbw,
      regenPossible,
    };
  }

  function etaOf(rp) {
    return 1 - 1 / Math.pow(rp, K);
  }

  function rpOptWork() {
    return Math.pow(T3 / T1, GAMMA / (2 * (GAMMA - 1)));
  }

  function curve(minRp, maxRp, n) {
    const pts = [];
    for (let i = 0; i <= n; i += 1) {
      const rp = minRp + ((maxRp - minRp) * i) / n;
      const s = state(rp);
      pts.push({ rp, eta: s.eta, wNet: s.wNet, T2: s.T2, T4: s.T4 });
    }
    return pts;
  }

  function isobarTs(Tstart, Tend, sStart, steps) {
    const out = [];
    const n = steps || 36;
    for (let i = 0; i <= n; i += 1) {
      const T = Tstart + ((Tend - Tstart) * i) / n;
      const s = sStart + CP * Math.log(T / Tstart);
      out.push({ s, T });
    }
    return out;
  }

  function isentropicPv(va, Pa, vb, steps) {
    const out = [];
    const n = steps || 36;
    const C = Pa * Math.pow(va, GAMMA);
    for (let i = 0; i <= n; i += 1) {
      const v = va + ((vb - va) * i) / n;
      const P = C / Math.pow(v, GAMMA);
      out.push({ v, P });
    }
    return out;
  }

  global.Brayton = {
    GAMMA, K, CP, R, T1, T3, P1,
    state, etaOf, rpOptWork, curve, isobarTs, isentropicPv, clamp,
  };
})(window);
