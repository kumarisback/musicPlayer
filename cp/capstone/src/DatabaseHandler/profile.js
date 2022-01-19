import axios from 'axios'
import React from 'react'

const urlForData = `https://capstone-4fc07-default-rtdb.firebaseio.com/users.json?key=${process.env.REACT_APP_KEY}`;
const getProfile = async(user) => {
    // console.log(user);
    try{
        let profile;
        let response=await axios.get(urlForData);
        // console.log(response.data);
        for(let v in response.data){
            if(response.data[v].email===user){
                profile=response.data[v];
                // console.log(profile);
                return profile;
            }

            // console.log(response.data[v].email +"========"+user);
        }
        return null;
        
    }
    catch(error){
        console.log(error);
    }

    return true;
}

export default getProfile
