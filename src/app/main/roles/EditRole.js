import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import RoleForm from "./RoleForm";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditRole extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      options: [],
      permissions: [],
      permissionsValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.handleChipChange = this.handleChipChange.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleChipChange(value) {
    this.setState({
      permissions: value,
      permissionsValid: value.length > 0,
    });
  }

  async update() {
    try {
      let permissions = [];
      this.state.permissions.forEach((elem) => {
        permissions.push(elem.value);
      });
      const role = {
        name: this.state.name,
        permissions: permissions,
      };
      const url = env.roles.update(this.props.match.params.id);
      await this.request.update(url, role, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/role");
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

  async componentDidMount() {
    try {
      const url = env.roles.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlPermission = env.permissions.all;
      const permissionsLoaded = await this.request.getAll(urlPermission);

      let permissions = [];
      response.data.permissions.forEach((elem) => {
        permissions.push({ key: elem._id, value: elem._id, label: elem.name });
      });
      this.setState({
        name: response.data.name,
        permissions: permissions,
        options: permissionsLoaded.data,
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
            returnRoute="/role"
            title={
              <Translation>{(t) => <div>{t("role.add")}</div>}</Translation>
            }
          />
        }
        content={
          <RoleForm
            handleChange={this.handleChange}
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("role.add")}</div>}</Translation>
            }
            handleChipChange={this.handleChipChange}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditRole)))
);
