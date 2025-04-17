import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';
import Snackbar from './Snackbar'; // Ensure this path is correct

function ProfilePage() {
  const [user, setUser] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');
  const navigate = useNavigate();

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setTimeout(() => setSnackbarMessage(''), 3000); // Hide after 3s
  };

  useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (!name || !email) {
      showSnackbar('Not logged in. Redirecting...', 'error');
      setTimeout(() => navigate('/'), 2000);
      return;
    }

    setUser({ username: name, email });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    showSnackbar('Logged out successfully!', 'success');
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Welcome, {user.username || 'User'}!</h1>

      <div className="profile-card">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      {snackbarMessage && (
        <Snackbar message={snackbarMessage} type={snackbarType} />
      )}
    </div>
  );
}

export default ProfilePage;
