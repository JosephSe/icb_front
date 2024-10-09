import { Button } from 'govuk-react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSources = location.state?.selectedSources || {};
  
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
        <h1 className="govuk-heading-l">Search Filters</h1>
        {/* <h2>Selected Sources</h2>
        <ul>
          {Object.entries(selectedSources).map(([key, value]) => 
            value && <li key={key}>{key}</li>
          )}
        </ul> */}
        <h2 className="govuk-heading-m">Unique Identifiers</h2>
        <div className="form">
          {selectedSources.levBirth && (
            <div className="govuk-form-group">
              <label htmlFor="bcert" className="govuk-label">Birth Certificate Number:</label>
              <input type="text" id="bcert" placeholder="Birth Certificate Number" className="govuk-input" />
            </div>
          )}
          {selectedSources.dvla && (
            <div className="govuk-form-group">
              <label htmlFor="did" className="govuk-label">Driving Licence Number:</label>
              <input type="text" id="did" placeholder="Enter identifier" className="govuk-input" />
            </div>
          )}
        </div>

        <h2 className="govuk-heading-m">Biographic Details</h2>
        <div className="form">
          <div className="govuk-form-group">
            <label htmlFor="firstName" className="govuk-label">First Name:</label>
            <input type="text" id="firstName" placeholder="First Name" className="govuk-input" />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="middleName" className="govuk-label">Middle Name:</label>
            <input type="text" id="middleName" placeholder="Middle Name" className="govuk-input" />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="lastName" className="govuk-label">Last Name:</label>
            <input type="text" id="lastName" placeholder="Last Name" className="govuk-input" />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="dateOfBirth" className="govuk-label">Date of Birth:</label>
            <input type="date" id="dateOfBirth" className="govuk-input" />
          </div>
          
          <fieldset className="govuk-fieldset">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
              <h2 className="govuk-fieldset__heading">Address</h2>
            </legend>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address-line-1">
                Address line 1
              </label>
              <input className="govuk-input" id="address-line-1" name="addressLine1" type="text" placeholder="Address line 1" autocomplete="address-line1" />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address-line-2">
                Address line 2 (optional)
              </label>
              <input className="govuk-input" id="address-line-2" name="addressLine2" type="text" placeholder="Address line 2" autocomplete="address-line2" />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address-town">
                Town or city
              </label>
              <input className="govuk-input govuk-!-width-two-thirds" id="address-town" name="addressTown" type="text" placeholder="Town or city" autocomplete="address-level2" />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address-postcode">
                Postcode
              </label>
              <input className="govuk-input govuk-input--width-10" id="address-postcode" name="addressPostcode" type="text" placeholder="Postcode" autocomplete="postal-code" />
            </div>
          </fieldset>
        </div>
      <div className="button-container">
        <Button onClick={() => navigate(-1)} className="button">Back</Button>
        <Button onClick={() => navigate('/search-in-progress')} className="button">Continue</Button>
      </div>
      </main>
      </div>
  );
};

export default SearchFilters;
