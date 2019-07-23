import React, { Component } from 'react';
import axios from 'axios';
import localApi from "../../localApi";
import { Link } from "react-router-dom";
import {Col,Row,Button,Card,Carousel}  from 'react-bootstrap';
import Modal from 'react-modal';
import AttendeesPopUp from '../../pages/popUp/AttendeesPopUp';
// import ReviewsPopUp from '../../pages/popUp/ReviewsPopUp';
import Reviews from '../events/Reviews';
   
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

class CAEventsBox extends Component {
  
  state = {
      events: [],
      ids: [],
      array_:[],
      users: [],
      modalIsOpen: false
  };

  componentDidMount() {
    let hive_attendees = [];
    let cAEvents = [];
    let cAEventsId = [];
    let array = [];
    let users = [];

    // axios
    // .get('/events')
    // .then(res=>{
    //   const {data} = res;


    localApi.get('events')
      .then(eventsResp => {
      const {data} = eventsResp;
      console.log(data);
      // set length of loop
      let eventsLength = data.length;
      // for loop through all the events
      for (let i = 0; i < eventsLength; i++) {
        if ((data[i].ca_recommended === false) && ((data[i].hive_attendees.length > 0) || (data[i].suggested.is_suggested))){
          // Ony if the event has not been recommended by CA, and any hivers have interacted with it (attending or suggesting it)
          // mark it as student event (event a student is attending)
              cAEvents.push(data[i]);
              cAEventsId.push(data[i].id);
          }
        }
      for(let i = 0;i<3;i++){
       array.push(cAEvents[i]);
       console.log(array)
      }

      this.setState({events:cAEvents, ids:cAEventsId, array_:array, users: users});
    })
    .catch(error => {
      console.log(error);
    });
  }

  // when they click on the event's title, within the calendar, the pop up "opens"
  openModal = (event) => {
    this.setState({modalIsOpen: true});
  }

  // to "close" the pop up
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  // START ATTEND (PUT) API
  handleAttend = (eventId) => {
    // sending DELETE call to backend 
        localApi.put(`events/attend/${eventId}`)
        .then(res=>{
            console.log(res.data)
        })
    }
// END ATTEND (PUT) API
  

// START RESPONSE CAROUSEL
  render() {
    const {array_, users} = this.state
    console.log(users)
    console.log(array_)
    return (
        <div>  
          <Carousel bsPrefix="carousel">
           {array_.map((item)=> {
            return (
            
                <Carousel.Item>
                    <div key={item._id}>
                      <Card border="light" >
                      <Card.Body> 
                          <Card.Text> <Link to={`/events/${item._id}`}>{item.name}</Link></Card.Text>
                          <Row>
                            <Col>
                              <Card.Text className="mb-2 text-muted"><small>{item.local_date}</small></Card.Text>
                            </Col>
                            <Col>
                              <Button size="sm" variant="info" onClick={()=>this.handleSubmit(item,true)}>Save</Button>
                              <Button size="sm" variant="primary" onClick={()=>this.handleAttend(item._id)}>Attend</Button>
                              {/* <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Delete</Button> */}
                              <button onClick={this.openModal}>Attendees</button>
                              {/* <Modal
                                    isOpen={this.state.modalIsOpen}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                  >
                                    
                                    <div height="600">
                                      <AttendeesPopUp attendees={item.hive_attendees} />
                                      <button onClick={this.closeModal}>close</button>
                                    </div>
                                  </Modal> */}
                              <Modal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                              >
                                
                                <div height="600">
                                  <Reviews users={users} />
                                  <button onClick={this.closeModal}>close</button>
                                </div>
                              </Modal>
                            </Col>
                          </Row>
                          <footer className="blockquote-footer">
                          {/* <Link to={`/events/${item._id}/attendees`}>Attendees</Link>  */}                          
                          </footer>                          
                          </Card.Body>
                      </Card>
                    </div>
                </Carousel.Item>  
              )
            })}
                </Carousel>
        </div>
    )}
// END RESPONSE    

};

export default CAEventsBox
