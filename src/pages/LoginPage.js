    
import React, { Component } from "react";
import {Row,Col,Container,Button}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import logo from './honeycomb-logo.svg';
const WrapperLogin = styled.section`
  padding: 2em;
  background: white;
  margin:4em 0;
  display:flex;
  align-items:center
`;

class LoginPage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <WrapperLogin>
                        <Col>
                <img src={logo} className="App-logo" alt="logo" />      
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

export default LoginPage;