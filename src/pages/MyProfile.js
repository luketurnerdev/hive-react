// Output: The profile of the single user

import React, { Component } from 'react'
import Profile from '../Components/profiles/Profile'
// import Statistic from '../Components/profiles/Statistic';
import {Col,Row,Container,Button,Card,Nav,Alert}  from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2em;
  background: white;
  margin:2em;
`;

export class MyProfile extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Wrapper>
                    <Col><Alert><h2>My Profile</h2></Alert></Col>
                        
                            <Profile/> 
                            
                      
                    </Wrapper>
                </Container>
            </div>
        )
    }
}

export default MyProfile
