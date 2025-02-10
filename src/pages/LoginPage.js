// // import { GoogleLogin } from '@react-oauth/google';
// // import axios from 'axios';
// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // function LoginPage() {
// //   const navigate = useNavigate();

// //   const handleLoginSuccess = async (response) => {
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/auth/google', {
// //         token: response.credential,
// //       });
// //       localStorage.setItem('token', res.data.token);
// //       alert('Login successful!');
// //       console.log(res.data);
// //       navigate('/dashboard');
// //     } catch (err) {
// //       console.error('Login failed', err);
// //       alert('Login failed');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login with Google</h2>
// //       <GoogleLogin
// //         onSuccess={handleLoginSuccess}
// //         onError={() => console.log('Google login failed')}
// //       />
// //     </div>
// //   );
// // }

// // export default LoginPage;


// import { GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const navigate = useNavigate();

//   const handleLoginSuccess = async (response) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/google', {
//         token: response.credential,
//       });

//       // Store token and userId in local storage
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('userId', res.data.user.googleId);  // Store userId for future use

//       alert('Login successful!');
//       console.log(res.data);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Login failed', err);
//       alert('Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Login with Google</h2>
//       <GoogleLogin
//         onSuccess={handleLoginSuccess}
//         onError={() => console.log('Google login failed')}
//       />
//     </div>
//   );
// }

// export default LoginPage;


// below with css 
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import hackerLogo from '../assets/logo.png';
import '../styles/login.css'; // <-- Import our custom CSS
// ^ Adjust path to match where your logo image is

function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    try {
      // const res = await axios.post('http://localhost:5000/api/auth/google', {
        const res = await axios.post('https://url-shortner-backend.up.railway.app/api/auth/google', {
        token: response.credential,
      });

      // Store token and userId in local storage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.googleId);

      alert('Login successful!');
      console.log(res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      {/* Logo Section */}
      <img src={hackerLogo} alt="App Logo" className="login-logo" />

      {/* Title & Description */}
      <h2 className="login-heading">Hacker's URL Shortener</h2>
      <p className="login-description">
        Welcome to the Matrix of URL Shorteners—secure, efficient, and a bit rebellious.
      </p>

      {/* Google Login Button */}
      <div className="google-login-btn">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log('Google login failed')}
        />
      </div>

      {/* How It Works */}
      <div className="login-howto">
        <h3>How It Works</h3>
        <ul>
          <li>Login with your Google account to authenticate.</li>
          <li>Shorten your URLs, and watch the IP tracking come alive.</li>
          <li>Monitor analytics in real time from your dashboard.</li>
        </ul>
        <div> Made by Vishnu Prasad S </div>
      </div>
    </div>
  );
}

export default LoginPage;
