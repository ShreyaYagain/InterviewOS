import React from 'react';
import ReactDOM from 'react-dom/client';
import AtomCompiler from './compilerPage.jsx';

let root = null;

export function renderCompilerPage(container) {
  // Clear existing content
  container.innerHTML = '<div id="compiler-root"></div>';
  
  const rootElement = document.getElementById('compiler-root');
  if (root) {
    root.unmount();
  }
  
  root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(AtomCompiler));
}
