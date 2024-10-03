import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CompareResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSources = location.state?.selectedSources || {};

  return (
    <div className="container">
      <h1>Compare Results Together</h1>
      <p>Compare the detailed results holistically</p>
      <table className="search-results-table">
        <thead>
          <tr>
            <th>Search Filters</th>
            <th>LEV - Birth</th>
            <th>IPCS</th>
            <th>DVLA</th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: "First Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
            { label: "Middle Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
            { label: "Last Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
            { label: "Date of Birth", lev: "waiting...", ipcs: "—", dvla: "Resolution Required" },
            { label: "Address", lev: "waiting...", ipcs: "", dvla: "Resolution Required" },
            { label: "Unique Identifier - Birth Cert", lev: "waiting...", ipcs: "N/A", dvla: "N/A" },
            { label: "Driving Licence Number", lev: "N/A", ipcs: "✔", dvla: "Resolution Required" },
          ].map((row, index) => (
            <tr key={index}>
              <td>{row.label}</td>
              <td>{row.lev}</td>
              <td>{row.ipcs}</td>
              <td>{row.dvla}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={() => window.history.back()} className="button">Back</button>
        <button onClick={() => window.location.href = '/'} className="button">Home</button>
      </div>
    </div>
  );
};

export default CompareResults;
