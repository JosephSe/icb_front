// src/components/SearchSources.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Radio } from 'govuk-react';

const SearchSources = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-l">Search Sources</h1>
            <h2 className="govuk-heading-m">Do you know which sources you need to use for search?</h2>

            <div className="govuk-radios" data-module="govuk-radios">
        <div className="govuk-radios__item">
          <input className="govuk-radios__input" id="knowSourcesYes" name="knowSources" type="radio" value="yes" />
          <label className="govuk-label govuk-radios__label" htmlFor="knowSourcesYes">
            Yes
          </label>
        </div>
        <div className="govuk-radios__item">
          <input className="govuk-radios__input" id="knowSourcesNo" name="knowSources" type="radio" value="no" />
          <label className="govuk-label govuk-radios__label" htmlFor="knowSourcesNo">
            No
          </label>
        </div>
      </div>

            <Button
              onClick={() => navigate('/search-source-choices')}
              
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchSources;
