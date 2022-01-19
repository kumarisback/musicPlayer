import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginHandler from "../DatabaseHandler/LoginHandler";

const Login = (props) => {
  const [flag, setFlag] = useState(-1);
  let navigate = useNavigate();

  const userName = useRef("");
  const passWord = useRef("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(-1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [flag]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if ((passWord.current.value && userName.current.value) != null) {
        let res = await LoginHandler(
          userName.current.value,
          passWord.current.value
        );
        console.log(res);
        if (res.data.registered) {
          console.log(res.data);
          alert("Login Successfully");
          navigate("/", { replace: true });
          props.authHandle({ auth: true, email: res.data.email });
        } else {
          setFlag(0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {flag == 1 && (
        <Alert key={1} variant="success">
          This is a alert—check it out!
        </Alert>
      )} */}
      {flag === 0 && (
        <Alert key={2} variant="warning">
          Your Credentials are not valid. Please try again
        </Alert>
      )}
      <Form className="form" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={userName} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={passWord} type="password" placeholder="Password" />
        </Form.Group>
        <Button className="btn1" variant="primary" type="submit">
          Login
        </Button>
        <Button variant="primary" as={Link} to="/register">
          Sign Up
        </Button>
      </Form>
    </>
  );
};

export default Login;
