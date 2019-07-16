//will render all the events 
//( Signed in as STUDENT/ADMIN)
import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import CAEvents from '../Components/events/CAEvents'
import StudentsEvents from '../Components/events/StudentsEvents.js'
import NotDbEvents from '../Components/events/NotDbEvents'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components';
import Moment from '../Components/events/Moment'


// START Title component for an <h3> tag 
const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  style:
`;
// Style a Wrapper component with a <section> tag
const Wrapper = styled.section`
  padding: 10em;
  background: papayawhip;
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
                        
                            <h1>Coder Academy List</h1>
                            <h><CAEvents/></h>
                        
                    </Wrapper> 
                    </Col>
                    {/* <STUDENTS'S SUGGESTION LIST */}
                    <Col>
                    <Wrapper>
                    
                            <h1>Students List</h1>
                            <h><StudentsEvents/></h>
                        
                    </Wrapper>
                    </Col>
                </Row>  

                <Row>
                    {/* <NON DB MEETUP LIST */}
                    <Wrapper>
                        <Title>
                        <NotDbEvents/>
                    
                        </Title>
                    </Wrapper>
                    
                </Row>
            </Container>
        </div>
        )
    }
}

export default Dashboard
