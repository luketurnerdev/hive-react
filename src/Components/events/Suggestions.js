// Comments for admin from students
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import localApi from "../../localApi";

class Suggestions extends Component {

  state = {
        usersAndMessages: []
  };


  componentDidMount() {
    // an array for suggesting users
    let users = [];
    // an array for suggesting users' ids
    let users_ids = [];
    // an array of suggestion messages
    let messages = [];
    // we need two request calls to the db (one for events, one for users)
      axios.all([
        // axios.get(`/events/${this.props.match.params.id}`),
        localApi.get('/events/'),
        localApi.get('/users')
      ])
      .then(axios.spread((eventsResp, usersResp) => {
          // destructure data from response
          let {data} = eventsResp;
          console.log(data);
          let usersData = usersResp.data;
           // we need three pieces of data: user name, user photo and suggestion message.
           // to get the suggestion message, we need to loop through events and get the suggested.message property
           // to get user name and user photo, we need to get the user id first from suggested.suggested_by
           // then we need to find that user id in usersData and get from the latter the name and the avatar
           let eventsLength = data.length;
           // for each event, check if it has been suggested.
           for (let i = 0; i < eventsLength; i++) {
             if(data[i].suggested.is_suggested) {
              messages.push(data[i].suggested.message);
              // now we have a messages array containing the messages for each suggested event.
              users_ids.push(data[i].suggested.suggested_by);
              // now we have a users_id array containing the ids of the users who suggested each suggested event
              // [1,2,2,3,1]
              // ["hi", "hello","hi", "Hola", "Bye"];
             }
           }
           console.log(users_ids);
           // then we need to find the users' name and avatar from the users_ids array.
           let usersIdsLength = users_ids.length;
           let usersLength = usersData.length;
           // we loop through users_ids
           for (let x = 0; x < usersIdsLength; x++) {
               // and keep looping inside the usersData to find each id
               for (let y = 0; y < usersLength; y++) {
                 // if the id of the user is inside the ids array
                 if(usersData[y].id === users_ids[x]) {
                   users.push({name: usersData[y].name, photo: usersData[y].photo, message: messages[x]});
                   // now we have an array containing an object for each name, photo and message of the user with the id we had at users_ids' array
                   // [{name: "Juan", avatar: "image", message: "hi"}, {name: "Lorenzo", avatar: "image2", message: "hello"}, {name: "Lorenzo", avatar: "image2", message: "hello"}, etc]
                 };
               };
             };
           this.setState({usersAndMessages: users});
          }))
          .catch(error => {
              console.log(error);
          })};
          
  render() {
    const {usersAndMessages} = this.state;
    return(
      <div>
         {usersAndMessages.map((item)=>(
            <div key={item.id} >
            {item.name}
            {item.photo}
            {item.message}
            </div>))}
      </div>
    )
  }
}


export default Suggestions;