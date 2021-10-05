import base from './base';
import axios from '@/utils/axios';

const types = {
  getTypes() {
    return axios.get(`${base.types}/articleTypes`);
  }
}

export default types;