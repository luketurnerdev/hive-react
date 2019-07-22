import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {Col,Row,Button,Card,Carousel}  from 'react-bootstrap';
import Modal from 'react-modal';
import PopUp from '../../pages/popUp/PopUp';
   
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
      users: []
  };

  componentDidMount() {
    let cAEvents = [];
    let cAEventsId = [];
    let array = [];
    let users = [];

    // axios
    // .get('/events')
    // .then(res=>{
    //   const {data} = res;
      axios.all([
        axios.get('/events'),
        axios.get('/users/5d2ec30722fd90520548a9d6')
      ])
      .then(axios.spread((eventsResp, usersResp) => {
      const {data} = eventsResp;
      console.log(data);
      let usersData = usersResp.data;
      // set length of loop
      let eventsLength = data.length;
      // for loop through all the events
      for (let i = 0; i < eventsLength; i++) {
            // Only if the event is attended OR suggested by a hiver, AND CA hasn't recommended it yet
          if ((data[i].ca_recommended === false) || ((data[i].hive_attendees.length > 0) || (data[i].suggested.is_suggested))) {
            // mark it as student event
              cAEvents.push(data[i]);
            // we also store the id of each event
              cAEventsId.push(data[i]._id);
          }
      }
      for(let i = 0;i<3;i++){
       array.push(cAEvents[i]);
       console.log(array)
      }
      // we put all the users' data to an array in order to take it to the state and then pass it as props to PopUp.js
      users.push(usersData);
      console.log(usersData);

      this.setState({events:cAEvents, ids:cAEventsId, array_:array, users: users});
    }))
    .catch(error => {
      console.log(error);
    });
  }

  // when they click on the event's title, within the calendar, the pop up "opens"
  openModal = (event) => {
    this.setState({ event });
  }

  // to "close" the pop up
  closeModal = () => {
    this.setState({ event: false });
  }

  

// START RESPONSE CAROUSEL
  render() {
    const {array_, users} = this.state
    console.log(users)
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
                              <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Attend</Button>
                              {/* <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Delete</Button> */}
                              <button onClick={this.openModal}>Attendees</button>
                              <Modal
                                    isOpen={this.state.event && true}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                  >
                                    
                                    <div height="600">
                                      <PopUp users={item.hive_attendees} users={users} />
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
