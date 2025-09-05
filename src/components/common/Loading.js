import React from 'react';
import './Loading.css';

const Loading = ({ size = 'medium', text = 'Loading...', overlay = false }) => {
  const LoadingSpinner = () => (
    <div className={`loading-container ${overlay ? 'loading-overlay' : ''}`}>
      <div className={`loading-spinner loading-${size}`}></div>
      {text && <div className="loading-text">{text}</div>}
    </div>
  );

  return <LoadingSpinner />;
};

export default Loading;
