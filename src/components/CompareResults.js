import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CompareResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSources = location.state?.selectedSources || {};

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
        <h1 className="govuk-heading-l">Compare Results Together</h1>
        <table className="govuk-table">
          <caption className="govuk-table__caption govuk-table__caption--m">Compare the detailed results holistically</caption>
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">Search Filters</th>
              <th scope="col" className="govuk-table__header">LEV - Birth</th>
              <th scope="col" className="govuk-table__header">IPCS</th>
              <th scope="col" className="govuk-table__header">DVLA</th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {[
              { label: "First Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
              { label: "Middle Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
              { label: "Last Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
              { label: "Date of Birth", lev: "waiting...", ipcs: "—", dvla: "Resolution Required" },
              { label: "Address", lev: "waiting...", ipcs: "", dvla: "Resolution Required" },
              { label: "Unique Identifier - Birth Cert", lev: "waiting...", ipcs: "N/A", dvla: "N/A" },
              { label: "Driving Licence Number", lev: "N/A", ipcs: "✔", dvla: "Resolution Required" },
            ].map((row, index) => (
              <tr className="govuk-table__row" key={index}>
                <th scope="row" className="govuk-table__header">{row.label}</th>
                <td className="govuk-table__cell">{row.lev}</td>
                <td className="govuk-table__cell">{row.ipcs}</td>
                <td className="govuk-table__cell">{row.dvla}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-container">
          <button onClick={() => window.history.back()} className="govuk-button">Back</button>
          <button onClick={() => window.location.href = '/'} className="govuk-button">Home</button>
        </div>
      </main>
    </div>
  );
};

export default CompareResults;
