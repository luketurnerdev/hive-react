import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';


class Statistic extends Component {
  state = {
    attended: [],
    suggestedEvents: [],
    approvedEvents: [],
    numberComments: 0
  }

  componentDidMount(){
    let attended = [];
    let suggested = [];
    let approved = [];
    let numberComments = 0;

    axios.all([
      axios.get(`http://localhost:3000/users/${this.props.match.params.id}`),
      axios.get('http://localhost:3000/events/'),
      axios.get('http://localhost:3000/ratings')
    ])
    .then(axios.spread((userResp, eventsResp, ratingsResp) => {
      // destructure data from response of user
      const {data} = userResp;
      // declare variables for events and ratings data
      const eventsData = eventsResp.data;
      const ratingsData = ratingsResp.data;
      // which events has the user attended so far
      // calculate the length of the events data
      let eventsLength = eventsData.length;
      // set today's date without time
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      // for attended events, we need passed events (date of the event less than today's) and the user to be included in the event's hive_attendees
      for (let i = 0; i < eventsLength; i++) {
        if ((eventsData[i].local_date < date) && (eventsData[i].hive_attendees.includes(data.id))) {
          attended.push(eventsData[i])
        }
      }
      console.log(attended);
      // for suggested events, we need to check which events's suggested_by property includes the user id.
      for (let y = 0; y < eventsLength; y++) {
        console.log(eventsData)
        console.log(eventsData[y])
        console.log(eventsData[y].suggested)
        console.log(eventsData[y].suggested.suggested_by)
        console.log(eventsData[y].suggested.suggested_by.includes(data))
        console.log(eventsData[y].suggested.suggested_by.includes(data.id))
        if (eventsData[y].suggested.suggested_by.includes(data.id)) {
          // we push into the suggested events the message of the
          suggested.push(eventsData[y]);
          // suggested.push(eventsData[i].suggested.message[message.findIndex(data.id)])
        }
      }
      console.log(suggested);
      // for number of comments, we just need the comments of the ratings which user is the user
      // calculate length of ratingsData
      let ratingsLength = ratingsData.length;
      for (let x = 0; x < ratingsLength; x++) {
        if (ratingsData[x].user.id === data.id) {
          numberComments += 1;
        }
      }
      console.log(numberComments);
      console.log(attended);
      console.log(suggested);

      // update the state
      this.setState({attended, numberComments});
    }))
  }

  render() {
    const {attended, numberComments, suggested} = this.state;

    return(

      <div>
         <h3>Events attended</h3>
        {attended.map((item)=>(
            <div key={item.id} >
            <p>Event name:{item.name}</p>
            </div>
          ))
        }
         <h3>Events suggested</h3>
        {/* {suggested.map((item)=>(
          <div key={item.id} >
          <p>Event name:{item.name}</p>
          </div>
        ))
        } */}
          <h3>Number of comments</h3>
        {numberComments}
      </div>
  )
  }
};

export default Statistic;