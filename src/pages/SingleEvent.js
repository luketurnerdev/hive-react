import React, { Component } from 'react'
import { Link } from "react-router-dom";
import localApi from "../../src/localApi";
import AverageRates from '../Components/events/AverageRates'
import StarReview from '../Components/events/StarReview'
import {Card, Container,Tabs,Tab}  from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2em;
  background: white;
  margin:2em;
`;
const Back = styled.section`
  padding: 2em;
  background: white;
  font-size:0.8rem;
  color: #555e64;
  display:flex;
  align-items:right;
  justify-content:center;
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
                 
                <Card border="light" >
                <Card.Body>      
                    <Card.Title>                
                        <Link to={`/events/${_id}`}>{event.name}</Link>
                    </Card.Title>
                    <Card.Text>{event.local_date}</Card.Text>
                </Card.Body> 
                </Card>
                {event.description}
                <Back>
                <Card.Text> <Link to={`/events`}>Back</Link></Card.Text>
                </Back>
            </Wrapper>
            </Container>
            </div>
        )
    }
}

export default SingleEvent;
