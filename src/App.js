import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBAr from './Components/NavigationBar';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AccountRequests from './pages/AccountRequests'
import RequestAccess from './pages/RequestAccess'
import Dashboard from './pages/Dashboard'
import DbEvents from './pages/DbEvents'
import Event_id from './pages/Event_id'
import MyReviews from './pages/MyReviews'
import AllSuggestions from './pages/AllSuggestions'
import MyProfile from './pages/MyProfile'
import EditRating from './Components/events/EditRating'
import Attendees from './Components/events/Attendees'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';



class App extends Component {
  render() {
      return (
      <div>
        
              <Router>
                <NavigationBAr/>
                <Switch>
                 
                      <Route exact path="/" component={HomePage} />
                      <Route exact path="/auth/register" component={LoginPage} />
                      <Route exact path="/account_requests" component={AccountRequests} />
                      <Route exact path="/dashboard" component={Dashboard} />
                     
                      <Route exact path="/events" component={DbEvents} />
                      <Route exact path="/events/suggestions" component={AllSuggestions} />
                      <Route exact path="/events/:id" component={Event_id} />
                      {/* TBD FOR THE PAGE -GROUP/:ID */}
                      <Route exact path="/events/:group/:id" component={Event_id} />
                      <Route exact path="/users/request" component={RequestAccess} />
                      <Route exact path="/:id" component={MyProfile} />
                      <Route exact path="/reviews" component={MyReviews} />

                  </Switch>
              </Router>
     
      </div>
          

      );
  }
}




export default App;