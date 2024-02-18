import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Logic to refresh the token and update it
      return axios.post('/refresh', { token: localStorage.getItem('token') })
        .then(res => {
          if (res.status === 201) {
            console.log('Token refreshed successfully');
            localStorage.setItem('token', res.data.token); // Save the refreshed token to local storage
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); // Update the Authorization header
            return axios(originalRequest); // Retry the original request
          }
        });
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;