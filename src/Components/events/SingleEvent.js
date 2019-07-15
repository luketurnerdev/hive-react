import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"

export class SingleEvent extends Component {
    state = {
        event: {
        id: 0,
        link: "https://www.meetup.com/en-AU/Fishburners-Meetup/events/262219187/",
        name: "Dodam Lee",
        group: "Los bonitos",
        local_date: "2019-08-01",
        local_time: "T23:28:56.782Z",
        how_to_find_us: "Nowhere, Rocklands Road, North Sydney Nueva Gales del Sur",
        attendance_count: 300,
        guest_limit: 500,
        rsvp_limit: 200,
        attendees: [10],
        hive_attendees: ["users[0]"],
        ca_recommended: true,
        student_suggested: false
        }
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
          
        })
        .catch(error => {
            console.log(error);
        });  
    };
  
  render() {
    const {event} = this.state;    
    const {id} = this.state.event;
        return( 
            <div>                            
                <Link to={`/events/${id}`}>{event.name}</Link>
                <p>{event.local_date}</p>
                <Link to={`/events/${id}/attendees`}>Attendees</Link>             
            </div>
        )
    }
}

export default SingleEvent;
