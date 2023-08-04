import axios from 'axios'


const axiosClient = axios.create({
    baseURL: 'https://credencialweb.glitch.me/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
       
    }
})

export default {
    getApiClient() {
        return axiosClient;
    }
}