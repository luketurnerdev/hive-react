import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';

class AverageRates extends Component {
  // set state
  state = {
    // the average of each rating's scores (food, drinks, talk, vibe)
    averageScores: {}
  }

  componentDidMount(){
    // declare a variable for each pattern of the score.
    let eventFood = [];
    let eventDrinks = [];
    let eventTalk = [];
    let eventVibe= [];
    // two request calls (one for event info, one for ratings)
    console.log(this.props);
    axios.all([
      axios.get(`http://localhost:3000/events/${this.props.id}`),
      axios.get('http://localhost:3000/ratings')
    ])
    .then(axios.spread((eventResp, ratingsResp) => {
      // destructure events data
      const {data} =  eventResp;
      // declare a variable for ratings data (IMPOSSIBLE TO DESTRUCTURE DATA AGAIN);
      const ratingsData = ratingsResp.data;
      // calculate length for loop
      let ratingsLength = ratingsData.length;
      // for every rating
        for (let x = 0; x < ratingsLength; x++) {
          // if the ratings belong to the specific event
          if (data.id === ratingsData[x].event.id) {
            eventFood.push(ratingsData[x].score.food);
            eventDrinks.push(ratingsData[x].score.drinks);
            eventTalk.push(ratingsData[x].score.talk);
            eventVibe.push(ratingsData[x].score.vibe);
          }
        }
        // declare variables for total
        let foodTotal = 0;
        let drinksTotal = 0;
        let talkTotal = 0;
        let vibeTotal = 0;
        // calculate lengths for each score pattern array
        let foodLength = eventFood.length;
        let drinksLength = eventDrinks.length;
        let talkLength = eventTalk.length;
        let vibeLength = eventVibe.length;
        // loops for calculate averages
        // ARE THE LENGTHS THE SAME??? (IS IT COMPULSORY TO RATE EVERYTHING??)
         for(let i = 0; i < foodLength; i++) {
          foodTotal += eventFood[i]
         };
         for(let i = 0; i < drinksLength; i++) {
          drinksTotal += eventDrinks[i]
         };
         for(let i = 0; i < talkLength; i++) {
          talkTotal += eventTalk[i];
         };
         for(let i = 0; i < vibeLength; i++) {
          vibeTotal += eventVibe[i];
         };
        // calculate averages
         let foodAverage = (foodTotal/foodLength);
         let drinksAverage = (drinksTotal/drinksLength);
         let talkAverage = (talkTotal/talkLength);
         let vibeAverage = (vibeTotal/vibeLength);
         // set the average object
         let eventAverageScores = {
           food: foodAverage,
           drinks: drinksAverage,
           talk: talkAverage,
           vibe: vibeAverage
         };
         // change state
         this.setState({
          averageScores: eventAverageScores
          });
      }))
    .catch(error => {
      console.log(error);
  })};

  render(){
    const {food, drinks, talk, vibe} = this.state.averageScores;
    return(
      <div>
        <div>{food}</div>
        <div>{drinks}</div>
        <div>{talk}</div>
        <div>{vibe}</div>
      </div>
    )
  }
};


export default AverageRates;