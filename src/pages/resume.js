import React from 'react';
import ReactDOM from 'react-dom/client';
import ResumePage from './resumePage.jsx';
import '../styles/resume.css';

let root = null;

export function renderResumePage(container) {
  // Clear existing content
  container.innerHTML = '<div id="resume-root"></div>';
  
  const rootElement = document.getElementById('resume-root');
  if (root) {
    root.unmount();
  }
  
  root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(ResumePage));
}
