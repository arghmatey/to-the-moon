function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
        // Check if token is expired, and remove if it is
        // atob decodes the token
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            token = null;
        }
    }
    return token;
}

function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(window.atob(token.split('.')[1])).user : null;
}

function removeToken() {
    localStorage.removeItem('token');
}

export default {
    setToken,
    getToken,
    getUserFromToken,
    removeToken
};