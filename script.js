// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// FAQ accordion
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    // close all
    document.querySelectorAll(".faq-q").forEach(b => b.setAttribute("aria-expanded", "false"));
    // open clicked if it was closed
    btn.setAttribute("aria-expanded", expanded ? "false" : "true");
  });
});
