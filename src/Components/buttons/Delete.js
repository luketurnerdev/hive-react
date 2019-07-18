import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import styled from 'styled-components';

export class Delete extends Component {
    state = {
        id: '',
      }

    handleChange = event => {
    this.setState({ id: event.target.value });
    }

    handleSubmit = event => {
    event.preventDefault();

    axios.delete(`http://localhost:3000/events/${this.state.name}`)
        .then(res => {
        console.log(res);
        console.log(res.data);
        })
    }

    rrender() {
    return (
      <div>
           <form onSubmit={this.handleSubmit}>
            <Row>  
            {/*<FILTER DROPDOWN BUTTON START> */}
            <Button variant="secondary" title="Filter" type="submit" onClick={this.handleChange}>Delete</Button>
            </Row> 
            </form>
      </div>
    )
  }
}

export default Delete
