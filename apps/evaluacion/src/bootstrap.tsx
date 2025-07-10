import React from 'react';
import ReactDOM from 'react-dom/client';
import InsuranceEvaluationDashboard from './MicroApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <InsuranceEvaluationDashboard />
  </React.StrictMode>
); 