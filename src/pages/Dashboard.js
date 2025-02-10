


// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Snackbar from './Snackbar'; // Import the reusable Snackbar component

// function Dashboard() {
//   const [longUrl, setLongUrl] = useState('');
//   const [shortUrl, setShortUrl] = useState('');
//   const [customAlias, setCustomAlias] = useState('');
//   const [topic, setTopic] = useState('');
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarType, setSnackbarType] = useState('');
//   const navigate = useNavigate(); // For redirecting in case of token issues

//   const showSnackbar = (message, type) => {
//     setSnackbarMessage(message);
//     setSnackbarType(type);
//     setTimeout(() => setSnackbarMessage(''), 3000); // Hide after 3 seconds
//   };

//   const handleShortenUrl = async () => {
//     const token = localStorage.getItem('token'); // Get token from local storage

//     if (!token) {
//       showSnackbar('You are not logged in. Redirecting to login...', 'error');
//       setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/shorten',
//         {
//           longUrl,
//           customAlias,
//           topic,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setShortUrl(response.data.shortUrl);
//       showSnackbar('URL shortened successfully!', 'success');
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         showSnackbar('Session expired. Redirecting to login...', 'error');
//         setTimeout(() => navigate('/login'), 2000);
//       } else {
//         showSnackbar(
//           `Error shortening URL: ${error.response?.data?.error || 'Unknown error'}`,
//           'error'
//         );
//       }
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>URL Shortener Dashboard</h2>

//       <input
//         type="text"
//         placeholder="Enter Long URL"
//         value={longUrl}
//         onChange={(e) => setLongUrl(e.target.value)}
//         style={{ padding: '8px', width: '300px', marginRight: '10px' }}
//       />
//       <input
//         type="text"
//         placeholder="Custom Alias (Optional)"
//         value={customAlias}
//         onChange={(e) => setCustomAlias(e.target.value)}
//         style={{ padding: '8px', width: '300px', marginRight: '10px' }}
//       />
//       <input
//         type="text"
//         placeholder="Topic (Optional)"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//         style={{ padding: '8px', width: '300px', marginRight: '10px' }}
//       />
//       <button onClick={handleShortenUrl} style={{ padding: '8px 15px' }}>
//         Shorten URL
//       </button>

//       {snackbarMessage && <Snackbar message={snackbarMessage} type={snackbarType} />}

//       {shortUrl && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Shortened URL:</h3>
//           <a href={shortUrl} target="_blank" rel="noopener noreferrer">
//             {shortUrl}
//           </a>

//           <p>Topic: {topic || 'General'}</p>

//           <button
//             onClick={() => {
//               window.location.href = `http://localhost:3000/analytics?shortUrl=${shortUrl}`;
//             }}
//             style={{ marginTop: '10px', padding: '8px 15px' }}
//           >
//             View Analytics
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

//Dashborad .css updated 
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/dashboard.css'; // <-- Import the custom CSS
import Snackbar from './Snackbar'; // <-- Adjust path if Snackbar is elsewhere

function Dashboard() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [topic, setTopic] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');

  const navigate = useNavigate(); // For redirecting in case of token issues

  // Helper to show and hide snackbar
  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setTimeout(() => setSnackbarMessage(''), 3000); // Hide after 3 seconds
  };

  // Handler for shortening URL
  const handleShortenUrl = async () => {
    const token = localStorage.getItem('token'); // Get token from local storage

    if (!token) {
      showSnackbar('You are not logged in. Redirecting to login...', 'error');
      setTimeout(() => navigate('/'), 2000); // Redirect to login after 2 seconds
      return;
    }

    try {
      const response = await axios.post(
        'https://url-shortner-backend.up.railway.app/shorten',
        { longUrl, customAlias, topic },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShortUrl(response.data.shortUrl);
      showSnackbar('URL shortened successfully!', 'success');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showSnackbar('Session expired. Redirecting to login...', 'error');
        setTimeout(() => navigate('/'), 2000);
      } else {
        showSnackbar(
          `Error shortening URL: ${error.response?.data?.error || 'Unknown error'}`,
          'error'
        );
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* ======= NAVBAR ======= */}
      <nav className="navbar">
        <div className="navbar-logo">URL Shortener</div>
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      {/* ======= MAIN CONTENT ======= */}
      <div className="main-content">
        <h2 className="title">URL Shortener Dashboard</h2>

        <div className="form-container">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Custom Alias (Optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Topic (Optional)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button className="shorten-btn" onClick={handleShortenUrl}>
            Shorten URL
          </button>
        </div>

        {snackbarMessage && <Snackbar message={snackbarMessage} type={snackbarType} />}

        {shortUrl && (
          <div className="short-url-result">
            <h3>Shortened URL:</h3>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <p>Topic: {topic || 'General'}</p>
            <button
              className="analytics-btn"
              onClick={() => {
                // Direct link to your analytics page
                window.location.href = `http://localhost:3000/analytics?shortUrl=${shortUrl}`;
              }}
            >
              View Analytics
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
