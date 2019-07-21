import React from "react";

export default (props) => {
    const { event } = props;

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
    }

    return null;
}