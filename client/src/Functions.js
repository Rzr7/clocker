import axios from "axios";
const checkAuth = () => {
    var session = localStorage.getItem('session');
    var result = false;
    return axios.post('/users/isAuthenticated', {
      authToken: session,
    })
    .then(function (response) {
      if (response.data[0].status === "success") {
        result = true;
      }
    })
    .catch(function (error) {
        console.log("Not authenticated");
    }).then(function() {
        return result;
    });
  }
export default checkAuth