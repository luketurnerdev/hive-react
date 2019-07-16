import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
 
const localizer = momentLocalizer(moment)
 
// const MyCalendar = props => (
//   <div>
  
//   </div>
// )

class MyCalendar extends Component {
  state = {
      events: [
          {
          }
      ]
  }

  componentDidMount(){
    // declare a variable for calendar events
    let events = [];
    axios.all([
      axios.get(`http://localhost:3000/users/${this.props.match.params.id}`),
      axios.get('http://localhost:3000/events')
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
        if (eventsData[i].hive_attendees.includes[data]) {
          events.push({title: eventsData[i].name, start: (eventsData[i].local_date + '' + eventsData[i].local_time), end: (eventsData[i].local_date.add(1, "days"))});
        }
      }
      console.log(events);
      this.setState({events});
    }));
  };
    render(){
      const {events} = this.state;
        return(
          <div>
                <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
          </div>
          
        );
    };
};


export default MyCalendar;