import axios from "axios";

export default {
  // find user
  getUser: function (params) {
    return axios.get("/api/users", { params: params })
  },
  createUser: function (user) {
    return axios.post("/api/users", user)
  }
}