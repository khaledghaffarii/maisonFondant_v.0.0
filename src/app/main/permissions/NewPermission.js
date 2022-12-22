import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import PermissionForm from "./PermissionForm";
const styles = (theme) => ({
  layoutRoot: {},
});

class NewPermission extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      method: "",
      route: "",
      description: "",
      methodsValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeMethod = this.handleChangeMethod.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit = async (e) => {
    try {
      const data = {
        name: this.state.name,
        method: this.state.method.label,
        route: this.state.route,
        description: this.state.description,
      };
      const url = env.permissions.new;

      await this.request.new(url, data);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/permission");
    } catch (err) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          {
            variant: "error",
          }
        );
      }
    }
  };

  handleChangeMethod(value) {
    this.setState({
      method: value,
      methodsValid: value !== "" ? true : false,
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
            returnRoute="/permission"
            title={
              <Translation>
                {(t) => <div>{t("permission.add")}</div>}
              </Translation>
            }
          />
        }
        content={
          <PermissionForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            state={this.state}
            title={
              <Translation>
                {(t) => <div>{t("permission.add")}</div>}
              </Translation>
            }
            ButtonText={
              <Translation>
                {(t) => <div>{t("permission.add")}</div>}
              </Translation>
            }
            handleChangeMethod={this.handleChangeMethod}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(NewPermission))
  )
);
