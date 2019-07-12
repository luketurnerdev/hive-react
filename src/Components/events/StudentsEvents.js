
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';

class StudentsEvents extends Component {
    state = {
        events: []
    };

    // just after rendering the Events, call to the API
    componentDidMount() {
    let studentsEvents = [];
    axios
    // request call to the db
        .get('http://localhost:3000/events')
        .then(resp => {
            // destructure data from response
            const {data} = resp;
            console.log(data)
            // set length of loop
            let eventsLength = data.length;
            // for loop through all the events
            for (let i = 0; i < eventsLength; i++) {
                // Ony if hivers are attending to the event, and this event hasn't been recommended by CA yet
                if ((data[i].hive_attendees.length > 0) && (data[i].ca_recommended === false)) {
                    // mark it as student event (event a student is attending)
                    studentsEvents.push(data[i]);
                }
            }
            // we change the state according to our previous code
           this.setState({events:studentsEvents});
          
        })
        .catch(error => {
            console.log(error);
        });  
    };
  
  render() {
    console.log(this.state.events)
    const {events} = this.state
    return( 
      <div><h1>{events.map((event)=>(<div key={event.id} >{event.name}</div>))}</h1></div>
    )
}

}

export default StudentsEvents;
