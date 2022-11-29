import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:5000/api/';

class UserService {
  getRanks() {
    return axios.get(API_URL +'ranks');
  }

  getRank(id) {
    return axios.get(API_URL +'ranks/'+ id);
  }

  executeModel(model, data) {
    return axios.post(API_URL + 'classificator/'+ model +'?data='+ data, { hello: 'world' }, { headers: authHeader() });
  }
}

export default new UserService();
