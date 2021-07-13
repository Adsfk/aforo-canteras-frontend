import axios from 'axios';

//const API_URL = 'https://canteras.ces.siani.es/tides'
const API_URL = 'http://localhost:8082/tides'

const headers = {
    'Content-Type': 'application/json'
}

export class APITides {

    async getData(date, hour, dataType) {
        const url = `${API_URL}/` + dataType + `?date=`+ date +'&hour='+ hour;
        return await axios.get(url, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }
}


