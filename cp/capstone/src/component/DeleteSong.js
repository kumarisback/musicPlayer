import React, { useRef ,useState} from "react";
import { Form, Button } from "react-bootstrap";
import { editSong } from "../DatabaseHandler/SongHandler";
import { useLocation, useNavigate } from "react-router-dom";
import usePrompt from './promtp'

const DeleteSong = () => {
  let loc = useLocation();
  let id = loc.state[0];
  const songTitle = useRef(loc.state[1].Song_title);
  const albumName = useRef(loc.state[1].albumName);
  const genre = useRef(loc.state[1].Genre);
  const singerName = useRef(loc.state[1].singerName);
  const length = useRef(loc.state[1].Length);
  const songURL = useRef(loc.state[1].Song_URL);
  let navigate = useNavigate();

  const [intial, setIntial] = useState(false);

  const call=()=>{
    // console.log(e.target.value);
    console.log(intial);
    return intial
  }
  usePrompt(
    "Are you sure you want to leave?",
    call())

  const submitHandler = async (e) => {
    e.preventDefault();
    
    let data = {
      Song_title: songTitle.current.value,
      albumName: albumName.current.value,
      singerName: singerName.current.value,
      Length: length.current.value,
      Genre: genre.current.value,
      Song_URL: songURL.current.value,
    };
    try {
      let response = await editSong(data, id);

      console.log(response);
      if (response.statusText === "OK") {
        alert("Song Edited Successfully");
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

  return (
    <Form className="form" onSubmit={submitHandler} onChange={()=>{setIntial(true)}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Song Title</Form.Label>
        <Form.Control
          ref={songTitle}
          type="text"
          placeholder="Enter Song Title"
          required
          defaultValue={songTitle.current}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Singer Name</Form.Label>
        <Form.Control
          ref={singerName}
          type="text"
          placeholder="Enter Singer Name"
          required
          defaultValue={singerName.current}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Album Name</Form.Label>
        <Form.Control
          ref={albumName}
          type="text"
          placeholder="Enter Your Album  Name"
          required
          defaultValue={albumName.current}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          ref={genre}
          type="text"
          placeholder="Enter Genre"
          required
          defaultValue={genre.current}
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
          defaultValue={length.current}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>URL</Form.Label>
        <Form.Control
          ref={songURL}
          type="text"
          placeholder="Enter Song URL"
          defaultValue={songURL.current}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DeleteSong;
