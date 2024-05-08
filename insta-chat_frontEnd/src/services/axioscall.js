import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

export default instance;


// https://instachat.adidasshoe.shop
// http://localhost:8000