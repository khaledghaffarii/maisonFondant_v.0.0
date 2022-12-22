import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { TextFieldFormsy, FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class TeamForm extends Component {
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
    const optionsCountry = props.state.listCountry;
    // console.log("optionsColor",optionsColor);
    const suggestionCountry = optionsCountry.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.countryName,
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
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.country}
                onChange={props.handleChipChangeCountry}
                placeholder="Select Country"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("coutry.country")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionCountry}
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
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
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.description}
                type="text"
                name="description"
                label="Description"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                type="submit"
                disabled={!this.state.isFormValid}
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
  withStyles(styles, { withTheme: true })(withRouter(TeamForm))
);
