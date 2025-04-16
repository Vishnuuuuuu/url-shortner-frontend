import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css'; // Ensure you create and import this CSS file

function ProfilePage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Fetch user details from the server or localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in. Redirecting to login...');
      navigate('/');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('https://url-backend.treehouselms.com/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        alert('Failed to fetch user details. Redirecting to login...');
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token from storage
    alert('Logged out successfully!');
    navigate('/');  // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {user.username || 'User'}!</h1>
      <div className="profile-card">
        <p><strong>Username:</strong> {user.username || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
