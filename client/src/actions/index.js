import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password}) {
    return function (dispatch) {
        //submit email/password to  the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(res => {
                //if request is good...
                // -Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // -save the jwt token
                localStorage.setItem('token', res.data.token);
                // -redirect the route '/feature'
                browserHistory.push('/feature');
            })
            .catch(() => {
                //if request is bad...
                // -show the error to user
                dispatch(authError('Bad login info'));
            })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return{
        type: UNAUTH_USER
    }
}
