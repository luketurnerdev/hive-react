import React, { Component } from 'react'
import CAEvents from '../Components/events/CAEvents'
import StudentsEvents from '../Components/events/StudentsEvents.js'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class DbEvents extends Component {
    state = { location: " "}
   
    // Click Submit and save the value in the state
    onSubmit=(event)=> this.setState({location: event.target.value})

    render() {
        console.log(this.state)
        // Set the object "location" as state
        const {location} = this.state;
        
        return (
        // Click the Dropdown Button and save to the object location. Render the selected components.
            <div>
                <Container>
                    <Row>
                    <Col><h1>Events</h1></Col>
                        {/*<FILTER DROPDOWN START> */}
                        <DropdownButton variant="secondary" title="Filter" onClick={this.onSubmit}>
                        <Dropdown.Item as="button" value="caEvents" >CoderAcademyEvents</Dropdown.Item>
                        <Dropdown.Item as="button" value="studentEvents" >StudentsEvents</Dropdown.Item>
                        <Dropdown.Item as="button" value="allEvents" >All</Dropdown.Item>
                        </DropdownButton>
                    </Row> 

                    <Row>
                        {location==="allEvents"?
                        <div><h1>All Events<h1></h1><CAEvents/><StudentsEvents/></h1></div>:
                        location==="studentEvents"?
                        <div><h1>Students EVENT</h1><StudentsEvents/></div>:
                        location==="caEvents"?
                        <div><h1>CoderAcedemy EVENT</h1><CAEvents/></div>:
                        null}
                        {/* </FILTER DROPDOWN END> */}
                    </Row>
                </Container>
            </div>
          


        )
    }
}
export default DbEvents;
