import axios from "axios";

export const upload_file = (token, payload) => {
    return axios.post('/users/upload', payload, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const get_prediction = (token, payload) => {
    return axios.post('http://127.0.0.1:5001/classify', payload, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const new_dataset = (token, payload) => {
    return axios.post('/users/add_new_data', payload, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const get_symp_pred = (token, payload) => {
    var symptoms = ''
    for (var i = 0; i < payload.length - 1; i++)
        symptoms += payload[i] + ','
    symptoms += payload[payload.length - 1]
    return axios.post('http://127.0.0.1:5001/symptom', { symptoms: symptoms }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${token}`
        }
    })
}