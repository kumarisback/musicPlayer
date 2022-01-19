import React, { useContext, useEffect, useState,useRef } from "react";
import {
  Card,
  Button,
  Spinner,
  CloseButton,
  NavDropdown,
  Form,
  FormControl,Modal
} from "react-bootstrap";
import image from "../Data/music.jpeg";
import { FetchSong, removeSongForAll ,searchSong,createPlaylist} from "../DatabaseHandler/SongHandler";
import { isAuth } from "../Data/auth";
import { Link } from "react-router-dom";

const HomePage = () => {
  const user = useContext(isAuth);
    const refSong = useRef("");
  let username;
  if (user.email != null) {
    username = user.email.split("@");
  }

  const [song,setSong]=useState([]);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [noSongs, setNoSongs] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () =>{ setShow(false); setIsSearch(false)};
  const handleShow = () =>{ setShow(true);setIsSearch(false)};

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
  }, []);

  const addSong = async (key) => {
    if (!user.isAuth) {
      alert("Login to create playlist");
      return;
    }

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

  
  const searchHandler=async()=>{
    // console.log( refSong.current.value.trim());
    if(refSong.current.value.trim()!== ""){
      let res=searchSong(refSong.current.value.trim());
      // console.log(await songs);
      let result=await res;
      if( result!==null){
        // console.log( songs);
        // console.log(result);
        setSong(result);
        setIsSearch(true);
         setShow(true);
         
      }
      else{
        alert("No song found");
      }
      
    }
    else{
      alert("Please Enter a valid Input");
    }
  }

  return (
    <>
    <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          ref={refSong}
        />
        <Button variant="outline-success" onClick={searchHandler}>Search</Button>
        </Form>
      <div className="songList">
        {isLoading ? (
          <Spinner className="loading" animation="grow" />
        ) : (
          songs.map((k) => {
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
                      <NavDropdown.Item
                        as={Link}
                        to="song/editSong"
                        state={k}
                      >
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
                    Genre : {k[1].Genre}
                    <br />
                    Duration : {k[1].Length}
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
              <h1 style={{color:"black"}}>NO</h1>
              <h2 style={{color:"black"}}>SONG FOUND</h2>
            </div>
          </section>
        )}
        {isSearch &&<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Song found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card key={song[0]} style={{ width: "18rem" }}>
                {user.isAuth && username[0] === "admin" && (
                  <Card.Header>
                    <CloseButton
                      value={song[0]}
                      title="Delete Song"
                      disabled={!user.isAuth}
                      onClick={removeSong}
                    />
                   
                  </Card.Header>
                )}
                <Card.Img variant="top" src={image} />
                <Card.Body>
                  <Card.Title>{song[1].Song_title}</Card.Title>
                  <Card.Text>
                    Singer Name : {song[1].singerName}
                    <br />
                    Album Name : {song[1].albumName}
                    <br />
                    Genre : {song[1].Genre}
                    <br />
                    Duration : {song[1].Length}
                    <br />
                  </Card.Text>
                  <Card.Link
                    className="a"
                    target="_blank"
                    href={song[1].Song_URL}
                    variant="primary"
                  >
                    Go Play
                  </Card.Link>
                  {/* {console.log(song[1].Song_URL)} */}
                  <Button
                    className="card-like"
                    onClick={() => addSong(song[0])}
                    value={song[0]}
                  >
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
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>}
      </div>
    </>
  );
};

export default HomePage;
