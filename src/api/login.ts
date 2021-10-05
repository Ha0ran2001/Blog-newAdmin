import base from './base';
import axios from '../utils/axios';

const login = {
  login(body: any) {
    return axios.post(`${base.login}/login`, body);
  }
}

export default login;