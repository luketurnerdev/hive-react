
// Show profile of Single User.
import React, {Component} from 'react';
// import axios for sending requests to API
import localApi from "../../localApi";
import {Card,Container}  from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2em;
  background: white;
  margin:10em;
  font-size:0.8rem;
  color: #555e64;
  display:flex;
  align-items:left;
  justify-content:center;
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
    console.log(id)

    localApi
      .get("get_user")
      .then(res => {
        // modify the state according to the data in the API's response
        const {data} = res;
          console.log(data)
          
        // add response of api call to users array
        this.setState({ users: data });
      })
      .catch(err => {
          console.log(err);
      });  
      
     
  };

  render(){
   
    const {users} = this.state
    console.log(users)
    return( 
      <div>
        <Container>
                <Wrapper>
        
        
        <Card border="light" style={{ width: '18rem' }}>
          
          <Card.Body>
          <Card.Title><h1>{users.name}</h1></Card.Title>
          <hr/>
            <Card.Text><p5>city: </p5>{users.city}</Card.Text>
            <Card.Text><p5>e-mail: </p5> {users.email}</Card.Text>
            <Card.Text><p5>created at: </p5>{users.created_at}</Card.Text>
          </Card.Body>
        </Card>
        </Wrapper>
        </Container>
      </div>
   );

  };

}



export default Profile;

