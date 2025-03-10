import axios from 'axios';

const API_URL = 'http://localhost:3200';

export const apiService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/authenticate-login`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup: async (username, email, password) => {
    try {
      const response = await axios.post(`https://lynx-fun-normally.ngrok-free.app/authenticate-sign`, {
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
