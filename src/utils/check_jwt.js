import jwtDecode from "jwt-decode";

const getLocalUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { exp } = jwtDecode(user.token);
  const now = Date.now() / 1000;
  if (exp < now) {
    return null;
  }
  return user;
};

export default getLocalUser;
