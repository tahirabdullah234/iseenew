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
