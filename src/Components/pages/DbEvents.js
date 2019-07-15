import React, { Component } from 'react'
import CAEvents from '../events/CAEvents.js'
import StudentsEvents from '../events/StudentsEvents.js'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


export class DbEvents extends Component {
    state = { location: " "}
   

    onSubmit=(event)=> this.setState({location: event.target.value})

    render() {
        console.log(this.state)
        const {location} = this.state;
        
        return (
                
            <div>
                <DropdownButton variant="secondary" title="Filter" onClick={this.onSubmit}>
                <Dropdown.Item as="button" value="caEvents" >CoderAcademyEvents</Dropdown.Item>
                <Dropdown.Item as="button" value="studentEvents" >StudentsEvents</Dropdown.Item>
                <Dropdown.Item as="button" value="allEvents" >All</Dropdown.Item>
                </DropdownButton>

                {location==="allEvents"?
                <div><h1>All Events<h1></h1><CAEvents/><StudentsEvents/></h1></div>:
                location==="studentEvents"?
                <div><h1>Students EVENT</h1><StudentsEvents/></div>:
                location==="caEvents"?
                <div><h1>CoderAcedemy EVENT</h1><CAEvents/></div>:
                null
                }

        </div>
        )
    }
}
export default DbEvents;
