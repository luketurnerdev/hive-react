// Output: FAQ and the basic instruction of the platfomr
// not Signed in.
import React, { Component } from "react";
import logo from './honeycomb-logo.svg';
import {Col,Container,Button}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';


const WrapperLogin = styled.section`
  padding: 2em;
  margin:6em;
  display:flex;
  align-items:center
`;

class HomePage extends Component {
  render() {
    return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
     
        <Container>             
        <WrapperLogin>
        <Col>
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
        </header>
  </div>
  )
  };
}

export default HomePage;
