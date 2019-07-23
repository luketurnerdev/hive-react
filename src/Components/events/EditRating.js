import React, {Component} from 'react';
// import axios for sending requests to API


class EditRating extends Component {

    state = {
     comment: this.props.params
    //  foodScore: this.props.rating.score.food,
    //  drinksScore: this.props.rating.score.drinks,
    //  talkScore: this.props.rating.score.talk,
    //  vibeScore: this.props.rating.score.vibe
    }

// It maintains its own state, and uses the passed props as default values of the fields.
// constructor(props) {
//     super(props);
//     this.state = {value: ''};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
// }




componentDidMount(){
    console.log(this);
    console.log(this.props.params)
}

handleChange(event) {
    // this.setState({comment: event.target.comment});
}

// handleSubmit(event) {
//     alert('Your comment has been submitted: ' + this.state.comment);
//     event.preventDefault();
// }


    render(){
        
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Your comment:
                <input type="text" value={this.state.comment} onChange={this.handleChange} />
                </label>
                <label>
                Food:
                </label>
                <label>
                Drinks:
                </label>
                <label>
                Talk:
                </label>
                <label>
                Vibe:
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

}


export default EditRating;
