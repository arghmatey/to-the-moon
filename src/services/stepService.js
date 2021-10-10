import tokenService from "./tokenService";

const baseUrl = "/steps";

function add(steps) {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + tokenService.getToken()
        },
        body: JSON.stringify(steps)
    }).then(res => res.json());
}

function getSteps() {
    return fetch(baseUrl).then(res => res.json());
}

const services =  {
    add,
    getSteps
};

export default services;