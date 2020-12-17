import React, {Component} from 'react';
import TableView from '../../Common/TableView';
import {connect} from 'react-redux';
import * as adminActions from '../../../store/actions/adminActions';


const columns = [
    {label: 'ID', name: 'id'},
    {label: 'Title', name: 'title'},
];

class Posts extends Component{

    componentDidMount(){
        this.props.getPosts(this.props.auth.token);
    }

    render(){
        const posts = this.props.admin.posts;
        console.log(posts);
        return(
            <div>
                <TableView 
                columns = {columns}
                rows = {posts}
                />
                <h1>Posts</h1>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        admin: state.admin
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getPosts: (token) => {
            dispatch(adminActions.getPosts(token));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts);