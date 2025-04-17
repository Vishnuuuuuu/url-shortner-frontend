import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import hackerLogo from '../assets/logo.png';
import '../styles/login.css';
import Snackbar from './Snackbar'; // make sure this is correct path

function LoginPage() {
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setTimeout(() => setSnackbarMessage(''), 3000);
  };

  const handleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('https://url-backend.treehouselms.com/api/auth/google', {
        token: response.credential,
      });

      const { token, user } = res.data;

      // Store everything in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.googleId);
      localStorage.setItem('name', user.name || 'User');
      localStorage.setItem('email', user.email);

      //console.log('🔐 Login success:', user);
      showSnackbar('Login successful!', 'success');

      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      //console.error('❌ Login failed', err);
      showSnackbar('Login failed. Please try again.', 'error');
    }
  };

  return (
    <div className="login-container">
      <img src={hackerLogo} alt="App Logo" className="login-logo" />

      <h2 className="login-heading">URL Shortener</h2>
      <p className="login-description">
        Welcome to the Matrix of URL Shorteners—secure, efficient, and a bit rebellious.
      </p>

      <div className="google-login-btn">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => showSnackbar('Google login failed', 'error')}
        />
      </div>

      <div className="login-howto">
        <h3>How It Works</h3>
        <ul>
          <li>Login with your Google account to authenticate.</li>
          <li>Shorten your URLs, and watch the IP tracking come alive.</li>
          <li>Monitor analytics in real time from your dashboard.</li>
        </ul>
        <div> Made by Vishnu Prasad S </div>
      </div>

      {snackbarMessage && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}
    </div>
  );
}

export default LoginPage;
