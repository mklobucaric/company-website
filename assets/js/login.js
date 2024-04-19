  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, getIdToken } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"; 
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC_kCXzNnAKsbj1OfJw2j-nc-kBBSMrpro",
    authDomain: "webpage-418112.firebaseapp.com",
    projectId: "webpage-418112",
  };


function setupLogin() {
    const loginButton = document.getElementById('login-submit');
    if (loginButton) {
        loginButton.addEventListener('click', login);
    }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupLogin);
} else {
  // DOMContentLoaded has already fired
  setupLogin();
}

// Login function

const app = initializeApp(firebaseConfig);

async function login() {

    const auth = getAuth(app);

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await getIdToken(userCredential.user);
        localStorage.setItem('firebaseToken', token);

        const inputs = document.querySelectorAll('#login input');
        inputs.forEach(input => {
        input.value = '';
        });
         loginModal.hide();
        offcanvasChat.show();
      } catch (error) {
        console.error(error);
        console.log('Login failed!');
      }

}

