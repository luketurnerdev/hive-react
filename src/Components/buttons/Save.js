import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import axios from 'axios';
export class Save extends Component {
// START <CALL THE EVENTS WITH TRUE VALUE FOR CA_RECOMMENDED>
    state = {
        events: []
    };

    // just after rendering the Events, call to the API
    componentDidMount() {
    let studentsEvents = [];
    axios
    // request call to the db
        .get('http://localhost:3000/events')
        .then(resp => {
            // destructure data from response
            const {data} = resp;
           
            // set length of loop
            let eventsLength = data.length;
            // for loop through all the events
            for (let i = 0; i < eventsLength; i++) {
                // Ony if hivers are attending to the event, and this event hasn't been recommended by CA yet
           
                if ((data[i].hive_attendees.length > 0) && (data[i].ca_recommended === false)) {
                    // mark it as student event (event a student is attending)
                    studentsEvents.push(data[i]);
                }   
            }
          
            // we change the state according to our previous code
           this.setState({events: studentsEvents});
           
        })
        .catch(error => {
            console.log(error);
        });  
    };

    // END <CALL THE EVENTS WITH TRUE VALUE FOR CA_RECOMMENDED>


            // state = {
            //     name: '',
            // }
        

    handleChange = event => {
        this.setState({ name: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
        
        const eventname = {
          name: this.state.name
        };
       
        axios.put(`http://localhost:3000/events`, { eventname })
           
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }
    
  
    render() {
                return (     
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <Button variant="primary" type="submit" onClick={this.handleChange}>Add</Button>
                        
                    </form>
                </div>
                )
        }  

        // <div>
            
        //     {/* {ca_recommended.map((event)=>(<div key={event.ca_recommended}>{event.name}</div>))} */}
          
        // </div>
        //        {event.ca_recommended === false?  <Button onClick={this.handleChange}> SAVE </Button> : null}
    
};

export default Save;
