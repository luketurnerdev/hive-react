// scores and comments by users for each events
import React, {Component} from 'react';
// import axios for sending requests to API
import axios from 'axios';
import EditRating from './EditRating';


class Reviews extends Component {

    state = {
        reviews: []
    }

    componentDidMount(){
        // declare variable for all rankings
        let reviews = [];
        axios.all([
            axios.get(`http://localhost:3000/events/${this.props.id}`),
            axios.get('http://localhost:3000/ratings'),
            axios.get('http://localhost:3000/users')
          ])
          .then(axios.spread((eventsResp, ratingsResp, usersResp) => {
              // destructure data of eventsResp
              const {data} = eventsResp;
              // cannot destructure data again (not possible to have 2 variables called data)
              const ratingsData = ratingsResp.data;
              const usersData = usersResp.data;
              // we need to loop through all the rankings to know which ones belong to the specific event
              // calculate the length of the rankings' data
              let ratingsLength = ratingsData.length;
              // then we need to look for the user matching the user_id inside each rating.
              // calculate the length of the loop
              let usersLength = usersData.length;
              for (let i = 0; i < ratingsLength; i++) {
                  if (ratingsData[i].event === data.id) {
                    for (let x = 0; x < usersLength; x++){
                        if (usersData[x].id === ratingsData[i].user) {
                            // users.push({name: usersData[x].name, avatar: usersData[x].avatar});
                            reviews.push(
                                {
                                    comment: ratingsData[i].comment, 
                                    score: {food: ratingsData[i].score.food, 
                                        drinks:ratingsData[i].score.drinks, 
                                        talk:ratingsData[i].score.talk, 
                                        vibe:ratingsData[i].score.vibe
                                    },
                                    name: usersData[x].name,
                                    avatar: usersData[x].avatar
                                }
                            );
                        }
                    }           
                  };
              };
            this.setState({reviews});
          }
          ))
          .catch(error => {
              console.log(error);
            })
        };

    // update(e) {
    //         e.preventDefault();
    //         const employee = {
    //             name: this.state.name,
    //             age: this.state.age,
    //             salary: this.state.salary,
    //         }
    //         axios.put('http://dummy.restapiexample.com/api/v1/update/{this.state.id}', employee)
    //         .then(res => console.log(res.data));
    //     }

    goToEdit(event){
        console.log(event.target)
        // return (<EditRating rating={this}/>);
    };

    render(){
        const {reviews} = this.state;
        return(
            <div>
                {reviews.map((review)=>(
            <div key={review.id} >
            {review.name}
            {review.avatar}
            {review.comment}
            {review.score.food}
            {review.score.drinks}
            {review.score.talk}
            {review.score.vibe}
            {/* <EditRating /> */}
            <button onClick={this.goToEdit} id={review}>Edit Review</button>
            </div>))}
            {/* button for editing the rating */}
            {/* in the button we call a CreateReview component in which we pass the whole review as props */}
            </div>
        )
    }
};


export default Reviews;

