import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  fetch("http://localhost:3000/", {
      method: "GET",
    }
    )
    .then(response => console.log('Working!'))


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the Hive!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );

    
}

export default App;
