import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register User
export const registerUser = (userData, navigate) => (dispatch) => {
    axios
        .post('/api/users/register', userData)
        .then((result) => navigate('/login'))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Login User
export const loginUser = (userData) => (dispatch) => {
    axios
        .post('/api/users/login', userData)
        .then((res) => {
            //Save to local storage
            const { token } = res.data;
            //Set token to ls
            localStorage.setItem('jwtToken', token);
            //set token to Auth header
            setAuthToken(token);
            //Decode token to get user data
            const decoded = jwt_decode(token);
            //Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

//Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

//Logout User
export const logoutUser = () => (dispatch) => {
    //Remove token from storage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
};
