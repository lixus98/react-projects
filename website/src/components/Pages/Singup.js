import React, { Component } from 'react';
import Field from '../Common/Field';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions';
import '../assets/css/admin.css';


const Fields = [
    { name: 'email', elementName: 'input', type: 'email', placeholder: 'Your Email*' },
    { name: 'name', elementName: 'input', type: 'text', placeholder: 'Your Name*' },
    { name: 'password', elementName: 'input', type: 'password', placeholder: 'Your Password*' },
    { name: 'password2', elementName: 'input', type: 'password', placeholder: 'Confirm your Password*' }
]

class Singup extends Component {
    render() {
        return (
            <div className="login-page">
                <div className="container">
                    <div className="login-form">
                        <div className="row">
                            <h1>Sign Up</h1>
                        </div>
                        <div>
                            <form className="row" onSubmit={e => {
                                e.preventDefault();
                                this.props.register(this.props.values.name, this.props.values.email, this.props.values.password);
                                this.props.handleSubmit(e);
                            }} noValidate="noValidate">
                                {Fields.map((field, index) => {
                                    return (
                                        <div className="col-md-6" key={index}>
                                            <Field
                                                {...field}
                                                key={index}
                                                value={this.props.values[field.name]}
                                                name={field.name}
                                                onChange={this.props.handleChange}
                                                onBlur={this.props.handleBlur}
                                                touched={(this.props.touched[field.name])}
                                                errors={this.props.errors[field.name]}
                                            />
                                        </div>
                                    )
                                })
                                }
                                <div className="col-md-12">
                                    <button
                                        className='btn btn-primary'
                                        type="submit"
                                    >Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (name, email, pass) => {
            dispatch(AuthActions.register(email, pass));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: () => ({
        email: '',
        name: '',
        password: '',
        password2: '',
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid.')
            .required('Please enter your email.'),
        name: Yup.string()
            .max(20, 'Your name can\'t be longer than 20 characters.')
            .required('Please enter your name.'),
        password: Yup.string()
            .min(8, 'Your password needs to be at least than 8 characters long.')
            .required('You need to enter your password.'),
        password2: Yup.string()
            .required('You need to enter your password again.')
            .test('pass-match', 'Your passwords don\'t match', function (value) {
                const { password } = this.parent;
                return password === value;
            }),
    }),
    handleSubmit: (values, { setSubmiting }) => {
        console.log("Login attempt", values);
        //login(values.email, values.password);
    }
})(Singup));