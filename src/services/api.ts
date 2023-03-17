import axios from 'axios';

const api = axios.create({
  baseURL: 'https://SEU_ENPOINT'
})

export default api;
