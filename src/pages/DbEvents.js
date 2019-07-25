// Output: all events saved in database 
// ( Signed in as STUDENT/ADMIN)

import React, { Component } from 'react'
import CAEvents from '../Components/events/CAEvents'
import StudentsEvents from '../Components/events/StudentsEvents.js'
import {Col,Row,Container,Dropdown,DropdownButton,Alert}  from 'react-bootstrap';
import styled from 'styled-components';


// Style a Wrapper component with a <section> tag
const Wrapper = styled.section`
  padding: 2em;
  background: white;
  margin:2em;
`;
const EventsTitle = styled.p`
display:flex;
justify-content: flex-end;
`

export class DbEvents extends Component {
    state = { location: " "}
   
    // Click Submit and save the value in the state
    onSubmit=(event)=> this.setState({location: event.target.value})

    render() {
        // Set the object "location" as state
        const {location} = this.state;
        
        return (
// Click the Dropdown Button and save to the object location. Render the selected components.
//   {/*<FILTER DROPDOWN BUTTON START> */}
           <div>
            <Container>
 
                    <Row>  
                        <Col><Alert><h1>Events</h1></Alert></Col>
                        <DropdownButton variant="light" title="Filter" onClick={this.onSubmit}>
                        <Dropdown.Item as="button" value="caEvents" >CoderAcademy List</Dropdown.Item>
                        <Dropdown.Item as="button" value="studentEvents" >Students List</Dropdown.Item>
                        <Dropdown.Item as="button" value="allEvents" >See All</Dropdown.Item>
                        </DropdownButton>
                    </Row> 

                    {location==="allEvents"?
                        <Alert variant= "light">
                            <EventsTitle>All List</EventsTitle>
                            <hr />
                            <CAEvents/><StudentsEvents/>
                        </Alert> :

                    location==="studentEvents"?
                        <Alert variant= "light">
                            <EventsTitle>Students List</EventsTitle>
                            <hr />
                            <StudentsEvents/>
                        </Alert> :

                    location==="caEvents"?
                        <Alert variant= "light">
                            <EventsTitle>Coder Academy List</EventsTitle>
                            <hr />
                            <CAEvents/>
                        </Alert>:
                        <Alert variant= "light">
                        <EventsTitle>Coder Academy List</EventsTitle>
                        <hr />
                        <CAEvents/>
                    </Alert>
                }
        
            </Container>
            </div>
// {/* </FILTER DROPDOWN END> */}   
                  
        )
    }
}
export default DbEvents;
