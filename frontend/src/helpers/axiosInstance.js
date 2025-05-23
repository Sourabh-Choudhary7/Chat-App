import axios from "axios"

const BASE_URL = "http://localhost:5000/api/v2"

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
