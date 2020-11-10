import AxiosInstances from 'axios';

const ENDPOINT_URL = "http://localhost:3000"

const axios = AxiosInstances.create({
    baseURL: ENDPOINT_URL,
});

export default axios;
