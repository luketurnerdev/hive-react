    
import React, { Component } from "react";
import {Col,Row,Container,Button,Card,Nav,Alert}  from 'react-bootstrap';
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
        return (
            <div>
                <Container>
            
                <WrapperLogin>
                <Col>
                 <h1>Welcome To The Hive!</h1>
               
                    <div>
                        <Link to="/">
                        <Button size="sm" variant="primary" onClick={this.handleChange}>Login</Button>
                        </Link>
                        <Link to="/request_access">
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