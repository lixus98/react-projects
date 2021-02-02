import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import Header from '../Common/Header';
import image from '../assets/img/about.jpg';
import * as SiteActions from '../../store/actions/siteActions';



class Blog extends Component {
    componentDidMount() {
        this.props.getPosts(0);
    }
    render() {
        return (
            <div>
                <Header
                    title="Blog"
                    subtitle="Where the magic happens"
                    showButton={false}
                    image={image}
                />
            </div>
        );
    }

}

const mapStateToProps = state => ({
    site: state.site
});

const mapDispatchToProps = dispatch => {
    return {
        getPosts: (skip) => {
            dispatch(SiteActions.getPosts(skip));
        }
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog));