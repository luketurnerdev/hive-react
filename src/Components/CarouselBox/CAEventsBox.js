import React, { Component } from 'react';
import {Carousel}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import {Button,Card,Row,Col}  from 'react-bootstrap';
import axios from 'axios';
import localApi from "../../localApi";
import Modal from 'react-modal';
// import customStyles from "../../styles/PopUpStyle";
import SuggestForm from "../forms/SuggestForm";


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


class CAEventsBox extends Component {
  
  state = {
      events: [],
      ids: [],
      array_:[],
      user: "",
      modalIsOpen: false
  };

  componentDidMount() { 
    let cAEvents = [];
    let cAEventsId = [];
    let array = [];
 
    
    // START GET EVENTS DATA
    axios.all([
      localApi.get('events'),
      localApi.get('get_user')
    ])
    .then(axios.spread((eventsResp, userResp) => {
      const {data} = eventsResp;
      console.log(data);
      const userData = userResp.data;
      // set length of loop
      let eventsLength = data.length;
      // for loop through all the events
      for (let i = 0; i < eventsLength; i++) {          
          // Ony if the event has been recommended by CA
          if (data[i].ca_recommended === true) {
              // mark it as CA event
              cAEvents.push(data[i]);
              cAEventsId.push(data[i]._id);
          };
      };
      // we just show three events in the box
      for(let i = 0;i<2;i++){
      array.push(cAEvents[i]);
      }
      this.setState({events:cAEvents, ids:cAEventsId, array_:array, user: userData});
      console.log(this.state.array_)
    }))
    .catch(error => {
      console.log(error);
    }); 


    // START CALL USER DATA
    localApi
    .get('get_user')
    .then(resp =>{
        const userData = resp.data;
        this.setState({users : userData})
    })
    // END CALL USER DATA
  };

    // START ATTEND (PUT) API
    handleAttend = (eventId) => {
      // sending DELETE call to backend 
          localApi.put(`events/attend/${eventId}`)
          .then(res=>{
              console.log(res.data)
              this.componentDidMount()
          })
      }
  // END ATTEND (PUT) API

  // to "open" the pop up
  openModal = (event) => {
    this.setState({modalIsOpen: true});
  }

  // to "close" the pop up
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

 // START DELETE API 
    // setting in the singleEvent state the value of the button DELETE which is the event._id
    handleChange = (eventId) => {
      // sending DELETE call to backend 
          localApi.delete(`events/${eventId}`)
          .then(res=>{
              console.log(res.data)
          })
      }
  // END DELETE API


// START RESPONSE CAROUSEL
  render() {

    const {users, user, array_} = this.state;


    return (
        <div>  
          <Carousel >
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
                          {/* START show DELETE button if is admin . otherwise show SUGGEST button */}
                            <Col>

                            <Button size="sm" variant="primary" onClick={()=>this.handleAttend(item._id)}>
                              {!(item.hive_attendees.includes(user._id))?
                              <>Attend</>:
                              <>Unattend</>}
                              </Button>

                            {user.admin === true?                                                 
                              <Button size="sm" variant="info" value={item._id} onClick={() => this.handleChange(item._id)}>Delete</Button>
                              :null
                             }
                             {/* Suggest button (it doesn't modify the db yet, but only displays one modal with the form) */}
                             {!item.suggested.is_suggested?
                             <Button size="sm" variant="info" value={item._id} onClick={() => this.handleChange(item._id)}>Delete</Button>:
                              null
                            }

                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                              >
                                
                                <div height="600">
                                  <SuggestForm event={item}/>
                                  <button onClick={this.closeModal}>close</button>
                                </div>
                              </Modal>
                            
                            </Col>
                          </Row>
                          <footer className="blockquote-footer">
                          <Link to={`/events/${item._id}/attendees`}>Attendees</Link> 
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

export default CAEventsBox;
