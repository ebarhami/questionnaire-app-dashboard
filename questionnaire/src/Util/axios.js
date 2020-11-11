import AxiosInstances from 'axios';

const ENDPOINT_URL = "https://morning-everglades-75113.herokuapp.com/"

const axios = AxiosInstances.create({
    baseURL: ENDPOINT_URL,
});

export default axios;
