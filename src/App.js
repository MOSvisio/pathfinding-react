import React from 'react';
import logo from './logo.svg';
import GraphProvider from './Store/GraphContext';
import GraphController from './GraphController';
import './App.css';

function App() {
  return (
    <div className="App">
      <GraphProvider />
      <GraphProvider>
        <GraphController />
      </GraphProvider>
    </div>
  );
}

export default App;
