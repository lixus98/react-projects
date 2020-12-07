import React, {Component} from 'react';
import './assets/css/admin.css';

class LoginWrapper extends Component{
    render(){
        return(
        <div id="login-page">
            {this.props.children}
        </div>
        );
    }
}

export default LoginWrapper;