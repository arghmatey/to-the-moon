import tokenService from './tokenService';

const baseUrl = '/users';

function signup(user) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Email already taken!');
    })
    .then(({ token }) => { tokenService.setToken(token) });
}

function getUser() {
    return tokenService.getUserFromToken();
}

function logout() {
    tokenService.removeToken();
}

export default {
    signup,
    getUser,
    logout
}