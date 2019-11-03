import axios from "axios";

export default {
  // find user
  getUser: function (params) {
    return axios.get("/api/users", { params: params })
  },
  createUser: function (user) {
    return axios.post("/api/users", user)
  },
  updateProfile: function (id, data) {
    return axios.put("/api/profiles/" + id, data)
  },
  updatePassword: function (query, newpw) {
    return axios.put("/api/users", { query: query, pw: newpw })
  },
  createSong: function (data) {
    return axios.post("/api/songs", data)
  },
  updateSong: function (id, data) {
    return axios.put("/api/songs/" + id, data)
  },
  deleteSong: function (id, data) {
    return axios.delete("/api/songs/" + id, data)
  }
}