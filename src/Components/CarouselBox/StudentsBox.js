import React, { Component } from 'react';
import axios from 'axios';
import localApi from "../../localApi";
import { Link } from "react-router-dom";
import {Col,Row,Button,Card,Carousel}  from 'react-bootstrap';
import Modal from 'react-modal';
// import ReviewsPopUp from '../../pages/popUp/ReviewsPopUp';
// import Reviews from '../events/Reviews';
import SuggestForm from '../forms/SuggestForm';

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
      modalIsOpen: false,
      user: ""
  };

  componentDidMount() { 
    let cAEvents = [];
    let cAEventsId = [];
    let array = [];


    axios.all([
      localApi.get('/events'),
      localApi.get('get_user')
    ])
    .then(axios.spread((eventsResp, userResp) => {
      const {data} = eventsResp;
      const usersData = userResp.data;
      // set length of loop
      let eventsLength = data.length;
      // for loop through all the events
      for (let i = 0; i < eventsLength; i++) {
        if ((data[i].ca_recommended === false) && ((data[i].hive_attendees.length > 0) || (data[i].suggested.is_suggested))){
          // Ony if the event has not been recommended by CA, and any hivers have interacted with it (attending or suggesting it)
          // mark it as student event (event a student is attending)
              cAEvents.push(data[i]);
              cAEventsId.push(data[i]._id);
          };
        };
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
      this.setState({events:cAEvents, ids:cAEventsId, array_:array, user: usersData});
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

  // START ATTEND (PUT) API
  handleAttend = (eventId) => {
    // sending DELETE call to backend 
        localApi.put(`events/attend/${eventId}`)
        .then(res=>{
            this.componentDidMount();
            this.props.handleRerenderCalendar();
        })
    }
// END ATTEND (PUT) API
  

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
    const {array_, user} = this.state
    console.log(user)
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

                              <Button size="sm" variant="primary" onClick={()=>this.handleAttend(item._id)}>
                              {!(item.hive_attendees.includes(user._id))?
                              <>Attend</>:
                              <>Unattend</>}
                              </Button>
                         
                              <button onClick={this.openModal}>Attendees</button>
                            
                            {/* If current user is admin, show Save Button (No need of more conditions as any of the events in StudentBox has been saved yet) */}
                            {(user.admin === false)?                                                 
                                           <Button size="sm" variant="info" onClick={()=>this.handleSubmit(item,true)}>Save</Button>
                                           :null
                                           }      
                            {/* If current user is normal user (not admin), and the specific event has not been suggested yet, show Suggest Button, which is actually a Modal */}
                            {(user.admin === true)?
                            <Button size="sm" variant="info" onClick={this.openModal}>Suggest</Button>
                                          // if contition is met, show button that will display the modal/popup. 
                                          // it doesn't modify the db yet, but only displays one modal with the form                            
                                              :
                                           null
                            }                      
                                        <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                      >
                                        
                                        <div height="600">
                                          <SuggestForm event={item} function={this.closeModal}/>
                                          <button onClick={this.closeModal}>close</button>
                                        </div>
                                      </Modal>
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
