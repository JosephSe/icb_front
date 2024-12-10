import React from 'react';

const ViewResult = ({ searchResults, selectedSources}) => {
  const data = [
  ];

  const source = selectedSources;
  
  const searchResult = searchResults;

  if (searchResult.icbMatch?.isFullRecordAvailable) {
    // Iterate over the keys of icbMatchRecord
    
    Object.entries(searchResult.icbMatch.icbMatchRecord).forEach(([key, value]) => {
      const index1 = data.findIndex(item => item.label === key);
      if (index1 === -1) {
        // If no existing entry in `data`, add a new one.
        data.push({
          label: key, 
          fields: {
            [source]: value
          }
        });
      } else {  
        // If the entry exists, update its `fields`.
        data[index1].fields[source] = value;
      }
    });
  }
  const capitalizeFirstLetter = (str) => {
    if(str=='fileName'){
      return "Photo"
    }
    if (typeof str === 'string') {
      return str
        .split(/(?=[A-Z])/)
        .join(" ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }
   
    return str;
  };
  

  const formatDateOfBirth = (dobArray) => {
    if (Array.isArray(dobArray)) {
      const [year, month, day] = dobArray;
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${day} ${monthNames[month - 1]} ${year}`;
    }
    return dobArray; 
  };

  // Format Address (remove any extra quotes if present)
  const formatAddress = (address) => {
    if (typeof address === 'string') {
      // Remove extra quotes, then split the address by spaces and join with commas
      return address.replace(/"/g, '').split(' ').join(', ');
    }
    return address;
  };
  


  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
        <fieldset className="govuk-fieldset" aria-describedby="verification-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">View Details - {source} </h1>
          </legend>
        </fieldset>
        <div id="verification-hint" className="govuk-hint">
          View Additional Details.
        </div>
        <table className="govuk-table">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">Fields</th>
              <th key={source} scope="col" className="govuk-table__header">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {data
              .filter(row => row.fields[source] && row.fields[source] !== "") // Filter out rows without valid field values
              .map((row, index) => (
                <tr className="govuk-table__row" key={index}>
                  <th scope="row" className="govuk-table__header">
                    {capitalizeFirstLetter(row.label)} {/* Capitalize the first letter of the label */}
                  </th>
                  <td className="govuk-table__cell" key={source}>
                  {(row.label === "dateOfBirth" || row.label === 'dateOfRegistration') ? formatDateOfBirth(row.fields[source]) :
                      row.label === "address" ? formatAddress(row.fields[source]) :
                      row.label === "fileName" ? (  // Assuming 'fileName' contains the image path
                        <img 
                          src={row.fields[source]} 
                          alt="Image" 
                          style={{ width: '100px', height: 'auto' }}  // Set dimensions if needed
                        />
                      ) :
                      row.fields[source]}
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ViewResult;
