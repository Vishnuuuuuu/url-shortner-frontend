

// // below with css

// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../styles/analytics.css';

// // A reusable component to render IP summary in a table

// function IpSummaryTable({ ipSummary = [] }) {
//   if (!ipSummary.length) {
//     return <p>No IP data available.</p>;
//   }

//   return (
//     <div className="table-container"> {/* Added container for horizontal scroll */}
//       <table className="ip-summary-table">
//         <thead>
//           <tr>
//             <th>IP Address</th>
//             <th>Device</th>
//             <th>OS</th>
//             <th>Browser</th>
//             <th>Battery</th>
//             <th>Charging</th>
//             <th>City</th>
//             <th>Region</th>
//             <th>Country</th>
//             <th>ISP</th>
//             <th>Clicks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ipSummary.map((entry, idx) => {
//             const geoData = entry.geoData || {};
//             return (
//               <tr key={idx}>
//                 <td>
//                   <a
//                     href={`https://whatismyipaddress.com/ip/${entry.ip}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     title="click to get location"
//                   >
//                     {entry.ip}
//                   </a>
//                 </td>
//                 <td>{entry.device}</td>
//                 <td>{entry.os}</td>
//                 <td>{entry.browser || 'N/A'}</td>
//                 <td>{entry.batteryPercentage}%</td>
//                 <td>{entry.isCharging ? 'Yes' : 'No'}</td>
//                 <td>{geoData.city || 'N/A'}</td>
//                 <td>{geoData.region || 'N/A'}</td>
//                 <td>{geoData.country || 'N/A'}</td>
//                 <td>{geoData.isp || 'N/A'}</td>
//                 <td>{entry.clicks}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function AllAnalytics() {
//   const navigate = useNavigate();

//   const [aliasInput, setAliasInput] = useState('');
//   const [aliasAnalytics, setAliasAnalytics] = useState(null);

//   const [overallAnalytics, setOverallAnalytics] = useState(null);

//   const [topicInput, setTopicInput] = useState('');
//   const [topicAnalytics, setTopicAnalytics] = useState(null);

//   const [shortUrlInput, setShortUrlInput] = useState('');
//   const [shortUrlAnalytics, setShortUrlAnalytics] = useState(null);

//   const [error, setError] = useState('');

//   // Helper to get the JWT token from localStorage
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('You are not logged in. Redirecting to login...');
//       setTimeout(() => navigate('/'), 1500);
//       return null;
//     }
//     return { Authorization: `Bearer ${token}` };
//   };

//   // Common error handler
//   const handleError = (err) => {
//     if (err.response?.status === 401) {
//       setError('Session expired or unauthorized. Redirecting to login...');
//       setTimeout(() => navigate('/'), 1500);
//     } else {
//       setError(err.response?.data?.error || 'Error fetching analytics.');
//     }
//   };

//   // ======== 1. By Full Short URL ========
//   const fetchShortUrlAnalytics = async () => {
//     setShortUrlAnalytics(null);
//     setError('');
//     const headers = getAuthHeaders();
//     if (!headers) return;

//     try {
//       const response = await axios.get(
//         `https://url-shortner-backend.up.railway.app/api/analytics/url?shortUrl=${encodeURIComponent(shortUrlInput)}`,
//         { headers }
//       );
//       setShortUrlAnalytics(response.data);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   // ======== 2. By Topic ========
//   const fetchTopicAnalytics = async () => {
//     setTopicAnalytics(null);
//     setError('');
//     const headers = getAuthHeaders();
//     if (!headers) return;

//     try {
//       const response = await axios.get(
//         `https://url-shortner-backend.up.railway.app/api/analytics/topic/${topicInput}`,
//         { headers }
//       );
//       setTopicAnalytics(response.data);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   // ======== 3. Overall Analytics ========
//   const fetchOverallAnalytics = async () => {
//     setOverallAnalytics(null);
//     setError('');
//     const headers = getAuthHeaders();
//     if (!headers) return;

//     try {
//       const response = await axios.get('https://url-shortner-backend.up.railway.app/api/analytics/overall', {
//         headers,
//       });
//       setOverallAnalytics(response.data);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   return (
//     <div className="analytics-container">
//       {/* ======= NAVBAR ======= */}
//       <nav className="navbar">
//         <div className="navbar-logo">URL Shortener</div>
//         <ul className="navbar-links">
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//           <li>
//             <Link to="/analytics">Analytics</Link>
//           </li>
//           <li>
//             <Link to="/profile">Profile</Link>
//           </li>
//         </ul>
//       </nav>
//       <h1 className="analytics-heading">Analytics Dashboard</h1>

//       {/** ============== 1. By Full Short URL ============== */}
//       <section className="analytics-section">
//         <h2>1. Analytics by Full Short URL</h2>
//         <div className="input-container">
//           <input
//             className="analytics-input"
//             type="text"
//             placeholder="Enter short URL, e.g. https://url-shortner-backend.up.railway.app/tracker"
//             value={shortUrlInput}
//             onChange={(e) => setShortUrlInput(e.target.value)}
//           />
//           <button className="analytics-button" onClick={fetchShortUrlAnalytics}>
//             Fetch by Short URL
//           </button>
//         </div>

//         {shortUrlAnalytics && (
//           <div className="analytics-result-card">
//             <h3>Alias: {shortUrlAnalytics.alias}</h3>
//             <p>
//               <strong>Long URL: </strong>
//               <a
//                 href={shortUrlAnalytics.longUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {shortUrlAnalytics.longUrl}
//               </a>
//             </p>
//             <p>
//               <strong>Total Clicks: </strong>
//               {shortUrlAnalytics.totalClicks}
//             </p>

//             <h4>IP Summary:</h4>
//             <IpSummaryTable ipSummary={shortUrlAnalytics.ipSummary} />
//           </div>
//         )}
//       </section>

//       {/** ============== 2. By Topic ============== */}
//       <section className="analytics-section">
//         <h2>2. Analytics by Topic</h2>
//         <div className="input-container">
//           <input
//             className="analytics-input"
//             type="text"
//             placeholder="Enter Topic (e.g., 'yt', 'sports', etc.)"
//             value={topicInput}
//             onChange={(e) => setTopicInput(e.target.value)}
//           />
//           <button className="analytics-button" onClick={fetchTopicAnalytics}>
//             Fetch by Topic
//           </button>
//         </div>

//         {topicAnalytics && (
//           <div>
//             <h3>Topic: {topicAnalytics.topic}</h3>
//             {topicAnalytics.urls.map((urlObj, index) => (
//               <div className="analytics-result-card" key={index}>
//                 <h4>Alias: {urlObj.alias}</h4>
//                 <p>
//                   <strong>Short URL: </strong>
//                   <a href={urlObj.shortUrl} target="_blank" rel="noopener noreferrer">
//                     {urlObj.shortUrl}
//                   </a>
//                 </p>
//                 <p>
//                   <strong>Long URL: </strong>
//                   <a href={urlObj.longUrl} target="_blank" rel="noopener noreferrer">
//                     {urlObj.longUrl}
//                   </a>
//                 </p>
//                 <p>
//                   <strong>Total Clicks: </strong>
//                   {urlObj.totalClicks}
//                 </p>
//                 {urlObj.ipSummary && urlObj.ipSummary.length > 0 && (
//                   <>
//                     <h5>IP Summary:</h5>
//                     <IpSummaryTable ipSummary={urlObj.ipSummary} />
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/** ============== 3. Overall Analytics ============== */}
//       <section className="analytics-section">
//         <h2>3. Overall Analytics</h2>
//         <button className="analytics-button" onClick={fetchOverallAnalytics}>
//           Fetch Overall
//         </button>

//         {overallAnalytics && (
//           <div style={{ marginTop: '10px' }}>
//              <p className="analytics-summary">
//               <strong>Total URLs: </strong>
//               {overallAnalytics.totalUrls}
//             </p>
//             <p className="analytics-summary">
//               <strong>Total Clicks: </strong>
//               {overallAnalytics.totalClicks}
//             </p>
//             {overallAnalytics.urls.map((urlObj, index) => (
//               <div className="analytics-result-card" key={index}>
//                 <h4>Alias: {urlObj.alias}</h4>
//                 <p>
//                   <strong>Short URL: </strong>
//                   <a href={urlObj.shortUrl} target="_blank" rel="noopener noreferrer">
//                     {urlObj.shortUrl}
//                   </a>
//                 </p>
//                 <p>
//                   <strong>Long URL: </strong>
//                   <a href={urlObj.longUrl} target="_blank" rel="noopener noreferrer">
//                     {urlObj.longUrl}
//                   </a>
//                 </p>
//                 <p>
//                   <strong>Topic: </strong>
//                   {urlObj.topic}
//                 </p>
//                 <p>
//                   <strong>Clicks: </strong>
//                   {urlObj.clicks}
//                 </p>
//                 {urlObj.ipSummary && urlObj.ipSummary.length > 0 && (
//                   <>
//                     <h5>IP Summary:</h5>
//                     <IpSummaryTable ipSummary={urlObj.ipSummary} />
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Display any errors */}
//       {error && <div className="analytics-error">{error}</div>}
//     </div>
//   );
// }

// export default AllAnalytics;

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/analytics.css';
import Snackbar from './Snackbar'; // Assuming you have a reusable Snackbar component

function AllAnalytics() {
  const navigate = useNavigate();

  const [aliasInput, setAliasInput] = useState('');
  const [aliasAnalytics, setAliasAnalytics] = useState(null);
  const [overallAnalytics, setOverallAnalytics] = useState(null);
  const [topicInput, setTopicInput] = useState('');
  const [topicAnalytics, setTopicAnalytics] = useState(null);
  const [shortUrlInput, setShortUrlInput] = useState('');
  const [shortUrlAnalytics, setShortUrlAnalytics] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');
  const [error, setError] = useState('');

  // Helper to show and hide snackbar
  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setTimeout(() => setSnackbarMessage(''), 3000); // Hide after 3 seconds
  };

  // Helper to get JWT token and handle token validation
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      showSnackbar('You are not logged in. Redirecting to login...', 'error');
      setTimeout(() => navigate('/login'), 2000);
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  // Error handler to handle session expiration and display errors
  const handleError = (err) => {
    if (err.response?.status === 401) {
      showSnackbar('Session expired. Redirecting to login...', 'error');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      showSnackbar(err.response?.data?.error || 'Error fetching analytics.', 'error');
    }
  };

  // ======== 1. By Full Short URL ========
  const fetchShortUrlAnalytics = async () => {
    setShortUrlAnalytics(null);
    setError('');
    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      const response = await axios.get(
        `https://url-shortner-backend.up.railway.app/api/analytics/url?shortUrl=${encodeURIComponent(shortUrlInput)}`,
        { headers }
      );
      setShortUrlAnalytics(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  // ======== 2. By Topic ========
  const fetchTopicAnalytics = async () => {
    setTopicAnalytics(null);
    setError('');
    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      const response = await axios.get(
        `https://url-shortner-backend.up.railway.app/api/analytics/topic/${topicInput}`,
        { headers }
      );
      setTopicAnalytics(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  // ======== 3. Overall Analytics ========
  const fetchOverallAnalytics = async () => {
    setOverallAnalytics(null);
    setError('');
    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      const response = await axios.get('https://url-shortner-backend.up.railway.app/api/analytics/overall', {
        headers,
      });
      setOverallAnalytics(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="analytics-container">
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
      <h1 className="analytics-heading">Analytics Dashboard</h1>
      <p style={{ fontSize: '1rem', color: '#333', marginBottom: '20px' }}>
  <strong>Note:</strong> Click on an IP address to get its location and details.
     </p>
      {/** Snackbar for showing messages */}
      {snackbarMessage && <Snackbar message={snackbarMessage} type={snackbarType} />}

      {/** Analytics sections */}
      <section className="analytics-section">
        <h2>1. Analytics by Full Short URL</h2>
        <div className="input-container">
          <input
            className="analytics-input"
            type="text"
            placeholder="Enter short URL, e.g., https://url-shortner-backend.up.railway.app/tracker"
            value={shortUrlInput}
            onChange={(e) => setShortUrlInput(e.target.value)}
          />
          <button className="analytics-button" onClick={fetchShortUrlAnalytics}>
            Fetch by Short URL
          </button>
        </div>

        {shortUrlAnalytics && (
          <div className="analytics-result-card">
            <h3>Alias: {shortUrlAnalytics.alias}</h3>
            <p>
              <strong>Long URL: </strong>
              <a href={shortUrlAnalytics.longUrl} target="_blank" rel="noopener noreferrer">
                {shortUrlAnalytics.longUrl}
              </a>
            </p>
            <p>
              <strong>Total Clicks: </strong>
              {shortUrlAnalytics.totalClicks}
            </p>
          </div>
        )}
      </section>

      {/** More analytics sections go here */}
    </div>
  );
}

export default AllAnalytics;
