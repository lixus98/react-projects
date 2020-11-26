import React, {Component} from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import * as Yup from 'yup';


const fields = {
    sections: [
        [
            {name: 'name', elementName: 'input', type: 'text', placeholder: 'Your Name*' },
            {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your Email*' },
            {name: 'phone', elementName: 'input', type: 'text', placeholder: 'Your Phone*' },
            
        ],
        [
            {name: 'message', elementName: 'textarea', type: 'text', placeholder: 'Type your Message*' }
        ]
    ]
}





class Contact extends Component{


    render(){
        return (
            <section id="contact">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase">Contact Us</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    <form onSubmit={this.props.handleSubmit} name="sentMessage" novalidate="novalidate" >
                        <div className="row">

                        {fields.sections.map((section, sectionIndex) => {
                            return (
                                <div className="col-md-6" key={sectionIndex}>
                                    {section.map((field, i) => {
                                        return <Field 
                                                    {...field} 
                                                    key={i}
                                                    value={this.props.values[field.name]}
                                                    name={field.name}
                                                    onChange={this.props.handleChange}
                                                    onBlur={this.props.handleBlur}
                                                    touched={this.props.touched[field.name]}
                                                    errors={this.props.errors[field.name]}
                                                />
                                    })}
                                </div>
                            )


                        })}
                        <div className="clearfix"></div>
                        <div className="col-lg-12 text-center">
                            <div id="success"></div>
                            <button 
                                id="sendMessageButton" 
                                className="btn btn-primary btn-xl text-uppercase" 
                                type="submit"
                            >Send Message</button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </section>
        )
    }

}

export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        phone: '',
        message: ''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(3, 'Your name must be at least 3 characters.')
            .required('You must give us your name.'),
        email: Yup.string()
            .email('Please enter a valid email.')
            .required('You must give us your email.'),
        phone: Yup.string()
            .min(10, 'Please enter a valid 10 digit phone number.')
            .max(15, 'Your phone number is too long.')
            .required('We need a phone number to reach you at.'),
        message: Yup.string()
            .min(20, 'Your message is too short.')
            .max(160, 'You have exceded the maximum length.')
            .required('Please enter your message.')

    }),
    handleSubmit: (values, {setSubmiting}) => {
        alert("This is the form you've submited \nname:" + values.name +
        "\nemail:" + values.email +
        "\nphone:" + values.phone +
        "\nmessage:" + values.message
        );
    }
})(Contact);