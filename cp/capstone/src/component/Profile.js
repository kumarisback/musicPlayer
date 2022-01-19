import React, { useContext, useEffect, useState } from "react";
import { isAuth } from "../Data/auth";
import getProfile from "../DatabaseHandler/profile";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState();

  let Details = useContext(isAuth);
  let nav = useNavigate();

  let data;

  useEffect(async () => {
    data = await getProfile(Details.email);
    // console.log(Details);
    if (!Details.isAuth) {
      nav("/404");
      return;
    }
    // console.log(data);
    setDetails(data);
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner
          className="loading"
          style={{
            display: "flex",
            paddingLeft: "500px ",
            paddingRight: "500px",
            justifyContent: "center",
          }}
          animation="grow"
        />
      ) : (
        <div>
          <h2  className='profile-head' >User Profile </h2>

          <div className="profile-card">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="140"
              height="200px"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
            <h1 >{details.firstname + " " + details.lastname}</h1>
            <hr style={{border:"10px"}}/>
            <div style={{ margin: 24 }}>
              <p>Email :{details.email}</p>
              <p>Location :{details.location}</p>
              <p>Mobile No: {details.mobileno}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
