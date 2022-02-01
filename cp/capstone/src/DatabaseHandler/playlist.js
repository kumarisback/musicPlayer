import axios from "axios";
import { db } from "../Data/AllUrl";
import { FetchSong } from "./SongHandler";
const showPlaylist = async (user) => {
  try {
    let response = axios.get(
      `${db}/${user}/playlist.json?key=${process.env.REACT_APP_KEY}`
    );
    // console.log((await response).data);
    let temp = (await response).data;
    let key = Object.keys(temp);
    if (key) {
      return key;
    }
    return null;
    // console.log(key);
  } catch (error) {
    // console.log(error.response);
    return null;
  }
};

const addToExisting = async (playlistName, username, key) => {
  try {
    // console.log("hi");
    // console.log(playlistName,username,key);
    let response = await axios.post(
      `${db}${username}/playlist/${playlistName}.json?key=${process.env.REACT_APP_KEY}`,
      key,
      { headers: { "Content-Type": "application/json" } }
    );

    // const temp = await axios.put(
    //   `${db}/${username}/playlist/count/${playListName}.json?key=${process.env.REACT_APP_KEY}`,
    //   {count+1},
    //   { headers: { "Content-Type": "application/json" } }
    // );
    // console.log( response);
    // console.log(await response.data);
    if (response.data != null) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const allPlayList = async (username) => {
  try {
    let response = await axios.get(
      `${db}${username}/playlist.json?key=${process.env.REACT_APP_KEY}`
    );


    
      

    let songs = await FetchSong();
    let dataSongs;
    if (songs == null || response.data == null) {
      return null;
    }
    let dataPlaylist = Object.entries(await response.data);
    dataSongs = Object.entries(songs);

    // console.log(dataPlaylist);
    // console.log(dataSongs);

    let final = [];
    dataPlaylist.forEach((key) => {
      let result = [];

      let playlistName = key[0];
      result.push(playlistName);

      let temp = [];
      let match = [];
      dataSongs.forEach((all) => {
        // temp=[]
        Object.keys(key[1]).forEach((x) => {
          if (all[0] === key[1][x]) {
            match = [];
            match.push(all);
            match.push(x);
            temp.push(match);
            return;
          }
        });
      });
      result.push(temp);
      temp = [];
      // final.push(result);
      final.push(result);
      // console.log(result);
    });

    // console.log(final);
    if (final != null) return final;
    return null;
  } catch (error) {
    return null;
  }
};

const deletePlaylist = async (username, playlistName) => {
  try {
    const res = await axios.delete(
      `${db}${username}/playlist/${playlistName}.json?key=${process.env.REACT_APP_KEY}`
    );

    const temp = await axios.get(
      `${db}/${username}/playlist/count.json?key=${process.env.REACT_APP_KEY}`,
      { headers: { "Content-Type": "application/json" } }
    );


    let t=await temp.data;

    let midway=t;
    delete midway[`${playlistName}`];
    // midway[`${playlistName}`]+=1;

    const res2 = await axios.put(
      `${db}/${username}/playlist/count.json?key=${process.env.REACT_APP_KEY}`,midway,
      { headers: { "Content-Type": "application/json" } }
    );


    console.log(await res);
    if (res) return true;
    else return false;
  } catch (err) {
    return false;
  }
};

const countClick = async(username) => {
  try {
    // let arr=showPlaylist(username);
    let res =await axios.get(`${db}${username}/playlist/count.json?key=${process.env.REACT_APP_KEY}`);
    console.log(await res.data);
    return await res.data;
  } catch (error) {
    return null
  }


};


const increCount=async(username,playlistName)=>{
  try {
    const temp = await axios.get(
      `${db}/${username}/playlist/count.json?key=${process.env.REACT_APP_KEY}`,
      { headers: { "Content-Type": "application/json" } }
    );


    let t=await temp.data;

    let midway=t;
    midway[`${playlistName}`]+=1;
    console.log(midway);

    const res = await axios.put(
      `${db}/${username}/playlist/count.json?key=${process.env.REACT_APP_KEY}`,midway,
      { headers: { "Content-Type": "application/json" } }
    );
    
    console.log(res.data);
  return true;

  } catch (error) {
    
  }
}
export { showPlaylist, addToExisting, allPlayList, deletePlaylist ,countClick,increCount};
