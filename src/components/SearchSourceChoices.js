// src/components/SearchSourceChoices.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@govuk-react/checkbox';
import {  Button, Heading } from 'govuk-react';


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
      
      
      <div className="govuk-form-group">
  <fieldset className="govuk-fieldset" aria-describedby="verification-hint">
    <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h1 className="govuk-fieldset__heading">
      Search Source Choices
      </h1>
    </legend>
    <div id="verification-hint" className="govuk-hint">
    Choose from the following search sources
    </div>
    <div className="govuk-checkboxes" data-module="govuk-checkboxes">
      <div className="govuk-checkboxes__item">
        <input
          className="govuk-checkboxes__input"
          id="levBirth"
          name="lifeEvent"
          type="checkbox"
          value="birth"
          onChange={handleCheckboxChange}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor="levBirth">
          LEV - Birth
        </label>
      </div>
     
      
      <div className="govuk-checkboxes__item">
        <input
          className="govuk-checkboxes__input"
          id="dvla"
          name="service"
          type="checkbox"
          value="dvla"
          onChange={handleCheckboxChange}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor="dvla">
          DVLA - Driver Verification Service
        </label>
      </div>
      <div className="govuk-checkboxes__item">
        <input
          className="govuk-checkboxes__input"
          id="ipcs"
          name="service"
          type="checkbox"
          value="ipcs"
          onChange={handleCheckboxChange}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor="ipcs">
          IPCS - Irish Passport Check Service
        </label>
      </div>
      
    </div>
  </fieldset>
</div>

        
      <div className="button-container">
        <Button onClick={() => navigate(-1)} className="govuk-button">Back</Button>
        <Button onClick={handleContinue} className="govuk-button">Continue</Button>
      </div>
    </div>
  );
};

export default SearchSourceChoices;
