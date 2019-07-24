import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"
import Reviews from './Reviews';
import AverageRates from './AverageRates'
import StarReview from './StarReview'

export class SingleEvent extends Component {
    state = {
        event: ""
    }

    // just after rendering the event, call to the API
    componentDidMount() {

    axios
    // request call to the db
        .get(`/events/5d2e659b89a7d42c791a9213`)
        .then(resp => {
            // destructure data from response
            const {data} = resp;
           this.setState({event:data}); 
        })
        .catch(error => {
            console.log(error);
        });  
    };
  
  render() {
    const {event} = this.state;    
    const {_id} = this.state.event;
        return( 
            <div>                            
                <Link to={`/events/${_id}`}>{event.name}</Link>
                <p>{event.local_date}</p>
                <Link to={`/events/${_id}/attendees`}>Attendees</Link>
                {/* conditional rendering */}
                {event?
                <AverageRates id={_id}/> :
                null}             
                {event?
                <StarReview id={_id}/>:
                null}   
            </div>
        )
    }
}

export default SingleEvent;
