import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateNeWPlaylist } from "../DatabaseHandler/SongHandler";

const NewPlaylist = () => {
  const playListName = useRef("");
  const data = useLocation();
  let nav = useNavigate();

  const submitHandler2 = async (e) => {
    e.preventDefault();

    console.log("hi");
    const result = CreateNeWPlaylist(playListName.current.value, data.state);
    // console.log(playListName.current.value,data);
    if (await result) {
      alert("Add successfully in " + playListName.current.value);
      nav("/");
    } else {
      alert("Fail to create playlist");
    }
  };

  return (
    <div>
      <Form onSubmit={submitHandler2}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Playlist Name</Form.Label>
          <Form.Control
            ref={playListName}
            type="text"
            placeholder="Enter your playlist name"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewPlaylist;
