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
        if (eventsData[i].local_date < date && eventsData.hive_attendees.includes[data]) {
          attended.push(eventsData[i])
        }
      }
      // for number of comments, we just need the comments of the ratings which user is the user
      // calculate length of ratingsData
      let ratingsLength = ratingsData.length;
      for (let x = 0; x < ratingsLength; x++) {
        if (ratingsData[x].user === data) {
          totalComments += 1;
        }
      }
      // update the state
      this.setState({attended, numberComments});
    }))
  }

  render() {
    const {attended, numberComments} = this.state;

    return(
      <div>
        {attended}
        {numberComments}
      </div>
    )

  }
};

export default Statistic;