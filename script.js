// Before publishing, replace this value with Andrew's preferred business email.
const CONTACT_EMAIL = "kuanyin.secnet@gmail.com";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    });
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const contactSetupNote = document.querySelector("#contact-setup-note");

if (contactSetupNote && CONTACT_EMAIL !== "REPLACE_WITH_YOUR_EMAIL") {
  contactSetupNote.hidden = true;
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (CONTACT_EMAIL === "REPLACE_WITH_YOUR_EMAIL") {
      formStatus.textContent = "The contact email is not set yet. Update CONTACT_EMAIL in script.js before publishing.";
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Tech support request from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nReply to: ${email}\n\n${message}`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    formStatus.textContent = "Your email app should open with your message ready to send.";
  });
}
