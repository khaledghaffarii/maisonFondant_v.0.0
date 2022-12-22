/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import AuthHelperMethods from "./AuthHelperMethods";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

/* A higher order component is frequently written as a function that returns a class. */
export default function withAuth(AuthComponent) {
  const Auth = new AuthHelperMethods();

  return class AuthWrapped extends Component {
    constructor(props) {
      super(props);
      this.state = {
        confirm: null,
        loaded: false
      };
    }
    /*else if (!Auth.loggedIn() && window.location.href.indexOf('/formProvider') !== -1) {
                console.log('d5al')
               console.log(window.location.href)
               const link = window.location.href;
                window.location = link.toString();
            } */

    /* In the componentDid<ount, we would want to do a couple of important tasks in order to verify the current users authentication status
        prior to granting them enterance into the app. */
    componentWillMount() {
      if (
        !Auth.loggedIn() &&
        window.location.href.indexOf("/formProvider") !== -1
      ) {
        this.setState({
          loaded: true
        });
      } else if (
        !Auth.loggedIn() &&
        window.location.href.indexOf("/login") == -1
      ) {
        console.log(this.props);
        //this.props.history.replace('/login')
        // eslint-disable-next-line no-unused-expressions
        //console.log(!Auth.loggedIn());

        //return <Link to='/login' />
        window.location = "/login";
      } else if (Auth.loggedIn()) {
        /* Try to get confirmation message from the Auth helper. */
        try {
          const confirm = Auth.getConfirm();
          console.log("confirmation is:", confirm);
          this.setState({
            confirm: confirm,
            loaded: true
          });
        } catch (err) {
          /* Oh snap! Looks like there's an error so we'll print it out and log the user out for security reasons. */
          console.log(err);
          Auth.logout();
          // this.props.history.replace('/login');
          console.log("condition 2");
        }
      } else {
        this.setState({
          loaded: true
        });
      }
    }

    render() {
      if (this.state.loaded === true) {
        return (
          /* component that is currently being wrapper(App.js) */
          <AuthComponent />
        );
      }
    }
  };
}
