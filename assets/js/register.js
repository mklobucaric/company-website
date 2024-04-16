// async function register() {
//   const registerForm = document.getElementById('register-form');

//   const formData = new FormData(registerForm);

//   const data = {
//     first_name: formData.get('register-last-name'),
//     last_name: formData.get('register-last-name'),
//     email: formData.get('register-email'),
//     password: formData.get('register-password'),
//   };

//   console.log(data)
//   alert(data) 

//   try {
//     const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();

//     if (result.status_code === 201) {
//       alert('Registration successful!');
//       window.location.href = '/login';
//     } else {
//       alert('Registration failed!');
//     }
//   } catch (error) {
//     console.error(error);
//     alert('Registration failed!');
//   }

// }