import React from 'react';
import './App.css';
import Events from './Components/Events';
import Test from './Components/Test';
import Eventsinput from './Components/Eventsinput';
import HomePage from './Components/pages/HomePage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       < HomePage />
       <h1>WELCOME TO THE HIVE</h1>
      <li>
        <Eventsinput/>
        <Events/>
        <Test />
      </li>
      </header>
    </div>
    
  );
}





export default App;
