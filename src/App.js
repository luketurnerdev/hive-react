import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './Components/pages/HomePage'
import DbEvents from './Components/pages/DbEvents'
import Dashboard from './Components/pages/Dashboard'
import Reviews from './Components/pages/Reviews'

import NavigationBAr from './Components/NavigationBar';

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
                    
                  </div>
                  </Switch>
              </Router>
     
      </div>
          
      );
  }
}




export default App;