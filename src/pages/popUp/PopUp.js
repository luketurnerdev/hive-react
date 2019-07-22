// this component will display one modal or another depending on the props
import React from "react";
import { get } from "http";

export default (props) => {
    const { event, attendees, users } = props;

    if (event) {
        return (
            <>
            <h1>{event.title}</h1>
            <p>{event.photo}</p>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>{event.desc}</p>
            </>
        )
    } else if (props) {
        console.log(props)
        console.log(users);
        console.log(attendees);
        return (
            // <>
            //        {attendees.map((attendee)=>(
            // <div key={attendee} >
            // {}
            // </div>))}
            // <h1>Hivers attending this event:</h1>
            // <p>{attendees.hive_attendees}</p>
            // </>
            <>
            {users.map((user) => (
            <div key={user._id} >
                {attendees.includes(user._id)?
                    <img ref={user.photo} />:
                    null
                }
                {attendees.includes(user._id)?
                    <p>{user.name}</p>:
                    null
                }
            </div>                
            ))}
            </>
        )
    // } else if () {
    }

    return null;
}

// class PopUp extends Component {
//     componentDidMount() {
        
//     }

//     render(){
//         const { event, attendees, users } = props;
//         return(
//         )
//     }
// }