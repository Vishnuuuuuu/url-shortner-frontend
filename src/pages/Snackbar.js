import React from 'react';

function Snackbar({ message, type }) {
  const styles = {
    backgroundColor: type === 'success' ? '#4CAF50' : '#F44336', // Green for success, Red for error
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  };

  return <div style={styles}>{message}</div>;
}

export default Snackbar;
