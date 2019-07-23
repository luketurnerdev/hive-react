    
import React, { Component } from "react";
import {Row,Col,Container,Button}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import logo from './honeycomb-logo.svg';
const WrapperLogin = styled.section`
  padding: 2em;
  background: white;
  margin:6em;
  display:flex;
  align-items:center
`;

class LoginPage extends Component {
    render() {
        console.log(process.env);
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header>
        </Col>
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
                </Row>
                </Container>
            </div>
        );
    }
}

export default LoginPage;