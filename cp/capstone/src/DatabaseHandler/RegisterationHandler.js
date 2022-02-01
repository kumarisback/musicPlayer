import axios from "axios";
import { userUrl,regUrl } from "../Data/AllUrl";

const url = regUrl;
const urlForData = userUrl;
const RegisterationHandler = async (
  email,
  passWord,
  firstName,
  lastName,
  location,
  mobileNo
) => {
  if ((email && passWord) != null) {
    try {
      console.log("hi");
      const response = await axios.post(
        url,
        {
          email: email,
          password: passWord,
          returnSecureToken: true,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log( response.data);

      const responseSecond = await axios.post(
        urlForData,
        {
          email: email,
          password: passWord,
          firstname: firstName,
          lastname: lastName,
          location: location,
          mobileno: mobileNo,
        },
        { headers: { "content-type": "application/json" } }
      );
      console.log(await responseSecond.data);
      return  response ;
    } catch (error) {
      console.log("ji");
      return error.response;
    }
  }
};

export default RegisterationHandler;
