import React, {Component} from 'react';
import './assets/css/admin.css';

import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Sidebar from './Common/Sidebar';

//Drawer imports
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;

const styles = theme => ({
    toolbar: {
        paddingRight: 24
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'noWrap',
        width: drawerWidth,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    hide: {
        display: 'none',
    },
    menuIcon: {
        marginRight: theme.spacing(2),
    }
})

class AdminWrapper extends Component{

    constructor(props){
        super(props);

        this.state = {
            open: true
        }
    }

    handleDrawerClose = (e) => {
        this.setState({open: false});
    }

    handleDrawerOpen = (e) => {
        this.setState({open: true});
    }

    render(){
        const {classes} = this.props;

        return(
        <div id="admin-page" className="admin-page">
 
            <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classNames(classes.menuIcon, this.state.open && classes.hide)} color="inherit" onClick={this.handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color='inherit'
                        noWrap
                    >Admin Dashboard</Typography>
                </Toolbar>
            </AppBar>

            <Drawer
            classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
            }}
            variant='permanent'
            open={true}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Sidebar />
            </Drawer>
            {this.props.children}
        </div>
        );
    }
}

export default withStyles(styles)(AdminWrapper);