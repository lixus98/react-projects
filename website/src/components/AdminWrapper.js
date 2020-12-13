import React, {Component} from 'react';
import './assets/css/admin.css';
import {connect} from 'react-redux';
import * as handleSidebar from '../store/actions/sidebarAction';

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
    root:{
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24
    },
    appBarSpacer: theme.mixins.toolbar,
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
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: "100vh",
        overflow: "auto"
    },
})

class AdminWrapper extends Component{



    render(){
        const {classes} = this.props;

        return(
        <div id="admin-page" className={classes.root}>
            <div className="no-outline">
                <AppBar className={classNames(classes.appBar, this.props.handleSidebar.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton className={classNames(classes.menuIcon, this.props.handleSidebar.open && classes.hide)} 
                            color="inherit" 
                            onClick={this.props.handleDrawerOpen}>
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
            </div>
                <Drawer
                classes={{
                    paper: classNames(classes.drawerPaper, !this.props.handleSidebar.open && classes.drawerPaperClose)
                }}
                variant='permanent'
                open={true}
                >
                    <div className="no-outline">
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.props.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                    </div>
                    <Divider />
                    <Sidebar />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {this.props.children}
                </main>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        handleSidebar: state.handleSidebar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDrawerClose: (e) => {
            dispatch(handleSidebar.handleDrawerClose(e));
        },
        handleDrawerOpen: (e) => {
            dispatch(handleSidebar.handleDrawerOpen(e));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AdminWrapper));