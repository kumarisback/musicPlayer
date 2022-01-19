import { loginUrl } from "../Data/AllUrl";
import axios from "axios";

const url = loginUrl;
const LoginHandler = async (email, passWord) => {
  // console.log(process.env.REACT_APP_LOGIN);
  try {
    let response = await axios.post(
      url,
      { email: email, password: passWord, returnSecureToken: true },
      { headers: { "Content-Type": "application/json" } }
    );
    // console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};

export default LoginHandler;
