import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
 
const localizer = momentLocalizer(moment)
 
const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

class Calendar extends Component {
state = {
    events: [
        {
        }
    ]
}
    render(){
        return()

    }
}


export default Calendar;