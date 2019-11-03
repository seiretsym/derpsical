import axios from "axios";

export default {
  // find user
  getUser: function (username) {
    return axios.get("/user/" + username)
  }
}