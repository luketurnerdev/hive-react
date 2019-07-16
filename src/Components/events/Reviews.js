// scores and comments by users for each events
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import { userInfo } from 'os';


class Reviews extends Component {

    state = {
        ratings = []
    }

    componentDidMount(){
        // declare variable for all rankings
        let ratings = [];
        axios.all([
            axios.get(`http://localhost:3000/events/${this.props.match.params.id}`),
            axios.get('http://localhost:3000/ratings')
          ])
          .then(axios.spread((eventsResp, ratingsResp) => {
              // destructure data of eventsResp
              const {data} = eventsResp;
              // cannot destructure data again (not possible to have 2 variables called data)
              const ratingsData = ratingsData.data;
              // we need to loop through all the rankings to know which ones belong to the specific event
              // calculate the length of the rankings' data
              let ratingsLength = ratingsData.length;
              for (let i = 0; i < ratingsLength; i++) {
                  if (ratingsData[i].event === data) {
                      ratings.push(ratingsData[i]);
                  };
              };
              this.setState({ratings});
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
            <div key={id} >
            {rating.user.name}
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

