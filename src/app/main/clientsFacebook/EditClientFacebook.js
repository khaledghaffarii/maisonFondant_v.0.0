import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import FormHeader from "../sharedComponent/FormHeader";
import ClientFormFacebook from "./ClientFacebookForm";
import decode from "jwt-decode";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditClientFacebook extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {};
    this.update = this.update.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }
  async componentDidMount() {
    try {
      const url = env.clientFacebook.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      this.setState({
        ...response.data,
        status: {
          key: `status_${response.data.status}`,
          value: response.data.status,
          label: response.data.status ? "Confirmé" : "Non Confirmé",
        },
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
  handleChangeSelect(event) {
    this.setState({
      disponibilite: event.target.value,
    });
  }
  async update() {
    try {
      const user = decode(localStorage.getItem("id_token"));
      const urlReparation = env.clientFacebook.update(this.state._id);
      this.state.updatedBy = user.id;
      let state = this.state;
      state.status = state.status.value;
      await this.request.update(urlReparation, state, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/clientFb");
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
            returnRoute="/clientFb"
            title={
              <Translation>
                {(t) => <div>{t("commandes.customerUpdate")}</div>}
              </Translation>
            }
          />
        }
        content={
          <ClientFormFacebook
            handleChange={this.handleChange}
            handleSubmit={this.update}
            handleStatusChange={(status) => this.setState({ status })}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("speciality.update.button")}</div>}
              </Translation>
            }
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(EditClientFacebook))
  )
);
