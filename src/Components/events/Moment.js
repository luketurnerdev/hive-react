import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import localApi from "../../localApi";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
// we import modal for the pop-up functionality
import Modal from 'react-modal';
import Info from "../../pages/popUp/Info";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import customStyles from "../../styles/PopUpStyle"

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
      event: false,
      events: [],
      eventsData: []
  }

  componentDidMount(){
    // this.interval = setInterval(() => this.setState({ events: this.state.events }), 1000);
    // declare a variable for calendar events
    let events = [];
    axios.all([
      localApi.get('get_user'),
      localApi.get('events')

    ])
    .then(axios.spread((userResp, eventsResp) => {
      // destructure data of user
      console.log(userResp);
      const {data} = userResp;
      // declare a variable for eventsData
      const eventsData = eventsResp.data;
      console.log(eventsData);
      // we need to find those events the user is attending
      // calculate the length of the loop
      let eventsLength = eventsData.length;
      // loop through all the events
      for (let i = 0; i < eventsLength; i++) {
        if (eventsData[i].hive_attendees.includes(data._id)) {
          console.log(eventsData[i]);
          console.log((eventsData[i].local_date))
          events.push({title: eventsData[i].name, start: new Date(`${eventsData[i].local_date}T${eventsData[i].local_time}`), end: new Date(`${eventsData[i].local_date}T${eventsData[i].local_time}`), desc: eventsData[i].description, time: eventsData[i].local_time, date: eventsData[i].local_date, photo: eventsData[i].photo_link});
        }
      }
      console.log(events);
      this.setState({events,eventsData});
    }))
    .catch(error => {
      console.log(error);
    })
    // setInterval(this.componentDidMount(), 1000000);
  };


    // when they click on the event's title, within the calendar, the pop up "opens"
    openModal = (event) => {
      this.setState({ event });
    }
  
    // to "close" the pop up
    closeModal = () => {
      this.setState({ event: false });
    }

    // componentDidUpdate(this.state.eventsData) {
    //   localApi
    //   .get("events")
    //   if (eventsData )
    // }

    keepRuning = () => {
      // setTimeout(this.componentDidMount, 1000);
    }

    render(){
      const {events} = this.state;
        return(
          <div style={{ width: 350, height: 350, padding:10 }}>
    <Calendar height={500}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      // given only agenda and month views, beause week and day give errors
      views= {['agenda', 'month']}
      onDoubleClickEvent={this.openModal}
    /> 
    {/* <button onClick={this.openModal}>Open Modal</button> */}
    <Modal
          isOpen={this.state.event && true}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          
          <div height="600">
            <Info event={this.state.event} />
            <button onClick={this.closeModal}>close</button>
          </div>
        </Modal>

  
      </div>
        );
    };
};


export default MyCalendar;