import React from 'react';
import SearchFilter from '../models/SearchFilter';
import BioDetails from '../models/BioDetails';
import { useNavigate } from 'react-router-dom';
import UniqueId from '../models/UniqueID';
import SearchResult from '../models/SearchResult';

const CompareMatches = ({ searchResults, stompClient, updateSearchResults, setShowCompareMatches }) => {
    const navigate = useNavigate();
    const searchResult = searchResults[0];
    const multiMatches = searchResult.multiMatches || [];
    const columns = ["First Name", "Middle Name", "Last Name", "Birthdate", "Address", ""];

    if (searchResult.source === "LEV") {
        columns.splice(5, 0, "Birth Certificate Number");
    } else if (searchResult.source === "DVLA") {
        columns.splice(5, 0, "Driving Licence Number");
    }

    const handleSelect = (index) => {
        console.log(`Row ${index + 1} selected`);
        const selectedData = multiMatches[index];
        const filteredSources = [searchResult.source];
        const uniqueId = new UniqueId('LEV', 'BIRTH_CERTIFICATE', selectedData.birthCertificate);
        const bioDetails = new BioDetails(selectedData.firstName, selectedData.lastName, '', selectedData.dateOfBirth);

        const newSearchFilter = new SearchFilter(filteredSources, [uniqueId], bioDetails, selectedData.address);
        console.log("New Search filter:", newSearchFilter);
        // Reset LEV search result to "searching" state
        updateSearchResults([new SearchResult(searchResult.source, false)]);
        if (stompClient.connected) {

            const jsonString = JSON.stringify(newSearchFilter);
            console.log("JSON is :", jsonString);
            stompClient.publish({
                destination: "/app/search",
                body: jsonString
            });
            
            //
            setShowCompareMatches(false);
            // Hide the CompareMatches table after selection
        } else {
            console.error("STOMP client is not connected. Unable to publish.");
        }
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
                            {columns.map((col, idx) => (
                                <th key={idx} className="govuk-table__header">{col}</th>
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
                                <td className="govuk-table__cell">
                                    {row.address
                                        ? row.address.replace(/^"|"$|\\\"/g, '').replace(/(.*?)(\s+)(.*?)(\s+)(.*)/, '$1, $3, $5')
                                        : 'N/A'}
                                </td>

                                {searchResult.source === "LEV" && (
                                    <td className="govuk-table__cell">{row.birthCertificate || 'N/A'}</td>
                                )}
                                {searchResult.source === "DVLA" && (
                                    <td className="govuk-table__cell">{row.drivingLicenseNumber || 'N/A'}</td>
                                )}
                                <td className="govuk-table__cell">
                                    <button className="govuk-button" onClick={() => handleSelect(index)}>Select</button>
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
