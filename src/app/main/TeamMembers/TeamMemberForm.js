import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import CroppedImage from "../sharedComponent/CroppedImage";
import { Grid } from "@material-ui/core";
import { TextFieldFormsy } from "@fuse";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
class TeamMemberForm extends Component {
  constructor(props) {
    super(props);
    this.isFormValid = false;
    this.state = {
      isFormValid: false,
      passwordShown:false,
      finalFormValidation: this.isFormValid,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      this.setState({
        finalFormValidation: this.state.isFormValid,
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
    const optionRole = props.state.optionRoles;
    const suggestionsRoles = optionRole.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.name,
    }));
    const optionTeam = props.state.optionTeams;
    console.log("props.state.optionTeams", props.state.optionTeams);
    const suggestionsTeams = optionTeam.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.name,
    }));

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
              name="registerForm"
              onValidSubmit={props.handleSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              className="flex flex-col justify-center w-full"
            >
              <CroppedImage fileChangedHandler={props.fileChangedHandler} />
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
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.team}
                onChange={props.handleChipChangeTeam}
                placeholder="Select  Team"
                name="Teams"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("team.team")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsTeams}
              />

              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.fname}
                type="text"
                name="fname"
                label={
                  <Translation>
                    {(t) => <div>{t("repairer.firstName")}</div>}
                  </Translation>
                }
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.lname}
                type="text"
                name="lname"
                label={
                  <Translation>
                    {(t) => <div>{t("repairer.lastName")}</div>}
                  </Translation>
                }
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />

              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.email}
                type="email"
                name="email"
                onChange={props.handleChange}
                label={
                  <Translation>
                    {(t) => <div>{t("repairer.email")}</div>}
                  </Translation>
                }
                validations="isEmail"
                validationError={
                  props.state.email != "" ? (
                    <Translation>
                      {(t) => <div>{t("customer.errors.email")}</div>}
                    </Translation>
                  ) : (
                    ""
                  )
                }
                autoComplete="email"
                margin="normal"
                variant="outlined"
                required
              />

              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.phone}
                type="number"
                name="phone"
                label={
                  <Translation>
                    {(t) => <div>{t("repairer.phone")}</div>}
                  </Translation>
                }
                validations={{
                  minLength: 8,
                  maxLength: 8,
                }}
                validationErrors={{
                  minLength: (
                    <Translation>
                      {(t) => <div>{t("boutique.errors.phone.minLength")}</div>}
                    </Translation>
                  ),
                  maxLength: (
                    <Translation>
                      {(t) => <div>{t("boutique.errors.phone.maxLength")}</div>}
                    </Translation>
                  ),
                }}
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />

              <FuseChipSelect
                className="w-full my-16"
                value={props.state.role}
                onChange={props.handleChipChangeRole}
                placeholder="Select  role"
                textFieldProps={{
                  label: "Roles",
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsRoles}
              />

              {/*<TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.username}
                type="text"
                name="username"
                label="Username"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
                required
              />*/}
              {props.showPassword && (
                <>
                  <Grid container alignItems="flex-start" spacing={1}>
                    <Grid item xs={10}>
                      <TextFieldFormsy
                        className="w-full my-16"
                        value={props.state.password}
                        type={this.state.passwordShown ? "text" : "password"}
                        name="password"
                        label={
                          <Translation>
                            {(t) => <div>{t("customer.password")}</div>}
                          </Translation>
                        }
                        validations={{
                          minLength: 5,
                        }}
                        validationErrors={{
                          minLength: (
                            <Translation>
                              {(t) => (
                                <div>{t("customer.errors.password")}</div>
                              )}
                            </Translation>
                          ),
                        }}
                        onChange={props.handleChange}
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        className="w-full my-16"
                        aria-label="Register"
                        onClick={props.handleGeneratePassword}
                      >
                        <Translation>
                          {(t) => (
                            <div>{t("teamMember.passwordGenerator")}</div>
                          )}
                        </Translation>
                      </Button>
                    </Grid>
                  </Grid>
                 <div>Show Password <input type="checkbox" onChange={()=>this.setState({passwordShown: !this.state.passwordShown,
      })}/></div> 
                </>
              )}

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

export default withTranslation()(withRouter(TeamMemberForm));
