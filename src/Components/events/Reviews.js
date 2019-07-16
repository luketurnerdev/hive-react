import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';


class Reviews extends Component {

    state = {
        ratings: []
    }

    componentDidMount(){
        // declare variable for all rankings
        let ratings = [];
        axios.all([
            axios.get(`http://localhost:3000/events/${this.props.id}`),
            axios.get('http://localhost:3000/ratings')
          ])
          .then(axios.spread((eventsResp, ratingsResp) => {
              // destructure data of eventsResp
              const {data} = eventsResp;
              // cannot destructure data again (not possible to have 2 variables called data)
              const ratingsData = ratingsResp.data;
              // we need to loop through all the rankings to know which ones belong to the specific event
              // calculate the length of the rankings' data
              let ratingsLength = ratingsData.length;
              for (let i = 0; i < ratingsLength; i++) {
                  console.log(data)
                  console.log(ratingsData[i].event)
                  console.log(data === ratingsData[i].event)
                  if (ratingsData[i].event.id === data.id) {
                      ratings.push(ratingsData[i]);
                  };
              };
              this.setState({ratings});
              console.log(ratings);
          }
          ))
          .catch(error => {
              console.log(error);
            })
        };


    render(){
        const {ratings} = this.state;

        return(
            <div>
                {ratings.map((rating)=>(
            <div key={rating.id} >
            {rating.user.first_name}
            {rating.user.avatar}
            {rating.comment}
            {rating.score.food}
            {rating.score.drinks}
            {rating.score.talk}
            {rating.score.vibe}
            </div>))}
            </div>
        )
    }
};


export default Reviews;

