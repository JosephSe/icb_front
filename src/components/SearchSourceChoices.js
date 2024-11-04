import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Button, ErrorText } from 'govuk-react';
import SearchFilter from '../models/SearchFilter'; // Import SearchFilter model
import BioDetails from '../models/BioDetails';
import Address from '../models/Address';
import UniqueId from '../models/UniqueID';

const SearchSourceChoices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchFilter = location.state?.selectedFilter;
  if (!searchFilter) {
    console.warn("SearchFilter is undefined or not passed correctly.");
 } else {
    console.log("Passed values SearchFilter:", searchFilter);
 }

 
  
  // Initialize states with data from searchFilter if it exists
  const [selectedSources, setSelectedSources] = useState({
    levBirth: searchFilter?.searchSources.includes('LEV') || false,
    levMarriage: false,
    levDeath: false,
    dvla: searchFilter?.searchSources.includes('DVLA') || false,
    ipcs: searchFilter?.searchSources.includes('IPCS') || false,
    hmrc: false,
  });
  const filteredSources = [];
  const [errorMessage, setErrorMessage] = useState('');
  const [levData, setLevData] = useState({
    birthCertNumber: searchFilter?.searchIDTypes.find(type => type.idType === 'BIRTH_CERTIFICATE')?.idValue || '',
    firstName: searchFilter?.searchBioDetails?.firstName || '',
    lastName: searchFilter?.searchBioDetails?.lastName || '',
    dateOfBirth: {
      day: searchFilter?.searchBioDetails?.dateOfBirth?.split('-')[2] || '',
      month: searchFilter?.searchBioDetails?.dateOfBirth?.split('-')[1] || '',
      year: searchFilter?.searchBioDetails?.dateOfBirth?.split('-')[0] || '',
    },
  });


  const [dvlaData, setDvlaData] = useState({
    drivingLicenceNumber: searchFilter?.searchIDTypes.find(type => type.idType === 'DRIVER_LICENSE')?.idValue || '',
  });
  
  const [addressData, setAddressData] = useState({
    line1: searchFilter?.address?.line1||'',
    line2:  searchFilter?.address?.line2||'',
    city:  searchFilter?.address?.city||'',
    postCode:  searchFilter?.address?.postcode||''
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
  // Handle input changes for address fields
  const handleAddressInputChange = (event) => {
    const { id, value } = event.target;
    setAddressData({
      ...addressData,
      [id]: value,
    });
  };

  const handleDobChange = (event) => {
    const { name, value } = event.target;
    setLevData((prevData) => ({
      ...prevData,
      dateOfBirth: {
        ...prevData.dateOfBirth,
        [name]: value,
      },
    }));
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
    
    if (selectedSources.levBirth) filteredSources.push('LEV');
    if (selectedSources.dvla) filteredSources.push('DVLA');
    if (selectedSources.ipcs) filteredSources.push('IPCS');

    if (filteredSources.length === 0) {
      setErrorMessage('Please select at least one search source.');
      return;
    }

    setErrorMessage('');
    const uniqueId=[];
    if(filteredSources.includes('LEV')){
      const birthId = new UniqueId('LEV', 'BIRTH_CERTIFICATE', levData.birthCertNumber);
      uniqueId.push(birthId);
    }
    if(filteredSources.includes('DVLA')){
      const driveId=new UniqueId('DVLA','DRIVER_LICENSE',dvlaData.drivingLicenceNumber);
      uniqueId.push(driveId);
    }
   
    const dob = levData.dateOfBirth;
    // Check if year, month, or day is missing, and set formattedDateOfBirth to an empty string if so
    const formattedDateOfBirth = dob.year && dob.month && dob.day
      ? `${dob.year}-${dob.month.padStart(2, '0')}-${dob.day.padStart(2, '0')}`
      : '';
    const bioDetails = new BioDetails(levData.firstName, levData.lastName, '', formattedDateOfBirth);
    const address=new Address(addressData.line1,addressData.line2,addressData.city,addressData.postCode);
    
    
    const searchFilter = new SearchFilter(filteredSources, uniqueId, bioDetails, address);



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

          <div className="govuk-checkboxes" data-module="govuk-checkboxes" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
  <div className="govuk-checkboxes__item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        className="govuk-checkboxes__input"
        id="levBirth"
        name="lifeEvent"
        type="checkbox"
        value="birth"
        checked={selectedSources.levBirth}
        onChange={handleCheckboxChange}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor="levBirth">
        LEV - Birth
      </label>
    </div>

    {/* Birth Certificate Number input inline with checkbox */}
    {selectedSources.levBirth && (
      <div className="govuk-form-group" style={{ marginBottom: 0, width: '400px' }}>
        <label htmlFor="birthCertNumber" className="govuk-label govuk-visually-hidden">
          Birth Certificate Number
        </label>
        <input
          type="text"
          id="birthCertNumber"
          className="govuk-input"
          placeholder="Enter birth certificate number"
          value={levData.birthCertNumber}
          onChange={handleInputChange}
          style={{ width: '100%' }} // Adjust input width to fit container
        />
      </div>
    )}
  </div>

  <div className="govuk-checkboxes__item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        className="govuk-checkboxes__input"
        id="dvla"
        name="service"
        type="checkbox"
        value="dvla"
        checked={selectedSources.dvla}
        onChange={handleCheckboxChange}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor="dvla">
        DVLA - Driver Verification Service
      </label>
    </div>

    {/* Driving License Number input inline with checkbox */}
    {selectedSources.dvla && (
      <div className="govuk-form-group" style={{ marginBottom: 0, width: '400px' }}>
        <label htmlFor="drivingLicenseNumber" className="govuk-label govuk-visually-hidden">
          Driving License Number
        </label>
        <input
          type="text"
          id="drivingLicenceNumber"
          className="govuk-input"
          placeholder="Enter driving license number"
          value={dvlaData.drivingLicenceNumber}
          onChange={handleDvlaInputChange}
          style={{ width: '100%' }} // Adjust input width to fit container
        />
      </div>
    )}
  </div>

  <div className="govuk-checkboxes__item" style={{ display: 'flex', alignItems: 'center' }}>
    <input
      className="govuk-checkboxes__input"
      id="ipcs"
      name="service"
      type="checkbox"
      value="ipcs"
      checked={selectedSources.ipcs}
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
              For example, 31 03 1980
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
          <h2 className="govuk-heading-m">Address Details</h2>
          <div className="govuk-form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="line1" className="govuk-label">Line 1</label>
            <input
              type="text"
              id="line1"
              className="govuk-input"
              placeholder="Enter line 1"
              value={addressData.line1}
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="line2" className="govuk-label">City</label>
            <input
              type="text"
              id="line2"
              className="govuk-input"
              placeholder="Enter line 2"
              value={addressData.line2}
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="govuk-form-group">
            <label htmlFor="city" className="govuk-label">City</label>
            <input
              type="text"
              id="city"
              className="govuk-input"
              placeholder="Enter city"
              value={addressData.city}
              onChange={handleAddressInputChange}
            />
          </div>

          <div className="govuk-form-group">
            <label htmlFor="postalCode" className="govuk-label">Post Code</label>
            <input
              type="text"
              id="postCode"
              className="govuk-input"
              placeholder="Post Code"
              value={addressData.postCode}
              onChange={handleAddressInputChange}
            />
          </div>
        </div>
      )}


      <div className="button-container">
      <Button onClick={() => window.location.href = '/'} className="govuk-button">Back</Button>
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
