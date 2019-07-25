//Output: all events 
//( Signed in as STUDENT/ADMIN)
import React, { Component } from 'react';
// import CAEvents from '../Components/events/CAEvents';
import StudentsBox from '../Components/CarouselBox/StudentsBox';
import NotDbEvents from '../Components/events/NotDbEvents';
import {Col,Row,Container,Badge,Alert}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import CAEventsBox from '../Components/CarouselBox/CAEventsBox';
import Moment from '../Components/events/Moment';
import axios from 'axios';
import localApi from "../localApi";
// import { Calendar, momentLocalizer } from 'react-big-calendar';



// import Moment from './../Components/events/Moment'

// START Title component for an <h3> tag 
const Calendar_style = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  width={64}
    height={64}
`;
// Style a Wrapper component with a <section> tag
const Wrapper = styled.section`
  background: #f9fdfd;
  margin:0.5em;
  
`;
// Style a Calendar component with a <section> tag
const Calendar = styled.section`
    padding: 3em;
    background: white;
    justify-content: center;
    display: flex;
    align-content: center;
  
`;

const SeeMore = styled.section`
display: flex;
align-content: flex-end;
justify-content: flex-end;`

export class Dashboard extends Component {


    state = {
        events: []
    }
   
    componentDidMount() {
        this.handleRerenderCalendar();
    };
    //function to re-render Calendar
    // we get all the events that should be displayed in Calendar and pass them to Moment.js
    handleRerenderCalendar = () => {      
        let events = [];
        axios.all([
          localApi.get('get_user'),
          localApi.get('events')
    
        ])
        .then(axios.spread((userResp, eventsResp) => {
          // destructure data of user
          const {data} = userResp;
          // declare a variable for eventsData
          const eventsData = eventsResp.data;
          // we need to find those events the user is attending
          // calculate the length of the loop
          let eventsLength = eventsData.length;
          // loop through all the events
          for (let i = 0; i < eventsLength; i++) {
            if (eventsData[i].hive_attendees.includes(data._id)) {
              events.push({title: eventsData[i].name, start: new Date(`${eventsData[i].local_date}T${eventsData[i].local_time}`), end: new Date(`${eventsData[i].local_date}T${eventsData[i].local_time}`), desc: eventsData[i].description, time: eventsData[i].local_time, date: eventsData[i].local_date, photo: eventsData[i].photo_link});
            }
          }
          this.setState({events});
        }))
        .catch(error => {
          console.log(error);
        })
    };


    render() {  
        let {events} = this.state;
        return (
            <div>
                <Container>
                <Row>
                    <Col>
                        <Calendar>
            
                            <Calendar_style>
                            <Moment events={events} />
                            </Calendar_style>
                        </Calendar>
                    </Col>   

                    <Col>
                    {/* <ADMIN'S SUGGESTION LIST */}
                    <Wrapper>
                        <Container>
                            <Row>
                                <Col><Alert><h1>Coder Academy List</h1></Alert></Col>
                                <SeeMore>
                                <Col><Link to="/events"><Badge size="sm" variant="outline-secondary" >See more</Badge></Link></Col>
                                </SeeMore>
                            </Row>
                            <CAEventsBox handleRerenderCalendar={this.handleRerenderCalendar} />
                        </Container>
                    </Wrapper>
                    {/* <END> */}

                    {/* <STUDENTS'S SUGGESTION LIST */}
                    <Wrapper>
                        <Container>
                            <Row>
                                <Col><Alert><h1>Students List</h1></Alert></Col>
                                <SeeMore>
                                <Col><Link to="/events"><Badge size="sm" variant="outline-secondary" >See more</Badge></Link></Col>
                                </SeeMore>
                            </Row>
                            <StudentsBox handleRerenderCalendar={this.handleRerenderCalendar} />
                        </Container>
                    </Wrapper>
                    {/* <END> */}
                    </Col>
                </Row>

                    {/* <NON DB MEETUP LIST */}
                    <Wrapper>
                    <Col><Alert><h1>Meetups</h1></Alert></Col>

                        <NotDbEvents/>
                        
                    </Wrapper>
                    {/* <END> */}
                    
            </Container>
        </div>
        )
    }
}

export default Dashboard
