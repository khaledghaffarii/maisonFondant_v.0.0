import axios from "axios";
import AuthHelperMethods from "../../services/AuthHelperMethods";

const server = "http://localhost:3000/team-api/v1/";
export default class Permission {
  Auth = new AuthHelperMethods();

  new = (url, data) =>
    new Promise((resolve, reject) => {
      const token = this.Auth.getToken();
      const headers = { "x-auth-token": token };
      return axios
        .post(`${server}${url}`, data, { headers })
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  getAllPermission = url =>
    new Promise((resolve, reject) => {
      const token = this.Auth.getToken();
      const headers = { "x-auth-token": token };
      return axios
        .get(`${server}${url}`, { headers })
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  update = (url, data) =>
    new Promise((resolve, reject) => {
      const token = this.Auth.getToken();
      const headers = { "x-auth-token": token };
      return axios
        .post(`${server}${url}`, data, { headers })
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  delete = url =>
    new Promise((resolve, reject) => {
      const token = this.Auth.getToken();
      const headers = { "x-auth-token": token };
      return axios
        .post(`${server}${url}`, {}, { headers })
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });

  getById = (url, id) =>
    new Promise((resolve, reject) => {
      const token = this.Auth.getToken();
      const headers = { "x-auth-token": token };
      return axios
        .get(`${server}${url}/${id}`, { headers })
        .then(res => {
          //console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
}
