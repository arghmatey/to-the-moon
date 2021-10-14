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
    const token = tokenService.getToken();
    return token ? JSON.parse(window.atob(token.split('.')[1])).user : null;
}

function logout() {
    localStorage.removeItem('token');
}

function login(creds) {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(creds)
    })
    .then(res => {
        // Valid login if we have a status of 2xx (res.ok)
        if (res.ok) return res.json();
        throw new Error('Bad Credentials.');
    })
    .then(({token}) => tokenService.setToken(token));
}

const services =  {
    signup,
    getUser,
    logout,
    login
};

export default services; 