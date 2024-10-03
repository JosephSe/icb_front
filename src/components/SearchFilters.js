import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSources = location.state?.selectedSources || {};
  
  return (
    <div className="container">
      <h1>Search Filters</h1>
      {/* <h2>Selected Sources</h2>
      <ul>
        {Object.entries(selectedSources).map(([key, value]) => 
          value && <li key={key}>{key}</li>
        )}
      </ul> */}
      <h2>Unique Identifiers</h2>
      <div className="form">
        {selectedSources.levBirth && (
          <div className="input-group">
            <label htmlFor="bcert" className="label">Birth Certificate Number:</label>
            <input type="text" id="bcert" placeholder="Birth Certificate Number" className="input" />
          </div>
        )}
        {selectedSources.dvla && (
          <div className="input-group">
            <label htmlFor="did" className="label">Driving Licence Number:</label>
            <input type="text" id="did" placeholder="Enter identifier" className="input" />
          </div>
        )}
      </div>
      <h2>Biographic Details</h2>
      <div className="form">
        <div className="input-group">
          <label htmlFor="firstName" className="label">First Name:</label>
          <input type="text" id="firstName" placeholder="First Name" className="input" />
        </div>
        <div className="input-group">
          <label htmlFor="middleName" className="label">Middle Name:</label>
          <input type="text" id="middleName" placeholder="Middle Name" className="input" />
        </div>
        <div className="input-group">
          <label htmlFor="lastName" className="label">Last Name:</label>
          <input type="text" id="lastName" placeholder="Last Name" className="input" />
        </div>
        <div className="input-group">
          <label htmlFor="dateOfBirth" className="label">Date of Birth:</label>
          <input type="date" id="dateOfBirth" className="input" />
        </div>
        <div className="input-group">
          <label htmlFor="address" className="label">Address:</label>
          <textarea id="address" placeholder="Address" className="input" style={{minHeight: '60px'}}></textarea>
        </div>
      </div>
      <div className="button-container">
        <button onClick={() => navigate(-1)} className="button">Back</button>
        <button onClick={() => navigate('/search-in-progress')} className="button">Continue</button>
      </div>
    </div>
  );
};

export default SearchFilters;
