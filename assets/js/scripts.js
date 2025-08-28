// Wait for the document to load before running the script

var loginModal;
var registerModal;
// Set the firebaseToken variable in local storage to an empty string or null as the initial value
localStorage.setItem("firebaseToken", "");

document.addEventListener("DOMContentLoaded", () => {
  loginModal = new bootstrap.Modal(document.getElementById("login"));
  registerModal = new bootstrap.Modal(document.getElementById("register"));
  quotaModal = new bootstrap.Modal(document.getElementById("quotaModal"));

  // Attempt to find the element for mobile popover by its ID
  const popoverTriggerEl = document.querySelector("#mobilePopover");
  // If the element exists, initialize a new Bootstrap popover for it
  if (popoverTriggerEl) {
    new bootstrap.Popover(popoverTriggerEl);
  }

  // Attempt to find the element for home popover by its ID
  const popoverTriggerHome = document.querySelector("#homePopover");
  // If the element exists, initialize a new Bootstrap popover for it
  if (popoverTriggerHome) {
    new bootstrap.Popover(popoverTriggerHome);
  }

  // Attempt to find the element for mission popover by its ID
  const popoverTriggerMission = document.querySelector("#missionPopover");
  // If the element exists, initialize a new Bootstrap popover for it
  if (popoverTriggerMission) {
    new bootstrap.Popover(popoverTriggerMission);
  }

  // Find all nav-link elements within nav-masthead and set up click event listeners
  document.querySelectorAll(".nav-masthead .nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      // When a nav-link is clicked, find all active nav-links and remove the 'active' class
      // and 'aria-current' attribute to deactivate them
      document
        .querySelectorAll(".nav-masthead .nav-link.active")
        .forEach((activeLink) => {
          activeLink.classList.remove("active");
          activeLink.removeAttribute("aria-current");
        });
      // Add the 'active' class and 'aria-current' attribute to the clicked nav-link
      // to visually indicate it as the current page
      this.classList.add("active");
      this.setAttribute("aria-current", "page");
    });
  });

  const registerButton = document.getElementById("register-submit");
  if (registerButton) {
    registerButton.addEventListener("click", register);
  }
});

async function register() {
  const firstName = document.getElementById("register-first").value;
  const lastName = document.getElementById("register-last-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById(
    "register-confirm-password"
  ).value;

  // Check if any field is empty
  const inputs = document.querySelectorAll("#register-form .form-control");
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.value) {
      const feedback = input.nextElementSibling;
      feedback.style.display = "block";
      feedback.textContent = "This field is required.";
      isValid = false;
    } else {
      input.nextElementSibling.style.display = "none";
    }
  });

  // Validate email format
  if (!validateEmail(email)) {
    document.getElementById("register-email").nextElementSibling.textContent =
      "Invalid email format";
    document.getElementById("register-email").nextElementSibling.style.display =
      "block";
    isValid = false;
  }

  if (password.length < 8) {
    document.getElementById(
      "register-password"
    ).nextElementSibling.textContent =
      "Password must be at least 8 characters.";
    document.getElementById(
      "register-password"
    ).nextElementSibling.style.display = "block";
    isValid = false;
  }

  // Validate passwords match
  if (password !== confirmPassword) {
    document.getElementById(
      "register-confirm-password"
    ).nextElementSibling.textContent = "Passwords do not match";
    document.getElementById(
      "register-confirm-password"
    ).nextElementSibling.style.display = "block";
    isValid = false;
  }

  if (!isValid) {
    console.error("Validation failed.");
    return;
  }

  const user = {
    email: email,
    password: password,
    first_name: firstName,
    last_name: lastName,
  };

  try {
    const response = await fetch(
      "https://api.techxflow.xyz/api/auth/register",
      {
        //const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const result = await response.json();

    if (response.status === 201) {
      console.log("Registration successful!\nPlease login to continue.");
      const inputs = document.querySelectorAll("#register input");
      inputs.forEach((input) => {
        input.value = "";
      });

      registerModal.hide();
      loginModal.show();
    } else {
      console.error("Registration failed:", result);
      console.log("Registration failed! " + result.detail);
    }
  } catch (error) {
    console.error(error);
    console.log("Registration failed!");
  }
}

// Email validation function
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
