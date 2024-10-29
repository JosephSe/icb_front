import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@govuk-react/checkbox';
import { Button, ErrorText } from 'govuk-react';
import SearchFilter from '../models/SearchFilter'; // Import SearchFilter model
import BioDetails from '../models/BioDetails';
import Address from '../models/Address';
import UniqueId from '../models/UniqueID';

const SearchSourceChoices = () => {
  const navigate = useNavigate();
  const [selectedSources, setSelectedSources] = useState({
    levBirth: false,
    levMarriage: false,
    levDeath: false,
    dvla: false,
    ipcs: false,
    hmrc: false,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [levData, setLevData] = useState({
    birthCertNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: { day: '', month: '', year: '' },
  });

  const [dvlaData, setDvlaData] = useState({
    drivingLicenceNumber: '',
  });

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setSelectedSources({
      ...selectedSources,
      [id]: checked,
    });
  };

  // Handle input changes for LEV fields
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setLevData({
      ...levData,
      [id]: value,
    });
  };

  // Handle input change for DVLA field
  const handleDvlaInputChange = (event) => {
    const { id, value } = event.target;
    setDvlaData({
      ...dvlaData,
      [id]: value,
    });
  };

  const handleDobChange = (event) => {
    const { name, value } = event.target;
    setLevData({
      ...levData,
      dateOfBirth: {
        ...levData.dateOfBirth,
        [name]: value,
      },
    });
  };

  const validateFields = () => {
    if (selectedSources.levBirth) {
      const { firstName, lastName } = levData;
      if (!firstName || !lastName) {
        setErrorMessage('First Name and Last Name are mandatory for LEV Birth.');
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateFields()) {
      return;
    }

    const filteredSources = [];

    if (selectedSources.levBirth) filteredSources.push('LEV');
    if (selectedSources.dvla) filteredSources.push('DVLA');
    if (selectedSources.ipcs) filteredSources.push('IPCS');

    if (filteredSources.length === 0) {
      setErrorMessage('Please select at least one search source.');
      return;
    }

    setErrorMessage('');
    const address = new Address();
    const uniqueId = new UniqueId('LEV', 'BIRTH_CERTIFICATE', levData.birthCertNumber);
    const dob = levData.dateOfBirth;
    // Check if year, month, or day is missing, and set formattedDateOfBirth to an empty string if so
    const formattedDateOfBirth = dob.year && dob.month && dob.day
      ? `${dob.year}-${dob.month.padStart(2, '0')}-${dob.day.padStart(2, '0')}`
      : '';
    const bioDetails = new BioDetails(levData.firstName, levData.lastName, '', formattedDateOfBirth);
    // Create an instance of SearchFilter and pass data
    // Wrap uniqueId in an array
    const searchFilter = new SearchFilter(filteredSources, [uniqueId], bioDetails, address);


    //const searchFilter = new SearchFilter(filteredSources, levData, dvlaData);

    // Navigate to the 'Search in Progress' page
    navigate('/search-in-progress', { state: { selectedFilter: searchFilter } });
  };

  return (
    <div className="container">
      <div className="govuk-form-group">
        <fieldset className="govuk-fieldset" aria-describedby="verification-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">Search Source Choices</h1>
          </legend>
          <div id="verification-hint" className="govuk-hint">
            Choose from the following search sources
          </div>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

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

      {/* Conditionally render LEV form fields when the LEV checkbox is selected */}
      {selectedSources.levBirth && (
        <div className="govuk-form-group">
          <h2 className="govuk-heading-m">LEV - Birth Details</h2>

          <div className="govuk-form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="birthCertNumber" className="govuk-label">Birth Certificate Number</label>
            <input
              type="text"
              id="birthCertNumber"
              className="govuk-input"
              placeholder="Enter birth certificate number"
              value={levData.birthCertNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="govuk-form-group" style={{ marginBottom: '20px' }}>
            <h2 className="govuk-heading-m">Biographic Details</h2>
            <label htmlFor="firstName" className="govuk-label">First Name <span className="govuk-required">* </span></label>
            <input
              type="text"
              id="firstName"
              className="govuk-input"
              placeholder="Enter first name"
              value={levData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="govuk-form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="lastName" className="govuk-label">Last Name <span className="govuk-required">* </span></label>
            <input
              type="text"
              id="lastName"
              className="govuk-input"
              placeholder="Enter last name"
              value={levData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <fieldset className="govuk-fieldset" style={{ marginBottom: '30px' }}>
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Date of Birth</legend>
            <div id="dob-hint" className="govuk-hint">
              For example, 31 3 1980
            </div>
            <div className="govuk-date-input">
              <div className="govuk-date-input__item" style={{ marginRight: '10px' }}>
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="dob-day">Day</label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="dob-day"
                    name="day"
                    type="text"
                    value={levData.dateOfBirth.day}
                    onChange={handleDobChange}
                  />
                </div>
              </div>
              <div className="govuk-date-input__item" style={{ marginRight: '10px' }}>
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="dob-month">Month</label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-2"
                    id="dob-month"
                    name="month"
                    type="text"
                    value={levData.dateOfBirth.month}
                    onChange={handleDobChange}
                  />
                </div>
              </div>
              <div className="govuk-date-input__item">
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="dob-year">Year</label>
                  <input
                    className="govuk-input govuk-date-input__input govuk-input--width-4"
                    id="dob-year"
                    name="year"
                    type="text"
                    value={levData.dateOfBirth.year}
                    onChange={handleDobChange}
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      )}


      <div className="button-container">
        <Button onClick={() => navigate(-1)} className="govuk-button">Back</Button>
        <Button
          onClick={handleContinue}
          className="govuk-button"  // Disable button until first and last name are filled
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SearchSourceChoices;
