// Output: all Suggestions of Students . The admin will be able to 'save' and 'reject'. 
// Signed in as ADMIN
import React, { Component } from 'react'
import axios from 'axios';
import {Col,Row,Container,Button,Card,Nav}  from 'react-bootstrap';
import { Link } from "react-router-dom";

export class Reviews extends Component {
    state = {
        events: []
    };

    componentDidMount() {

        axios
            .get(`http://localhost:3000/events/suggestions`)
            .then(res => {
                const events = res.data;
            this.setState({ events });
               
             })
    }

    render() {
        console.log(this.state.events)
        const {events} = this.state 
            console.log(events)
            return (

                <div>
                {events.map(item => 
                
                <Card border="light" >
                <Card.Body>
                    <Container>
                      
                <Card.Header> <Link to={`/events/${item._id}`}>{item.name}</Link></Card.Header>
                <Card.Text className="mb-2 text-muted"><small>{item.local_date}</small></Card.Text>
                <Nav.Item> 
                <Button size="sm" variant="primary" >Save</Button>
                <Button size="sm" variant="primary" >Delete</Button>
                </Nav.Item>
   
                </Container>
                    </Card.Body>
                </Card>
                
                )}
                </div>

            )
        
    }
}

export default Reviews
