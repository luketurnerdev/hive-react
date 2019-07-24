import React, {Component} from 'react';
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
      eventsData: [],
  }
    // when they click on the event's title, within the calendar, the pop up "opens"
    openModal = (event) => {
      this.setState({ event });
    }
  
    // to "close" the pop up
    closeModal = () => {
      this.setState({ event: false });
    }

    render(){
      const {events} = this.props;

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