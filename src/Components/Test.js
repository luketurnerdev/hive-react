import React, {Component} from 'react';
import axios from 'axios';

export class Test extends Component {
    state = {
        users:[]
    }
    componentDidMount(){
        axios.get('/users')
        .then(resp=>{
            const {data} = resp;
            this.setState({users:data});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
    const {users} = this.state
    
        return (
        <ul>{users.map((user)=> ( <li key={user.id}>{user.first_name}</li>))}</ul>
        )
    
                
            }
}

export default Test;





