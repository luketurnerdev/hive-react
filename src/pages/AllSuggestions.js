// Output: all Suggestions of Students . The admin will be able to 'save' and 'reject'. 
// Signed in as ADMIN
import React, { Component } from 'react'
import axios from 'axios';
import {Col,Row,Container,Button,Card,Alert}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2em;
  background: white;
  margin:2em;
`;
const EventsTitle = styled.p`
    display:flex;
    justify-content: flex-end;
    `

export class Reviews extends Component {
    state = {
        events: []
    };

    componentDidMount() {
        axios
            .get(`suggestions`)
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
                <Container>
                    <Wrapper>
                        <Col><Alert><h2>Suggestios</h2></Alert></Col>
                            <Alert variant= "light">
                                <EventsTitle>Students list</EventsTitle>
                                <hr />
                                {events.map(item => 
                                <Card border="light" >
                                    <Card.Body>
                                        <Card.Text> <Link to={`/events/${item._id}`}>{item.name}</Link></Card.Text>
                                        <Row>
                                            <Col>
                                                <Card.Text className="mb-2 text-muted"><small>{item.local_date}</small></Card.Text>
                                                <Card.Text className="mb-2 text-muted"><small>{item.suggested.message}</small></Card.Text>
                                            </Col>
                                            <Col>
                                                <Button size="sm" variant="info" >Save</Button>
                                                <Button size="sm" variant="primary" >Delete</Button>
                                            </Col>
                                        </Row>   
                                    <footer className="blockquote-footer">
                                        <Link to={`/events/${item._id}/attendees`}>Attendees</Link> 
                                    </footer>
                                </Card.Body>
                            </Card>
                            )}
                        </Alert>   
                    </Wrapper>
                </Container>
               
                </div>

            )
        
    }
}

export default Reviews
