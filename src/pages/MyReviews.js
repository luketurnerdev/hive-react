// PAGE Where will render all of my reviews 
// ( Signed in as STUDENTS)
import React, { Component } from 'react'
// import Reviews from '../Components/events/Reviews'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import styled from 'styled-components';
const Wrapper = styled.section`
  padding: 2em;
  background: white;
  margin:2em;
  `;
export class MyReviews extends Component {
    render() {
        return (
            <div>
                <Container>
                <Wrapper>
                    <Row>
                        
                    <Col>
                     {/* <Reviews/> */}
                    </Col>
                    </Row> 
                    </Wrapper>
                </Container>
        
            </div>
        )
    }
}

export default MyReviews
