import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Common/Header';
import API from '../../utils/api';
import * as SiteActions from '../../store/actions/siteActions';
import '../../css/style.css'

class Single extends Component {

    componentDidMount() {
        this.props.getSinglePost(this.props.match.params.slug, this.props.auth.token);
    }

    render() {
        return (
            <div>
                <Header
                    title=""
                    subtitle={this.props.site.post.title}
                    showButton={false}
                    image={
                        this.props.site.post.PostImage.length > 0 ?
                            API.makeFileUrl(this.props.site.post.PostImage[0].url)
                            : ''
                    }
                />
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="post-content" dangerouslySetInnerHTML={{ __html: this.props.site.post.content }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    site: state.site,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    getSinglePost: (slug, token) => {
        dispatch(SiteActions.getPostBySlug(slug, token));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Single);