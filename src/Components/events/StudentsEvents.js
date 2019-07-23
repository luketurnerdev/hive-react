
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {Col,Row,Button,Card}  from 'react-bootstrap';
// import axios for sending requests to API
import axios from 'axios';
import localApi from "../../localApi";

class StudentsEvents extends Component {
    state = {
        events: [],
        users:[]
    };

    componentDidMount() { 
        this.getUpdatedEvents()
    };
// START GET API
    getUpdatedEvents = () => { 
    let studentsEvents = [];
    axios
// START CALL EVENTS DATAS 
        .get('/events')
        .then(resp => {
            // destructure data from response
            const {data} = resp;
            console.log(data);
            // set length of loop
            let eventsLength = data.length;
            // for loop through all the events
            for (let i = 0; i < eventsLength; i++) {
                // Ony if hivers are attending to the event, or have suggested it, and this event hasn't been recommended by CA yet
           
                // if ((data[i].hive_attendees.length > 0) && (data[i].ca_recommended === false)) {
                //     // mark it as student event (event a student is attending)
                //     console.log(data[i])
                //     studentsEvents.push(data[i]);
                // }   

                if ((data[i].ca_recommended === false)) {

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
// END CALL EVENTS DATAS 

// START CALL USER DATA
        axios.get(`/users/5d3118d3c015b5923b806846`)
        .then(resp =>{
            const userData = resp.data;
            this.setState({users : userData})
           console.log(this.state.users)
        })
// END CALL USER DATA
};
// END GET API 

// START PUT API     
// click SAVE and the boolean ca_recommended=false should update to true 
// with submit it gets the event and the true value
    handleSubmit = (item,boolean) => {
    item.ca_recommended=boolean 
    console.log(item._id)
   localApi.put(`/events/recommend/${item._id}`, item)
    .then((res) => {
            console.log("here");
            console.log(res);
            this.getUpdatedEvents()
        })
        .catch(err => console.log(err));
    }
// END PUT API      
  
 
// START RESPONSE
    render() {
        
        const {users} = this.state;
        const {events} = this.state;

        return(       
                <div>
                    {events.map((item) => {
                        return (
                            
                            <div key={item._id}>
                                <Card border="light" >
                                    <Card.Body>
                                        <Card.Text> <Link to={`/events/${item._id}`}>{item.name}</Link></Card.Text>
                                        <Row>
                                            <Col>
                                                <Card.Text className="mb-2 text-muted"><small>{item.local_date}</small></Card.Text>
                                            </Col>
                                        {/* show SAVE button if is admin . otherwise show SUGGEST button */}
                                            <Col>
                                           {users.admin === true?                                                 
                                           <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Save</Button>
                                           :<Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Suggest</Button>
                                           }

                                            <Button size="sm" variant="primary" onClick={()=>this.handleSubmit(item,true)}>Attend</Button>
                                            </Col>
                                        </Row>
                                        <footer className="blockquote-footer">
                                        <Link to={`/events/${item._id}/attendees`}>Attendees</Link> 
                                        </footer>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}

                </div>
            )}
// END RESPONSE
}

export default StudentsEvents;
