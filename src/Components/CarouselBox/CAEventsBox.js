import React, { Component } from 'react';
import {Carousel}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import {Button,Card,Row,Col}  from 'react-bootstrap';
import localApi from "../../localApi";


class CAEventsBox extends Component {
  
  state = {
      events: [],
      ids: [],
      array_:[]
  };

  componentDidMount() {
    let cAEvents = [];
    let cAEventsId = [];
    let array = [];

    // START GET EVENTS DATA
    localApi.get('/events')
    .then(res=>{
      const {data} = res;
      // set length of loop
      let eventsLength = data.length;
      // for loop through all the events
      for (let i = 0; i < eventsLength; i++) {          
          // Ony if the event has been recommended by CA
          if (data[i].ca_recommended === true) {
              // mark it as CA event
              cAEvents.push(data[i]);
              cAEventsId.push(data[i].id);
          }
      }
      for(let i = 0;i<3;i++){
       array.push(cAEvents[i]);
      }
      this.setState({events:cAEvents, ids:cAEventsId, array_:array});
    })
    .catch(error => {
      console.log(error);
    }); 


    // START CALL USER DATA
    localApi.get(`/users/5d3118d3c015b5923b806846`)
    .then(resp =>{
        const userData = resp.data;
        this.setState({users : userData})
    })
    // END CALL USER DATA
  };
 // END GET EVENTS DATA

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
    const {users} = this.state;
    const {array_} = this.state
    console.log(array_.name)
    return (
        <div>  
          <Carousel >
           {array_.map((item)=> {
            return (
            
                <Carousel.Item>
                    <div key={item.id}>
                      <Card border="light" >
                          <Card.Body> 
                          <Card.Text> <Link to={`/events/${item._id}`}>{item.name}</Link></Card.Text>
                          <Row>
                            <Col>
                              <Card.Text className="mb-2 text-muted"><small>{item.local_date}</small></Card.Text>
                            </Col>
                          {/* START show DELETE button if is admin . otherwise show SUGGEST button */}
                            <Col>
                            {users.admin === true?                                                 
                              <Button size="sm" variant="info" value={item._id} onClick={() => this.handleChange(item._id)}>Delete</Button>
                              :null
                             }
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

export default CAEventsBox
