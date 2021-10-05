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
    return
}