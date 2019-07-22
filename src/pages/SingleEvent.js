import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"
import AverageRates from '../Components/events/AverageRates'
import StarReview from '../Components/events/StarReview'

export class SingleEvent extends Component {
    state = {
        event: ""
    }

    // just after rendering the event, call to the API
    componentDidMount() {
    axios
    // request call to the db
        .get(`/events/${this.props.match.params.id}`)
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
    console.log(event);
    console.log(event._id);
    const {_id} = this.state.event;
    console.log(this.props)
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
