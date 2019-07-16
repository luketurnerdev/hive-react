import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"
import Reviews from './Reviews';
import AverageRates from './AverageRates'

export class SingleEvent extends Component {
    state = {
        event: ""
    }

    // just after rendering the event, call to the API
    componentDidMount() {
    axios
    // request call to the db
        .get(`http://localhost:3000/events/${this.props.match.params.id}`)
        .then(resp => {
            // destructure data from response
            const {data} = resp;
            console.log(data);
           this.setState({event:data}); 
           console.log(data);
        })
        .catch(error => {
            console.log(error);
        });  
    };
  
  render() {
    const {event} = this.state;    
    const {id} = this.state.event;
    console.log(event);
        return( 
            <div>                            
                <Link to={`/events/${id}`}>{event.name}</Link>
                <p>{event.local_date}</p>
                <Link to={`/events/${id}/attendees`}>Attendees</Link>
                {/* conditional rendering */}
                {event?
                <AverageRates id={id}/> :
                null}             
                {event?
                <Reviews id={id}/>:
                null}   
            </div>
        )
    }
}

export default SingleEvent;
