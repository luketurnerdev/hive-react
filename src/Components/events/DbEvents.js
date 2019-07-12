import React, { Component } from 'react'
import CAEvents from "./CAEvents.js"
import StudentsEvents from "./StudentsEvents.js"

export class DbEvents extends Component {
    state = { location: " "}

    onFormSubmit=(event)=> this.setState({location: event.target.value})

    render() {
        console.log(this.state)
        const {location} = this.state

        return (
            
            <div>
                <form>
                <select onChange={this.onFormSubmit} name="selectEvent">
                <option value="caevents" >CoderAcademyEvents</option>
                <option value="studentevents">StudentsEvents</option>
                <option value="allEvents">All</option>
                </select>
                </form>
                {location==="allEvents"?
                <div><h1><CAEvents/><StudentsEvents/></h1></div>:<div><StudentsEvents/></div>}
            </div>
        )
    }
}

export default DbEvents;
