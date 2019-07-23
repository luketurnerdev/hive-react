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
import Moment from '../Components/events/Moment'



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
  padding: 2em;
  background: #f8f9fa;
  margin:1em 0 0 0;
  
`;
// Style a Calendar component with a <section> tag
const Calendar = styled.section`
    padding: 10em;
    background: #f8f9fa;
    margin: 3em;
`;

const SeeMore = styled.section`
display: flex;
align-content: flex-end;
justify-content: flex-end;`

export class Dashboard extends Component {
    
    render() {  
        return (
            <div>
                <Container>
                <Row>
                    <Col>
                        <Calendar>
                            <Calendar_style>
                            <Moment />
                            </Calendar_style>
                        </Calendar>
                    </Col>   

                    <Col>
                    {/* <ADMIN'S SUGGESTION LIST */}
                    {/* <Wrapper>
                        <Container>
                            <Row>
                                <Col><Alert><h1>Coder Academy List</h1></Alert></Col>
                                <SeeMore>
                                <Col><Link to="/events"><Badge size="sm" variant="outline-secondary" >See more</Badge></Link></Col>
                                </SeeMore>
                            </Row>
                            <CAEventsBox/>
                        </Container>
                    </Wrapper> */}
                    {/* <END> */}

                    {/* <STUDENTS'S SUGGESTION LIST */}
                    {/* <Wrapper>
                        <Container>
                            <Row>
                                <Col><Alert><h1>Students List</h1></Alert></Col>
                                <SeeMore>
                                <Col><Link to="/events"><Badge size="sm" variant="outline-secondary" >See more</Badge></Link></Col>
                                </SeeMore>
                            </Row>
                            <StudentsBox/>
                        </Container>
                    </Wrapper>
                    {/* <END> */}
                    </Col>
                </Row> */}

                    {/* <NON DB MEETUP LIST */}
                    <Wrapper>
                        
                        <NotDbEvents/>
                        
                    </Wrapper>
                    {/* <END> */}
                    
            </Container>
        </div>
        )
    }
}

export default Dashboard
