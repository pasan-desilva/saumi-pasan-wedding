(() => {
  // ---------- Helpers ----------
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Mobile nav ----------
  const navToggle = qs("#navToggle");
  const navMobile = qs("#navMobile");

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMobile.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    qsa(".nav-link", navMobile).forEach((link) => {
      link.addEventListener("click", () => {
        navMobile.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Smooth scroll buttons ----------
  qsa("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll");
      const el = target ? qs(target) : null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---------- Countdown ----------
  const countdownMain = qs("#countdownMain");
  const countdownWeeks = qs("#countdownWeeks");

  // Wedding date: 14 Feb 2026 (local time)
  const weddingDate = new Date("2026-02-14T10:00:00"); // 10:00 AM as per schedule

  const pad2 = (n) => String(n).padStart(2, "0");

  function tick() {
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      if (countdownMain) countdownMain.textContent = "Today";
      if (countdownWeeks) countdownWeeks.textContent = "0";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    // Main counter: D • H • M • S
    if (countdownMain) {
      countdownMain.textContent = `${days}d • ${pad2(hours)}h • ${pad2(mins)}m • ${pad2(secs)}s`;
    }

    // Secondary counter: weeks remaining (rounded down)
    const weeks = Math.floor(days / 7);
    if (countdownWeeks) {
      countdownWeeks.textContent = String(weeks);
    }
  }

  tick();
  setInterval(tick, 1000);

  // ---------- RSVP: embed Google Form on button click ----------
  const openFormBtn = qs("#openFormBtn");
  const formEmbed = qs("#formEmbed");

  if (openFormBtn && formEmbed) {
    openFormBtn.addEventListener("click", () => {
      const isHidden = formEmbed.hasAttribute("hidden");
      if (isHidden) formEmbed.removeAttribute("hidden");
      formEmbed.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ---------- WhatsApp (Regrets only) ----------
  const WA_SAUMI = "94714992040";
  const WA_PASAN = "94765463031";

  // Short regrets-only message (refinable later)
  const message = "Hello, I regret to inform you that I won’t be able to attend your wedding.";

  // WhatsApp "click to chat" works with wa.me
  const waUrl = (phone, text) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  const waSaumi = qs("#waSaumi");
  const waPasan = qs("#waPasan");

  if (waSaumi) waSaumi.href = waUrl(WA_SAUMI, message);
  if (waPasan) waPasan.href = waUrl(WA_PASAN, message);
})();
