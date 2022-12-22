import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import env from "../../static";

import { withRouter } from "react-router-dom";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
const styles = (theme) => ({
  layoutRoot: {},
});

class DetailsClient extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      gouvernorat: "",
      delegation: "",
      localite: "",
      codePostal: "",
      email: "",
      username: "",
      password: "",
      file: "",
      phone: "",
      picture: "",
    };
  }

  async componentDidMount() {
    try {
      const url = env.clients.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      this.setState({
        fname: response.data.fname,
        lname: response.data.lname,
        gouvernorat: response.data.adress.gouvernorat,
        delegation: response.data.adress.delegation,
        localite: response.data.adress.localite,
        codePostal: response.data.adress.codePostal,
        email: response.data.email,
        username: response.data.username,
        phone: response.data.phone,
        picture: response.data.picture,
      });
      const urlGouvernorats = env.gouvernorats.all;
      const gouvernorats = await this.request.getAll(urlGouvernorats);
      this.setState({
        gouvernoratsOptions: gouvernorats.data,
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
            returnRoute="/client"
            title={
              <Translation>
                {(t) => <div>{t("customer.customerDetails")}</div>}
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
                    value={this.state.fname}
                    type="text"
                    name="fname"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.firstName")}</div>}
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
                    value={this.state.lname}
                    type="text"
                    name="lname"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.lastName")}</div>}
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
                    value={this.state.gouvernorat}
                    type="text"
                    name="gouvernorat"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.governorates")}</div>}
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
                    value={this.state.delegation}
                    type="text"
                    name="delegation"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.delegation")}</div>}
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
                    value={this.state.localite}
                    type="text"
                    name="localite"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.locality")}</div>}
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
                    value={this.state.codePostal}
                    type="text"
                    name="codePostal"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.postalCode")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.email}
                    type="email"
                    name="email"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.email")}</div>}
                      </Translation>
                    }
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.username}
                    type="text"
                    name="username"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.userName")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.phone}
                    type="number"
                    name="phone"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.phone")}</div>}
                      </Translation>
                    }
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
    withSnackbar(withRouter(DetailsClient))
  )
);
