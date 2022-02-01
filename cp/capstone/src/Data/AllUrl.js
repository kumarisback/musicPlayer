const loginUrl =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`
const regUrl=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_KEY}`
const userUrl=`https://music-243dc-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?key=${process.env.REACT_APP_KEY}`
const songUrl=`https://music-243dc-default-rtdb.asia-southeast1.firebasedatabase.app/songs.json?key=${process.env.REACT_APP_KEY}`
const db="https://music-243dc-default-rtdb.asia-southeast1.firebasedatabase.app/";

export {loginUrl,regUrl,userUrl,songUrl,db}