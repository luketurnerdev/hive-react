import React from "react";

export default (props) => {
    const { event } = props;

    if (event) {
        return (
            <>
            <h1>{event.title}</h1>
            <p>{event.desc}</p>
            </>
        )
    }

    return null;
}