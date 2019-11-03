import axios from "axios";

export default {
  // find user
  getUser: function (username) {
    return axios.get("/api/users/" + username)
  },
  createUser: function (user) {
    return axios.post("/api/users", user)
  }
}