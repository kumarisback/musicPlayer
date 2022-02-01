import React, { useEffect, useState ,useRef, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addToExisting, showPlaylist } from "../DatabaseHandler/playlist";
import { CreateNeWPlaylist } from "../DatabaseHandler/SongHandler";
import { Form,Button } from "react-bootstrap";
import { isAuth } from "../Data/auth";

const ShowPlaylist = () => {
  let c=useContext(isAuth);
  let loc = useLocation();
  let nav = useNavigate();
  const playListName = useRef("");
  const data = useLocation();
  const username=c.email.split("@")[0];
  const { state } = useLocation();
  const key =loc.state.key;
  // console.log(state);

  const [isLoading, setIsLoading] = useState(true);
  const [noPlaylist, setNoPlaylist] = useState(false);
  const [list, setList] = useState();
  useEffect(async () => {
    const fetchPlaylistName = await showPlaylist(username);
    
    // console.log(fetchPlaylistName);
    if ( fetchPlaylistName!==null) {
      console.log( fetchPlaylistName);
      setList(fetchPlaylistName);
      // console.log( list);
       
      setIsLoading(false);
      console.log(fetchPlaylistName); 
      if( setList==null){
        setNoPlaylist(true);
      }
    console.log(list);
    }
  }, []);


  const submitHandler2 = async (e) => {
    e.preventDefault();

    // console.log("hi");
    // console.log(playListName.current.value);
    // console.log(key);
    // console.log(username);
    const result = CreateNeWPlaylist(playListName.current.value, key,username);
    // console.log(playListName.current.value,data);
    console.log(result);
    if (await result) {
      alert("Add successfully in " + playListName.current.value);
      nav("/");
    } else {
      alert("Fail to create playlist");
    }
  };


  const addtoPlaylist=(playlistName)=>{
    // e.preventDefault();
    console.log(playlistName);
    let result= addToExisting(playlistName,username,key);
    if (result) {
      alert("added successfully");
      nav("/");
      return
    }
    alert("Something Went Wrong")

  }
  return (
    <div>
      {!isLoading && (
        <ul className="list-of-playlist">
          {list?.map((row) => {
            return (
              <li className="playlist-content">
                <button style={{color:'red'}} onClick={(e)=>{addtoPlaylist(row)}}>{row}</button>
              </li>
            );
          })}
        </ul>
      )}
      {/* {
        noPlaylist && <section className="notFound">
        <div className="img">
          
          <img
            src="https://assets.codepen.io/5647096/Delorean.png"
            alt="El Delorean, El Doc y Marti McFly"
          />
        </div>
        <div className="text">
          <h1 style={{color:"black"}}>NO</h1>
          <h2 style={{color:"black"}}>Playlist Found</h2>
        </div>
      </section>
      } */}
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

export default ShowPlaylist;
