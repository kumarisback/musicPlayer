import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import image from "../Data/operation.jpeg";
import { isAuth } from "../Data/auth";

const Song = (props) => {
  let nav = useNavigate();
  const context = useContext(isAuth);
  const CheckUser = () => {
    if (!context.isAuth) {
      alert("Login to add Songs");
    } else {
      nav("/song/addSong");
    }
  };

  return (
    <div className="songList song">
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>Add song</Card.Title>
          <Button onClick={CheckUser} variant="primary">
            Add
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Song;
