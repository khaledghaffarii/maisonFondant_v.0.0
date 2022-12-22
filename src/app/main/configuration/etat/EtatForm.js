import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";

class DevisForm extends Component {
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
                value={props.state.etatFrancais}
                label={
                  <Translation>
                    {(t) => <div>{t("state.frenchState")}</div>}
                  </Translation>
                }
                name="etatFrancais"
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
                value={props.state.etatArabe}
                label={
                  <Translation>
                    {(t) => <div>{t("state.arabicState")}</div>}
                  </Translation>
                }
                name="etatArabe"
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
                value={props.state.etatEnglish}
                label={
                  <Translation>
                    {(t) => <div>{t("state.englishState")}</div>}
                  </Translation>
                }
                name="etatEnglish"
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
                    {(t) => <div>{t("state.frenchDescription")}</div>}
                  </Translation>
                }
                name="descriptionFrancais"
                type="text"
                multiline
                rowsMax="5"
                rows={5}
                value={props.state.descriptionFrancais}
                onChange={props.handleChange}
                margin="normal"
                helperText="décrivez votre description en francais"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                label={
                  <Translation>
                    {(t) => <div>{t("state.arabicDescription")}</div>}
                  </Translation>
                }
                name="descriptionArabe"
                type="text"
                multiline
                rowsMax="5"
                rows={5}
                value={props.state.descriptionArabe}
                onChange={props.handleChange}
                margin="normal"
                helperText="décrivez votre description an arabe"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                label={
                  <Translation>
                    {(t) => <div>{t("state.englishDescription")}</div>}
                  </Translation>
                }
                name="descriptionEnglish"
                type="text"
                multiline
                rowsMax="5"
                rows={5}
                value={props.state.descriptionEnglish}
                onChange={props.handleChange}
                margin="normal"
                helperText="décrivez votre pièce en occasion"
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
export default withTranslation()(withRouter(DevisForm));
