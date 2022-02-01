import { Button, Card, CloseButton, NavDropdown } from "react-bootstrap";
import React, { useEffect, useContext, useState } from "react";
import { isAuth } from "../Data/auth";
import { allPlayList, deletePlaylist, increCount } from "../DatabaseHandler/playlist";
import image from "../Data/music.jpeg";
import axios from "axios";
import { db } from "../Data/AllUrl";
import { countClick } from "../DatabaseHandler/playlist";
;


const NewPlayListComp = () => {
  const isLoggedIn = useContext(isAuth);
  const [allPlaylistSong, setAllPlaylistSong] = useState();
  const [playlistName, setPlaylistName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [nosongs, setNosongs] = useState(true);

  const [county, setCounty] = useState();

  useEffect(async () => {
    
    let result = await allPlayList(isLoggedIn.email.split("@")[0]);
    let c=await countClick(isLoggedIn.email.split("@")[0]);
    setCounty(c);
    if (result != null) {
      setAllPlaylistSong(result);
      setNosongs(false);
      setIsLoading(false);
    }
else{
  setNosongs(true);
}
    // console.log(result);

    //   return () => {
    //     second;
    //   };
  }, [isLoading]);


  // useEffect(() => {
    
  // }, []);
  

  const filetHandler = async(name) => {
    console.log(name);
    console.log( county);
    console.log(county[`${name}`]);
    let res=increCount(isLoggedIn.email.split("@")[0],playlistName);
    console.log(res);
    setPlaylistName(name);
    setFilter(true);
  };

  const removeSong = async (key) => {
    // console.log(key.target.value);
    // console.log(
    //   `${db}${isLoggedIn.email.split("@")[0]}/playlist/${playlistName}/${
    //     key.target.value
    //   }.json?key=${process.env.REACT_APP_KEY}`
    // );

    // console.log(allPlaylistSong);
    // console.log(key.target.value);
    // let index = allPlaylistSong.find((title) => title[0] === playlistName);
    // // console.log(allPlaylistSong);
    // // console.log(index);
    // index = index[1].filter((row) => row[1] !== key.target.value);
    // let index2=allPlaylistSong.find((title) => title[0] !== playlistName);
    // index.unshift(playlistName);
    // console.log(index);
    // console.log(index2);
    
    // var doit=[index,index2];
    
    // setAllPlaylistSong(doit);
    // console.log(allPlaylistSong);
    // let final = allPlaylistSong.splice (0,allPlaylistSong.indexOf(playlistName));
    // console.log(final);
    // return;

    let response = axios.delete(
      `${db}${isLoggedIn.email.split("@")[0]}/playlist/${playlistName}/${
        key.target.value
      }.json?key=${process.env.REACT_APP_KEY}`
    );


    console.log(await response);
    if ((await response).status) {
      setIsLoading(true);
      alert("deleted Successfully");
    } else {
      alert("something went Wrong");
    }
  };


  const removePlaylist=async(name)=>{
console.log(name.target.value);
      const res= deletePlaylist(isLoggedIn.email.split("@")[0],name.target.value);
      if(res){
        alert("Deleted");
      }
      else{
        alert("something went wrong");
      }
      setIsLoading(true);
  }



  return (
    <div>
      
      <h1 style={{fontFamily:"cursive", marginLeft :"40%" ,color:"gray" }}>Your Playlist</h1>
      <ul
        className="playlist-all "
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "center",
          flexWrap:"wrap",
          background: "linear-gradient(141deg,#724c4c, #c1a0a0bf)",
          borderRadius:"10px",
          boxShadow:"2px 2px 5px black",
          width:"80%",
          margin:"auto",
          padding:"20px"
          // margin: "15px",
        }}
      >
        {!isLoading &&
          allPlaylistSong.map((name, index) => {
            {if(name[0]==="count")
                return;
              }
            return (
              
              <li key={index} style={{backgroundColor:"white"}}>
                <Card.Header>
                      <CloseButton
                        value={name[0]}
                        title="Delete Song"
                        disabled={!isLoggedIn.isAuth}
                        onClick={removePlaylist}
                      />
                    </Card.Header>
                <Card style={{ width: "18rem" ,boxShadow:"2px 2px 5px black",padding:"10px" }}>
                  <Card.Img
                    style={{ height: "100px"}}
                    variant="top"
                    src={image}
                  />
                  <Button
                    onClick={() => {
                      filetHandler(name[0]);
                    }}
                  >
                    {" "}
                    {name[0]}
                  </Button>
                </Card>
              </li>
            );
          })}
      </ul>
      {playlistName && <h1 className="playlistDisplay">{playlistName}</h1>}
      <div className="songList">
        {filter &&
          allPlaylistSong.map((row) => {
            if (playlistName !== row[0]) {
              // {console.log(k[0]);
              return () => {};
            }
            
             
            

            return row[1].map((k) => {
            
              return (
                //  <h1>{k[1]}</h1>
                <Card  key={k[0][0]} style={{ width: "18rem" }}>
                  {isLoggedIn.isAuth && (
                    <Card.Header>
                      <CloseButton
                        value={k[1]}
                        title="Delete Song"
                        disabled={!isLoggedIn.isAuth}
                        onClick={removeSong}
                      />
                    </Card.Header>
                  )}
                  <Card.Img variant="top" src={image} />
                  <Card.Body>
                    <Card.Title>{k[0][1].Song_title}</Card.Title>
                    <Card.Text>
                      Singer Name : {k[0][1].singerName}
                      <br />
                      Album Name : {k[0][1].albumName}
                    </Card.Text>
                    <Card.Link
                      className="a"
                      target="_blank"
                      href={k[0][1].Song_URL}
                      variant="primary"
                    >
                      Go Play
                    </Card.Link>
                  </Card.Body>
                </Card>
              );
            });
          })}
      </div>
      {nosongs &&<section className="notFound">
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
        </section>}
    </div>
  );
};

export default NewPlayListComp;
