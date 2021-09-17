const APIURL = "http://localhost:3000";
const axios = require("axios");
export const requestsMixin = {
  methods: {
    getMovies() {
      return axios.get(`${APIURL}/movies`);
    },
    addMovie(data) {
      return axios.post(`${APIURL}/movies`, data);
    },
    editMovie(data) {
      return axios.put(`${APIURL}/movies/${data.id}`, data);
    },
    deleteMovie(id) {
      return axios.delete(`${APIURL}/movies/${id}`);
    }
  }
};