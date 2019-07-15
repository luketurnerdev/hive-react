import React,{Component} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
// import HomePage from './Components/pages/HomePage'
import DbEvents from './Components/events/DbEvents'
import './App.css';
import Profile from './Components/profiles/Profile'

class App extends Component {
  render() {
      return (
        // <div>
        //       <BrowserRouter>
        //           <div>
        //               {/* <Route exact path="/" component={HomePage} />
        //               <Route exact path="/login" component={Login} />
        //               <Route exact path="/requestaccess" component={RequestAccess} />
        //               <Route exact path="/dashboard" component={Dashboard} /> */}
        //               <Route exact path="/events" component={DbEvents} />



                  
                  
        //           </div>
        //       </BrowserRouter>
        //   </div>
        <Profile />
      );
  }
}




export default App;