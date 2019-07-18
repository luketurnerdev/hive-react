//will render all the events 
//( Signed in as STUDENT/ADMIN)
import React, { Component } from 'react';
import CAEvents from '../Components/events/CAEvents';
import StudentsEvents from '../Components/events/StudentsEvents.js';
import NotDbEvents from '../Components/events/NotDbEvents';
import {Col,Row,Container}  from 'react-bootstrap';
import { MDBContainer, MDBScrollbar } from "mdbreact";

import styled from 'styled-components';
import Media from 'react-bootstrap/Media'



// START Title component for an <h3> tag 
const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  width={64}
    height={64}
`;
// Style a Wrapper component with a <section> tag
const Wrapper = styled.section`
  padding: 2em;
  background: #e7e4d1;
  margin:2em;
`;
// Style a Calendar component with a <section> tag
const Calendar = styled.section`
  padding: 5em;
  background: papayawhip;
  margin:3em;
`;

export class Dashboard extends Component {
    
    render() {
        
           
        return (
            <div>
                <Container>
                <Row>
                    <Col>
                        <Calendar>
                            <Title>
                            CALENDAR
                            </Title>
                        </Calendar>
                    </Col>   
                    {/* <ADMIN'S SUGGESTION LIST */}
                    <Col>
                    <Wrapper>
                            <h5>Coder Academy List</h5>
                           <CAEvents/>
                       
                        </Wrapper>
                    
                    {/* <STUDENTS'S SUGGESTION LIST */}
                        <Wrapper>
                            <h5>Students List</h5>
                            <StudentsEvents/>
                        </Wrapper>

                    </Col> 
                    </Row>
               
                    {/* <NON DB MEETUP LIST */}
                    <Wrapper>
                        <Title>
                        <NotDbEvents/>
                    
                        </Title>
                    </Wrapper>
                   
            
            </Container>
        </div>
        )
    }
}

export default Dashboard
