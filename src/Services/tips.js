import axios from "axios";
// api calls are written in seperate folders and files 
export const get_tips = () => {
    return axios.get("/tip/get_tips", {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })
}

export const add_tip_category = (category) => {
    return axios.post("/tip/add_tip_category", { category }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })
}

export const add_tip_detail = (token, payload) => {
    return axios.post("/tip/add_tip_detail", payload, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}
