import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as adminActions from '../../../store/actions/adminActions';

class AddPost extends Component {
    render(){
        return(
            <h1>Add Post</h1>
        )
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth,
        admin: state.admin
    }
}

const mapDispatchToProps = dispatch => {
    return{
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPost);
