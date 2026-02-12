// --- Mobile nav toggle ---
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after click
  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// --- Smooth scroll for hero buttons ---
document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll");
    const el = document.querySelector(target);
    if (!el) return;

    const headerOffset = 74; // sticky header height
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  });
});

// --- Countdown (shows days, hours, minutes, seconds) ---
const countdownEl = document.getElementById("countdown");

// Set date: 14 Feb 2026 10:00 AM Sri Lanka time (UTC+5:30)
// We use local time in browser; it’s fine since it’s informational.
const weddingDate = new Date("2026-02-14T10:00:00+05:30");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  if (!countdownEl) return;

  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "Today 💜";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = `${days}d • ${pad2(hours)}h • ${pad2(minutes)}m • ${pad2(seconds)}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

