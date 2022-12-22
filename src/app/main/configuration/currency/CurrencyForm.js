import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
class CurrencyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  disableButton() {
    this.setState({
      isFormValid: false,
    });
  }
  enableButton() {
    this.setState({
      isFormValid: true,
    });
  }

  render() {
    const props = this.props;
    return (
      <div className="p-16 sm:p-24 max-w-2xl">
        <FuseAnimate animation="transition.expandIn">
          <CardContent className="flex flex-col items-center justify-center p-32">
            <Formsy
              onValidSubmit={props.handleSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              className="flex flex-col justify-center w-full"
            >
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.currencyFrancais}
                label={
                  <Translation>
                    {(t) => <div>{t("currency.nameCurrencyFrench")}</div>}
                  </Translation>
                }
                name="currencyFrancais"
                type="text"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                required
              />

              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.currencyArabe}
                label={
                  <Translation>
                    {(t) => <div>{t("currency.nameCurrencyArabic")}</div>}
                  </Translation>
                }
                name="currencyArabe"
                type="text"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                required
              />

              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.currencyEnglish}
                label={
                  <Translation>
                    {(t) => <div>{t("currency.nameCurrencyEnglish")}</div>}
                  </Translation>
                }
                name="currencyEnglish"
                type="text"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                required
              />

              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                label={
                  <Translation>
                    {(t) => <div>{t("currency.AbrevationFrench")}</div>}
                  </Translation>
                }
                name="abreviationFrancais"
                type="text"
                value={props.state.abreviationFrancais}
                onChange={props.handleChange}
                margin="normal"
                helperText="décrivez votre abréviation en francais"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                label={
                  <Translation>
                    {(t) => <div>{t("currency.AbrevationArabic")}</div>}
                  </Translation>
                }
                name="abreviationArabe"
                type="text"
                value={props.state.abreviationArabe}
                onChange={props.handleChange}
                margin="normal"
                helperText="décrivez votre abréviation en arabe"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                label={
                  <Translation>
                    {(t) => <div>{t("currency.AbrevationEnglish")}</div>}
                  </Translation>
                }
                name="abreviationEnglish"
                type="text"
                value={props.state.abreviationEnglish}
                onChange={props.handleChange}
                margin="normal"
                helperText="décrivez votre abréviation en anglais"
                variant="outlined"
                required
              />
              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                disabled={!this.state.isFormValid}
                type="submit"
              >
                {props.ButtonText}
              </Button>
            </Formsy>
          </CardContent>
        </FuseAnimate>
      </div>
    );
  }
}
export default withTranslation()(withRouter(CurrencyForm));
