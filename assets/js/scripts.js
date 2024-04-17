
// Wait for the document to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Set the firebaseToken variable in local storage to an empty string or null as the initial value
    localStorage.setItem('firebaseToken', '');
    // Attempt to find the element for mobile popover by its ID
    const popoverTriggerEl = document.querySelector('#mobilePopover');
    // If the element exists, initialize a new Bootstrap popover for it
    if (popoverTriggerEl) {
        new bootstrap.Popover(popoverTriggerEl); 
    }

    // Attempt to find the element for home popover by its ID
    const popoverTriggerHome = document.querySelector('#homePopover');
    // If the element exists, initialize a new Bootstrap popover for it
    if (popoverTriggerHome) {
        new bootstrap.Popover(popoverTriggerHome); 
    }

    // Find all nav-link elements within nav-masthead and set up click event listeners
    document.querySelectorAll('.nav-masthead .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            // When a nav-link is clicked, find all active nav-links and remove the 'active' class
            // and 'aria-current' attribute to deactivate them
            document.querySelectorAll('.nav-masthead .nav-link.active').forEach(activeLink => {
                activeLink.classList.remove('active');
                activeLink.removeAttribute('aria-current');
            });
            // Add the 'active' class and 'aria-current' attribute to the clicked nav-link
            // to visually indicate it as the current page
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');
        });
    });

    // Set up an event listener for when the offcanvas chat element finishes its closing transition
    document.getElementById('offcanvasChat').addEventListener('hidden.bs.offcanvas', function () {
        // This function will contain logic to handle the chat closing,
        // such as disconnecting from chat services or clearing chat history and show chat button
        closeChat();
    });

    // Set up an event listener for when any modal is hidden
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('hidden.bs.modal', function () {
            // Call the closeChat() function when any modal is hidden
            closeChat();
        });
    });

    // Set up an event listener for when any modal is shown
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('shown.bs.modal', function () {
            // Hide the chat dropdown button when any modal is shown
            document.getElementById('bd-chat').classList.add('d-none');
        });
    });

    const chatButton = document.getElementById('bd-chat');
    if (chatButton) {
        chatButton.addEventListener('click', openChat);
    } 

    const registerButton = document.getElementById('register-submit');
    if (registerButton) {
        registerButton.addEventListener('click', register);
    }




});


// Function to open the offcanvas chat and hide the dropdown
function openChat() {

    document.getElementById('bd-chat').classList.add('d-none');

    // Check if a Firebase token is present in local storage
    const token = localStorage.getItem('firebaseToken');

    // If a token is not present, display the modal
    if (!token) {
        var myModal = new bootstrap.Modal(document.getElementById('login'));
        myModal.show();
    } 
    // If a token is present, show the offcanvas chat
    else {
        // Show the offcanvas component
        var offcanvasChat = new bootstrap.Offcanvas(document.getElementById('offcanvasChat'));
        offcanvasChat.show();
    }

    // Display the modal with the ID "register"
    // var myModal = new bootstrap.Modal(document.getElementById('register'));
    // myModal.show();
        
  
    // Show the offcanvas component
    // var offcanvasChat = new bootstrap.Offcanvas(document.getElementById('offcanvasChat'));
    // offcanvasChat.show();
  }
  

    // Function to close the offcanvas chat and show the dropdown
function closeChat() {
    // Show the chat dropdown button
    document.getElementById('bd-chat').classList.remove('d-none');
  
  }

 async function register() {


    // Manually get values from the form inputs
    const firstName = document.getElementById('register-first').value;
    const lastName = document.getElementById('register-last-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    
    // Validate the form data
    if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
        console.log('Please fill out all fields.');
        alert('Please fill out all fields.');
        return;
    }

    if (password !== confirmPassword) {
        console.log('Passwords do not match.');
        alert('Passwords do not match.');
        return;
    }

    const user = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
    };


    try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        });

        const result = await response.json();

        if (response.status === 201) {
            alert('Registration successful!\nPlease login to continue.');
            const inputs = document.querySelectorAll('#register input');
            inputs.forEach(input => {
            input.value = '';
            });

            const myModal = document.getElementById('register');
            const modalRegister = bootstrap.Modal.getInstance(myModal);
            modalRegister.hide();

            const myModal1 = document.getElementById('login');
            const modalLogin = bootstrap.Modal.getInstance(myModal1);
            modalLogin.show();

        } else {
            const result = await response.json(); 
            console.error('Registration failed:', result);
            alert('Registration failed! ' + result.detail);
        }
    } catch (error) {
        console.error(error);
        alert('Registration failed!');
    }

}

