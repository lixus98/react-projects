const defaultState = {
    open: true
}

const handleSidebar = (state = defaultState, action) => {
    switch(action.type){
        case 'SIDEBAR':
            return {
                ...state,
                open: action.payload.open
            }
        default:
            return state
    }
    }

export default handleSidebar;
