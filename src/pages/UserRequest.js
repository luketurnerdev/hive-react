// Output: Form to request access to admin ( name and message for admin)
// Signed in as STUDENTS with meetup
import React, { Component } from 'react';
import {Button,Form,Container}  from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.section`
padding: 2em;
background: white;
margin:2em;
`;

class UsersRequest extends Component {
  state = { 
      request:[],
      message:""
    };

    componentDidMount(){
        let array = []
    axios
// START CALL USER DATA
        .get('/users/request')
            .then( res =>{
                // destructure data from response
                const {data} = res; 
                // push the data to array so we can map and pull out the key that we want
                array.push(data)
                this.setState({request: array});
            })
            .catch(error => {
                console.log(error);
            }); 
        }
// END CALL USER DATA

// START PUT API   
// click SUBMIT and send the message to admin

        handleChange = (event) => {
            this.setState({ message: event.target.value });

        }
        handleSubmit = event => {
        event.preventDefault();

            const user = this.state.request
            const id = user.map(single=>single._id)
            const request_message = {
                message: this.state.message
                };
  
// !!!! HAVE TO SEND HE USER_ID and REQUEST MESSAGE
                axios.put(`/users/request`, { id,request_message })
                .then(res => {
                })
            }
// END PUT API 

  // START RESPONSE
    render() {
        const { request } = this.state
        
            
        return (
            <div>
                <Container>
                    <Wrapper>
                    {request.map(profile => 
                        <Form onSubmit = {this.handleSubmit}>
                            <Form.Group>
                            <Form.Label>Hello {profile.name} !</Form.Label>
                            </Form.Group>
                                <Form.Group controlId="messasge">
                                <Form.Label>Message</Form.Label>
                                <Form.Control input type="text" placeholder="Please tell us about you..." name="request_message" onChange={this.handleChange}/>
                            </Form.Group>
                            <Button variant="info" type="submit">Submit</Button>
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
