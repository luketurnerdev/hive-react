    
import React, { Component } from "react";
import {Col,Container,Button}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const WrapperLogin = styled.section`
  padding: 2em;
  background: white;
  margin:6em;
  display:flex;
  align-items:center
`;

class HomePage extends Component {
    render() {
        console.log(process.env);
        return (
            <div>
                <Container>
            
                <WrapperLogin>
                <Col>
                 <h1>Welcome To The Hive!</h1>
               
                    <div>
                        <a href={`${process.env.REACT_APP_BACKEND_API}/auth/meetup`}>
                        <Button size="sm" variant="primary">Login</Button>
                        </a>
                        <Link to="/users/request">
                        <Button size="sm" variant="link">RequestAccess</Button>
                        </Link>
                    </div>
                </Col>
                </WrapperLogin>
               
                </Container>
            </div>
        );
    }
}

export default HomePage;