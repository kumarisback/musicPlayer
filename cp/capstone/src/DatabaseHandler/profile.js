import axios from 'axios'
import React from 'react'
import { db } from '../Data/AllUrl';
const urlForData = `${db}users.json?key=$AIzaSyB8P3OPwlMQkaJYwBLQB0_4ZxpxuKutlrE`;
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
