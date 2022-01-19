const loginUrl =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`
const regUrl=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_KEY}`
const userUrl=`https://capstone-4fc07-default-rtdb.firebaseio.com/users.json?key=${process.env.REACT_APP_KEY}`
const songUrl=`https://capstone-4fc07-default-rtdb.firebaseio.com/songs.json?key=${process.env.REACT_APP_KEY}`
const db="https://capstone-4fc07-default-rtdb.firebaseio.com/";

export {loginUrl,regUrl,userUrl,songUrl,db}