import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBAr from './Components/NavigationBar';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RequestAccess from './pages/RequestAccess'
import StudentRequest from './pages/StudentRequest'
import Dashboard from './pages/Dashboard'
import DbEvents from './pages/DbEvents'
import Event_id from './pages/Event_id'
import MyReviews from './pages/MyReviews'
import AllSuggestions from './pages/AllSuggestions'
import MyProfile from './pages/MyProfile'

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
                      <Route exact path="/login" component={LoginPage} />
                      <Route exact path="/request_access" component={RequestAccess} />
                      <Route exact path="/student_request" component={StudentRequest} />
                      <Route exact path="/dashboard" component={Dashboard} />
                      <Route exact path="/events" component={DbEvents} />
                      {/* react-routes-dom package takes :id from us and puts it into props.match.params */}
                      <Route exact path="/events/:id" component={Event_id} />
                      <Route exact path="/my_reviews" component={MyReviews} />
                      <Route exact path="/all_suggestions" component={AllSuggestions} />
                      <Route exact path="/myprofile" component={MyProfile} />
                  </div>

                  </Switch>
              </Router>
     
      </div>
          

      );
  }
}




export default App;