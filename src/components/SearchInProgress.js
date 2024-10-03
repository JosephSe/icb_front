// src/components/SearchInProgress.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInProgress = () => {
  const navigate = useNavigate();

  const [levBirthComplete, setLevBirthComplete] = useState(false);
  const [ipcsSearchComplete, setIpcsSearchComplete] = useState(false);
  const [dvlaSearchComplete, setDvlaSearchComplete] = useState(false);

  useEffect(() => {
    const createTimer = (setComplete) => {
      return setTimeout(() => {
        setComplete(true);
      }, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000);
    };

    const timers = [
      createTimer(setLevBirthComplete),
      createTimer(setIpcsSearchComplete),
      createTimer(setDvlaSearchComplete)
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleViewdetails = () => {
    navigate('/compare-results');
  };


  return (
    <div className="container">
      <h1>Search In Progress</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
        <div className="tile">
          <div className="tile-content">
            <div>
              <h2>LEV - BIRTH</h2>
              {!levBirthComplete && (
                <>
                  <div className="loader"></div>
                  <p>Searching...</p>
                </>
              )}
              {levBirthComplete && (
                <>
                  <p>Search Complete</p>
                  <p>Identity Verification - 55%</p>
                  <p>Nationality Verification - 95%</p>
                  <p>Vulnerability Verification - N/A</p>
                  <p>Eligibility Verification - N/A</p>
                </>
              )}
          </div>
          </div>
          {!levBirthComplete ? (
            <button className="tile-button">Stop</button>
          ) : (
            <button className="button tile-button" onClick={handleViewdetails}>View Details</button>
          )}
        </div>
        <div className="tile">
          <div className="tile-content">
            <h2>IPCS</h2>
            {!ipcsSearchComplete && (
                <>
                  <div className="loader"></div>
                  <p>Searching...</p>
                </>
              )}
              {ipcsSearchComplete && (
                <>
            <p>Search Complete</p>
            <p>Identity Verification - 95%</p>
            <p>Nationality Verification - N/A</p>
            <p>Vulnerability Verification - N/A</p>
            <p>Eligibility Verification - N/A</p>
            </>
              )}
          </div>
          {!ipcsSearchComplete ? (
            <button className="tile-button">Stop</button>
          ) : (
            <button className="button tile-button" onClick={handleViewdetails}>View Details</button>
          )}
        </div>
        <div className="tile">
          <div className="tile-content">
            <h2>DVLA</h2>
            {!dvlaSearchComplete && (
                <>
                  <div className="loader"></div>
                  <p>Searching...</p>
                </>
              )}
              {dvlaSearchComplete && (
                <>
            <p>Search Incomplete</p>
            <p>Multiple Matches Found</p>
            </>
              )}
          </div>
          {!dvlaSearchComplete ? (
            <button className="tile-button">Stop</button>
          ) : (
            <button className="button tile-button" onClick={handleViewdetails}>View Details</button>
          )}
        </div>
      </div>
      <div className="button-container">
        <button onClick={() => window.history.back()} className="button">Back</button>
        <button onClick={() => window.location.href = '/'} className="button">Home</button>
      </div>
    </div>
  );
};

export default SearchInProgress;