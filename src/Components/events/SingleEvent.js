import React, { Component } from 'react'
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
        .get('http://localhost:3000/events/3')
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
        const {id} = this.state.event
        return( 
        <div><h1>{id}</h1></div>
        )
    }
}

export default SingleEvent;
