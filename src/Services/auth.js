import axios from "axios";

const header = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}

export const login = payload => {
    return axios.post("/users/login", payload, header)
}

export const signup = payload => {
    return axios.post("/users/register", payload, header)
}

export const doctor_register = payload => {
    return axios.post("/doctor/is_doctor", payload, header)
}

export const update_basic = (token, payload) => {
    return axios.patch("/settings/update_basic", payload, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}