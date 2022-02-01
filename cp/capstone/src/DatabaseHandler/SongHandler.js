import axios from "axios";
import { db, songUrl } from "../Data/AllUrl";


const addSong = async (...details) => {
  const data = {
    Song_title: details[0],
    albumName: details[2],
    singerName: details[1],
    Length: details[4],
    Genre: details[3],
    Song_URL: details[5],
  };
  const user = details[6].split("@");
  // console.log(user);
  try {
    let response = await axios.post(songUrl, data, {
      headers: { "Content-Type": "application/json" },
    });

    // console.log(await response.data.name);
    let mykey = await response.data.name;
    // console.log(typeof mykey);
    let my = await axios.post(
      `${db}${user[0]}/mysong.json?key=${process.env.REACT_APP_KEY}`,
      mykey,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    // console.log(JSON.stringify(error.response));
    return error.response;
  }
};

const FetchSong = async () => {
  // console.log(db,songUrl);
  try {
    let response = await axios.get(songUrl, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log(await response.data);
    return await response.data;
  } catch (error) {
    // console.log(error);
    return error.response;
  }
};

const createPlaylist = async (...data) => {
  let key = data[1];
  // console.log(key);
  let user = data[2].split("@");
  try {
    let response1 = await axios.get(
      `${db}${user[0]}.json?key=${process.env.REACT_APP_KEY}`,
      { headers: { "Content-Type": "application/json" } }
    );

    const response2 = FetchSong();
    let songs = await response2;
    // console.log(data);
    let arr = [];
    if (data != null) {
      for (const [...value] of Object.entries(songs)) {
        // console.log(value);
        arr.push(value);
      }
    }
    if (response1.data) {
      let keys = Object.values(response1.data);
      // console.log(keys);

      if (keys.includes(key)) {
        // console.log("present");
        return "ALREADY PRESENT";
      }
    }
    let response;
    // console.log(key);
    if (key != null) {
      // console.log(key);
      response = await axios.post(
        `${db}${user[0]}.json?key=${process.env.REACT_APP_KEY}`,
        key,
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log(response);
      return "Added Successfully";
    }
    // console.log(JSON.stringify(response));
    return "Fail to Add";
  } catch (error) {
    // console.log(JSON.stringify(error.response) + "something wrong");
    return "Fail to Add";
  }
};

const fetchPlayList = async (user) => {
  // console.log(user);
  const playListURL = `${db}${user}.json?key=${process.env.REACT_APP_KEY}`;
  const response = FetchSong();
  // console.log(await response);
  if (!response) {
    return null;
  }
  let data = await response;
  let arr = [];
  if (data != null) {
    for (const [...value] of Object.entries(data)) {
      // console.log(value);
      arr.push(value);
    }
  }
  // console.log(arr);
  try {
    const response2 = await axios.get(playListURL, {
      headers: { "Content-Type": "application/json" },
    });
    let keys = Object.values(response2.data);
    let keys2 = Object.keys(response2.data);
    // console.log(keys2);
    let song = [];
    keys.forEach((x) => {
      let row = [];
      // console.log(x);
      arr.forEach((y) => {
        // console.log(y);
        if (y[0] === x) {
          // console.log(y[0] + "--------" + x);
          row.push(x);
          row.push(y[1]);
          song.push(row);
        }
      });

      // console.log(song);
    });

    return [song, keys2];
  } catch (error) {
    return error.response2;
  }
};

const RemoveSong = async (key, user) => {
  const playListURL = `${db}${user}.json?key=${process.env.REACT_APP_KEY}`;
  let response = await axios.get(playListURL, {
    headers: { "Content-Type": "application/json" },
  });
  // let res=fetchPlayList(user);
  // console.log(await response.data);
  let id = await response.data;
  // let res
  // console.log(key);
  let res = await axios.delete(
    `${db}${user}/${key}.json?key=${process.env.REACT_APP_KEY}`,
    { headers: { "Content-Type": "application/json" } }
  );

  // console.log(res.statusText);
  return res.statusText;
};

const removeSongForAll = async (key) => {
  let url = `${db}songs/${key}.json?key=${process.env.REACT_APP_KEY}`;
  let response = await axios.delete(url);
  // console.log(await response);
  if (response.ok) {
    return true;
  }
  return false;
};

const editSong = async (data, id) => {
  // console.log(id);
  // console.log(data);
  try {
    let response = await axios.put(
      `${db}songs/${id}.json?key=${process.env.REACT_APP_KEY}`,
      data
    );
    return response;
  } catch (error) {
    // console.log(error.response);
    return error.response;
  }
};

const fetchMySong = async (user) => {
  try {
    let response = await axios.get(
      `${db}${user}/mysong.json?key=${process.env.REACT_APP_KEY}`
    );
    // console.log(await response.data);

    let temp = await response.data;
    if (temp === null) {
      return null;
    }
    let key = Object.values(temp);
    if (key != null) {
      let getallSong = FetchSong();
      if (!getallSong) {
        return null;
      }
      let data = await getallSong;
      let arr = [];
      if (data != null) {
        for (const [...value] of Object.entries(data)) {
          // console.log(value);
          arr.push(value);
        }
      }

      let song = [];
      key.forEach((x) => {
        let row = [];
        arr.forEach((y) => {
          if (y[0] === x) {
            row.push(x);
            row.push(y[1]);
            song.push(row);
          }
        });
      });

      // console.log(song);
      return song;
    } else {
      return null;
    }
  } catch (error) {
    console.log("in catch");
    return null;
  }
};

const searchSong = async (songName) => {
  let response = await FetchSong();
  // console.log(response);
  let songs = Object.entries(response);
  let song=[];
  songs.forEach((x) => {
    if (x[1].Song_title.toLowerCase().includes(songName.toLowerCase()) ) {
      // console.log(x[1]);
      song.push(x);
    }
  });
  if (song) {
    return song;
  }
  // console.log("hi");
  return null;
};

const CreateNeWPlaylist = async (playListName, data,username) => {
  console.log(data);
  console.log(username);

  try {
    // let name = data.user.split("@");
    // console.log(data, playListName);
    // console.log(name[0]);
    // return
    // console.log(
    //   `${db}/${name[0]}/${playListName}.json?key=${process.env.REACT_APP_KEY}`
    // );

    const response = await axios.post(
      `${db}/${username}/playlist/${playListName}.json?key=${process.env.REACT_APP_KEY}`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    const temp = await axios.get(
      `${db}/${username}/playlist/count.json?key=${process.env.REACT_APP_KEY}`,
      { headers: { "Content-Type": "application/json" } }
    );

    let resy= await temp.data;
    resy[`${playListName}`]=0;
    console.log(resy);

    let kardoyrr=await axios.put(`${db}/${username}/playlist/count.json?key=${process.env.REACT_APP_KEY}`,resy);
    // console.log("ji");
    console.log(await response.data);
    if (response) {
      return true;
    }
    console.log(await response.data);
    return false;
  } catch (error) {
    console.log("in catch");
    return false;
  }
};

export {
  addSong,
  FetchSong,
  RemoveSong,
  createPlaylist,
  fetchPlayList,
  removeSongForAll,
  editSong,
  fetchMySong,
  searchSong,
  CreateNeWPlaylist,
};
