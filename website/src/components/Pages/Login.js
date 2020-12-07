import React, {Component} from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions';


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
                            <form onSubmit={e => {
                                e.preventDefault();
                                this.props.login(this.props.values.email, this.props.values.password);
                                this.props.handleSubmit(e);
                            }} noValidate="noValidate">
                                {Fields.map((field, index) => {
                                        return (
                                            <div className="col-md-12" key={index}>
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
            dispatch(AuthActions.login(email, pass));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
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
        //login(values.email, values.password);
    }
})(Login));