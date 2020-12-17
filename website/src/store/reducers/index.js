import {combineReducers} from 'redux';
import auth from './authReducer';
import handleSidebar from './sidebarReducer';
import admin from './adminReducer';


export default combineReducers({
    auth,
    handleSidebar,
    admin
})
