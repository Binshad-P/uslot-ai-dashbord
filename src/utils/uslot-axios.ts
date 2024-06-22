import axios from 'axios';
import { uslotBaseURL } from 'src/config-global';


const axiosInstanceUslot = axios.create({ baseURL: uslotBaseURL });

// Request Interceptor to add the authorization token to requests
axiosInstanceUslot.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


export default axiosInstanceUslot;