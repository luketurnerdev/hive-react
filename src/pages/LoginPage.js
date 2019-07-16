    
import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>Welcome To The Hive!</h1>
                <div>
                    
                    <Link to="/https://secure.meetup.com/login/">
                        <button>Login</button>
                    </Link>
                    <Link to="/request_access">
                        <button>RequestAccess</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default HomePage;