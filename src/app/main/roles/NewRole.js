/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import RoleForm from "./RoleForm";
import env from "../../static";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class NewRole extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.FormElement = React.createRef();

    this.state = {
      name: "",
      options: [],
      permissions: [],
      permissionsValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async handleSubmit(e) {
    try {
      let permissions = [];
      this.state.permissions.map((elem) => {
        permissions.push(elem.value);
      });
      const role = {
        name: this.state.name,
        permissions: permissions,
      };

      const url = env.roles.new;
      await this.request.new(url, role, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/role");
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
  async componentDidMount() {
    try {
      const url = env.permissions.all;
      const permissions = await this.request.getAll(url);
      this.setState({
        options: permissions.data,
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
            ref={this.FormElement}
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("role.add")}</div>}</Translation>
            }
            handleChipChange={this.handleChipChange}
            handleChange={this.handleChange}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewRole)))
);
