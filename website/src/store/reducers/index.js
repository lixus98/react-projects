import {combineReducers} from 'redux';
import auth from './authReducer';
import handleSidebar from './sidebarReducer';


export default combineReducers({
    auth,
    handleSidebar
})
