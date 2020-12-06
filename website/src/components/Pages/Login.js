import React, {Component} from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';


const Fields = [
    {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your Email*'},
    {name: 'password', elementName: 'input', type: 'password', placeholder: 'Your Password*'}
]

class Login extends Component{
    render(){
        return(
            <div className="login-page">
                <div className="container">
                    <div className="login-form">
                    <div className="row">
                        <h1>Login</h1>
                    </div>
                        <div className="row">
                            <form onSubmit={this.props.handleSubmit} novalidate="novalidate">
                                {Fields.map((field, index) => {
                                        return (
                                            <div className="col-md-12">
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
                                    >Login</button>
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
        login: (email, pass) => {
            console.log("Loggin in user", email);
        }
    }
}

export default connect(withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid.')
            .required('Please enter your email.'),
        password: Yup.string()
            .required('You need to enter your password.')
    }),
    handleSubmit: (values, {setSubmiting}) => {
        console.log("Login attempt", values);
    }
}))(Login);