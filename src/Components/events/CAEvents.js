import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';

class CAEvents extends Component {
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
                // Ony if the event has been recommended by CA
                if (data[i].ca_recommended === true) {
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
      <div><h1>{events.map((event)=>(<div onClick={this.selectedEvent} key={event.id} >{event.name}</div>))}</h1></div>
    )
}

}

export default CAEvents;
