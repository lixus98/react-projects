import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import Header from '../Common/Header';
import image from '../assets/img/about.jpg';
import * as SiteActions from '../../store/actions/siteActions';
import BlogItem from '../Common/BlogItem';



class Blog extends Component {
    componentDidMount() {
        this.props.getPosts(0);
        this.props.getPostCount();
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
                <section className="bg-light" id="portfolio">
                    <div className="row">
                        {this.props.site.posts ?
                            this.props.site.posts.length > 0 ?
                                this.props.site.posts.map((item, index) => {
                                    return <BlogItem
                                        post={item}
                                        index={index}
                                        key={index}
                                    />
                                })
                                : null
                            : null
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                {this.props.site.postCount > this.props.site.posts.length ?
                                    <button className="btn btn-primary" onClick={
                                        this.props.getPosts.bind(this, this.props.site.posts.length)
                                    }>Load More</button>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </section>
        );
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
        },
        getPostCount: () => {
            dispatch(SiteActions.getPostCount());
        }
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog));