import axios from 'axios';

const host = 'http://localhost:8080';


const API = {
    makeFileUrl: (url, token) => {
        return host + url + "?access_token=" + token;
    },
    login: (email, pass, success) => {
        axios.post(`${host}/api/users/login`, {email: email, password: pass})
        .then(res => {
            success(res);
        })
        .catch(err => {
            console.log('Error: ', err);
        });
    },

    getUsers: (token, success) => {
        axios.get(`${host}/api/users?access_token=${token}`)
        .then(res => {
            success(res);
        })
        .catch(err => {
            console.log('Error: ', err);
        });
    },

    getPosts: (token, success) => {
        axios.get(`${host}/api/posts?access_token=${token}`)
        .then(res => {
            success(res);
        })
        .catch(err => {
            console.log('Error: ', err);
        });
    },

    uploadImage: (data, token, postId, userId, success) => {
        axios.post(`${host}/api/PostImages/upload?post_id=${postId}&access_token=${token}&user_id=${userId}`, data)
        .then(res => {
            success(res);
        }).catch(err => {
            console.log('Error: ', err);
        });
    },

    addPost: (post, token, success) => {
        axios.post(`${host}/api/posts?access_token=${token}`, post)
        .then(res => {
            success(res);
        })
        .catch(err => {
            console.log('Error: ', err);
        });
    },
    updatePostById: (post, token, success) => {
        axios.patch(`${host}/api/posts/${post.id}?access_token=${token}`, post)
        .then(res => {
            success(res);
        })
        .catch(err => {
            console.log('Error', err);
        });
    },
    getPostById: (id, token, success) => {
        axios.get(`${host}/api/posts/${id}?access_token=${token}`, {
            params: {
                filter: {
                    include: "PostImage"
                }
            }
        })
        .then(res => {
            success(res);
        })
        .catch(err => {
            console.log('Error', err);
        });
    }

}


export default API;