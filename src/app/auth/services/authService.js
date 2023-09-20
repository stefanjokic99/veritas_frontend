import { get, post, postAsync } from "src/app/services/ApiService";

const SIGN_IN = `/api/Account/login`;
const SIGN_UP = `/api/Account/register`;
const GET_CURRENT_USER = `/api/Account`;

function login(email, password) {
  const body = {
    email,
    password,
  };

  return post(SIGN_IN, body);
}

async function register({ forename, surename, email, password, username }) {
  const body = {
    firstname: forename,
    lastname: surename,
    email: email,
    password: password,
    username: username,
  };

  return postAsync(SIGN_UP, body);
}

function currentUser() {
  return get(GET_CURRENT_USER);
}

const AuthService = {
  login,
  register,
  currentUser
};

export default AuthService;
