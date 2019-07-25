// Output: all Suggestions of Students . The admin will be able to 'save' and 'reject'. 
// Signed in as ADMIN
import React, { Component } from 'react'
import localApi from "../localApi";
import {Col,Row,Container,Button,Card,Alert}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import localApi from '../localApi';

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
        localApi
            .get(`/events/suggestions`)
            .then(res => {
            const events = res.data;
            this.setState({ events }); 
            })
    }

    // START PUT API     
// click SAVE and the boolean ca_recommended=false should update to true 
// with submit it gets the event and the true value
handleSubmit = (item,boolean) => {
    item.ca_recommended=boolean 
   localApi.put(`/events/recommend/${item._id}`, item)
    .then((res) => {
            this.getUpdatedEvents()
        })
        .catch(err => console.log(err));
    }
  // END PUT API    

    render() {
        const {events} = this.state 
            return (
                <div>
                <Container>
                    <Wrapper>
                        <Col><Alert><h2>Suggestions</h2></Alert></Col>
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
                                                <Button size="sm" variant="info" onClick={this.handleSubmit(item, true)}>Save</Button>
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
