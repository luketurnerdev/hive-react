import React, {Component} from "react";
import {Form, Button}  from 'react-bootstrap';
import axios from 'axios';
import localApi from "../../localApi";


class SuggestForm extends Component {

  handleSubmit = (event) => {
    // if we get a route for suggest event that is not in db, 
    // sending PUT call to backend
        localApi.put(`events/${event._id}`)
        .then(res=>{
            console.log(res.data)
            
        })
    }
    render(){
      let {event} = this.props;
        return(
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>What made you suggest this event?</Form.Label>
                <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit(event)}>
                Submit
            </Button>
            </Form>
        )
    }
}

export default SuggestForm;