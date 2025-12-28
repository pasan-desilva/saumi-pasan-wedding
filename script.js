const navBtn = document.getElementById("navbtn");
const nav = document.getElementById("nav");

if (navBtn && nav) {
  navBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on link click (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Copy venue details
const copyVenue = document.getElementById("copyVenue");
if (copyVenue) {
  copyVenue.addEventListener("click", async () => {
    const text = [
      "Saumi & Pasan — Wedding",
      "14 February 2026",
      "Vinrich Lake Resort — Lakewood Chateau"
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      copyVenue.textContent = "Copied ✓";
      setTimeout(() => (copyVenue.textContent = "Copy venue details"), 1500);
    } catch (e) {
      alert("Copy failed. You can manually copy from the Venue section.");
    }
  });
}
