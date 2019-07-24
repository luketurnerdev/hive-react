import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import localApi from "../../localApi";

class TodayEvents extends Component {
  state = {
    events: []
  }

  componentDidMount() {
  // declare a new variable for todayEvents
  let todayEvents = [];
  // we need two request calls to the db (one for events, one for users)
    axios.all([
      localApi.get('/events'),
      localApi.get('/users/3')
    ])
    .then(axios.spread((eventsResp, usersResp) => {
        // destructure data from response
        const {data} = eventsResp;
        const usersData = usersData.data;
        // state today's date in ISO 8601 (as in Meetup API) without time
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // this.getDate();
          // set length of each loop
          let eventsLength = data.length;
          let usersLength = usersData.length;
          // for loop through all the events
          for (let i = 0; i < eventsLength; i++) {
            // for loop through all the users
            for (let x = 0; x < usersLength; x++) {
              // if the event's attendees include the user and the event is happening today
              if (data[i].hive_attendees.includes(usersData[x]) && data[i].local_date === date && data[i].hive_attendees) {
                // push the event info inside the state events
                todayEvents.push(data[i]);
              }
            } 
          }
        this.setState({events:todayEvents});
      
    }))
        .catch(error => {
            console.log(error);
        })};
        
  render(){
    const {events} = this.state;
    return(
      
      <div>
        {
          events.map((event) => {
            return <li key={event.id}>{event.name}</li>
          })
        }
      </div>
    )
  }
}

export default TodayEvents;