import axios from "axios";

export const save_report = ({ token, data }) => {
    return axios.post('/report/save_report', data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const get_reports = (token) => {
    return axios.get("/report/get_reports_list", {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}