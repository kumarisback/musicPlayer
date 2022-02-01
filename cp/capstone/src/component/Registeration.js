import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import RegisterationHandler from "../DatabaseHandler/RegisterationHandler";
import { useLocation, useNavigate } from "react-router-dom";
import usePrompt from './promtp'


const Registeration = () => {
  const userName = useRef("");
  const passWord = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");
  const yourLocation = useRef("");
  const mobileNo = useRef("");
  let navigate = useNavigate();
  let loc =useLocation();
  const [intial, setIntial] = useState(false);

  
  const submitHandler = async (e) => {
    e.preventDefault();
    setIntial(false);
    try {
      let response = await RegisterationHandler(
        userName.current.value,
        passWord.current.value,
        firstName.current.value,
        lastName.current.value,
        yourLocation.current.value,
        mobileNo.current.value
      );
      console.log( await response);
      // console.log( responseSecond);
      if (response.status ===200) {
        alert("Register successfully Please Login to Continue");
        navigate("/login", { replace: true });
        return
      }
      else{
        alert("Email already used try with another mail ");
      }
        
      
    } catch (error) {
      // console.log("in catch");
      // console.log(error);
    }
  };
   
  const call=()=>{
    // console.log(e.target.value);
    console.log(intial);
    return intial
  }
  usePrompt(
    "Are you sure you want to leave?",
    call())

  console.log(intial);
  return (
    <>
    
    <Form className="form" data-testid="abc" onSubmit={submitHandler}   onChange={()=>{setIntial(true);}}>
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
   
    </>
  );
};

export default Registeration;
