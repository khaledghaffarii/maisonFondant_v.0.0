import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import AuthHelperMethods from "../../../services/AuthHelperMethods";
import FormHeader from "../../sharedComponent/FormHeader";
import Request from "../../../utils/Request";
import CurrencyForm from "./CurrencyForm";
import env from "../../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewCurrency extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      currencyFrancais: "",
      currencyArabe: "",
      currencyEnglish: "",
      abreviationFrancais: "",
      abreviationArabe: "",
      abreviationEnglish: "",
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
      currencyFrancais,
      currencyArabe,
      currencyEnglish,
      abreviationFrancais,
      abreviationArabe,
      abreviationEnglish,
    } = this.state;

    try {
      const url = env.currency.new;

      //console.log(etatFrancais,etatArabe,etatEnglish,descriptionFrancais,descriptionArabe,descriptionEnglish);

      const response = await this.request.new(
        url,
        {
          currencyFrancais,
          currencyArabe,
          currencyEnglish,
          abreviationFrancais,
          abreviationArabe,
          abreviationEnglish,
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
      //  console.log("response"+response.data.tva);
      this.setState({ id: response.data._id });

      this.props.history.push(`/currency`);
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
            returnRoute="/currency"
            title={
              <Translation>{(t) => <div>{t("currency.add")}</div>}</Translation>
            }
          />
        }
        content={
          <CurrencyForm
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("currency.add")}</div>}</Translation>
            }
            handleChange={this.handleChange}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewCurrency)))
);
