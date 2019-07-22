// this component will display one modal or another depending on the props
import React from "react";

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
    } else if (attendees, users) {
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
            <div key={user.id} >
                {attendees.includes(user.id)?
                    <img ref={user.photo} />:
                    null
                }
                {attendees.includes(user.id)?
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