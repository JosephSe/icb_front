// src/components/SearchSourceChoices.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSourceChoices = () => {
  const navigate = useNavigate();
  const [selectedSources, setSelectedSources] = useState({
    levBirth: false,
    levMarriage: false,
    levDeath: false,
    dvla: false,
    ipcs: false,
    hmrc: false
  });

  const handleCheckboxChange = (event) => {
    setSelectedSources({
      ...selectedSources,
      [event.target.id]: event.target.checked
    });
  };

  const handleContinue = () => {
    navigate('/search-filters', { state: { selectedSources } });
  };
  
  return (
    <div className="container">
      <h1>Search Source Choices</h1>
      <h2>Choose from the following search sources</h2>
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input type="checkbox" id="levBirth" onChange={handleCheckboxChange} /> Life Event Verification - Birth
        </label>
        <label className="checkbox-label">
          <input type="checkbox" id="levMarriage" onChange={handleCheckboxChange} /> Life Event Verification - Marriage
        </label>
        <label className="checkbox-label">
          <input type="checkbox" id="levDeath" onChange={handleCheckboxChange} /> Life Event Verification - Death
        </label>
        <label className="checkbox-label">
          <input type="checkbox" id="dvla" onChange={handleCheckboxChange} /> DVLA - Driver Verification Service
        </label>
        <label className="checkbox-label">
          <input type="checkbox" id="ipcs" onChange={handleCheckboxChange} /> IPCS - Irish Passport Check Service
        </label>
        <label className="checkbox-label">
          <input type="checkbox" id="hmrc" onChange={handleCheckboxChange} /> HMRC - Tax-payer Verification Service
        </label>
      </div>
      <div className="button-container">
        <button onClick={() => navigate(-1)} className="button">Back</button>
        <button onClick={handleContinue} className="button">Continue</button>
      </div>
    </div>
  );
};

export default SearchSourceChoices;
