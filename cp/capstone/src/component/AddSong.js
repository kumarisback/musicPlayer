import React, { useContext, useRef,useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addSong } from "../DatabaseHandler/SongHandler";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../Data/auth";
import usePrompt from "./promtp";


const AddSong = () => {

  const [intial, setIntial] = useState(false);
  const data= useContext(isAuth);
  const songTitle = useRef("");
  const albumName = useRef("");
  const genre = useRef("");
  const singerName = useRef("");
  const length = useRef("");
  const songURL = useRef("");
  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {

     
      let response = await addSong(
        songTitle.current.value,
        singerName.current.value,
        albumName.current.value,
        genre.current.value,
        length.current.value + "min",
        songURL.current.value,
        data.email
      );
      // console.log(response);
      if (response.statusText === "OK") {
        alert("Song Added Successfully");
        navigate("/", { replace: true });
      } else {
        alert("Something Wrong ");
        // console.log(response);
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
  return (
    <Form className="form" onSubmit={submitHandler} onChange={()=>{setIntial(true);}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Song Title</Form.Label>
        <Form.Control
          ref={songTitle}
          type="text"
          placeholder="Enter Song Title"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Singer Name</Form.Label>
        <Form.Control
          ref={singerName}
          type="text"
          placeholder="Enter Singer Name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Album Name</Form.Label>
        <Form.Control
          ref={albumName}
          type="text"
          placeholder="Enter Your Album  Name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          ref={genre}
          type="text"
          placeholder="Enter Genre"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Length</Form.Label>
        <Form.Control
          ref={length}
          type="number"
          min="1"
          placeholder="Enter Length"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>URL</Form.Label>
        <Form.Control
          ref={songURL}
          type=" text"
          placeholder="Enter Song URL"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddSong;
