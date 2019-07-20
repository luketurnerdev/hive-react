// Show the profile of the user

import React, { Component } from 'react'
import Profile from '../Components/profiles/Profile'
// import Statistic from '../Components/profiles/Statistic';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export class MyProfile extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                          {/* <Profile/>  */}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MyProfile
