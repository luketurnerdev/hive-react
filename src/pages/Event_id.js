// Output: A single event
import React, { Component } from 'react'
import axios from 'axios';
import {Col,Row,Container,Button,Card,Nav}  from 'react-bootstrap';
import { Link } from "react-router-dom";
import SingleEvent from '../Components/events/SingleEvent'

export class Event_id extends Component {
   

    render() {
        return(
                <div>
                <SingleEvent/>
                </div>
        )
    }
}

export default Event_id
