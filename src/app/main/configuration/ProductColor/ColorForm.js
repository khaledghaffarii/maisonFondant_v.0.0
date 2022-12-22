import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
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
              <Grid container alignItems="flex-start">
                <Grid item xs={1}>
                  <TextFieldFormsy
                    color="primary"
                    className="w-full my-16"
                    disabled
                    value={"       #"}
                    name="codeColor"
                    type="text"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextFieldFormsy
                    className="w-full my-16"
                    value={props.state.codeColor}
                    label={
                      <Translation>
                        {(t) => <div>{t("color.codeColor")}</div>}
                      </Translation>
                    }
                    name="codeColor"
                    type="text"
                    onChange={props.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    required
                  />
                </Grid>
              </Grid>

              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.nameColorFrancais}
                label={
                  <Translation>
                    {(t) => <div>{t("color.nameColorFrench")}</div>}
                  </Translation>
                }
                name="nameColorFrancais"
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
                value={props.state.nameColorArabe}
                label={
                  <Translation>
                    {(t) => <div>{t("color.nameColorArabic")}</div>}
                  </Translation>
                }
                name="nameColorArabe"
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
                value={props.state.nameColorEnglish}
                label={
                  <Translation>
                    {(t) => <div>{t("color.nameColorEnglish")}</div>}
                  </Translation>
                }
                name="nameColorEnglish"
                type="text"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
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
