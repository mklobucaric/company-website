  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
   // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC_kCXzNnAKsbj1OfJw2j-nc-kBBSMrpro",
    authDomain: "webpage-418112.firebaseapp.com",
    projectId: "webpage-418112",
  };

// Login function

async function login() {

    const auth = getAuth(app);

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('firebaseToken', token);
        alert('Login successful!');        
        console.log('Token:',token);
        //window.location.href = '/home';
      } catch (error) {
        console.error(error);
        alert('Login failed!');
      }

}

