/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  Button,
  InputAdornment,
  Icon,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { RadioGroupFormsy, CheckboxFormsy, TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import AuthHelperMethods from "../../../services/AuthHelperMethods";
import { Redirect } from "react-router-dom";
import env from "../../../static";
import T from "../../../textes";

const styles = (theme) => ({
  layoutRoot: {},
});

class JWTLoginForm extends Component {
  Auth = new AuthHelperMethods();
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isFormValid: false,
      toDashboard: false,
      isAdmin: false,
      user: "team",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
  }
  componentDidMount() {}

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleChangeUser(event) {

    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
      localStorage.clear();
    localStorage.setItem("AdminOrTeam",value)
 
  }

  handleChecked(event) {
    this.setState({
      isAdmin: event.target.checked,
    });
    if (event.target.checked) localStorage.setItem("AdminOrTeam", "admin");
    else localStorage.setItem("AdminOrTeam", "team");
  
  }

  disableButton() {
    this.setState({
      isFormValid: false,
    });
  }
  enableButton() {
    this.setState({
      isFormValid: true,
    });
  }

  handleSubmit = (e) => {
    localStorage.clear();
    localStorage.setItem("AdminOrTeam", this.state.user); 
    const url=env.globalUrl+this.state.user+"-api/v1/auth/login"
    this.setState({ showError: false });
    this.Auth.login(
      url,
      this.state.email,
      this.state.password,
      this.state.user
    )
      .then((res) => {
        if (res === false) {
          return this.setState({
            showError: true,
            message: T.WRONG_USERNAME,
          });
        }
      else  {this.setState(() => ({
          toDashboard: true,
        }));
        window.location.reload('/');
    }
      })
      .catch((err) => {
        this.setState({ showError: true, message: T.WRONG_USERNAME });
      });
  };

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="w-full">
        <Formsy
          onValidSubmit={this.handleSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          className="flex flex-col justify-center w-full"
        >
          <span
            style={
              this.state.showError
                ? {
                    color: "white",
                    background: "rgb(255, 32, 5)",
                    fontSize: 15,
                    margin: "20px 0",
                    padding: 15,
                  }
                : { display: "none" }
            }
          >
            {this.state.message}
          </span>
          <TextFieldFormsy
            className="mb-16"
            type="text"
            name="email"
            label={T.USERNAME}
            validations={{
              minLength: 4,
            }}
            validationErrors={{
              minLength: T.MIN_USERNAME,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    email
                  </Icon>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            required
            onChange={this.handleChange}
          />

          <TextFieldFormsy
            className="mb-16"
            type="password"
            name="password"
            label={T.PASSWORD}
            validations={{
              minLength: 4,
            }}
            validationErrors={{
              minLength: T.MIN_PASS,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="text-20" color="action">
                    vpn_key
                  </Icon>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            required
            onChange={this.handleChange}
          />
          {/* <CheckboxFormsy 
            className="my-16"
            name="isAdmin"
            value={this.state.isAdmin}
            label="Admin"
            onChange={this.handleChecked}
            /> */}
          <RadioGroupFormsy
            className="my-16"
            name="user"
            value={localStorage.getItem("AdminOrTeam") || this.state.user}
            onChange={this.handleChangeUser}
          >
            <FormControlLabel
              value="admin"
              control={<Radio color="primary" />}
              label="Admin"
            />
            <FormControlLabel
              value="team"
              control={<Radio color="primary" />}
              label="Team"
            />
          </RadioGroupFormsy>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mx-auto mt-16 normal-case"
            aria-label="LOG IN"
            disabled={!this.state.isFormValid}
            value="legacy"
          >
            {T.LOGIN}
          </Button>
        </Formsy>
      </div>
    );
  }
}
export default JWTLoginForm;
