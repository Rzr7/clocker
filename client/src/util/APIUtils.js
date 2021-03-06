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

export function getTimers(page) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/timers/" + page,
        method: 'GET'
    });
}

export function getTotalPages() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/timers/pages",
        method: 'GET'
    });
}

export function getCategories() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/category/all",
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

export function setTimerCategory(id, timerRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/timer/setCategory/" + id,
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

export function reportCurYear() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/date/curYear",
        method: 'GET'
    });
}

export function reportPrevYear() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/date/prevYear",
        method: 'GET'
    });
}

export function reportCurMonth() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/date/curMonth",
        method: 'GET'
    });
}

export function reportPrevMonth() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/date/prevMonth",
        method: 'GET'
    });
}

export function reportCurWeek() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/date/curWeek",
        method: 'GET'
    });
}

export function reportPrevWeek() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/date/prevWeek",
        method: 'GET'
    });
}

export function reportCurYearCategory() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/category/curYear",
        method: 'GET'
    });
}

export function reportPrevYearCategory() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/category/prevYear",
        method: 'GET'
    });
}

export function reportCurMonthCategory() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/category/curMonth",
        method: 'GET'
    });
}

export function reportPrevMonthCategory() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/category/prevMonth",
        method: 'GET'
    });
}

export function reportCurWeekCategory() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/category/curWeek",
        method: 'GET'
    });
}

export function reportPrevWeekCategory() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/report/category/prevWeek",
        method: 'GET'
    });
}
