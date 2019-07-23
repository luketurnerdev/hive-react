// Dispaly The Hive attendees for SingleEvent => name and photo ( pop up page)
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import localApi from "../../localApi";

class Attendees extends Component {
// define the state
  state = {
    users: []
  };

  componentDidMount(){
  // declare a variable for ids of eventAttendees
  let eventAttendeesIds = [];
  // declare a variable for data of eventAttendees
  let users = [];
  // make the request calls
  axios.all([
    localApi.get(`/events/${this.props.match.params.id}`),
    localApi.get('/users/')
  ])
  .then(axios.spread((eventResp, usersResp) => {
      // destructure data from response
      const {data} = eventResp;
      // we cannot have to variables named data so no more destructure is possible
      const usersData = usersResp.data;
      // eventAttendeesId equal to the array of ids of each hive_attendee of the event
      eventAttendeesIds = data.hive_attendees;
      // calculate length of loops
      let usersLength = usersData.length;
      let idsLength = eventAttendeesIds.length;
      for (let i = 0; i < usersLength; i++) {
        for (let x = 0; x < idsLength; x++) {
          if(usersData[i].id === eventAttendeesIds[x]){
            users.push({name: usersData[i].name, avatar: usersData[i].avatar, id: eventAttendeesIds[x]})
          }
        }
      }
      this.setState({users});
      console.log(users);
    }))
    .catch(error => {
      console.log(error);
    })}

  

  render(){
    console.log(this.state.users);
    const {users} = this.state;

    return(
      <div>
        <h1>
          {users.map((user)=>(
            <div key={user.id} >
            {user.photo}
            {user.name}
            </div>))}
            {/* {users[0].first_name} */}
        </h1>
      </div>
    )
  }
}


export default Attendees;