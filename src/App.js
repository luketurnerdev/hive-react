import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage'
import DbEvents from './pages/DbEvents'
import Dashboard from './pages/Dashboard'
import Reviews from './pages/Reviews'
import Profile from './Components/profiles/Profile'
import Attendees from './Components/events/Attendees'
import NavigationBAr from './Components/NavigationBar';
import LoginPage from './pages/LoginPage'
import RequestAccess from './pages/RequestAccess'

import './App.css';


class App extends Component {
  render() {
      return (
      <div>
        
              <Router>
                <NavigationBAr/>
                <Switch>
                  <div>
                      <Route exact path="/" component={HomePage} />
                      <Route exact path="/dashboard" component={Dashboard} />
                      <Route exact path="/events" component={DbEvents} />
                      <Route exact path="/reviews" component={Reviews} />
                      <Route exact path="/profile" component={Profile} />
                      <Route exact path="/attendees" component={Attendees} />
                      <Route exact path="/login" component={LoginPage} />
                      <Route exact path="/request_access" component={RequestAccess} />

                  </div>

                  </Switch>
              </Router>
     
      </div>
          

      );
  }
}




export default App;