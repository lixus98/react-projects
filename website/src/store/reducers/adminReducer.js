const defaultState = {
    users:[],
    posts:[],
    post: {}
}

const admin = (state = defaultState, action) => {
    switch(action.type){
        case 'GOT_USERS':
            return {
                ...state,
                users: action.payload
            }
        
        case 'GOT_POSTS':
            return {
                ...state,
                posts: action.payload
            }
        case 'IMAGE_UPLOADED':
            return {
                ...state,
                post: {
                    ...state.post,
                    PostImage: [action.payload]
                }
            }
        case 'POST_ADDED':
            return {
                ...state,
                posts: state.posts.concat(action.payload),
                post: action.payload
            }
        case 'POST_UPDATED': 
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.payload
                },
                posts: state.posts.map(p => {
                    if(p.id === action.payload.id){
                        // This is the existing post in redux that has been updated
                        //and currently in action.payload
                        return {
                            ...p,
                            ...action.payload
                        }
                    }else{
                        return p
                    }
                })
            }
        case 'GOT_POST_BY_ID':
            return {
                ...state,
                post: action.payload
            }
        default:
            return state
    }

}

export default admin;