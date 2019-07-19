import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
// import {Calendar} from "react-big-calendar";
import Calendar from 'react-calendar'
// import moment from 'moment'
 
// const localizer = momentLocalizer(moment)
 
// const MyCalendar = props => (
//   <div>
  
//   </div>
// )

class MyCalendar extends Component {
    
  state = {
    events: [],
    date: new Date(),
  }

  componentDidMount(){
    // declare a variable for calendar events
    let events = [];
    axios.all([
      axios.get(`http://localhost:3000/users/4`),
      axios.get('http://localhost:3000/events')
    ])
    .then(axios.spread((userResp, eventsResp) => {
      // destructure data of user
      const {data} = userResp;
      console.log(data);
      // declare a variable for eventsData
      const eventsData = eventsResp.data;
      // we need to find those events the user is attending
      // calculate the length of the loop
      let eventsLength = eventsData.length;
      // loop through all the events
      for (let i = 0; i < eventsLength; i++) {
        console.log(eventsData[i]);
        if (eventsData[i].hive_attendees.includes(data.id)) {
          console.log(eventsData[i]);
          events.push(eventsData[i]);

          // events.push({title: eventsData[i].name, start: (eventsData[i].local_date + '' + eventsData[i].local_time), end: (eventsData[i].local_date.add(1, "days"))});
        }
      }
      console.log(events);
      this.setState({events});
  
  //     // now we need to set the date in the state
  //     let today = new Date();
  //     let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  //     this.setState({date});
    }));
  };
  // onChange = date => this.setState({ date })
 
  render() {
    const tileContent = ({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>Sunday!</p> : null;
  
    // ...
  
    return (
      <Calendar tileContent={tileContent} />
    );
  }
};


export default MyCalendar;