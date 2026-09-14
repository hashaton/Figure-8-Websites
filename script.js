document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formNote.textContent = "Sending...";
  formNote.style.color = "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formNote.textContent = "Thanks! We'll be in touch within a day or two.";
      formNote.style.color = "#16957f";
      form.reset();
    } else {
      throw new Error("Form submission failed");
    }
  } catch (err) {
    formNote.textContent = "Something went wrong. Please email us directly instead.";
    formNote.style.color = "#c0392b";
  }
});
