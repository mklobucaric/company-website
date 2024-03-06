// Ensure that the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const popoverTriggerEl = document.querySelector('#mobilePopover');
    if (popoverTriggerEl) {
        new bootstrap.Popover(popoverTriggerEl); 
    }

    document.querySelectorAll('.nav-masthead .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-masthead .nav-link.active').forEach(activeLink => {
                activeLink.classList.remove('active');
                activeLink.removeAttribute('aria-current');
            });
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');
        });
    });

    // Event listener for when the offcanvas finishes closing
    document.getElementById('offcanvasChat').addEventListener('hidden.bs.offcanvas', function () {
        closeChat();
    });
    

});

// Function to open the offcanvas chat and hide the dropdown
function openChat(model) {
    // Hide the chat dropdown button
    document.getElementById('bd-chat').classList.add('d-none');

   // Hide all checks first to ensure only the correct one is shown   
    document.getElementById('GeminiCheck').classList.add('d-none');
    document.getElementById('ChatCPGCheck').classList.add('d-none');  

    if (model === 'ChatGPT'){
        document.getElementById('ChatCPGCheck').classList.remove('d-none');
    } else if (model === 'Gemini'){
        document.getElementById('GeminiCheck').classList.remove('d-none');
    }

      // For demonstration, we'll log it to the console
  console.log('Chat model selected:', model);
  
    // Show the offcanvas component
    var offcanvasChat = new bootstrap.Offcanvas(document.getElementById('offcanvasChat'));
    offcanvasChat.show();
  }
  
  // Function to close the offcanvas chat and show the dropdown
function closeChat() {
    // Show the chat dropdown button
    document.getElementById('bd-chat').classList.remove('d-none');
  
  }
  

