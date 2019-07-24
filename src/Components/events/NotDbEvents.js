import React, { Component } from 'react'
import LocalAPI from '../../localApi';
import {Col,Row,Button,Card}  from 'react-bootstrap';
import localApi from "../../localApi";
import styled from 'styled-components';

const NotDbStyle = styled.section`
  padding: 2em;

`;

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
            <Card border="light">
                                <Card.Body>
            { eventsData && eventsData.map((event) => {
                    return (
                        <div>
                            <NotDbStyle>
                                {console.log(event)}
                                    <Row>
                                    <Col sm><Card.Text key={event.id}>{event.name}</Card.Text></Col>
                                    <br/>
                                    <hr/>
                                    </Row>
                                    <Row>
                                    <Col>
                                    <Card.Text key={event.id}><small>{event.local_date} at {event.local_time} </small> </Card.Text>
                                    </Col>
                                    <Col>
                                    <Button size="sm" variant="primary" onClick={()=>this.handleAttend(event.id, event.group.urlname)}>
                                    Attend </Button>  </Col>  
                                    </Row>
                                    </NotDbStyle>
                        </div>
                    )
                })
            }
              </Card.Body>
                            </Card>  
                            
            
                
                
            </div>



        )
    }
}

export default NotDbEvents