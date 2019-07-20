import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';


class Statistic extends Component {
  state = {
    attended: [],
    suggested: [],
    approved: [],
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
      axios.get('http://localhost:3000/reviews')
    ])
    .then(axios.spread((userResp, eventsResp, reviewsResp) => {
      // destructure data from response of user
      const {data} = userResp;
      // declare variables for events and ratings data
      const eventsData = eventsResp.data;
      const reviewsData = reviewsResp.data;
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
        // console.log(eventsData)
        // console.log(eventsData[y])
        // console.log(eventsData[y].suggested)
        // console.log(eventsData[y].suggested.suggested_by)
        // console.log(eventsData[y].suggested.suggested_by.includes(data))
        // console.log(eventsData[y].suggested.suggested_by.includes(data.id))
        if (eventsData[y].suggested.suggested_by.includes(data.id)) {
          // we push into the suggested events the message of
          suggested.push(eventsData[y]);
          // suggested.push(eventsData[i].suggested.message[message.findIndex(data.id)])
        }
      }
      // for approved events, we need to check which of the events suggested by the user have been approved by CA.
      // calculate the length of the suggested events data
      let suggestedLength = suggested.length;
      for (let w = 0; w < suggestedLength; w++) {
        if (suggested[w].suggested.suggested_by.includes(data.id) && suggested[w].ca_recommended === true) {
          approved.push(eventsData[w]);
        }
      }
      // for number of comments, we just need the comments of the ratings which user is the user
      // calculate length of ratingsData
      let reviewsLength = reviewsData.length;
      for (let x = 0; x < reviewsLength; x++) {
        if (reviewsData[x].user.id === data.id) {
          numberComments += 1;
        }
      }
      console.log(numberComments);
      console.log(attended);
      console.log(suggested);
      console.log(approved);

      // update the state
      this.setState({attended, numberComments, suggested, approved});
    }))
  }

  render() {
    const {attended, numberComments, suggested, approved} = this.state;

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
        {suggested.map((item)=>(
          <div key={item.id} >
          <p>Event name:{item.name}</p>
          </div>
        ))
        }
         <h3>Events approved</h3>
        {approved.map((item)=>(
          <div key={item.id} >
          <p>Event name:{item.name}</p>
          </div>
        ))
        }
          <h3>Number of comments</h3>
        {numberComments}
      </div>
  )
  }
};

export default Statistic;