import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
  .navbar {
    background-color: white;
    font-weight: bold;
    margin:0 0 1em 0;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color:#626570;
    &:hover {
      color: white;
    }
  }
  .navbar.navbar-light .navbar-nav .nav-item .nav-link {
    color: #626570;
    transition: 0.35s;
  }
  
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand as={Link} to='/'>The Hive</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link  as={NavLink} to="/Dashboard">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/events">Events</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink}to="/my_reviews">My Reviews</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink}to="/events/suggestions">All Suggestions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink}to="/users/:_id">Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink}to="/auth/register">Log In</Nav.Link>
          </Nav.Item>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles >
)
export default NavigationBar;