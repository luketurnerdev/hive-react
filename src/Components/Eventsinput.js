import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
// import react-bootstrap 
import Button from 'react-bootstrap/Button';

// Events Component
class Eventsinput extends Component {
state={
name:" " 
};

// takes the value that we type in textbox and add to state
  handleChange = event =>{
      this.setState({ name:event.target.value });
  }

// handle the submission of the form and stop the browser from reloading the page
  handleSubmit = event => {
      event.preventDefault();

// create new event(object)
      const events = {
          name: this.state.name
      };
  
// pass in to jsonserver the new event
    axios
        .post(`/events`,events)
        .then(res =>{
          console.log(res);
          console.log(res.data);
      })
    }

// render the form 
    render(){
    return( 
        <div>
        <form onSubmit={this.handleSubmit}>
            <label>
                Event Name:  
            </label>
            <input type="text" name="name" onChange={this.handleChange}/>
            <Button variant="primary" type="submit">Add</Button>
            <Button variant="flat" size="xxl">skdjd</Button>
        </form>
        </div>
        )

    }

};

export default Eventsinput;
