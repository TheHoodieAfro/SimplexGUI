import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/auth';

class AuthService {
  login(user) {
    return axios
      .post(API_URL, {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    
    return axios.post(API_URL + '/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
  }
}

export default new AuthService();
