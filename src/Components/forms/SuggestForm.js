import React, {Component} from "react";
import {Form, Button}  from 'react-bootstrap';
import localApi from "../../localApi";


class SuggestForm extends Component {

  handleSubmit = (event) => {
    // if we get a route for suggest event that is not in db, 
    // sending PUT call to backend       
        localApi.put(`/events/suggest/${event.meetup_id}`)
        .then(res=>{
            console.log(res);
        })
    };
    
    render(){
      let {event} = this.props;
      console.log(event)
        return(
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Please confirm you want to suggest this event to Coder Academy</Form.Label>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit(event)}>
                Submit
            </Button>
            </Form>
        )
    }
}

export default SuggestForm;