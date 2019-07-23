import React, { Component } from 'react'
import LocalAPI from '../../localApi';

export class NotDbEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: null,
            eventTime: null,
            eventDate: null,

        }
        
    }
    componentDidMount() {
        LocalAPI.get('/dashboard')
        .then(resp => {
            let [userData, eventsData] = resp.data;
            this.setState({eventName: eventsData[1].name });
            
            this.setState({eventsData: eventsData});
            console.log('state:' + this.state.eventsData);
            
        })
        .catch(err =>{
            console.log(err);
        })
    }

    render() {

        const eventsData = this.state.eventsData;
        console.log(this.state.eventsData);
        // let str = {ob:123};
        return (
            <div>
                <h1>{this.state.eventName}</h1>
                <h1>Event1</h1>
                <h1>Event1</h1>
                <h1>Event1</h1>
                
            </div>
        )
    }
}

export default NotDbEvents
