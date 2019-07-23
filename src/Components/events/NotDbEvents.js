import React, { Component } from 'react'
import LocalAPI from '../../localApi';

export class NotDbEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: null,
            eventTime: null,
            eventDate: null,
            eventNames: []

        }
        
    }
    componentDidMount() {
        LocalAPI.get('/dashboard')
        .then(resp => {
            let [userData, eventsData] = resp.data;
            this.setState({eventsData: eventsData});
            let eventNames = [];

            for (let i=0; i<10; i++) {
                console.log(eventsData[i].name);
                eventNames.push(eventsData[i].name);
            }
            this.setState({eventNames:eventNames});
            
            
           
            
        })
        .catch(err =>{
            console.log(err);
        })
    }
    // render(){
    //     console.log(this.state.events);
    //     const {events} = this.state;
    //     return(
          
    //       <div>
    //         {
    //           events.map((event) => {
    //             return <li key={event.id}>{event.name}</li>
    //           })
    //         }
    //       </div>
    //     )
    //   }

    render() {

        const eventsData = this.state.eventsData;
        const names = this.state.eventNames;
        //
        return (
            <div> {
                names.map((name) => {
                    return <li key={name.id}>{name}</li>
                })
            }
                
                
            </div>



        )
    }
}

export default NotDbEvents