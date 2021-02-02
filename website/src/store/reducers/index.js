import {combineReducers} from 'redux';
import auth from './authReducer';
import handleSidebar from './sidebarReducer';
import admin from './adminReducer';
import site from './siteReducer';

export default combineReducers({
    auth,
    handleSidebar,
    admin,
    site
})
