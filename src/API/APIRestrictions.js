import axios from 'axios';

//const API_URL = 'https://canteras.ces.siani.es/restrictions'
const API_URL = 'http://localhost:8082/restrictions'

const headers = {
    'Content-Type': 'application/json'
}

export class APIRestrictions {

    async applyRestriction(restriction) {
        const url = `${API_URL}/update`;
        var data = {
            restrictions: restriction
        }
        return await axios.put(url, data, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async getActiveRestrictions() {
        const url = `${API_URL}/actives`;
        return await axios.get(url, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async getRestrictionsData() {
        const url = `${API_URL}/data`;
        return await axios.get(url, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async modifyCCFDensity(value) {
        const url = `${API_URL}/update/CCF?CCFValue=`+value;
        return await axios.put(url, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }
}