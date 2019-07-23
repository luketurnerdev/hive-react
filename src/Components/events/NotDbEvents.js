import React, { Component } from 'react'
import LocalAPI from '../../localApi';
import {Col,Row,Button,Card}  from 'react-bootstrap';


export class NotDbEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventNames: [],
            eventTimes: [],
            eventDates: [],
            eventsData: null

        }
        
    }
    componentDidMount() {
        LocalAPI.get('/dashboard')
        .then(resp => {
            let [userData, eventsData] = resp.data;
            // need to use event name and event group url name to the attend button

            this.setState({eventsData: eventsData});
            let eventNames = [];
            let eventDates = [];
            let eventTimes = [];

            for (let i=0; i<10; i++) {
                eventNames.push(eventsData[i].name);
                eventDates.push(eventsData[i].local_date);
                eventTimes.push(eventsData[i].local_time);
            }
            this.setState({eventNames:eventNames});
            
            
           
            
        })
        .catch(err =>{
            console.log(err);
        })
    }

    render() {

        const eventsData = this.state.eventsData;
        const names = this.state.eventNames;
        const times = this.state.eventTimes;
        const dates = this.state.eventDates;


        return (
            <div> 
            <h1>Events from Meetup.com</h1> 
            {

                
                
                eventsData && eventsData.map((event) => {
                    return (
                        
                        <>
                        <h5 key={event.id}>{event.name} </h5>
                        <li 
                        key={event.id}>{event.local_date} at {event.local_time}
                        <Button size="sm" variant="primary" value={event._id}>Attend</Button>   
                        </li>
                        </>
                    )
                    
                })

                
            }
                
                
            </div>



        )
    }
}

export default NotDbEvents