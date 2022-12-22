import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import decode from "jwt-decode";
import AuthHelperMethods from "../../../services/AuthHelperMethods";
import FormHeader from "../../sharedComponent/FormHeader";
import Request from "../../../utils/Request";
import EtatForm from "./EtatForm";
import env from "../../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewEtat extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      etatFrancais: "",
      etatArabe: "",
      etatEnglish: "",
      descriptionFrancais: "",
      descriptionArabe: "",
      descriptionEnglish: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    const {
      etatFrancais,
      etatArabe,
      etatEnglish,
      descriptionFrancais,
      descriptionArabe,
      descriptionEnglish,
    } = this.state;

    try {
      const url = env.etat.new;

      const response = await this.request.new(
        url,
        {
          etatFrancais,
          etatArabe,
          etatEnglish,
          descriptionFrancais,
          descriptionArabe,
          descriptionEnglish,
        },
        false
      );
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );

      this.setState({ id: response.data._id });

      this.props.history.push(`/etat`);
    } catch (err) {
      if (err.response) {
        this.props.enqueueSnackbar(err.response.data.message, {
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

  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <FormHeader
            returnRoute="/etat"
            title={
              <Translation>{(t) => <div>{t("state.add")}</div>}</Translation>
            }
          />
        }
        content={
          <EtatForm
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("state.add")}</div>}</Translation>
            }
            handleChange={this.handleChange}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewEtat)))
);
