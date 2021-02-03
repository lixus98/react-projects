import React, { Component } from 'react';
import API from '../../utils/api';
import placeholder from '../assets/img/placeholder-image.jpg';
import { Link } from 'react-router-dom';



class BlogItem extends Component {

    render() {
        return (
            <div className="col-md-4 col-sm-6 portfolio-item">
                <Link
                    className="portfolio-link"
                    to={`/blog/${this.props.post.slug}`}>
                    <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                            <i className="fas fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img
                        style={{ width: ' 100%' }}
                        className="img-fluid"
                        src={
                            this.props.post.PostImage.length > 0 ?
                                API.makeFileUrl(this.props.post.PostImage[0].thumbnail)
                                : placeholder
                        } alt=""
                    />
                </Link>
                <div className="portfolio-caption">
                    <h4>{this.props.post.title}</h4>
                    <p className="text-muted">{this.props.post.slug}</p>
                </div>
            </div>
        )
    }

}

export default BlogItem;