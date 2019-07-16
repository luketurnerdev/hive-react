
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';

class Profile extends Component {
//   <<Profile>>
// RENDERED : ProfilePage
// meetup_uid: Number,
// email: String,
// firstName: String,
// lastName: String,
// city: String,
// avatar: String,
// created_at: Date

state={
  user:[]
}

// just after rendering the user's info, call to the API
  componentDidMount(){
    axios
      .get('http://localhost:3000/users/1')
      .then(resp => {
          console.log(resp.data)
          const {data} = resp;
          // modify the state according to the data in the API's response
        this.setState({user:data})
        
      })
      .catch(error => {
          console.log(error);
      });  
    
  };

  render(){
    console.log(this.state.user)
    const {user} = this.state
    return( 
      <div>
        <h1>{user.meetup_uid}</h1>
        <p>{user.email}</p>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
        <p>{user.city}</p>
        <img href={user.avatar} />
        <p>{user.created_at}</p>
      </div>
   );

  };

}

export default Profile;

