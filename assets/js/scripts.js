// Wait for the document to load before running the script

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all popovers with error handling
  try {
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    console.log("Found popovers:", popoverTriggerList.length);

    if (typeof bootstrap !== "undefined" && bootstrap.Popover) {
      const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => {
        console.log("Initializing popover for:", popoverTriggerEl.id);
        return new bootstrap.Popover(popoverTriggerEl);
      });
      console.log("Popovers initialized successfully");
    } else {
      console.error("Bootstrap not loaded or Popover not available");
    }

    // Also initialize tooltips
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    console.log("Found tooltips:", tooltipTriggerList.length);

    if (typeof bootstrap !== "undefined" && bootstrap.Tooltip) {
      const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
      );
      console.log("Tooltips initialized successfully");
    }
  } catch (error) {
    console.error("Error initializing popovers/tooltips:", error);
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
});
