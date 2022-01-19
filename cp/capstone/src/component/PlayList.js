import React, { useEffect, useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Card, Spinner, CloseButton } from "react-bootstrap";
import { isAuth } from "../Data/auth";
import image from "../Data/music.jpeg";
import { fetchPlayList, RemoveSong } from "../DatabaseHandler/SongHandler";
import "../NoDataFound.css";

const PlayList = () => {
  let deleteSong;
  let navigate = useNavigate();
  const isLoggedIn = useContext(isAuth);

  const [songs, setSongs] = useState([]);
  const [keys, setKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noSongs, setNoSongs] = useState(false);
  useEffect(() => {
    const doIt = async () => {
      if (!isLoggedIn.isAuth) {
        alert("To view or create playlist login first");
        navigate("/login", { replace: true });
        return;
      }
      let user = isLoggedIn.email.split("@");
      const response = await fetchPlayList(user[0]);
      if(response===null){
        setNoSongs(true);
        return;
      }
      if(!response){
        setNoSongs(true);
        return ;
      }

      // console.log(response.length);
      if(response.length<1){
        setNoSongs(true);
      }
      setSongs(response[0]);
      setKeys(response[1]);
      // console.log(keys);
// debugger
      // console.log();
      if (response[0].length===0) {
        setNoSongs(true);
        setIsLoading(true);
      }
      else{
        setIsLoading(false);
      }
      
    };

    doIt();
  }, []);

  const removeSong = async (e) => {
    let key = await e.target.value;
    let id =await e.target.id;
    // let k=await e.target.value2.nodeValue;
    // console.log(k);
    // console.log(key+"------"+id);
    // console.log(key);
    // return;
    let user = isLoggedIn.email.split("@");

    if (window.confirm("Do you want to delete this dong it can't be undone")) {
      deleteSong = RemoveSong(key, user[0]);
      // console.log(await deleteSong);
      if ((await deleteSong) === "OK") {
        setIsLoading(true);
        setSongs(songs.filter((item) => item[0] !== id));
        setIsLoading(false);
        // console.log(songs);
        // console.log(songs.length);
        if (songs.length < 2) {
          // console.log(songs);
          setNoSongs(true);
        }
      } else {
        alert("Fail to Update");
      }
    }
  };

  return (
    <div className="songList">
      {/* {
        songs.map(e=>{
          <li>{e}</li>
        })
      } */}
      {!noSongs &&isLoading ? (
        <Spinner className="loading" animation="grow" />
      ) : (
         !noSongs &&songs?.map((k,index) => {
          return (
            <Card key={keys[index]} style={{ width: "18rem" }}>
              <Card.Header>
                <CloseButton
                  value={keys[index]}
                  id={k[0]}
                  title="Delete Song"
                  disabled={!isLoggedIn.isAuth}
                  onClick={removeSong}
                />
              </Card.Header>

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
                <Card.Link className="a" href={k[1].Song_URL} variant="primary">
                  Go Play
                </Card.Link>
              </Card.Body>
            </Card>
          );
        })
      )}
      {noSongs && (
        <section className="notFound">
          <div className="img">
            <img
              src="https://assets.codepen.io/5647096/backToTheHomepage.png"
              alt="Back to the Homepage"
            />
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
    </div>
  );
};

export default PlayList;
