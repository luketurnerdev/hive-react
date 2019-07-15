import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './Components/pages/HomePage'
import DbEvents from './Components/pages/DbEvents'
import Dashboard from './Components/pages/Dashboard'
import Reviews from './Components/pages/Reviews'
import Profile from './Components/profiles/Profile'
import AverageRates from './Components/events/AverageRates'

import NavigationBAr from './Components/NavigationBar';

import './App.css';
import Attendees from './Components/events/Attendees'
import SingleEvent from './Components/events/SingleEvent';

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
                      {/* react-routes-dom package takes :id from us and puts it into props.match.params */}
                      <Route exact path="/events/:id" component={SingleEvent} />
                      <Route exact path="/events/:id" component={AverageRates} />
                      <Route exact path="/events/:id/attendees" component={Attendees} />                      
                      <Route exact path="/reviews" component={Reviews} />
                      <Route exact path="/profile" component={Profile} />

                  </div>

                  </Switch>
              </Router>
     
      </div>
          

      );
  }
}




export default App;