import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';

class Attendees extends Component {
// define the state
  state = {
    users: []
  };


  componentDidMount(){
  // declare a variable for eventAttendees
  let eventAttendees = [];
  // make the request call 
  axios
    .get(`http://localhost:3000/events/${this.props.match.params.id}`)
    .then(resp => {
      // destructure data from response
      const {data} = resp;
      console.log(data);
      // we push the hive_attendees of the event into eventAttendees
      eventAttendees = data.hive_attendees;
      this.setState({users:eventAttendees});
    })
    .catch(error => {
      console.log(error);
  })}

  

  render(){
    console.log(this.state.users);
    const {users} = this.state;
    // console.log(users);

    return(
      <div>
        <h1>
          {users.map((user)=>(
            <div key={user.id} >
            {user.first_name}
            </div>))}
            {/* {users[0].first_name} */}
        </h1>
      </div>
    )
  }
}


export default Attendees;