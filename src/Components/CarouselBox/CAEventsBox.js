import React, { Component } from 'react';
import {Carousel}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import {Button,Card,Row,Col}  from 'react-bootstrap';
import axios from 'axios';
import localApi from "../../localApi";
import Modal from 'react-modal';



Modal.setAppElement('#root');

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
      localApi.get('/events'),
      localApi.get('/get_user')
    ])
    .then(axios.spread((eventsResp, userResp) => {
      const {data} = eventsResp;
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
      let loopLength;
      // if the length of cAEvent array is less than 3, we put all the events inside the array in the box
      if (cAEvents.length < 3){
        loopLength = cAEvents.length;
        for(let i = 0;i<loopLength;i++){
          array.push(cAEvents[i]);
         }
      // if the length of cAEvent array is more than 3, we put only 3 events in the box
      } else {
        for(let i = 0;i<3;i++){
          array.push(cAEvents[i]);
         }
      }
      this.setState({events:cAEvents, ids:cAEventsId, array_:array, user: userData});
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
              this.componentDidMount()
              this.props.handleRerenderCalendar()
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
          })
      }
  // END DELETE API


// START RESPONSE CAROUSEL
  render() {
    const {user, array_} = this.state;


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
                            <Col>
                            {/* START show DELETE button if is admin . otherwise show SUGGEST button */}
                            {user.admin === true?                                                 
                              <Button size="sm" variant="info" value={item._id} onClick={() => this.handleChange(item._id)}>Delete</Button>
                              :null
                             }
                                   
                            <Button size="sm" variant="primary" onClick={()=>this.handleAttend(item._id)}>
                              {!(item.hive_attendees.includes(user._id))?
                              <>Attend</>:
                              <>Unattend</>}
                            </Button>
                                      
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
