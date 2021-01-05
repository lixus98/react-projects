import API from '../../utils/api';

export const getUsers = (token) => {
    return dispatch => {
        API.getUsers(token, res => {
            dispatch({
                type: 'GOT_USERS',
                payload: res.data
            });
        });
    }
}

export const getPosts = (token) => {
    return dispatch => {
        API.getPosts(token, res => {
            dispatch({
                type: 'GOT_POSTS',
                payload: res.data
            });
        });
    }
}

export const uploadImage = (data, token, postId, userId) => {
    return dispatch => {
        API.uploadImage(data, token, postId, userId, res => {
            dispatch({
                type: 'IMAGE_UPLOADED',
                payload: res.data
            })
        });
    }
}

export const addPost = (post, token) => {
    return dispatch => {
        API.addPost(post, token, res => {
            dispatch({
                type: 'POST_ADDED',
                payload: res.data
            });
        });
    }
}

export const updatePostById = (post, token) => {
    return dispatch => {
        API.updatePostById(post, token, res => {
            dispatch({
                type: 'POST_UPDATED',
                payload: res.data
            });
        });
    }
}

export const getPostById = (id, token) => {
    return dispatch => {
        API.getPostById(id, token, res => {
            dispatch({
                type: 'GOT_POST_BY_ID',
                payload: res.data
            });
        });
    }
}

