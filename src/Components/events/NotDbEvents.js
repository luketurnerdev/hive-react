import React, { Component } from 'react';
import axios from "axios";
import localApi from '../../localApi';
import {Button}  from 'react-bootstrap';


export class NotDbEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventNames: [],
            eventTimes: [],
            eventDates: [],
            eventsData: null,
            userData: "",
            currentEvents: []

        }
        
    }

    handleAttend = (eventId, groupURLname) => {
        // sending call to backend 
            localApi.post(`events/new/`, {
                meetupEventId:eventId,
                groupUrlname:groupURLname 
            })
            .then(res=>{
                console.log(res.data)
                this.props.handleRerenderCalendar();
            })
        }
    componentDidMount() {
        axios.all([
            localApi.get('/events'),
            localApi.get('/dashboard')
          ])
          .then(axios.spread((eventsResp, dashBoardResp) => {
            let [userData, eventsData] = dashBoardResp.data;
            let {data} = eventsResp.data;
            console.log(eventsResp);
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
            this.setState({eventNames:eventNames, userData, currentEvents: data});   
            console.log(data);     
        }))
        .catch(err =>{
            console.log(err);
        })
    }

    render() {

        const {eventsData, userData, currentEvents} = this.state;
        console.log(eventsData);
        console.log(userData);

        return (
            <div> 
            <h1>Events from Meetup.com</h1> 
            {

                

                eventsData && eventsData.map((event) => {
                    return (
                        
                        
                        <>
                        {console.log(event.id)}
                        <h5>{event.name}</h5>
                        <li 
                        key={event.id}>{event.local_date} at {event.local_time}
        
                        <Button size="sm" variant="primary" onClick={()=>this.handleAttend(event.id, event.group.urlname)}>
                            {((event.hive_attendees !== undefined))?
                                <>Unattend</>:
                                <>Attend</>}
                        </Button>                   
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