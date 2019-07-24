// Average rates of specific event will be rendered with reviews
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import localApi from "../../localApi";
import StarRatingComponent from 'react-star-rating-component';
import {Alert,Row,Container,Col}  from 'react-bootstrap';

class AverageRates extends Component {
  // set state
  state = {
    // the average of each rating's scores (food, drinks, talk, vibe)
    averageRatings: {}
  }

  componentDidMount(){
    // declare a variable for each pattern of the score.
    let eventFood = [];
    let eventDrinks = [];
    let eventTalk = [];
    let eventVibe= [];
    // two request calls (one for event info, one for ratings)
    axios.all([
      localApi.get(`/events/${this.props.id}`),
      localApi.get('/ratings')
    ])
    .then(axios.spread((eventResp, reviewsResp) => {
      // destructure events data
      const {data} =  eventResp;
      // declare a variable for ratings data (IMPOSSIBLE TO DESTRUCTURE DATA AGAIN);
      const reviewsData = reviewsResp.data;
      // calculate length for loop
      let reviewsLength = reviewsData.length;
      // for every rating
        for (let x = 0; x < reviewsLength; x++) {
          // if the ratings belong to the specific event
          if (reviewsData.length > 0 && data.id === reviewsData[x].event) {
            eventFood.push(reviewsData[x].rating.food);
            eventDrinks.push(reviewsData[x].rating.drinks);
            eventTalk.push(reviewsData[x].rating.talk);
            eventVibe.push(reviewsData[x].rating.vibe);
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
         let eventAverageRatings = {
           food: foodAverage,
           drinks: drinksAverage,
           talk: talkAverage,
           vibe: vibeAverage
         };
         // change state
         this.setState({
          averageRatings: eventAverageRatings
          });
      }))
    .catch(error => {
      console.log(error);
  })};

  render(){
    const {food, drinks, talk, vibe} = this.state.averageRatings;
    return(
      <div>
        <Container>
       <Alert variant="light"> Average rates </Alert>
       <Row>
         <Col>
        Food:
        <StarRatingComponent 
                name="food"
                starCount={5}
                value={food}
                // onStarClick={this.onStarClick.bind(this)}
                editing={false}
                />
                </Col>
                <Col>
        Drinks:
        <StarRatingComponent 
                name="food"
                starCount={5}
                value={drinks}
                // onStarClick={this.onStarClick.bind(this)}
                editing={false}
                />
                </Col>
                <Col>

        Talk:
        <StarRatingComponent 
                name="food"
                starCount={5}
                value={talk}
                // onStarClick={this.onStarClick.bind(this)}
                editing={false}
                />
                </Col>
                <Col>
        Vibe:
        <StarRatingComponent 
                name="food"
                starCount={5}
                value={vibe}
                // onStarClick={this.onStarClick.bind(this)}
                editing={false}
                />
                </Col>
                </Row>
                </Container>
                
      </div>
    )
  }
};


export default AverageRates;