import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, CardContent } from "@material-ui/core";
import { FuseChipSelect } from "@fuse";

import { FuseAnimate } from "@fuse";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class PermissionForm extends Component {
  constructor(props) {
    super(props);
    this.isFormValid = false;
    this.state = {
      isFormValid: false,
      finalFormValidation: this.isFormValid && this.props.state.methodsValid,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      this.setState({
        finalFormValidation:
          this.state.isFormValid && nextProps.state.methodsValid,
      });
    }
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
    this.isFormValid = true;
  }

  render() {
    const props = this.props;
    const suggestionsMethod = [
      {
        key: 1,
        value: 1,
        label: "POST",
      },
      {
        key: 2,
        value: 2,
        label: "GET",
      },
      {
        key: 3,
        value: 3,
        label: "ANY",
      },
    ];
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
                value={props.state.name}
                type="text"
                name="name"
                label={
                  <Translation>
                    {(t) => <div>{t("boutique.name")}</div>}
                  </Translation>
                }
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />

              <FuseChipSelect
                className="mt-8 mb-16"
                value={props.state.method}
                onChange={props.handleChangeMethod}
                required
                placeholder={
                  <Translation>
                    {(t) => (
                      <div>
                        {" "}
                        <p> {t("permission.select")}</p>
                      </div>
                    )}
                  </Translation>
                }
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("permission.method")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsMethod}
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                type="text"
                name="route"
                label="Route"
                value={props.state.route}
                onChange={props.handleChange}
                margin="normal"
                required
                variant="outlined"
              />

              <TextFieldFormsy
                className="mt-8 mb-16"
                type="text"
                name="description"
                label="Description"
                multiline
                rows="4"
                value={props.state.description}
                onChange={props.handleChange}
                required
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                disabled={!this.state.finalFormValidation}
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

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(PermissionForm))
);
