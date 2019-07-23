
// Show profile of Single User.
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import {Card}  from 'react-bootstrap';

class Profile extends Component {
state={
  users:[]
}

// just after rendering the user's info, call to the API
  componentDidMount(){
    // let Users = []
 
// Extracted userId from the Route params.    
    const { id } = this.props.match.params
    console.log(id)

    axios
      .get(`/users/${this.props.match.params.id}`)
      .then(res => {
        // modify the state according to the data in the API's response
        const {data} = res;
          console.log(res.data)
          
        // add response of api call to users array
        this.setState({ users: data });
      })
      .catch(err => {
          console.log(err);
      });  
      
     
  };

  render(){
    console.log(this.state.users)
    const {users} = this.state
   
    return( 
      <div>
        {users.map(users => <li>{users.name}</li>)}
        
        <Card border="light" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{users.meetup_uid}</Card.Title>
            <Card.Text>{users.created_at}</Card.Text>
          </Card.Body>
        </Card>

      
      </div>
   );

  };

}



export default Profile;

