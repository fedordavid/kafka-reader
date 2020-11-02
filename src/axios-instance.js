import * as axios from 'axios';

    var axiosInstance = axios.create({
        baseURL: 'http://localhost:3030/api',
        timeout: 1000
      });

export default axiosInstance;