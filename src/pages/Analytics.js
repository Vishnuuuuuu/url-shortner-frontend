


// //Below is the one which also has overall and topic based analytics added 
// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // A reusable component to render IP summary in a table
// function IpSummaryTable({ ipSummary = [] }) {
//   if (!ipSummary.length) {
//     return <p>No IP data available.</p>;
//   }

//   return (
//     <table border="1" cellPadding="5" style={{ marginTop: '10px' }}>
//       <thead>
//         <tr>
//           <th>IP Address</th>
//           <th>Device</th>
//           <th>OS</th>
//           <th>Browser</th>
//           <th>Battery</th>
//           <th>Charging</th>
//           <th>City</th>
//           <th>Region</th>
//           <th>Country</th>
//           <th>ISP</th>
//           <th>Clicks</th>
//         </tr>
//       </thead>
//       <tbody>
//         {ipSummary.map((entry, idx) => {
//           const geoData = entry.geoData || {};
//           return (
//             <tr key={idx}>
//               <td>
//                 <a
//                   href={`https://whatismyipaddress.com/ip/${entry.ip}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   title="click to get location" // <-- Hover text
//                 >
//                   {entry.ip}
//                 </a>
//               </td>
//               <td>{entry.device}</td>
//               <td>{entry.os}</td>
//               <td>{entry.browser || 'N/A'}</td>
//               <td>{entry.batteryPercentage}%</td>
//               <td>{entry.isCharging ? 'Yes' : 'No'}</td>
//               <td>{geoData.city || 'N/A'}</td>
//               <td>{geoData.region || 'N/A'}</td>
//               <td>{geoData.country || 'N/A'}</td>
//               <td>{geoData.isp || 'N/A'}</td>
//               <td>{entry.clicks}</td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }

// function AllAnalytics() {
//   const [aliasInput, setAliasInput] = useState('');
//   const [aliasAnalytics, setAliasAnalytics] = useState(null);

//   const [overallAnalytics, setOverallAnalytics] = useState(null);

//   const [topicInput, setTopicInput] = useState('');
//   const [topicAnalytics, setTopicAnalytics] = useState(null);

//   const [shortUrlInput, setShortUrlInput] = useState('');
//   const [shortUrlAnalytics, setShortUrlAnalytics] = useState(null);

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Helper to get the JWT token from localStorage
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       // If no token, redirect to login (adjust as needed)
//       setError('You are not logged in. Redirecting to login...');
//       setTimeout(() => navigate('/login'), 1500);
//       return null;
//     }
//     return { Authorization: `Bearer ${token}` };
//   };

//   // ======== 1. Fetch analytics by alias  ========
//   const fetchAliasAnalytics = async () => {
//     setAliasAnalytics(null);
//     setError('');
//     const headers = getAuthHeaders();
//     if (!headers) return;

//     try {
//       const response = await axios.get(
//         `https://url-shortner-backend.up.railway.app/api/analytics/${aliasInput}`,
//         { headers }
//       );
//       setAliasAnalytics(response.data);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   // ======== 2. Fetch overall analytics  ========
//   const fetchOverallAnalytics = async () => {
//     setOverallAnalytics(null);
//     setError('');
//     const headers = getAuthHeaders();
//     if (!headers) return;

//     try {
//       const response = await axios.get(
//         'https://url-shortner-backend.up.railway.app/api/analytics/overall',
//         { headers }
//       );
//       setOverallAnalytics(response.data);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   // ======== 3. Fetch topic-based analytics  ========
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

//   // ======== 4. Fetch analytics by full short URL  ========
//   const fetchShortUrlAnalytics = async () => {
//     setShortUrlAnalytics(null);
//     setError('');
//     const headers = getAuthHeaders();
//     if (!headers) return;

//     // e.g., shortUrl = "https://url-shortner-backend.up.railway.app/yesw"
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

//   // Common error handler
//   const handleError = (err) => {
//     if (err.response?.status === 401) {
//       setError('Session expired or unauthorized. Redirecting to login...');
//       setTimeout(() => navigate('/login'), 1500);
//     } else {
//       setError(err.response?.data?.error || 'Error fetching analytics.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       {/* <h1>Analytics Dashboard</h1>

//       ======== 1. By Alias ========
//       <section style={{ marginTop: '30px' }}>
//         <h2>1. Analytics by Alias</h2>
//         <div style={{ marginBottom: '10px' }}>
//           <input
//             type="text"
//             placeholder="Enter Alias (e.g., 'yesw')"
//             value={aliasInput}
//             onChange={(e) => setAliasInput(e.target.value)}
//             style={{ padding: '8px', width: '300px', marginRight: '10px' }}
//           />
//           <button onClick={fetchAliasAnalytics} style={{ padding: '8px 12px' }}>
//             Fetch by Alias
//           </button>
//         </div>

//         {aliasAnalytics && (
//           <div>
//             <h3>Alias: {aliasAnalytics.alias}</h3>
//             <p>
//               <strong>Long URL:</strong>{' '}
//               <a href={aliasAnalytics.longUrl} target="_blank" rel="noopener noreferrer">
//                 {aliasAnalytics.longUrl}
//               </a>
//             </p>
//             <p>
//               <strong>Total Clicks:</strong> {aliasAnalytics.totalClicks}
//             </p>

//             <h4>IP Summary:</h4>
//             <IpSummaryTable ipSummary={aliasAnalytics.ipSummary} />
//           </div>
//         )}
//       </section> */}

//       {/* ======== 4. Analytics by full Short URL ======== */}
//       <section style={{ marginTop: '30px' }}>
//         <h2>1. Analytics by Full Short URL</h2>
//         <div style={{ marginBottom: '10px' }}>
//           <input
//             type="text"
//             placeholder="Enter full short URL (e.g., https://url-shortner-backend.up.railway.app/yesw)"
//             value={shortUrlInput}
//             onChange={(e) => setShortUrlInput(e.target.value)}
//             style={{ padding: '8px', width: '400px', marginRight: '10px' }}
//           />
//           <button onClick={fetchShortUrlAnalytics} style={{ padding: '8px 12px' }}>
//             Fetch by Short URL
//           </button>
//         </div>

//         {shortUrlAnalytics && (
//           <div>
//             <h3>Alias: {shortUrlAnalytics.alias}</h3>
//             <p>
//               <strong>Long URL:</strong>{' '}
//               <a href={shortUrlAnalytics.longUrl} target="_blank" rel="noopener noreferrer">
//                 {shortUrlAnalytics.longUrl}
//               </a>
//             </p>
//             <p>
//               <strong>Total Clicks:</strong> {shortUrlAnalytics.totalClicks}
//             </p>

//             <h4>IP Summary:</h4>
//             <IpSummaryTable ipSummary={shortUrlAnalytics.ipSummary} />
//           </div>
//         )}
//       </section>

//       {/* ======== 3. Topic-Based Analytics ======== */}
//       <section style={{ marginTop: '30px' }}>
//         <h2>2. Analytics by Topic</h2>
//         <div style={{ marginBottom: '10px' }}>
//           <input
//             type="text"
//             placeholder="Enter Topic (e.g., 'yt', 'sports', etc.)"
//             value={topicInput}
//             onChange={(e) => setTopicInput(e.target.value)}
//             style={{ padding: '8px', width: '300px', marginRight: '10px' }}
//           />
//           <button onClick={fetchTopicAnalytics} style={{ padding: '8px 12px' }}>
//             Fetch by Topic
//           </button>
//         </div>

//         {topicAnalytics && (
//           <div>
//             <h3>Topic: {topicAnalytics.topic}</h3>
//             {topicAnalytics.urls.map((urlObj, index) => (
//               <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
//                 <h4>Alias: {urlObj.alias}</h4>
//                 <p>
//                   <strong>Short URL:</strong>{' '}
//                   <a href={urlObj.shortUrl} target="_blank" rel="noopener noreferrer">
//                     {urlObj.shortUrl}
//                   </a>
//                 </p>
//                 <p>
//                   <strong>Long URL:</strong>{' '}
//                   <a href={urlObj.longUrl} target="_blank" rel="noopener noreferrer">
//                     {urlObj.longUrl}
//                   </a>
//                 </p>
//                 <p>
//                   <strong>Total Clicks:</strong> {urlObj.totalClicks}
//                 </p>

//                 {/* If you include ipSummary in topic-based response, show it here */}
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
// {/* ======== 2. Overall Analytics ======== */}
// <section style={{ marginTop: '30px' }}>
//         <h2>3. Overall Analytics</h2>
//         <button onClick={fetchOverallAnalytics} style={{ padding: '8px 12px' }}>
//           Fetch Overall
//         </button>

//         {overallAnalytics && (
//           <div style={{ marginTop: '10px' }}>
//             <p>
//               <strong>Total URLs:</strong> {overallAnalytics.totalUrls}
//             </p>
//             <p>
//               <strong>Total Clicks:</strong> {overallAnalytics.totalClicks}
//             </p>

//             {overallAnalytics.urls.map((urlObj, index) => (
//               <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
//                 <h4>Alias: {urlObj.alias}</h4>
//                 <p>
//                   <strong>Short URL:</strong>{' '}
//                   <a href={urlObj.shortUrl} target="_blank" rel="noopener noreferrer">
//                     {urlObj.shortUrl}
//                   </a>
//                 </p>
//                 <p>
//                   <strong>Long URL:</strong>{' '}
//                   <a href={urlObj.longUrl} target="_blank" rel="noopener noreferrer">
//                     {urlObj.longUrl}
//                   </a>
//                 </p>
//                 <p>
//                   <strong>Topic:</strong> {urlObj.topic}
//                 </p>
//                 <p>
//                   <strong>Clicks:</strong> {urlObj.clicks}
//                 </p>

//                 {/* If your backend includes ipSummary in the "overall" response, display it: */}
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
//       {error && (
//         <div style={{ marginTop: '20px', color: 'red' }}>
//           <strong>{error}</strong>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AllAnalytics;


// below with css

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/analytics.css';

// A reusable component to render IP summary in a table
function IpSummaryTable({ ipSummary = [] }) {
  if (!ipSummary.length) {
    return <p>No IP data available.</p>;
  }

  return (
    <table className="ip-summary-table">
      <thead>
        <tr>
          <th>IP Address</th>
          <th>Device</th>
          <th>OS</th>
          <th>Browser</th>
          <th>Battery</th>
          <th>Charging</th>
          <th>City</th>
          <th>Region</th>
          <th>Country</th>
          <th>ISP</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>
        {ipSummary.map((entry, idx) => {
          const geoData = entry.geoData || {};
          return (
            <tr key={idx}>
              <td>
                <a
                  href={`https://whatismyipaddress.com/ip/${entry.ip}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="click to get location"
                >
                  {entry.ip}
                </a>
              </td>
              <td>{entry.device}</td>
              <td>{entry.os}</td>
              <td>{entry.browser || 'N/A'}</td>
              <td>{entry.batteryPercentage}%</td>
              <td>{entry.isCharging ? 'Yes' : 'No'}</td>
              <td>{geoData.city || 'N/A'}</td>
              <td>{geoData.region || 'N/A'}</td>
              <td>{geoData.country || 'N/A'}</td>
              <td>{geoData.isp || 'N/A'}</td>
              <td>{entry.clicks}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function AllAnalytics() {
  const navigate = useNavigate();

  const [aliasInput, setAliasInput] = useState('');
  const [aliasAnalytics, setAliasAnalytics] = useState(null);

  const [overallAnalytics, setOverallAnalytics] = useState(null);

  const [topicInput, setTopicInput] = useState('');
  const [topicAnalytics, setTopicAnalytics] = useState(null);

  const [shortUrlInput, setShortUrlInput] = useState('');
  const [shortUrlAnalytics, setShortUrlAnalytics] = useState(null);

  const [error, setError] = useState('');

  // Helper to get the JWT token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not logged in. Redirecting to login...');
      setTimeout(() => navigate('/'), 1500);
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  // Common error handler
  const handleError = (err) => {
    if (err.response?.status === 401) {
      setError('Session expired or unauthorized. Redirecting to login...');
      setTimeout(() => navigate('/'), 1500);
    } else {
      setError(err.response?.data?.error || 'Error fetching analytics.');
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
      <h1 className="analytics-heading">Analytics Dashboard</h1>

      {/** ============== 1. By Full Short URL ============== */}
      <section className="analytics-section">
        <h2>1. Analytics by Full Short URL</h2>
        <div className="input-container">
          <input
            className="analytics-input"
            type="text"
            placeholder="Enter short URL, e.g. https://url-shortner-backend.up.railway.app/yesw"
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
              <a
                href={shortUrlAnalytics.longUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrlAnalytics.longUrl}
              </a>
            </p>
            <p>
              <strong>Total Clicks: </strong>
              {shortUrlAnalytics.totalClicks}
            </p>

            <h4>IP Summary:</h4>
            <IpSummaryTable ipSummary={shortUrlAnalytics.ipSummary} />
          </div>
        )}
      </section>

      {/** ============== 2. By Topic ============== */}
      <section className="analytics-section">
        <h2>2. Analytics by Topic</h2>
        <div className="input-container">
          <input
            className="analytics-input"
            type="text"
            placeholder="Enter Topic (e.g., 'yt', 'sports', etc.)"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
          />
          <button className="analytics-button" onClick={fetchTopicAnalytics}>
            Fetch by Topic
          </button>
        </div>

        {topicAnalytics && (
          <div>
            <h3>Topic: {topicAnalytics.topic}</h3>
            {topicAnalytics.urls.map((urlObj, index) => (
              <div className="analytics-result-card" key={index}>
                <h4>Alias: {urlObj.alias}</h4>
                <p>
                  <strong>Short URL: </strong>
                  <a href={urlObj.shortUrl} target="_blank" rel="noopener noreferrer">
                    {urlObj.shortUrl}
                  </a>
                </p>
                <p>
                  <strong>Long URL: </strong>
                  <a href={urlObj.longUrl} target="_blank" rel="noopener noreferrer">
                    {urlObj.longUrl}
                  </a>
                </p>
                <p>
                  <strong>Total Clicks: </strong>
                  {urlObj.totalClicks}
                </p>
                {urlObj.ipSummary && urlObj.ipSummary.length > 0 && (
                  <>
                    <h5>IP Summary:</h5>
                    <IpSummaryTable ipSummary={urlObj.ipSummary} />
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/** ============== 3. Overall Analytics ============== */}
      <section className="analytics-section">
        <h2>3. Overall Analytics</h2>
        <button className="analytics-button" onClick={fetchOverallAnalytics}>
          Fetch Overall
        </button>

        {overallAnalytics && (
          <div style={{ marginTop: '10px' }}>
            <p>
              <strong>Total URLs: </strong>
              {overallAnalytics.totalUrls}
            </p>
            <p>
              <strong>Total Clicks: </strong>
              {overallAnalytics.totalClicks}
            </p>
            {overallAnalytics.urls.map((urlObj, index) => (
              <div className="analytics-result-card" key={index}>
                <h4>Alias: {urlObj.alias}</h4>
                <p>
                  <strong>Short URL: </strong>
                  <a href={urlObj.shortUrl} target="_blank" rel="noopener noreferrer">
                    {urlObj.shortUrl}
                  </a>
                </p>
                <p>
                  <strong>Long URL: </strong>
                  <a href={urlObj.longUrl} target="_blank" rel="noopener noreferrer">
                    {urlObj.longUrl}
                  </a>
                </p>
                <p>
                  <strong>Topic: </strong>
                  {urlObj.topic}
                </p>
                <p>
                  <strong>Clicks: </strong>
                  {urlObj.clicks}
                </p>
                {urlObj.ipSummary && urlObj.ipSummary.length > 0 && (
                  <>
                    <h5>IP Summary:</h5>
                    <IpSummaryTable ipSummary={urlObj.ipSummary} />
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Display any errors */}
      {error && <div className="analytics-error">{error}</div>}
    </div>
  );
}

export default AllAnalytics;
