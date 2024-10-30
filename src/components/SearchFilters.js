import { Button } from 'govuk-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ensure searchFilter is properly defined and handles cases when location.state is undefined
  const searchFilter = location.state?.selectedSources;

  // Extract selected sources for easy access
  const selectedArray = searchFilter?.searchSources || [];

  // State for first name, last name, and button enablement
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Check if both first name and last name are filled to enable the button
  useEffect(() => {
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [firstName, lastName]);

  const handleContinue = () => {
    const filteredSources = selectedArray;

    if (filteredSources.length === 0) {
      console.error("No valid sources selected.");
      return;
    }

    // Navigate to the next page with selected sources
    navigate('/search-in-progress', { state: { selectedFilter: searchFilter } });
  };

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
        <fieldset className="govuk-fieldset" aria-describedby="verification-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">Search Filters</h1>
          </legend>
        </fieldset>

        {/* Unique Identifiers Section */}
        <h2 className="govuk-heading-m">Unique Identifiers</h2>
        <div className="form">
          {selectedArray.includes('LEV') && (
            <div className="govuk-form-group">
              <label htmlFor="bcert" className="govuk-label">Birth Certificate Number:</label>
              <input type="text" id="bcert" placeholder="Birth Certificate Number" className="govuk-input" />
            </div>
          )}
          {selectedArray.includes('DVLA') && (
            <div className="govuk-form-group">
              <label htmlFor="did" className="govuk-label">Driving Licence Number:</label>
              <input type="text" id="did" placeholder="Enter identifier" className="govuk-input" />
            </div>
          )}
        </div>

        {/* Biographic Details Section */}
        <h2 className="govuk-heading-m">Biographic Details</h2>
        <div className="form">
          <div className="govuk-form-group">
            <label htmlFor="firstName" className="govuk-label">
              First Name <span className="govuk-required"> *</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="govuk-input"
              required
            />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="middleName" className="govuk-label">Middle Name:</label>
            <input type="text" id="middleName" placeholder="Middle Name" className="govuk-input" />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="lastName" className="govuk-label">
              Last Name <span className="govuk-required"> *</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="govuk-input"
              required
            />
          </div>

          {/* Date of Birth Section */}
          <fieldset className="govuk-fieldset">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
              <h2 className="govuk-fieldset__heading">Date of Birth</h2>
            </legend>
            <div id="dob-hint" className="govuk-hint">
              For example, 31 3 1980
            </div>
            <div className="govuk-date-input" id="dob">
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label className="govuk-label govuk-date-input__label" htmlFor="dob-day">Day</label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="dob-day"
                    name="dob-day"
                    type="text"
                    autoComplete="bday-day"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label className="govuk-label govuk-date-input__label" htmlFor="dob-month">Month</label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="dob-month"
                    name="dob-month"
                    type="text"
                    autoComplete="bday-month"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label className="govuk-label govuk-date-input__label" htmlFor="dob-year">Year</label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-4"
                    id="dob-year"
                    name="dob-year"
                    type="text"
                    autoComplete="bday-year"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>
          </fieldset>

         
          {/* <fieldset className="govuk-fieldset">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
              <h2 className="govuk-fieldset__heading">Address</h2>
            </legend>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address-line-1">Address line 1</label>
              <input className="govuk-input" id="address-line-1" name="addressLine1" type="text" placeholder="Address line 1" autoComplete="address-line1" />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address-line-2">Address line 2 (optional)</label>
              <input className="govuk-input" id="address-line-2" name="addressLine2" type="text" placeholder="Address line 2" autoComplete="address-line2" />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address-town">Town or city</label>
              <input className="govuk-input govuk-!-width-two-thirds" id="address-town" name="addressTown" type="text" placeholder="Town or city" autoComplete="address-level2" />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address-postcode">Postcode</label>
              <input className="govuk-input govuk-input--width-10" id="address-postcode" name="addressPostcode" type="text" placeholder="Postcode" autoComplete="postal-code" />
            </div>
          </fieldset> */}

          <div className="button-container">
            <Button onClick={() => navigate(-1)} className="govuk-button">Back</Button>
            <Button
              onClick={handleContinue}
              className="govuk-button"
              disabled={!isButtonEnabled}  // Disable button until first and last name are filled
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchFilters;
