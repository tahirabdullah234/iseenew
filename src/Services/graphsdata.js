import axios from "axios";

export const getglocusedata = (token) => {
    return axios.get('/chart/bg_graph', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getbpdata = (token) => {
    return axios.get('/chart/bp_graph', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}

