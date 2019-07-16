import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';

class StudentComments extends Component {

  state = {
    ratings: []
  };


  componentDidMount() {
    // declare a new variable for studentsComments
    let eventRatings = [];
    // we need two request calls to the db (one for events, one for users)
      axios.all([
        axios.get(`http://localhost:3000/events/${this.props.match.params.id}`),
        axios.get('http://localhost:3000/ratings')
      ])
      .then(axios.spread((eventsResp, ratingsResp) => {
          // destructure data from response
          const {data} = eventsResp;
          console.log(data);
          const ratingsData = ratingsResp.data;
            // set length of loop
            let ratingsLength = data.length;
            console.log(data);
            console.log(ratingsData);
            // let ratingsLength = ratingsData.length
            // for loop through all the events
            // we need a loop that searches for event property of each rating
            for (let i = 0; i < ratingsLength; i++) {
              // in case the event the rating (where the comment comes from) is the same as the one targeted by the user
              if (ratingsData[i].event === data) {
                // push it inside theComments array
                eventRatings.push(ratingsData[i].event)
              }
            }
            console.log(eventRatings);
          this.setState({comments:eventRatings});
        
      }))
          .catch(error => {
              console.log(error);
          })};
          
  render() {
    const {ratings} = this.state;
    const {id, comment} = ratings;
    console.log(ratings);

    return(
      <div>
         {ratings.map((rating)=>(
            <div key={id} >
            {ratings.user.name}
            {ratings.user.avatar}
            {comment}
            </div>))}
      </div>
    )
  }
}


export default StudentComments;