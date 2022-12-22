import { Component } from "react";
import decode from "jwt-decode";
import axios from "axios";
import env from "../static";


export default class AuthHelperMethods {
  // initialiing important variable
  // constructor(props)  {
  //   super(props);
    
  //   this.state={
  //     user:localStorage.getItem('AdminOrTeam')
  //   }
  // }
  
  constructor(domain){
    this.domain = domain || 'http://localhost:3000'
}
  
  login = (url, username, password, user) => {
    
    return new Promise((resolve, reject) => {

      axios.post(url, { username, password }).then(async res => {
       console.log("url",url,"res.data",res.data)
        await this.setToken(res.data.token, res.data,user); // Setting the token in localStorage
        return resolve(res);
      }).catch(reject);
      
    });
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage

    //The double exclamation is a way to cast the variable to a boolean, allowing you to easily check if the token exusts.
    return !!token && !this.isTokenExpired(token); // handwaiving here
  };
  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      } else return false;
    } catch (err) {
      console.log("expired check failed! Line 42: AuthService.js");
      return false;
    }
  };
  setToken = async (idToken, data,user) => {
    // Saves user token to localStorage
    
    return new Promise(async (resolve, reject) => {
      localStorage.clear();
      localStorage.setItem("id_token", idToken);
      localStorage.setItem("picture", data.picture);
      localStorage.setItem("name", `${data.fname} ${data.lname}`);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("country", data.country);
      const permissions = await this.getPermissions(data.role);
      localStorage.setItem("permissions", permissions);
      localStorage.setItem("AdminOrTeam", user)
      resolve();
    });
  };
  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  };
  getDataLogin = () => {
    const data = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      picture: localStorage.getItem("picture")
    };
    return data;
  };
  logout = () => {
    console.log("logout");
    // Clear user token and profile data from localStorage
    window.location.reload();
    localStorage.removeItem("id_token");
    localStorage.clear();
  };
  getConfirm = () => {
    // Using jwt-decode npm package to decode the token
    let answer = decode(this.getToken());
    console.log(answer);
    console.log("Recieved answer!");
    return answer;
  };
  axiosUP = (url, method, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["x-auth-token"] = this.getToken();
    }

    return axios({
      url,
      method,
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  };

  _checkStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };

  getPermissions = async roleID => {
    try {
      const permissions = [];
      if (roleID==undefined){
        const url =  env.globalUrl+"team-api/v1/permissions/all";
        const headers = {
          "x-auth-token": localStorage.getItem("id_token")
        };
        const res= await axios.get(url, { headers });
 
      res.data.forEach(elem => {
        permissions.push(elem.route);
      });
      }
      else {
      const url = env.globalUrl+"team-api/v1/roles/info" + "/" + roleID;
      //const url = 'http://localhost:3000/team-api/v1/roles/info/'+roleID
      const headers = {
        "x-auth-token": localStorage.getItem("id_token")
      };
      const role = await axios.get(url, { headers });
      
      role.data.permissions.forEach(elem => {
        permissions.push(elem.route);
      });
      }
      return permissions;
    } catch (e) {
      console.log(e);
    }
  };
}
