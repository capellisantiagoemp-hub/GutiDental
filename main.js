(function () {
  "use strict";

  const data = window.__BRAND__ || {};
  const $  = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  function initSplash() {
    const s = $("#splash");
    if (!s) return;
    const hide = () => s.classList.add("hide");
    if (document.readyState === "complete") { setTimeout(hide, 350); }
    else { window.addEventListener("load", () => setTimeout(hide, 350)); }
    setTimeout(hide, 2000);
  }

  function initNav() {
    const nav = $("#nav");
    const links = $(".nav-links");
    const burger = $("#burger");
    const onScroll = () => { if (nav) nav.classList.toggle("scrolled", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (burger && links) {
      burger.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.addEventListener("click", (e) => {
        if (e.target.closest("a")) { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
      });
    }
  }

  function initReveals() {
    const els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || reduced) { els.forEach(el => el.classList.add("in")); return; }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
    }, { threshold: 0.04, rootMargin: "0px 0px -6% 0px" });
    els.forEach(el => io.observe(el));
    setTimeout(() => els.forEach(el => el.classList.add("in")), 2400);
  }

  function format(v, decimals) {
    if (decimals > 0) return v.toFixed(decimals).replace(".", ",");
    return Math.round(v).toString();
  }
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count-to"));
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (isNaN(target)) return;
    if (reduced) { el.textContent = format(target, decimals); return; }
    const dur = 1400; const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased, decimals);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = format(target, decimals);
    }
    requestAnimationFrame(tick);
  }
  function initCountUps() {
    const els = $$("[data-count-to]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(animateCount); return; }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { animateCount(en.target); obs.unobserve(en.target); } });
    }, { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  function initTilt() {
    if (!fineHover || reduced) return;
    $$("[data-tilt]").forEach(card => {
      const MAX = 6;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  function initMagnetic() {
    if (!fineHover || reduced) return;
    $$("[data-magnetic]").forEach(btn => {
      const S = 0.22;
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * S;
        const y = (e.clientY - r.top - r.height / 2) * S;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  function initForm() {
    const form = $("#turnoForm");
    if (!form) return;
    const success = $("#formSuccess");
    const msg = $("#successMsg");
    const resetBtn = $("#formReset");
    const markInvalid = (field, bad) => { const w = field.closest(".field"); if (w) w.classList.toggle("invalid", bad); };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const required = $$("[required]", form);
      let firstBad = null;
      required.forEach(f => { const bad = !f.value.trim(); markInvalid(f, bad); if (bad && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.focus(); return; }
      const nombre = ($("#f-nombre", form).value || "").trim().split(" ")[0];
      const motivo = ($("#f-motivo", form).value || "").toLowerCase();
      if (msg) {
        msg.textContent = nombre
          ? `Gracias, ${nombre}. Te llamamos al número que dejaste para confirmar tu turno${motivo ? " de " + motivo : ""}.`
          : "Gracias. Te llamamos para confirmar tu turno.";
      }
      if (success) success.classList.add("show");
    });

    form.addEventListener("input", (e) => { const f = e.target; if (f.matches("[required]")) markInvalid(f, !f.value.trim()); });

    if (resetBtn && success) {
      resetBtn.addEventListener("click", () => {
        success.classList.remove("show"); form.reset();
        $$(".field.invalid", form).forEach(w => w.classList.remove("invalid"));
        const first = $("#f-nombre", form); if (first) first.focus();
      });
    }
  }

  function boot() {
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initCountUps, "initCountUps");
    safe(initTilt, "initTilt");
    safe(initMagnetic, "initMagnetic");
    safe(initForm, "initForm");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", boot); }
  else { boot(); }
})();
