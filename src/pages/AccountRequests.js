// // Will return all the list of student's access request ( array of NAME CITY / 2 action Button Confirm- boolean from confirmed false to true/Delete )
// Express=> pages_controller (func AccountRequest) views/pages/account_request 
// // SIGNED IN as ADMIN
import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {Card,Alert,Col,Row,Container,Button,Image}  from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2em;
  background: white;
  margin:2em;
`;

class AccountRequests extends Component {
    state = {
        users: []
    };
    componentDidMount() {
        axios
            .get(`/account_requests`)
            .then(res => {
                const users = res.data;
            this.setState({ users });
           
                console.log(users);
             })
      }

    render() {
        const {users} = this.state 
        console.log(users)
        return (
            <div>
                <Container>
                    <Wrapper>

                        <Col><Alert><h2>Confirm Account </h2></Alert></Col>
                      
                        {users.map(user => 
                            <Card border="light" >
                                <Card.Body>
                                <Row>  
                                    <Col>
                                    {/* <Image roundedCircle>{user.photo}</Image> */}
                                    <Card.Text> <Link to={`/events/${user._id}`}>{user.name}</Link></Card.Text>
                                    <Card.Text className="mb-2 text-muted"><small>{user.created_at}</small></Card.Text>
                                    <Card.Text><small>{user.email}</small></Card.Text>
                                    <footer className="blockquote-footer">
                                    <Card.Text><small>{user.city}</small></Card.Text>
                                    </footer>
                                    </Col>
                                    <Col>
                                        <Button size="sm" variant="info" ><Link to={`/users/:id`}>Save</Link></Button>
                                        <Button size="sm" variant="primary" >Delete</Button>
                                    </Col>
                                </Row>
                                </Card.Body>
                            </Card>
                       
                            )}
                          
                    </Wrapper>
                </Container>
            </div>
        
        );
    }
}


export default AccountRequests;


