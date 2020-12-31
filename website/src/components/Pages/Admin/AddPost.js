import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as adminActions from '../../../store/actions/adminActions';
import Paper from '@material-ui/core/Paper';
import { withFormik, Formik, Form } from 'formik';
import { FormikTextField, FormikSelectField } from 'formik-material-fields';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../assets/css/admin.css';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';


const styles = theme => ({
    FormControl: {
        margin: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row wrap',
        width: '100%'
    },
    leftSide: {
        flex: 4,
        height: '100%',
        margin: theme.spacing(1),
        padding: theme.spacing(3)
    },
    rightSide: {
        flex: 1,
        height: '100%',
        margin: theme.spacing(1),
        padding: theme.spacing(3)
    }
});

class AddPost extends Component {

    componentDidUpdate(props, state){
        if(this.props.match.params.view === 'add' && this.props.admin.posts.filter(p => p.title === this.props.values.title).length > 0){
            const post = this.props.admin.posts.filter(p => p.title === this.props.values.title)[0];
            this.props.history.push('/admin/posts/edit/' + post.id);
        }
    }

    render(){
        const {classes} = this.props;

        return(
            <div>    
                <Form className={classes.FormControl}>
                    <Paper className={classes.leftSide}> 
                        <FormikTextField 
                            name="title"
                            label="Title"
                            margin="normal"
                            onChange={e => this.props.setFieldValue('slug', e.target.value.toLowerCase().replace(/ +/g, '_'))}
                            fullWidth
                            />
                            <FormikTextField 
                            name="slug"
                            label="Slug"
                            margin="normal"
                            />
                            <FormikTextField 
                            name="content"
                            label="Content"
                            margin="normal"
                            fullWidth
                            />
                    </Paper>
                    <Paper className= {classes.rightSide + ' no-outline'} >
                        <FormikSelectField
                            name="status"
                            label="satus"
                            margin="normal"
                            options={[
                                {label: 'Unpublished', value: false},
                                {label: 'Published', value: true}
                            ]}
                            fullWidth
                        />
                        <Button 
                        variant='contained' 
                        color="secondary"
                        onClick={e => {
                            this.props.handleSubmit();
                        }}
                        ><SaveIcon /> Save</Button>
                    </Paper>
                </Form>
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
        addPost: (post, token) => {
            dispatch(adminActions.addPost(post, token));
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)((withFormik)({
    mapPropsToValues: () => ({
        title: '',
        slug: '',
        createdAt: '',
        status: false,
        content: ''
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(5, 'Your title must be at least 5 characters.'),
        slug: Yup.string().required(),
        content: Yup.string().required()
    }),
    handleSubmit: (values, {setSubmitting, props}) => {
        console.log("Saving", props.addPost);
        props.addPost(values, props.auth.token);
    }
})(withStyles(styles)(AddPost))));
