
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {Col,Row,Container,Button,Card,Nav}  from 'react-bootstrap';
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
        .get('http://localhost:3000/events')
        .then(resp => {
            // destructure data from response
            const {data} = resp;
           
            // set length of loop
            let eventsLength = data.length;
            // for loop through all the events
            for (let i = 0; i < eventsLength; i++) {
                // Ony if hivers are attending to the event, and this event hasn't been recommended by CA yet
           
                if ((data[i].hive_attendees.length > 0) && (data[i].ca_recommended === false)) {
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
      handleSubmit = (item,boolean) => {
        item.ca_recommended=boolean 
        axios.put(`http://localhost:3000/events/${item._id}`, item)
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
                                    <Card.Header> <Link to={`/events/${item._id}`}>{item.name}</Link></Card.Header>
                                    <Card.Text className="mb-2 text-muted"><small>{item.local_date}</small></Card.Text>
                                    <Nav.Item> 
                                    <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Save</Button>
                                    </Nav.Item>
                                    <footer className="blockquote-footer">
                                    <Link to={`/events/${item._id}/attendees`}>Attendees</Link> 
                                    </footer>
                                    </Card.Body>
                                </Card>
                
                            </div>
                        )
                    })}

                </div>
            )
    }

}

export default StudentsEvents;
