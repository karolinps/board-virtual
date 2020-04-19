import React from 'react';
import './App.css';
import NavMenu from './components/Nav'
import Dashboard from './components/Dashboard'


function App() {
  return (
    <div className="App">
      <NavMenu />
      <Dashboard/>
    </div>
  );
}

export default App;
