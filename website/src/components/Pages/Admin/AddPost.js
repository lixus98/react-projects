import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as adminActions from '../../../store/actions/adminActions';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import SaveIcon from '@material-ui/icons/Save';
import { withFormik, Formik, Form } from 'formik';
import { FormikTextField, FormikSelectField } from 'formik-material-fields';
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

    constructor(props){
        super(props);

        this.state = {
            dialogOpen: false
        }
    };


    componentDidUpdate(props, state){
        if(this.props.match.params.view === 'add' && this.props.admin.posts.filter(p => p.title === this.props.values.title).length > 0){
            const post = this.props.admin.posts.filter(p => p.title === this.props.values.title)[0];
            this.props.history.push('/admin/posts/edit/' + post.id);
        }

        if(this.props.admin.post.id !== props.admin.post.id){
            //When redux state changes post in admin reducer
            this.props.setValues(this.props.admin.post);
        }
    }

    componentDidMount(props, state){
        if(this.props.match.params.view === 'edit' && this.props.match.params.id){
            this.props.getPostById(this.props.match.params.id, this.props.auth.token);
        }
    }
    
    handleClickOpen = () => {
        this.setState({dialogOpen: true});
    };
    
    handleClose = () => {
        this.setState({dialogOpen: false});
    };
    

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
                            this.handleClickOpen();
                        }}
                        ><SaveIcon /> Save</Button>
                    </Paper>
                </Form>
                {this.props.match.params.view === 'edit' ?
                    <Dialog
                        open={this.state.dialogOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Post updated succesfully"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                The post has been updated succesfully.
                                    </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                OK
                                    </Button>
                        </DialogActions>
                    </Dialog>
                :
                    <Dialog
                        open={this.state.dialogOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Post saved succesfully"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                The post has been saved succesfully.
                    </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                OK
                    </Button>
                        </DialogActions>
                    </Dialog>
                }
                
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
        },
        updatePostById: (post, token) => {
            dispatch(adminActions.updatePostById(post, token));
        },
        getPostById: (id, token) => {
            dispatch(adminActions.getPostById(id, token));
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)((withFormik)({
    mapPropsToValues: (props) => ({
        title: props.admin.post.title || '',
        slug: props.admin.post.slug || '',
        createdAt: props.admin.post.createdAt || new Date(),
        status: props.admin.post.status || false,
        content: props.admin.post.content || ''
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
        if(props.match.params.view === 'edit'){
            const post = {
                ...values,
                id: props.match.params.id
            }
            props.updatePostById(post, props.auth.token);
        }else{
            props.addPost(values, props.auth.token);
        }
    }
})(withStyles(styles)(AddPost))));
