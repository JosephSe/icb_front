import React from 'react';

const CompareMatches = ({ stompClient, searchResults }) => {


    const searchResult = searchResults[0];
    const multiMatches = searchResult.multiMatches || [];
    console.log("search results ", searchResult);
    const columns = ["First Name", "Middle Name", "Last Name", "Birthdate", "Address", ""];
    if (searchResult.source === "LEV") {
        columns.splice(5, 0, "Birth Certificate Number"); // Add at the 5th index
    } else if (searchResult.source === "DVLA") {
        columns.splice(5, 0, "Driving Licence Number"); // Add at the 5th index
    }
    const handleSelect = (index) => {
        console.log(`Row ${index + 1} selected`);
        const selectedData = searchResults[index];
        console.log("Selected data:", selectedData);
    };

    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper" id="main-content" role="main">
                <fieldset className="govuk-fieldset" aria-describedby="comparison-hint">
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                        <h1 className="govuk-fieldset__heading">Comparison Table</h1>
                    </legend>
                </fieldset>
                <div id="comparison-hint" className="govuk-hint">
                    Compare results across matches for various attributes.
                </div>
                <table className="govuk-table">
                    <thead className="govuk-table__head">
                        <tr className="govuk-table__row">
                            {columns.map((col, index) => (
                                <th key={index} scope="col" className="govuk-table__header">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="govuk-table__body">
                        {multiMatches.map((row, index) => (
                            <tr className="govuk-table__row" key={index}>
                                <td className="govuk-table__cell">{row.firstName || 'N/A'}</td>
                                <td className="govuk-table__cell">{row.middleName || 'N/A'}</td>
                                <td className="govuk-table__cell">{row.lastName || 'N/A'}</td>
                                <td className="govuk-table__cell">{row.dateOfBirth || 'N/A'}</td>
                                <td className="govuk-table__cell">{row.address || 'N/A'}</td>
                                {searchResult.source === "LEV" && (
                                    <td className="govuk-table__cell">{row.birthCertificate || 'N/A'}</td>
                                )}
                                {searchResult.source === "DVLA" && (
                                    <td className="govuk-table__cell">{row.drivingLicenseNumber || 'N/A'}</td>
                                )}
                                <td className="govuk-table__cell">
                                    <button onClick={() => handleSelect(index)} className="govuk-button">
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </main>
        </div>
    );
};

export default CompareMatches;
