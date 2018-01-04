import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

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

export function signupUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(res => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', res.data.token);
                browserHistory.push('/feature');
            })
            .catch(res => dispatch(authError(res.data.error)));
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

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(res => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: res.data.message
            })
        });
    }
}
