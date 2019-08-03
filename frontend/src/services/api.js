import axios from 'axios';

import { local_ip } from "../consts";


const api = axios.create({
    baseURL: `${local_ip}:3333`
});

export default api;