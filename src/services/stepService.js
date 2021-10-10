import tokenService from "./tokenService";

const baseUrl = "/steps";

export function add(steps) {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + tokenService.getToken()
        },
        body: JSON.stringify(steps)
    }).then(res => res.json());
}

export default {
    add
}