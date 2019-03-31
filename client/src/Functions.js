import { getCurrentUser } from 'util/APIUtils';

  const checkAuth = () => {
    var result = false;
    return getCurrentUser()
    .then(function (response) {
      result = {
        username: response.username,
        name: response.name
      };
    })
    .catch(function (error) {
        console.log("Not authenticated");
    }).then(function() {
        return result;
    });
  }
export default checkAuth