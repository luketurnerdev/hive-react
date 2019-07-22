
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {Col,Row,Button,Card}  from 'react-bootstrap';
// import axios for sending requests to API
import axios from 'axios';

class StudentsEvents extends Component {
    state = {
        events: [],
    };

    componentDidMount() { 
        this.getUpdatedEvents()

    };

    getUpdatedEvents = () => { 
    let studentsEvents = [];
    axios
    // request call to the db
        .get('/events')
        .then(resp => {
            // destructure data from response
            const {data} = resp;
           
            // set length of loop
            let eventsLength = data.length;
            // for loop through all the events
            for (let i = 0; i < eventsLength; i++) {
                // Ony if hivers are attending to the event, and this event hasn't been recommended by CA yet
           
                // if ((data[i].hive_attendees.length > 0) && (data[i].ca_recommended === false)) {
                //     // mark it as student event (event a student is attending)
                //     console.log(data[i])
                //     studentsEvents.push(data[i]);
                // }   

                if ((data[i].ca_recommended === false)) {
                    // mark it as student event (event a student is attending)
                    console.log(data[i])
                    studentsEvents.push(data[i]);
                }   
            }
            // we change the state according to our previous code
           this.setState({events: studentsEvents});
          
        })
        // just to try
        .catch(error => {
            console.log(error);
        });  
    }

// START PUT API     
// click ATTEND and the boolean false should update to true 

    handleSubmit = (item,boolean) => {
    item.ca_recommended=boolean 
    axios.put(`/events/${item._id}`, item)
    .then(() => {
            this.getUpdatedEvents()
        })
        .catch(err => console.log(err));
    }
    
// END PUT API      
  
 
    // RESPONSE
    render() {
      

        const {events} = this.state
        return(       
                <div>
                    {events.map((item) => {
                        return (
                            <div key={item._id}>
                                
                                <Card border="light" >
                                    <Card.Body>
                                        <Card.Text> <Link to={`/events/${item._id}`}>{item.name}</Link></Card.Text>
                                        <Row>
                                            <Col>
                                                <Card.Text className="mb-2 text-muted"><small>{item.local_date}</small></Card.Text>
                                            </Col>
                                            <Col>
                                                <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Save</Button>
                                                <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Attend</Button>
                                            </Col>
                                        </Row>
                                        <footer className="blockquote-footer">
                                        <Link to={`/events/${item._id}/attendees`}>Attendees</Link> 
                                        </footer>
                                    </Card.Body>
                                </Card>
                
                            </div>
                        )
                    })}

                </div>
            )}
}

export default StudentsEvents;
