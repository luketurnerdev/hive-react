import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';

class Attendees extends Components {
// define the state
  state = {
    users = []
  };


  componentDidMount(){
  // declare a variable for eventAttendees
  let eventAttendees = [];
  // make the request call 
  axios
    .get('http://localhost:3000/events/1')
    .then(resp => {
      // destructure data from response
      const {data} = resp;
      console.log(data);
      // we push the hive_attendees of the event into eventAttendees
      eventAttendees.push(data.hive_attendees);
      this.setState({users:eventAttendees});
    })
    .catch(error => {
      console.log(error);
  })}

  render(){
    const {users} = this.state;

    return(
      <div>
        <h1>
          {users.map((user)=>(
            <div key={user.id} >
            {user.first_name}
            </div>))}
        </h1>
      </div>
    )
  }
}


export default Attendees;