import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {Col,Row,Button,Card,Carousel}  from 'react-bootstrap';
import Modal from 'react-modal';
import AttendeesPopUp from '../../pages/popUp/AttendeesPopUp';
// import ReviewsPopUp from '../../pages/popUp/ReviewsPopUp';
import Reviews from '../events/Reviews';
import localApi from "../../localApi";


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

      axios.all([
        axios.get('/events'),
        axios.get('/users/5d2ec30722fd90520548a9d6'),
        // axios({
        //   url: '/users/',
        //   method: 'get',
        //   data: hive_attendees
        // })
      ])
      .then(axios.spread((eventsResp, usersResp) => {
      const {data} = eventsResp;
      console.log(data);
      let usersData = usersResp.data;
      // set length of loop
      let eventsLength = data.length;
      // for loop through all the events
      for (let i = 0; i < eventsLength; i++) {
        if ((data[i].ca_recommended === false)){
          //   // Ony if the event has been recommended by CA
          // if ((data[i].hive_attendees.length > 0) && (data[i].ca_recommended === false)) {
          //   // mark it as student event (event a student is attending)
              cAEvents.push(data[i]);
              cAEventsId.push(data[i].id);
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
    this.setState({modalIsOpen: true});
  }

  // to "close" the pop up
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

// START PUT API     
// click SAVE and the boolean ca_recommended=false should update to true 
// with submit it gets the event and the true value
handleSubmit = (item,boolean) => {
  item.ca_recommended=boolean 
  console.log(item._id)
 localApi.put(`/events/recommend/${item._id}`, item)
  .then((res) => {
          console.log("here");
          console.log(res);
          this.getUpdatedEvents()
      })
      .catch(err => console.log(err));
  }
// END PUT API      


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
                            {(users.admin === true)?                                                 
                                           <Button size="sm" variant="info" onClick={()=>this.handleSubmit(item,true)}>Save</Button>
                                           :null
                                           }                              
                             <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Attend</Button>
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
