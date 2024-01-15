import axios from 'axios';

const apiUrl = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.defaults.headers.common['Content-Type'] = "application/json";

export default axiosInstance;