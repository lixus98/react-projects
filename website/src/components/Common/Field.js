import React, { Component } from 'react';
import '../../css/style.css';


class Field extends Component {

    constructor(props) {
        super(props);

        this.state = {
            charsPerPage: 160,
            pageCount: 160,
            charsExceded: 'floaty'
        }
    }

    wordCount = (e) => {

        let currentText = e.target.value;
        //Now we need to recalculate the number of characters that have been typed in so far
        let characterCount = currentText.length;

        let charsPerPageCount = this.state.charsPerPage;
        let pageCount = charsPerPageCount - characterCount;
        if (characterCount <= charsPerPageCount) {
            this.setState({ pageCount, charsExceded: 'floaty' });
        } else {
            this.setState({ charsExceded: 'floaty danger' });
        }
    }

    render() {
        return (
            <div className="form-group">
                {this.props.elementName === 'input' ?
                    <input
                        className="form-control"
                        id={this.props.name}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        required="required"
                        data-validation-required-message="Please enter your name."
                        name={this.props.name}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
                    :
                    <div>
                        <div className={this.state.charsExceded}>{this.state.pageCount}</div>
                        <textarea
                            className="form-control"
                            id={this.props.name}
                            placeholder={this.props.placeholder}
                            required="required"
                            data-validation-required-message="Please enter a message."
                            name={this.props.name}
                            onChange={e => { this.props.onChange(e); this.wordCount(e) }}
                            onBlur={this.props.onBlur}
                        />

                    </div>
                }
                <p className="help-block text-danger">
                    {(this.props.touched && this.props.errors) &&
                        <span>{this.props.errors}</span>
                    }
                </p>
            </div>
        )
    }

}

export default Field;