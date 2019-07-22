import React, { Component } from 'react';
import {Carousel}  from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import {Button,Card,Row,Col}  from 'react-bootstrap';

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

    axios
    .get('/events')
    .then(res=>{
      const {data} = res;
      // set length of loop
      let eventsLength = data.length;
      // for loop through all the events

      for (let i = 0; i < eventsLength; i++) {
          
          // Ony if the event has been recommended by CA
          if (data[i].ca_recommended === true) {
              // mark it as CA event (event recommended by CA)
              cAEvents.push(data[i]);
              cAEventsId.push(data[i]._id);
          }
      }
      for(let i = 0;i<3;i++){
        
       array.push(cAEvents[i]);
       console.log(array)
      }
      this.setState({events:cAEvents, ids:cAEventsId, array_:array});
    })
    .catch(error => {
      console.log(error);
    }); 

  }
  

// START RESPONSE CAROUSEL
  render() {
    const {array_} = this.state
    console.log(array_.name)
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
                              <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Attend</Button>
                              <Button size="sm" variant="info" onClick={()=>this.handleSubmit(item,true)}>Delete</Button>
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
