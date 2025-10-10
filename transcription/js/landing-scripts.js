// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission to Google Apps Script
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !submitBtn) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Šaljem...";
    submitBtn.style.opacity = "0.7";

    // Collect form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      organization: document.getElementById("organization").value,
      specialty: document.getElementById("specialty").value,
      message: document.getElementById("message").value,
    };

    // Submit to Google Apps Script
    fetch(
      "https://script.google.com/macros/s/AKfycbwk--SRRfSSsVunWYBI2gqG50rrEBAGuikCmF7TCB8zQ0mdQjWg1sO83JWvYA-izmVm/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then(() => {
        // With no-cors mode, we can't read the response, but if no error was thrown, assume success
        // The Apps Script will still save to Sheets and send email
        window.location.href = "hvala.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        submitBtn.textContent = "Greška - pokušajte ponovo";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        alert(
          "Došlo je do greške. Molimo pokušajte ponovo ili nas kontaktirajte emailom."
        );
      });
  });
});
