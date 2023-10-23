import axios from 'axios';

const API_URL = 'https://65369cbabb226bb85dd26a07.mockapi.io/api/';

export default {
  fetchData() {
    return axios
      .get(`${API_URL}users`)
      .then(response => {
        return response.data.map(user => {
          const createdAt = new Date(user.createdAt);
          const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };

          user.createdAt = createdAt.toLocaleString('en-US', options);

          return user;
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
  },

  createData(data) {
    return axios
      .post(`${API_URL}users`, data, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating data:', error);
        throw error;
      });
  },

  updateData(userId, data) {
    return axios
      .put(`${API_URL}users/${userId}`, data, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating data:', error);
        throw error;
      });
  },

  deleteData(userId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}users/${userId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.error('Error deleting data:', error);
          reject(error);
        });
    });
  },

};
