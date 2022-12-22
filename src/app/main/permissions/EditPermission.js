import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import env from "../../static";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import FormHeader from "../sharedComponent/FormHeader";
import PermissionForm from "./PermissionForm";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditPermission extends Component {
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
    this.update = this.update.bind(this);
    this.handleChangeMethod = this.handleChangeMethod.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  async update(e, newData) {
    try {
      const permission = {
        name: this.state.name,
        method: this.state.method.label,
        route: this.state.route,
        description: this.state.description,
      };
      const url = env.permissions.update(this.props.match.params.id);
      await this.request.update(url, permission, false);
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
  }
  handleChangeMethod(value) {
    this.setState({
      method: value,
      methodsValid: value !== "" ? true : false,
    });
  }

  async componentDidMount() {
    try {
      const url = env.permissions.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );

      this.setState({
        name: response.data.name,
        method: {
          key: 1,
          value: 1,
          label: response.data.method,
        },
        route: response.data.route,
        description: response.data.description,
        methodsValid: response.data.method ? true : false,
      });
    } catch (e) {
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
                {(t) => <div>{t("permission.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <PermissionForm
            handleChange={this.handleChange}
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("permission.update")}</div>}
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
    withSnackbar(withRouter(EditPermission))
  )
);
