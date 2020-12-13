export const handleDrawerClose = (e) => {
    return (dispatch) => {
        dispatch ({
            type: 'SIDEBAR',
            payload: {
                open: false
            }
        });
    }
}

export const handleDrawerOpen = (e) => {
    return (dispatch) => {
        dispatch ({
            type: 'SIDEBAR',
            payload: {
                open: true
            }
        });
    }
}