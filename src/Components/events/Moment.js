import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
// we import modal for the pop-up functionality
import Modal from 'react-modal';

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);



Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class MyCalendar extends Component {
  state = {
      events: [],
      modalIsOpen: false
  }

  // when they click on the event's title, within the calendar, the pop up "opens"
  openModal = () => {
    // let modalIsOpen = true;
    this.setState({modalIsOpen: true});
  }

  // to "close" the pop up
  closeModal = () => {
    // let modalIsOpen = false;
    // console.log(this.modalIsOpen)
    this.setState({modalIsOpen: false});
  }


  componentDidMount(){
    // declare a variable for calendar events
    let events = [];
    axios.all([
      axios.get(`http://localhost:3000/users/1`),
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
        if (eventsData[i].hive_attendees.includes(data.id)) {
          console.log(eventsData[i]);
          console.log((eventsData[i].local_date))
          events.push({title: eventsData[i].name, start: eventsData[i].local_date, end: eventsData[i].local_date, description: "Blablabla"});
        }
      }
      console.log(events);
      this.setState({events});
    }));
  };
    render(){
      const {events} = this.state;
        return(
          <div style={{ width: 700, height: 500 }}>
    <Calendar height={500}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      // give only agenda and month views, beause week and day give errors
      views= {['agenda', 'month']}
      onDoubleClickEvent={this.openModal}
      // onDoubleClickEvent={this.openModal}
    />
    {/* <button onClick={this.openModal}>Open Modal</button> */}
    <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>{}</div>
        </Modal>

  
      </div>
        );
    };
};


export default MyCalendar;