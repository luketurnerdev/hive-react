// Output: Form to request access to admin ( name and message for admin)
// Signed in as STUDENTS with meetup
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Col,Row,Button,Card,Form,Container}  from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.section`
padding: 2em;
background: white;
margin:2em;
`;

class UsersRequest extends Component {
  state = { 
      request:[]
    
    };

    componentDidMount(){
        let array = []
    axios
// START request call to the db
        .get('/users/request')
            .then( res =>{
                // destructure data from response
                const {data} = res; 
                
                array.push(data)
                this.setState({request: array});
                console.log(array)
            })
            .catch(error => {
                console.log(error);
            }); 
        }
// END request call to the db



  // START RESPONSE
    render() {
        const { request } = this.state
            console.log(request)
        return (
            <div>
                <Container>
                    <Wrapper>
                    {request.map(profile => 
                        <Form>
                            <Form.Group>
                            <Form.Label>Hello {profile.name} !</Form.Label>
                            </Form.Group>
                                <Form.Group controlId="messasge">
                                <Form.Label>Message</Form.Label>
                                <Form.Control type="message" placeholder="Please tell us about you..." />
                            </Form.Group>
                            <Button variant="info" type="submit">
                            <Link to={`/users/request?_method=PUT`}>Submit</Link>

                           
                            </Button>
                        </Form>
                    )}
                    </Wrapper>
                </Container> 
            </div>
        )     
    }
     
     


     


       


    // END RESPONSE
}
    


export default UsersRequest
