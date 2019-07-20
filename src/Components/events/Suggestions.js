// Comments for admin from students
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';

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
        axios.get('/events/'),
        axios.get('/users')
      ])
      .then(axios.spread((eventsResp, usersResp) => {
          // destructure data from response
          let {data} = eventsResp;
          console.log(data);
          let usersData = usersResp.data;
           // we need three pieces of data: user name, user avatar and suggestion message.
           // to get the suggestion message, we need to loop through events and get the suggested.message property
           // to get user name and user avatar, we need to get the user id first from suggested.suggested_by
           // then we need to find that user id in usersData and get from the latter the name and the avatar
           let eventsLength = data.length;
           for (let i = 0; i < eventsLength; i++) {
             if(data[i].suggested.suggested_by.length > 0) {
              messages.push(data[i].suggested.message);
              // now we have a messages array containing an array of messages for each suggested event..
              users_ids.push(data[i].suggested.suggested_by);
              // now we have a users_id array containing an array of the ids of the users who suggested each suggested event
              // [[1,2],[2,3],[1]]
              // [["hi", "hello"], ["hi", "Hola"], ["Bye"]];
             }
           }
           console.log(users_ids);
           // then we need to find the users' name and avatar from the users_ids array.
           let usersIdsLength = users_ids.length;
           let usersLength = usersData.length;
           // we loop through users_ids
           for (let x = 0; x < usersIdsLength; x++) {
             // and we continue looping, through each item of users_ids
             for (let z = 0; z < users_ids[x].length; z++) {
               // and keep looping inside the usersData to find each id
               for (let y = 0; y < usersLength; y++) {
                 if(usersData[y].id === users_ids[x][z]) {
                   users.push({name: usersData[y].name, avatar: usersData[y].avatar, message: messages[x][z]});
                   // now we have an array containing an object for each name, avatar and message of the user with the id we had at users_ids' array
                   // [{name: "Juan", avatar: "image", message: "hi"}, {name: "Lorenzo", avatar: "image2", message: "hello"}, {name: "Lorenzo", avatar: "image2", message: "hello"}, etc]
                 }
               }
             }
           }
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
            {item.avatar}
            {item.message}
            </div>))}
      </div>
    )
  }
}


export default Suggestions;