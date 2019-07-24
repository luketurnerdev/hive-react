
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {Col,Row,Button,Card}  from 'react-bootstrap';
import localApi from "../../localApi";
import SuggestForm from '../forms/SuggestForm';

class StudentsEvents extends Component {
    state = {
        events: [],
        user:""
    };

    componentDidMount() { 
        this.getUpdatedEvents()
    };
// START GET API
    getUpdatedEvents = () => { 
    let studentsEvents = [];
    localApi
// START CALL EVENTS DATAS 
        .get('events')
        .then(resp => {
            // destructure data from response
            const {data} = resp;
            // set length of loop
            let eventsLength = data.length;
            // for loop through all the events
            for (let i = 0; i < eventsLength; i++) {               
                if ((data[i].ca_recommended === false) && ((data[i].hive_attendees.length > 0) || (data[i].suggested.is_suggested))) {

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

        localApi.get("get_user")
        .then(resp =>{
            const userData = resp.data;
            this.setState({user : userData})
        })
// END CALL USER DATA
};
// END GET API 

// START PUT API     
// click SAVE and the boolean ca_recommended=false should update to true 
// with submit it gets the event and the true value
    handleSubmit = (item,boolean) => {
    item.ca_recommended=boolean 
   localApi.put(`/events/recommend/${item._id}`, item)
    .then((res) => {
            this.getUpdatedEvents()
        })
        .catch(err => console.log(err));
    }
// END PUT API      
  
// START ATTEND (PUT) API
handleAttend = (eventId) => {
    // sending DELETE call to backend 
        localApi.put(`events/attend/${eventId}`)
        .then(res=>{
            this.componentDidMount()
        })
    }
// END ATTEND (PUT) API
 
// START RESPONSE
    render() {
        const {user, events} = this.state;

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
                                            <Button size="sm" variant="primary" onClick={()=>this.handleAttend(item._id)}>
                                                {!(item.hive_attendees.includes(user._id))?
                                                <>Attend</>:
                                                <>Unattend</>}
                                            </Button>
                                        {/* show SAVE button if is admin . otherwise show SUGGEST button */}
                                            <Col>
                                           {(user.admin === true)?                                                 
                                           <Button size="sm" variant="info" onClick={()=>this.handleSubmit(item,true)}>Save</Button>
                                           :null
                                           }                                            
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
