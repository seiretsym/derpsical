import axios from "axios";

export default {
  // find user
  getUser: function (params) {
    return axios.get("/api/users", { params: params });
  },
  createUser: function (user) {
    return axios.post("/api/users", user);
  },
  updatePassword: function (query, newpw) {
    return axios.put("/api/users", { query: query, pw: newpw });
  },

  // profile routes
  updateProfile: function (id, data) {
    return axios.put("/api/profiles/" + id, data);
  },
  getProfile: function (id) {
    return axios.get("/api/profiles/" + id)
  },

  // song routes
  createSong: function (data) {
    return axios.post("/api/songs", data);
  },
  updateSong: function (id, data) {
    return axios.put("/api/songs/" + id, data);
  },
  deleteSong: function (id) {
    return axios.delete("/api/songs/" + id);
  },

  // song search routes
  findRecent: function () {
    return axios.get("/api/songs/recent");
  },
  findOne: function (id) {
    return axios.get("/api/songs/" + id);
  },
  findAll: function () {
    return axios.get("/api/songs");
  },

  // message routes
  sendMessage: function (message) {
    return axios.post("/api/messages", message);
  },
  deleteMessage: function (id) {
    return axios.delete("/api/messages/" + id);
  },

  // configs routes
  updateConfig: function (id, config) {
    return axios.put("/api/configs/" + id, config);
  }
}