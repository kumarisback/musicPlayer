import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Card,
  Button,
  Spinner,
  CloseButton,
  NavDropdown,
  Form,
  FormControl,
  Modal,
  Dropdown,
} from "react-bootstrap";
import image from "../Data/music.jpeg";
import {
  FetchSong,
  removeSongForAll,
  searchSong,
  createPlaylist,
} from "../DatabaseHandler/SongHandler";
import { isAuth } from "../Data/auth";
import { Link, useNavigate } from "react-router-dom";
import ShowPlaylist from "./showPlaylist";

const HomePage = () => {
  const user = useContext(isAuth);
  const refSong = useRef("");
  let username;
  if (user.email != null) {
    username = user.email.split("@");
  }

  const [show2, setShow2] = useState(false);
  const [filter, setFilter] = useState(false);
  const [singer, setSinger] = useState("");
  const [song, setSong] = useState([]);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [noSongs, setNoSongs] = useState(false);
  const [show, setShow] = useState(false);
  const [showGenre, setshowGenre] = useState(true);
  const [showLength, setshowLength] = useState(true);

  const handleClose = () => {
    setShow(false);
    setShow2(false);
    setIsSearch(false);
  };
  const handleShow = () => {
    setShow(true);
    setIsSearch(false);
    setShow2(true);
  };

  useEffect(async () => {
    // console.log(user.isAuth);
    // console.log(username[0].trim().length > 1);
    let response = await FetchSong();
    if (!response || null) {
      setNoSongs(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    let arr = [];
    for (const [...value] of Object.entries(response)) {
      arr.push(value);
      // key -->value[0]          data object --->value[1]);
    }
    setSongs(arr);
  });

  const [addData, setAddData] = useState({
    key: null,
    songs: songs,
    user: user.email,
  });
  let nav = useNavigate();
  const addSong = async (key) => {
    // console.log(key);
    if (!user.isAuth) {
      alert("Login to create playlist");
      return;
    }
    nav("/showplaylist", { state: { key } });
    setAddData({ songs: songs, key: key, user: user.email });
    setShow2(true);

    return;

    const isAddedToPlaylist = await createPlaylist(songs, key, user.email);
    if (isAddedToPlaylist === "ALREADY PRESENT") {
      alert("ALREADY PRESENT");
    } else {
      if (isAddedToPlaylist === "Added Successfully") {
        alert("Added Successfully ");
      } else {
        alert("Fail to update your playlist");
      }
    }
  };

  const removeSong = async (e) => {
    let key = e.target.value;
    // console.log(key);
    if (window.confirm("Do you want to delete this dong it can't be undone")) {
      if (removeSongForAll(key)) {
        setIsLoading(true);
        setSongs(songs.filter((item) => item[0] != key));
        alert("Song Deleted");
        setIsLoading(false);
      } else {
        alert("Fail to delete try again later");
      }
    }
  };

  const searchHandler = async () => {
    // console.log( refSong.current.value.trim());
    if (refSong.current.value.trim() !== "") {
      let res = searchSong(refSong.current.value.trim());
      // console.log(res);
      let result = await res;
      if (result) {
        // console.log( songs);
        // console.log(result);
        setSong(result);
        setIsSearch(true);
        setShow(true);
        console.log(song);
      } else {
        alert("No song found");
      }
    } else {
      alert("Please Enter a valid Input");
    }
  };
  // console.log(song);

  const filetHandler = (e) => {
    setSinger(e);
    setFilter(true);
  };

  const [genre, setGenre] = useState("");
  const [filter2, setFilter2] = useState(false);
  const filetHandler2 = (e) => {
    setGenre(e);
    setFilter2(true);
  };
  const resetFilter = () => {
    setFilter(false);
    setFilter2(false);
    setIsSearch(false);
  };

  const newplay = (data) => {
    navigator("/newplaylist");
  };
  const showplay = (data) => {
    navigator("/showplaylist");
  };

  const handleL=(e)=>{
    // log(e.target);
    console.log(e.target);
    setshowLength(!showLength);
  }
  const handleG=(e)=>{
    // log(e.target);
    setshowGenre(!showGenre);
    // console.log(e.target);
  }

  return (
    <>
      {/* 
<Modal show={show} onHide={handleClose}>

<Button> add</Button>
</Modal> */}


      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          ref={refSong}
        />
        <Button variant="outline-success" onClick={searchHandler}>
          Search
        </Button>
      </Form>
      <div className="filterData">
        {/* <Dropdown onSelect={filetHandler}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose Singer
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey={"arjit"}>Arjit</Dropdown.Item>
            <Dropdown.Item eventKey={"darshan"}>Darshan</Dropdown.Item>
            <Dropdown.Item eventKey={"neha"}>neha</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown onSelect={filetHandler2}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose Genre
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey={"sad"}>sad</Dropdown.Item>
            <Dropdown.Item eventKey={"romantic"}>romantic</Dropdown.Item>
            <Dropdown.Item eventKey={"chill"}>chill</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        <Button variant="primary" size="lg" active onClick={resetFilter}>
          Reset
        </Button>
        
      </div>

      <Form style={{display:"flex"}}>
    <Form.Check 
      type="switch"
      id="custom-switch"
      label="Genre"
      onClick={handleG}
    />
    <Form.Check 
      type="switch"
      label="Length"
      id="disabled-custom-switch"
      onClick={handleL}
    />
  </Form>
      <div   style={{fontSize:"20px" ,display:"flex" ,margin:"10px 60px" }}>
      {/* <div style={{margin:"5px" }}>
          <input type="checkbox" id="coding" name="interest" value="Genre" onClick={handleG}/>
          <label for="coding">Genre</label>
        </div>
        <div style={{margin:"5px" }}>
          <input type="checkbox" id="music" name="interest" value="Length" onClick={handleL} />
          <label for="music">Length</label>
        </div> */}
        </div>
      <div className="songList">
        {isLoading ? (
          <Spinner className="loading" animation="grow" />
        ) : (
          songs.map((k) => {
            if (isSearch) {
              return;
            }
            if (filter) {
              if (k[1].singerName.toLowerCase() !== singer.toLowerCase()) {
                return;
              }
            }

            if (filter2) {
              if (k[1].Genre.toLowerCase() !== genre.toLowerCase()) {
                return;
              }
            }

            return (
              <Card key={k[0]} style={{ width: "18rem" }}>
                {user.isAuth && username[0] === "admin" && (
                  <Card.Header>
                    <CloseButton
                      value={k[0]}
                      title="Delete Song"
                      disabled={!user.isAuth}
                      onClick={removeSong}
                    />
                    <NavDropdown
                      className="edit"
                      title={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                      }
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item as={Link} to="song/editSong" state={k}>
                        Edit
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Card.Header>
                )}
                <Card.Img variant="top" src={image} />
                <Card.Body>
                  <Card.Title>{k[1].Song_title}</Card.Title>
                  <Card.Text>
                    Singer Name : {k[1].singerName}
                    <br />
                    Album Name : {k[1].albumName}
                    <br />
                    <div hidden={showGenre}>
                      Genre : {k[1].Genre}
                      <br />
                    </div>
                    <div hidden={showLength}>Duration : {k[1].Length}</div>
                    <br />
                  </Card.Text>
                  <Card.Link
                    className="a"
                    target="_blank"
                    href={k[1].Song_URL}
                    variant="primary"
                  >
                    Go Play
                  </Card.Link>
                  {/* {console.log(k[0])} */}
                  <Button
                    className="card-like"
                    onClick={() => addSong(k[0])}
                    value={k[0]}
                  >
                    Add
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        )}
        {noSongs && (
          <section className="notFound">
            <div className="img">
              <img
                src="https://assets.codepen.io/5647096/Delorean.png"
                alt="El Delorean, El Doc y Marti McFly"
              />
            </div>
            <div className="text">
              <h1 style={{ color: "black" }}>NO</h1>
              <h2 style={{ color: "black" }}>SONG FOUND</h2>
            </div>
          </section>
        )}

        {/* {console.log(isSearch)} */}
      </div>
      <div className="songList">
        {isSearch &&
          song.map((k) => {
            return (
              <Card key={k[0]} style={{ width: "18rem" }}>
                {user.isAuth && username[0] === "admin" && (
                  <Card.Header>
                    <CloseButton
                      value={k[0]}
                      title="Delete Song"
                      disabled={!user.isAuth}
                      onClick={removeSong}
                    />
                    <NavDropdown
                      className="edit"
                      title={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                      }
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item as={Link} to="song/editSong" state={k}>
                        Edit
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Card.Header>
                )}
                <Card.Img variant="top" src={image} />
                <Card.Body>
                  <Card.Title>{k[1].Song_title}</Card.Title>
                  <Card.Text>
                    Singer Name : {k[1].singerName}
                    <br />
                    Album Name : {k[1].albumName}
                  </Card.Text>
                  <Card.Link
                    className="a"
                    target="_blank"
                    href={k[1].Song_URL}
                    variant="primary"
                  >
                    Go Play
                  </Card.Link>
                  {/* {console.log(k[0])} */}
                  <Button
                    className="card-like"
                    onClick={() => addSong(k[0])}
                    value={k[0]}
                  >
                    Add
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
