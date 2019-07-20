
// Show profile of Single User.
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import {Col,Row,Container,Button,Card,Nav}  from 'react-bootstrap';

class Profile extends Component {
//<<Profile>>
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
    console.log(this.props)
// Extracted userId from the Route params.    
    const { _id } = this.props.match.params
    console.log(_id)
    axios
      .get('/users/${_id}')
      .then(res => {
          console.log(res.data)
          // modify the state according to the data in the API's response
        const persons = res.data;
        this.setState({ persons });
      })
      .catch(err => {
          console.log(err);
      });  
    
  };

  render(){
    console.log(this.state.user)
    const {user} = this.state
    return( 
      <div>
        {user.map(user => <li>{user.name}</li>)}
        
        <Card border="light" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{user.meetup_uid}</Card.Title>
            <Card.Text>{user.created_at}</Card.Text>
          </Card.Body>
        </Card>

      
      </div>
   );

  };

}



export default Profile;

