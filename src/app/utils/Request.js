import { List } from "@material-ui/icons";
import axios from "axios";
import AuthHelperMethods from "../services/AuthHelperMethods";

export default class Request {
  Auth = new AuthHelperMethods();

  new = (url, data, multipart) => {
    const token = this.Auth.getToken();
    let headers;
   
    if (multipart === true) {
      headers = {
        "x-auth-token": token,
        "content-type": "multipart/form-data"
      };
    } else {
      headers = { "x-auth-token": token };
    }
    
    return axios.post(`${url}`, data, { headers });
  };
  getAll = url => {
    const token = this.Auth.getToken();
    const headers = { "x-auth-token": token };

    return axios.get(`${url}`, { headers });
  };
  update = (url, data, multipart) => {
    const token = this.Auth.getToken();
    let headers;
    if (multipart === true) {
      headers = {
        "x-auth-token": token,
        "content-type": "multipart/form-data"
      };
    } else {
      headers = { "x-auth-token": token };
    }
    return axios.post(`${url}`, data, { headers });
  };
  delete = url => {
    const token = this.Auth.getToken();
    const headers = { "x-auth-token": token };
    return axios.post(`${url}`, {}, { headers });
  };
  getById = (url, id) => {
    const token = this.Auth.getToken();
    const headers = { "x-auth-token": token };
    return axios.get(`${url}/${id}`, { headers });
  };
  getByCategory = (url,data) => {
    const token = this.Auth.getToken();
    const headers = { "x-auth-token": token };
    return axios.post(`${url}`,data, { headers });
  };

     /****my code  */

     getTotal = (baseUrl, data) => {
        const token = this.Auth.getToken()
        const url = baseUrl + "/getNombreReparation";
        let headers = {
            'x-auth-token': token,
            'content-type': 'application/json'
        }


        return axios.post(url, data, { headers })
    };

    getCltStat = (baseUrl, data) => {
    
        const url = baseUrl + "/getClt";
        const token = this.Auth.getToken()

        let headers = {
            'x-auth-token': token,
            'content-type': 'application/json'
        }


        return axios.post(`${url}`, data, { headers })
    };

    getTotalCltFB = (baseUrl, data) => {
        const token = this.Auth.getToken()
        const url = baseUrl + "/getTotalCltFB";

        let headers = {
            'x-auth-token': token,
            'content-type': 'application/json'
        }

        return axios.post(url, data, { headers })
    };


    getStatRepCat = (baseUrl, data) => {
        const token = this.Auth.getToken()
        const url = baseUrl + "/getCountRepCat";
        let headers = {
            'x-auth-token': token,
            'content-type': 'application/json'
        }


        return axios.post(url, data, { headers })

    };
    getStatReparateurs = (baseUrl, data) => {
        const token = this.Auth.getToken()
        const url = baseUrl + "/getCountReparateurs";
        let headers = {
            'x-auth-token': token,
            'content-type': 'application/json'
        }


        return axios.post(url, data, { headers })

    };

    getCltChatbot = (baseUrl, data) => {
        const token = this.Auth.getToken()
        const url = baseUrl + "/getTotalCltChatbot";

        let headers = {
            'x-auth-token': token,
            'content-type': 'application/json'
        }



        return axios.post(url, data, { headers })
    };
   

    getTotalBoutiques = (baseUrl, data) => {
        const token = this.Auth.getToken()
        const url = baseUrl + "/getCountBoutique";

        let headers = {
            'x-auth-token': token,
            'content-type': 'application/json'
        }



        return axios.post(url, data, { headers })
    };



    getStatBoutiques = (baseUrl, data) => {
        const token = this.Auth.getToken()
        const url = baseUrl + "/getStatBoutique";
        let headers = {
            'x-auth-token': token,
            'content-type': 'application/json'
        }


        return axios.post(url, data, { headers })
    };
    getTotalB2B = (baseUrl, data) => {
        const token = this.Auth.getToken()
        const url = baseUrl + "/getCountB2B";

        let headers = {
            'x-auth-token': token,
            'content-type': 'application/json'
        }

        return axios.post(url, data, { headers })
    };
 

  getWordpressData = () => {
      const baseurl = 'http://localhost/testsite/wp-json/wp/v2/taxonomies'
      const url = "https://pixeljstudios.com/bookingpj/wp-json/wp/v2/posts/(?P<parent>[\\d]+)/revisions/(?P<id>[\\d]+)"
      const data = {
          username: 'asma',
          user_password: 'Kh123456789',
      }

      return axios.get(baseurl)
  }

  updateWithPut= (url, data, multipart) => {
    const token = this.Auth.getToken();
    let headers;
    if (multipart === true) {
      headers = {
        "x-auth-token": token,
        "content-type": "multipart/form-data"
      };
    } else {
      headers = { "x-auth-token": token };
    }
    return axios.put(`${url}`, data, { headers });
  };
}
