import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import RegisterationHandler from "../DatabaseHandler/RegisterationHandler";
import { useNavigate } from "react-router-dom";

const Registeration = () => {
  const userName = useRef("");
  const passWord = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");
  const yourLocation = useRef("");
  const mobileNo = useRef("");
  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let { response, responseSecond } = await RegisterationHandler(
        userName.current.value,
        passWord.current.value,
        firstName.current.value,
        lastName.current.value,
        yourLocation.current.value,
        mobileNo.current.value
      );
      // console.log(response);
      // console.log(responseSecond);
      if (response.statusText === "OK") {
        alert("Register successfully Please Login to Continue");
        navigate("/login", { replace: true });
      } else {
        alert("Email already used try with another mail ");
      }
    } catch (error) {
      // console.log("in catch");
      // console.log(error);
    }
  };

  return (
    <Form className="form" onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          ref={userName}
          type="email"
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          ref={passWord}
          type="password"
          placeholder="Password"
          min={6}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          ref={firstName}
          type="text"
          placeholder="Enter Your First Name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          ref={lastName}
          type="text"
          placeholder="Enter Your Last Name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          ref={yourLocation}
          type="text"
          placeholder="Enter Your Location"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Mobile No.</Form.Label>
        <Form.Control
          ref={mobileNo}
          type="number"
          placeholder="Enter Your Mobile No."
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Registeration;
