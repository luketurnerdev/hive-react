import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';

// Events Component
class Events extends Component {
  state={
    events:[]
  }

  // just after rendering the Events, call to the API
  componentDidMount(){
  axios
      .get('/events')
      .then(resp => {
          console.log(resp.data)
          const {data} = resp;
          // modify the state according to the data in the API's response
         this.setState({events:data})
        
      })
      .catch(error => {
          console.log(error);
      });  
    
  }

render(){
  console.log(this.state.events)
  const {events} = this.state
  return( 
    <div><h1>{events.map((event)=>(<div key={event.id} >{event.name}</div>))}</h1></div>
  )

}


};

export default Events;
