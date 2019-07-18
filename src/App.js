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
// Just for testing (-Juanma)
import SingleEvent from './Components/events/SingleEvent';
import Profile from './Components/profiles/Profile';
import Statistic from './Components/profiles/Statistic';
import Suggestions from './Components/events/Suggestions';
import Reviews from './Components/events/Reviews';
import Attendees from './Components/events/Attendees';
import EditRating from './Components/events/EditRating';




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
                      <Route exact path="/events/:id/editratings" component={EditRating} />
                      <Route exact path="/my_reviews" component={MyReviews} />
                      <Route exact path="/all_suggestions" component={AllSuggestions} />
                      <Route exact path="/myprofile" component={MyProfile} />
                      <Route exact path="/events/:id" component={SingleEvent} />
                      <Route exact path="/events/:id/attendees" component={Attendees} />

                  </div>

                  </Switch>
              </Router>
     
      </div>
          

      );
  }
}




export default App;