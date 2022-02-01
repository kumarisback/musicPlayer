import React, { useContext, useEffect, useState } from "react";
import { fetchMySong, removeSongForAll } from "../DatabaseHandler/SongHandler";
import { isAuth } from "../Data/auth";
import { Card, Spinner, CloseButton, NavDropdown } from "react-bootstrap";
import image from "../Data/music.jpeg";
import { Link } from "react-router-dom";
const MySongs = () => {
  const details = useContext(isAuth);
  //   console.log(details);
  const [songs, setSongs] = useState([]);
  const [noSongs, setNoSongs] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchmylist = async () => {
      let res = await fetchMySong(details.email.split("@")[0]);
      let data = await res;
      // console.log(data);
      console.log();
      if(data==null){
        // console.log(data==null);
        setNoSongs(true);
        setIsLoading(false);
        return
      }
      setSongs(data);
    //   console.log({songs});
      setIsLoading(false);
    };

    return fetchmylist();
  }, []);

  const removeSong = (e) => {
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

  return (
    <div className="songList">
      {isLoading ? (
        <Spinner className="loading" animation="grow" />
      ) : (
        songs?.map((k) => {
          return (
            <Card key={k[0]} style={{ width: "18rem" }}>
              <Card.Header>
                <CloseButton
                  value={k[0]}
                  title="Delete Song"
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
                  <NavDropdown.Item as={Link} to="/song/editsong" state={k}>
                    Edit
                  </NavDropdown.Item>
                </NavDropdown>
              </Card.Header>

              {/* <Card.Img variant="top" src={image} /> */}
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
              </Card.Body>
            </Card>
          );
        })
      )}
      {noSongs &&  (
        <section className="notFound">
          <div className="img">
            <img
              src="https://assets.codepen.io/5647096/Delorean.png"
              alt="El Delorean, El Doc y Marti McFly"
            />
          </div>
          <div className="text" style={{color:'red'}}>
            <h1>NO</h1>
            <h2>SONG ADDED</h2>
          </div>
        </section>
      )}
    </div>
  );
};

export default MySongs;
