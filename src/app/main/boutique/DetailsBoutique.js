import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { TextFieldFormsy } from "@fuse";
import MapComponent from "../sharedComponent/MapComponent";

import Formsy from "formsy-react";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
import TimeField from "react-simple-timefield";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class DetailsBoutique extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      specialities: [],
      optionSpecialities: [],
      adress: "",
      latitude: "",
      longitude: "",
      phone: "",
      workTime: "",
      startWork: "",
      endWork: "",
      facebookPage: "",
      website: "",
      file: "",
      picture: "",
    };
  }
  async componentDidMount() {
    try {
      const url = env.boutiques.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlSpecialities = env.specialities.all;
      const responseSpecialities = await this.request.getAll(urlSpecialities);
      let specialities = [];
      response.data.specialities.forEach((elem) => {
        specialities.push(elem.name);
      });
      const time = response.data.workTime.split(" ");
      this.setState({
        name: response.data.name,
        specialities: specialities,
        optionSpecialities: responseSpecialities.data,
        adress: response.data.adress,
        latitude: response.data.location.coordinates[0],
        longitude: response.data.location.coordinates[1],
        phone: response.data.phone,
        workTime: response.data.workTime,
        startWork: time[0],
        endWork: time[1],
        facebookPage: response.data.facebookPage,
        website: response.data.website,
        picture: response.data.picture,
      });
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
  render() {
    const { classes } = this.props;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <FormHeader
            returnRoute="/boutique"
            title={
              <Translation>
                {(t) => <div>{t("boutique.details")}</div>}
              </Translation>
            }
          />
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FuseAnimate animation="transition.expandIn">
              <CardContent className="flex flex-col items-center justify-center p-32">
                <Formsy
                  name="registerForm"
                  className="flex flex-col justify-center w-full"
                >
                  <img
                    alt="Crop"
                    style={{ maxWidth: "100%" }}
                    src={`${env.staticFiles}${this.state.picture}`}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.name}
                    type="text"
                    name="name"
                    label={
                      <Translation>
                        {(t) => <div>{t("boutique.name")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.specialities}
                    type="text"
                    name="specialities"
                    label={
                      <Translation>
                        {(t) => <div>{t("boutique.speciality.title")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.adress}
                    type="text"
                    label={
                      <Translation>
                        {(t) => <div>{t("boutique.address")}</div>}
                      </Translation>
                    }
                    name="adress"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      height: "450px",
                    }}
                  >
                    <MapComponent
                      className="mt-8 mb-16"
                      setLocation={this.setLocation}
                      state={this.state}
                    />
                  </div>
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.phone}
                    label={
                      <Translation>
                        {(t) => <div>{t("boutique.phone")}</div>}
                      </Translation>
                    }
                    name="phone"
                    type="text"
                    validations={{
                      minLength: 8,
                    }}
                    validationErrors={{
                      minLength: (
                        <Translation>
                          {(t) => <div>{t("boutique.endTime")}</div>}
                        </Translation>
                      ),
                    }}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <div style={{ marginRight: 20 }} className="w-full my-16">
                    <TimeField
                      value={this.state.startWork}
                      onChange={this.onTimeChangeStartWork}
                      input={
                        <TextField
                          label={
                            <Translation>
                              {(t) => <div>{t("boutique.startTime")}</div>}
                            </Translation>
                          }
                          className="w-full my-16"
                          value={this.state.startWork}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      }
                    />
                  </div>
                  <div style={{ marginRight: 20 }} className="w-full my-16">
                    <TimeField
                      value={this.state.endWork}
                      onChange={this.onTimeChangeEndWork}
                      input={
                        <TextField
                          label={
                            <Translation>
                              {(t) => <div>{t("boutique.endTime")}</div>}
                            </Translation>
                          }
                          className="w-full my-16"
                          value={this.state.endWork}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      }
                    />
                  </div>
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.facebookPage}
                    label={
                      <Translation>
                        {(t) => <div>{t("boutique.facebook")}</div>}
                      </Translation>
                    }
                    name="Facebook Page"
                    type="text"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.website}
                    label={
                      <Translation>
                        {(t) => <div>{t("boutique.website")}</div>}
                      </Translation>
                    }
                    name="website"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Formsy>
              </CardContent>
            </FuseAnimate>
          </div>
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(DetailsBoutique))
  )
);
