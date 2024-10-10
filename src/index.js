import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/main.scss';
import App from './App';
import { GlobalStyle } from 'govuk-react'; // Import GlobalStyle from govuk-react
import 'normalize.css'; // Import normalize.css for CSS reset

ReactDOM.render(
  <React.StrictMode>
    {/* Apply the GlobalStyle component here */}
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
