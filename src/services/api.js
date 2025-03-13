import axios from 'axios';

const API_URL = 'https://b-gray-phi.vercel.app';

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
      const response = await axios.post(`https://b-gray-phi.vercel.app/authenticate-sign`, {
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
