// // Will return all the list of student's access request ( array of NAME CITY / 2 action Button Confirm/Delete )
// Express=> pages_controller (func AccountRequest) views/pages/account_request 
// // SIGNED IN as ADMIN
import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import {Form,Col,Row,Container,Button}  from 'react-bootstrap';
import styled from 'styled-components';

class AccountRequests extends Component {
    state = {
        persons: []
    };

    componentDidMount() {

        axios
            .get(`/account_requests`)
            .then(res => {
                const persons = res.data;
            // this.setState({ persons });
            // console.log(persons)
                console.log(persons);
             })
      }

    render() {
        return (
            
            <div>
                <h1>USERS</h1>
                <div>
                    <ul>
                        {/* {this.state.persons.map(person => {person.name})} */}
                    </ul>
                    {/* <Link to="/auth/meetup"> */}
                        <button>Save</button>
                    {/* </Link> */}
                    {/* <Link to="/request_access"> */}
                        <button>Delete</button>
                    {/* </Link> */}
                </div>
            </div>
        );
    }
}


export default AccountRequests;