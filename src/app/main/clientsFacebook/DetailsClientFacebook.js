import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import env from "../../static";

import { withRouter } from "react-router-dom";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { FuseAnimate } from "@fuse";
const styles = (theme) => ({
  layoutRoot: {},
});

class DetailsClientFacebook extends Component {
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
      phone: "",
      name: "",
      file: "",
      prix: "",
      parent: "",
      couleur: "",
      disponibilite: "",
      prixFournisseur: "",
      naturePanne: "",
      remarques: "",
      notes: "",
      picture: "",
    };
  }

  async componentDidMount() {
    try {
      const url = env.clientFacebook.info;
      const urlGouvernorats = env.gouvernorats.all;

      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const gouvernorats = await this.request.getAll(urlGouvernorats);

      console.log(this.props.match);

      this.setState({
        clientId: response.data.owner._id,
        reparationId: response.data._id,
        fname: response.data.owner.fname,
        lname: response.data.owner.lname,
        gouvernorat: response.data.owner.adress.gouvernorat,
        delegation: response.data.owner.adress.delegation,
        localite: response.data.owner.adress.localite,
        codePostal: response.data.owner.adress.codePostal,
        email: response.data.owner.email,
        username: response.data.owner.username,
        phone: response.data.owner.phone,
        detailsPanne: response.data.detailsPanne,
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
            returnRoute="/clientFb"
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
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.fname}
                    type="text"
                    name="name"
                    label={
                      <Translation>
                        {(t) => <div>{t("stock.fullName")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {/* <TextFieldFormsy
                                        className="mt-8 mb-16 mr-8"
                                        value={this.state.lname}
                                        type="text"
                                        name="lname"
                                        label="Lname"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    /> */}
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.adress}
                    type="text"
                    name="adress"
                    label={
                      <Translation>
                        {(t) => (
                          <div>{t("customer.faceboock.customer.address")}</div>
                        )}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  {/* <TextFieldFormsy
                                        className="mt-8 mb-16 mr-8"
                                        value={this.state.delegation}
                                        type="text"
                                        name="delegation"
                                        label="delegation"
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
                                        label="localite"
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
                                        label="codePostal"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}

                                    /> */}

                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.email}
                    type="email"
                    name="email"
                    label={
                      <Translation>
                        {(t) => (
                          <div>{t("customer.faceboock.customer.email")}</div>
                        )}
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
                    value={this.state.code}
                    type="text"
                    name="code"
                    label="Code"
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

                  <section>
                    {
                      <Translation>
                        {(t) => <div>{t("reparation.details")}</div>}
                      </Translation>
                    }
                  </section>

                  <TextFieldFormsy
                    className="mt-8 mb-16 "
                    value={this.state.detailsPanne}
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.panneDetails")}</div>}
                      </Translation>
                    }
                    name="detailsPanne"
                    type="text"
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
    withSnackbar(withRouter(DetailsClientFacebook))
  )
);
