import { API_BASE_URL, API_WITHOUT_API_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers();
    if (!options.doNotAddContentType) {
        var contentType = 'application/json'; 
        if (options.contentType) {
            contentType = options.contentType;
        }
        headers.append('Content-Type', contentType);
    }
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function modifyProfile(profileRequest) {
    return request({
        url: API_BASE_URL + "/user/modifyProfile",
        method: 'POST',
        body: JSON.stringify(profileRequest)
    });
}

export function uploadFile(fileRequest) {
    return request({
        url: API_WITHOUT_API_URL + "/uploadFile",
        method: 'POST',
        body: fileRequest,
        doNotAddContentType: true
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getTimers() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/timers",
        method: 'GET'
    });
}

export function setTimerTitle(id, timerRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/setTitle/" + id,
        method: 'POST',
        body: JSON.stringify(timerRequest),
    });
}

export function stopTimer(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/stop/" + id,
        method: 'POST'
    });
}

export function resumeTimer(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/resume/" + id,
        method: 'POST'
    });
}

export function deleteTimer(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/delete/" + id,
        method: 'DELETE'
    });
}

export function createTimer() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/add",
        method: 'POST'
    });
}


export function updateTimerTime(timerRequest, id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/update/time/" + id,
        method: 'POST',
        body: JSON.stringify(timerRequest),
    });
}

export function fetchTimer(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/timer/" + id,
        method: 'GET'
    });
}

export function stopAllTimers() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/stopAll",
        method: 'POST'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}
