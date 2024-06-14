// authService.js
import axios from 'axios';

let token = null;

export function setAuthToken(newToken) {
    token = newToken;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearAuthToken() {
    token = null;
    delete axios.defaults.headers.common['Authorization'];
}

export function isAuthenticated() {
    token=localStorage.getItem('token')
    console.log("token is authenticated:", token, token !== null)
    return token !== null;
}