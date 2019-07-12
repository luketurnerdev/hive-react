import React from 'react';
import './App.css';
import HomePage from './Components/pages/HomePage'
// import DbEvents from './Components/events/DbEvents'\
// import StudentsEvents from "./Components/events/StudentsEvents";
import CAEvents from "./Components/events/CAEvents";
import SingleEvent from './Components/events/SingleEvent';

function App() {
 return (
   <div className="App">
     <header className="App-header">
      < HomePage />
      <h1>WELCOME TO THE HIVE</h1>
      {/* < StudentsEvents/> */}
      < CAEvents/>
      {/* < SingleEvent /> */}
     </header>
   </div>

 );
}





export default App;