
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {Col,Row,Button,Card}  from 'react-bootstrap';
import localApi from "../../localApi";


class CAEvents extends Component {
    state = {
        events: [],
        ids: [],
        suggested: "",
        users: [],
        singleEvent: ""
    };
// START GET EVENT API 
    // just after rendering the Events, call to the API
    componentDidMount() {
    let CAEvents = [];
    let CAEventsId = [];
    
    // START GET EVENTS DATA
    localApi.get('/events')
        .then(res => {
            // destructure data from response
            const {data} = res;
            // set length of loop
            let eventsLength = data.length;
            // for loop through all the events
            for (let i = 0; i < eventsLength; i++) {
               
                // Ony if the event has been recommended by CA
                if (data[i].ca_recommended === true) {
                    // mark it as CA event (event recommended by CA)
                    CAEvents.push(data[i]);
                    CAEventsId.push(data[i]._id);
                }
            }
            // we change the state according to our previous code
           this.setState({events:CAEvents, ids:CAEventsId});
          
        })
        .catch(error => {
            console.log(error);
        });  
        // END GET EVENTS DATA

        // START CALL USER DATA
        localApi.get("get_user")
        .then(resp =>{
            const userData = resp.data;
            this.setState({users : userData})
        })
        // END CALL USER DATA
    };
// END GET API 

// START PUT API 

      
// END PUT API      

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

    handleAttend = (eventId) => {
        // sending DELETE call to backend 
            localApi.put(`events/attend/${eventId}`)
            .then(res=>{
                console.log(res.data)
            })
        }
// START RESPONSE
    render() {
        const {users} = this.state;
        const {events, ids} = this.state
        return( 
            <div>
                    {events.map((item, index) => {
                
                        return (   
                            <div key={item._id}>
                                <Card border="light">
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
                                            <Button size="sm" variant="primary" value={item._id} onClick={() => this.handleAttend(item._id)}>Attend</Button>
                                            </Col>
                                            {/* END show DELETE button if is admin . otherwise show SUGGEST button */}
                                        </Row>
                                        <footer className="blockquote-footer">
                                            <Link to={`/events/${ids[index]}/attendees`}>Attendees</Link> 
                                        </footer>
            

                                        </Card.Body>
                                    </Card>                               
                                </div>
                        )
                    })}  
            </div> 
        )
    }
// END RESPONSE    
}

export default CAEvents;

