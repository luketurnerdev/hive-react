import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import localApi from "../../src/localApi";
import AverageRates from '../Components/events/AverageRates'
import StarReview from '../Components/events/StarReview'
import {Card, Container}  from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2em;
  background: white;
  margin:2em;
`;


export class SingleEvent extends Component {
    state = {
        event: ""
    }

    // just after rendering the event, call to the API
    componentDidMount() {
    localApi
    // request call to the db
        .get(`/events/${this.props.match.params.id}`)
        .then(resp => {
            // destructure data from response
            const {data} = resp;
            console.log(data);
           this.setState({event:data}); 
           console.log(data);
        })
        .catch(error => {
            console.log(error);
        });  
    };
  
  render() {
    const {event} = this.state;    
    console.log(event);
    console.log(event._id);
    const {_id} = this.state.event;
    console.log(this.props)
        return( 
            <div>     
                <Container>
                <Wrapper>
                
                <Card border="light" style={{ width: '18rem' }}>
                <Card.Body>      
                    <Card.Title>                
                        <Link to={`/events/${_id}`}>{event.name}</Link>
                    </Card.Title>
                    <Card.Text>{event.local_date}</Card.Text>
                    <Card.Text><Link to={`/events/${_id}/attendees`}>Attendees</Link></Card.Text>
                    <Card.Text>
                    {/* conditional rendering */}
                    {event?
                    <AverageRates id={_id}/> :
                    null}             
                    {event?
                    <StarReview id={_id}/>:
                    null}   
                    </Card.Text>
                </Card.Body> 
            </Card>
            </Wrapper>
            </Container>
            </div>
        )
    }
}

export default SingleEvent;
