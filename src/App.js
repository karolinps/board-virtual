import React from 'react';
import './App.css';
import NavMenu from './components/Nav'
import Dashboard from './components/Dashboard'
import TopBarProgress from "react-topbar-progress-indicator";


TopBarProgress.config({
  barColors: {
    "0": "#2bab38",
    "1.0": "#fff"
  },
  shadowBlur: 5
});

function App() {
  return (
    <div className="App">
      <NavMenu />
      <Dashboard/>
    </div>
  );
}

export default App;
