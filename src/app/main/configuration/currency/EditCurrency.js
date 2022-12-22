import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../../utils/Request";
import AuthHelperMethods from "../../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { FusePageCarded } from "@fuse";
import FormHeader from "../../sharedComponent/FormHeader";
import CurrencyForm from "./CurrencyForm";
import env from "../../../static";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class EditCurrency extends Component {
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
    this.update = this.update.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  async update() {
    const {
      currencyFrancais,
      currencyArabe,
      currencyEnglish,
      abreviationFrancais,
      abreviationArabe,
      abreviationEnglish,
    } = this.state;
    try {
      const url = env.currency.update(this.props.match.params.id);
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
      this.props.history.push("/currency");
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
      const url = env.currency.info;
      const etats = await this.request.getById(url, this.props.match.params.id);

      this.setState({
        currencyFrancais: etats.data.currencyFrancais,
        id: etats.data._id,
        currencyArabe: etats.data.currencyArabe,
        currencyEnglish: etats.data.currencyEnglish,
        abreviationFrancais: etats.data.abreviationFrancais,
        abreviationArabe: etats.data.abreviationArabe,
        abreviationEnglish: etats.data.abreviationEnglish,
        loading: false,
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        //console.log(e)
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
            returnRoute="/currency"
            title={
              <Translation>
                {(t) => <div>{t("currency.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <CurrencyForm
            showCover={this.state.showCover}
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("currency.update")}</div>}
              </Translation>
            }
            handleChange={this.handleChange}
            id={this.props.match.params.id}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(EditCurrency))
  )
);
