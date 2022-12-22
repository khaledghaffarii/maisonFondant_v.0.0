import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation, Translation } from "react-i18next";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import UserForm from "./UserForm";
import { withRouter } from "react-router-dom";
import env from "../../static";
import swal from "sweetalert";
const styles = (theme) => ({
  layoutRoot: {},
});

class Notification extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      showUser: true,
      users: [],
      productName: "",
    };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit = async (e) => {
    try {
      fetch(env.notifications.notifyUser, {
        method: "POST",
        headers: {
          "x-auth-token": this.Auth.getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: this.state.user._id,
          title: this.state.title,
          body: this.state.body,
        }),
      })
        .then((res) => res.json())
        .then(() =>
          swal(
            "Success",
            <Translation>
              {(t) => <div>{t("notification.success")}</div>}
            </Translation>,
            "success"
          ).then(() => this.props.history.push("/notify"))
        )
        .catch((e) => swal(<Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>, e.message, "error"));
    } catch (err) {
      this.props.history.push("/notify");
    }
  };
  async handleSuggestUser(value) {
    if (value.length > 3) {
      const token = this.Auth.getToken();
      fetch(env.clients.all + "?search=" + value, {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((users) => this.setState({ users }));
    } else if (value.length === 0) {
      this.setState({ users: [] });
    }
  }
  handleSelect(client) {
    this.setState({
      user: client,
      users: [],
      productName: `${client.fname} ${client.lname} (${client.phone})`,
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <FormHeader
            returnRoute="/notify"
            title={
              <Translation>
                {(t) => <div>{t("notification.title")}</div>}
              </Translation>
            }
          />
        }
        content={
          this.state.showUser ? (
            <UserForm
              handleSuggestUser={this.handleSuggestUser.bind(this)}
              handleSelect={this.handleSelect.bind(this)}
              handleChange={this.handleChange.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)}
              state={this.state}
              ButtonText={
                <Translation>
                  {(t) => <div>{t("notification.send")}</div>}
                </Translation>
              }
            />
          ) : (
            <div />
          )
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(Notification))
);
