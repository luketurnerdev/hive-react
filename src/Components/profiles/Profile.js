
// Show profile of Single User.
import React, {Component} from 'react';
// import axios for sending requests to API
import localApi from "../../localApi";
import {Card,Container}  from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2em;
  background: white;
  margin:2em;
`;

class Profile extends Component {
state={
  users:""
}

// just after rendering the user's info, call to the API
  componentDidMount(){
    // let Users = []
 
// Extracted userId from the Route params.    
    const { id } = this.props.match.params

    localApi
      .get("get_user")
      .then(res => {
        // modify the state according to the data in the API's response
        const {data} = res;
          
        // add response of api call to users array
        this.setState({ users: data });
      })
      .catch(err => {
          console.log(err);
      });  
      
     
  };

  render(){
    const {users} = this.state
   
    return( 
      <div>
        <Container>
                <Wrapper>
        
        
        <Card border="light" style={{ width: '18rem' }}>
          <Card.Body>
          <Card.Title>{users.name}</Card.Title>
            <Card.Title>{users.meetup_uid}</Card.Title>
            <Card.Text>{users.created_at}</Card.Text>
          </Card.Body>
        </Card>
        </Wrapper>
        </Container>
      </div>
   );

  };

}



export default Profile;

