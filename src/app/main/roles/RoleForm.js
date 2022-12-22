import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import { withRouter } from "react-router-dom";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class RoleForm extends Component {
  //const { classes } = props;
  constructor(props) {
    super(props);
    this.isFormValid = false;

    this.state = {
      isFormValid: false,
      finalFormValidation:
        this.isFormValid && this.props.state.permissionsValid,
    };

    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      this.setState({
        finalFormValidation:
          this.state.isFormValid && nextProps.state.permissionsValid,
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
    const options = props.state.options;
    const suggestions = options.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.name,
    }));
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
                className="mt-8 mb-16 mr-8"
                value={props.state.name}
                type="text"
                name="name"
                label={<Translation>{(t) => <div>{t("boutique.name")}</div>}</Translation>}
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />

              <FuseChipSelect
                className="w-full my-16"
                validations={{ minLength: 1 }}
                validationErrors={{
                  minLength: "You need to select at least one",
                }}
                required
                value={props.state.permissions}
                onChange={props.handleChipChange}
                placeholder="Select multiple permissions"
                textFieldProps={{
                  label: "Permissions",
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestions}
                isMulti
              />

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                disabled={!this.state.finalFormValidation}
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

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(RoleForm))
);
