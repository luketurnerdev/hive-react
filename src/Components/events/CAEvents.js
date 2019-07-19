
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {Col,Row,Container,Button,Card,Nav}  from 'react-bootstrap';


// import axios for sending requests to API
import axios from 'axios';

class CAEvents extends Component {
    state = {
        events: [],
        ids: [],
        suggested: "",
    };
// START GET API 
    // just after rendering the Events, call to the API
    componentDidMount() {
    let CAEvents = [];
    let CAEventsId = [];
    axios
    // request call to the db
        .get('/events')
        .then(res => {
            // destructure data from response
            const {data} = res;
            console.log(data)
            // set length of loop
            let eventsLength = data.length;
            // for loop through all the events
            for (let i = 0; i < eventsLength; i++) {
                console.log(data[i]);
                // Ony if the event has been recommended by CA
                if (data[i].ca_recommended === true) {
                    // mark it as CA event (event recommended by CA)
                    console.log(data[i])
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
    };
// END GET API 

// START PUT API 
    handleChange = event => {
        console.log(event.target)
        this.setState({ suggested: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
    
        const event_value = {
          suggested: this.state.suggested
        };
      
        axios.put(`http://localhost:3000/events/${this.state.id}`, {stu:event_value})
          .then(res => {
            console.log(res);
            console.log(res.data);
           {/* HOW TO CHANGE THE value!!!! if is student_suggested and not ca_recommended,click SAVE and the boolean false should update to true AND how to put this to different component*/}
          })
          .catch(err => console.log(err));
      }
      
// END PUT API      

// RESPONSE
    render() {
        console.log(this.state.suggested)
        const {events, ids} = this.state
        return( 
            <div>
                    {events.map((item, index) => {
                        console.log(ids)
                        return (
                            
                                <div key={item.id}>
                                    
                                        <Card border="light" >
                                        <Card.Body>
                                        <Card.Header> <Link to={`/events/${ids[index]}`}>{item.name}</Link></Card.Header>
                                        <Card.Text className="mb-2 text-muted"><small>{item.local_date}</small></Card.Text>
                                        <Nav.Item> 
                                        <Button size="sm" variant="primary" value={item.student_suggested} onClick={this.handleChange}>Save</Button>
                                        <Button size="sm" variant="primary" value={item.student_suggested} onClick={this.handleChange}>Save</Button>
                                        </Nav.Item>
                                        <footer className="blockquote-footer">
                                        <Link to={`/events/${ids[index]}/attendees`}>Attendees</Link> 
                                        </footer>
                                        {
                                            ((item.student_suggeted===true) && (item.ca_recommended === false))?
                                            <di><h2>TEST</h2>
                                                <Button variant="primary" value={item.student_suggested} onClick={this.handleChange}>Save</Button>
                                            </di>: null
                                        }
                                            </Card.Body>
                                        </Card>
                    
                                        
                                        

                                                                
                                </div>
                        )
                    })}
                
                
                
                
            </div>
          
    )
}

}

export default CAEvents;

