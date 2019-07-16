import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage'
import DbEvents from './pages/DbEvents'
import Dashboard from './pages/Dashboard'
import Reviews from './pages/Reviews'
import Profile from './Components/profiles/Profile'

import AverageRates from './Components/events/AverageRates'
import StudentComments from './Components/events/StudentComments'
import MyCalendar from './Components/events/Moment'


import Attendees from './Components/events/Attendees'

import NavigationBAr from './Components/NavigationBar';
import LoginPage from './pages/LoginPage'
import RequestAccess from './pages/RequestAccess'

import './App.css';

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
                      <Route exact path="/dashboard" component={MyCalendar} />
                      <Route exact path="/events" component={DbEvents} />
                      {/* react-routes-dom package takes :id from us and puts it into props.match.params */}
                      <Route exact path="/events/:id" component={SingleEvent} />
                      {/* <Route exact path="/events/:id" component={AverageRates} /> */}
                      {/* <Route exact path="/events/:id" component={StudentComments} /> */}
                      {/* <Route exact path="/events/:id" component={Reviews} /> */}
                      <Route exact path="/events/:id/attendees" component={Attendees} />
                      <Route exact path="/events/:id/comments" component={StudentComments} />
                      {/* <Route exact path="/reviews" component={Reviews} /> */}
                      <Route exact path="/profile" component={Profile} />
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