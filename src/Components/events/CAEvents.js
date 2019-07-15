
import React, {Component} from 'react';
import { Link } from "react-router-dom";
// import axios for sending requests to API
import axios from 'axios';

class CAEvents extends Component {
    state = {
        events: [],
        ids: []
    };

    // just after rendering the Events, call to the API
    componentDidMount() {
    let studentsEvents = [];
    let studentsEventsId = [];
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
                    studentsEventsId.push(data[i].id);
                }
            }
            // we change the state according to our previous code
           this.setState({events:studentsEvents, ids:studentsEventsId});
          
        })
        .catch(error => {
            console.log(error);
        });  
    };
  
  render() {
    console.log(this.state.events)
    const {events, ids} = this.state
    return( 
                    <div>
                        <ul>
                            {events.map((item, index) => {
                                return (
                                    // <div>
                                        <li key={item}>
                                            <div>
                                                <Link to={`/events/${ids[index]}`}>{item.name}</Link>
                                                <p>{item.local_date}</p>
                                                <Link to={`/events/${ids[index]}/attendees`}>Attendees</Link>
                                            </div>                                
                                        
                                        </li>
                                )
                            })}
                        </ul>
                    </div>
            //     </BrowserRouter>
            // </div>
    )
}

}

export default CAEvents;

