import React, { Component } from 'react'
import LocalAPI from '../../localApi';
import {Col,Row,Button,Card}  from 'react-bootstrap';
import localApi from "../../localApi";


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

    handleAttend = (eventId, groupURLname) => {
        // sending call to backend 
            localApi.post(`events/new/`, {
                meetupEventId:eventId,
                groupUrlname:groupURLname 
            })
            .then(res=>{
                console.log(res.data)
            })
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
        console.log(this.state.eventsData);



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
                              
                                Attend
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