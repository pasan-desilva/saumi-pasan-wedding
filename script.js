/**
 * Update these later (only these two lines):
 * - GOOGLE_FORM_URL: paste your RSVP Google Form link
 * - WHATSAPP_NUMBER_E164: paste your WhatsApp number in E.164 without + (e.g., 94771234567)
 */
const GOOGLE_FORM_URL = "https://forms.gle/PASTE_YOUR_FORM_LINK_HERE";
const WHATSAPP_NUMBER_E164 = "94XXXXXXXXX"; // TODO: replace later

// Optional: pre-filled WhatsApp message (edit freely)
const WHATSAPP_PREFILL = "Hello Saumi & Pasan, I’d like to RSVP for the wedding. My name is ___ and number of guests is ___.";

// Wedding date for countdown (local time)
const WEDDING_ISO = "2026-02-14T00:00:00+05:30";

function buildWhatsAppLink(numberE164, text) {
  const encoded = encodeURIComponent(text);
  // Works on mobile + desktop (WhatsApp will route appropriately)
  return `https://wa.me/${numberE164}?text=${encoded}`;
}

function setHref(id, url) {
  const el = document.getElementById(id);
  if (el) el.setAttribute("href", url);
}

// Mobile menu
const navBtn = document.getElementById("navbtn");
const drawer = document.getElementById("drawer");

if (navBtn && drawer) {
  navBtn.addEventListener("click", () => {
    const open = drawer.classList.toggle("is-open");
    navBtn.setAttribute("aria-expanded", String(open));
    drawer.setAttribute("aria-hidden", String(!open));
  });

  drawer.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      drawer.classList.remove("is-open");
      navBtn.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
    });
  });
}

// Wire RSVP links
setHref("googleFormBtn", GOOGLE_FORM_URL);

const waLink = buildWhatsAppLink(WHATSAPP_NUMBER_E164, WHATSAPP_PREFILL);
setHref("waHeroBtn", waLink);
setHref("waPanelBtn", waLink);
setHref("waRsvpBtn", waLink);

// Copy helpers
const copyVenueBtn = document.getElementById("copyVenue");
if (copyVenueBtn) {
  copyVenueBtn.addEventListener("click", async () => {
    const text = [
      "Saumi & Pasan — Wedding",
      "14 February 2026",
      "Vinrich Lake Resort — Lakewood Chateau"
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      copyVenueBtn.textContent = "Copied ✓";
      setTimeout(() => (copyVenueBtn.textContent = "Copy details"), 1500);
    } catch {
      alert("Copy failed. Please copy manually from the Venue section.");
    }
  });
}

const copyRsvpBtn = document.getElementById("copyRsvpLink");
if (copyRsvpBtn) {
  copyRsvpBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_FORM_URL);
      copyRsvpBtn.textContent = "Copied ✓";
      setTimeout(() => (copyRsvpBtn.textContent = "Copy RSVP link"), 1500);
    } catch {
      alert("Copy failed. Please copy the link manually.");
    }
  });
}

// Countdown
const countdownEl = document.getElementById("countdown");
function updateCountdown() {
  if (!countdownEl) return;

  const target = new Date(WEDDING_ISO).getTime();
  const now = Date.now();
  let diff = target - now;

  if (diff <= 0) {
    countdownEl.textContent = "Today ✦";
    return;
  }

  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const min = 60 * 1000;

  const days = Math.floor(diff / day);
  diff -= days * day;
  const hours = Math.floor(diff / hour);
  diff -= hours * hour;
  const mins = Math.floor(diff / min);

  countdownEl.textContent = `${days}d • ${hours}h • ${mins}m`;
}
updateCountdown();
setInterval(updateCountdown, 30 * 1000);

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
const lbClose = document.getElementById("lbClose");
const lbBackdrop = document.getElementById("lbBackdrop");

function openLightbox(src, caption = "") {
  if (!lightbox || !lbImg) return;
  lbImg.src = src;
  if (lbCap) lbCap.textContent = caption;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lbImg) lbImg.src = "";
}

document.querySelectorAll(".gitem").forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const full = btn.getAttribute("data-full");
    const img = btn.querySelector("img");
    const cap = img?.alt || `Gallery image ${idx + 1}`;
    if (full) openLightbox(full, cap);
  });
});

if (lbClose) lbClose.addEventListener("click", closeLightbox);
if (lbBackdrop) lbBackdrop.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
