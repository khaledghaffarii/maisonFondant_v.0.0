import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import {
  Card,
  CardContent,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  Checkbox,
} from "@material-ui/core";
import { FuseAnimate, TextFieldFormsy, RadioGroupFormsy } from "@fuse";
import { Button } from "@material-ui/core";
import Request from "../../utils/Request";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Formsy from "formsy-react";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { isThisQuarter } from "date-fns";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class ProviderForm extends Component {
  request = new Request();

  constructor(props) {
    super(props);
    this.isFormValid = false;
    this.disponibiliteValid = false;
    this.state = {
      isFormValid: false,
      reference: "",
      detailsPanne: "",
      prixFournisseur: "",
      disponibilite: "",
      disponibiliteValid: false,
      remarques: "",
      nomPiece: "",
      reparationId: "",
      available: false,
      finalFormValidation: this.isFormValid && this.disponibiliteValid,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleChangeDisponibilite = this.handleChangeDisponibilite.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleChangeDisponibilite(event) {
    this.setState({
      disponibilite: event.target.value,
      disponibiliteValid: event.target.value !== "" ? true : false,
    });
    this.disponibiliteValid = event.target.value !== "" ? true : false;
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
  async componentDidMount() {
    try {
      const urlReparation = env.clientFacebook.info;
      const reparations = await this.request.getById(
        urlReparation,
        this.props.match.params.id
      );
      this.setState({
        reference: reparations.data._id,
        appareil: reparations.data.appareil,
        detailsPanne: reparations.data.nature,
        reparationId: reparations.data._id,
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error",
        });
      }
    }
  }
  async handleSubmit() {
    try {
      const url = env.providersAnswer.new;
      const data = {
        available: this.state.available,
        reparation: this.state.reparationId,
        prixFournisseur: this.state.prixFournisseur,
        remarques: this.state.remarques,
        nomFournisseur: this.state.nomFournisseur,
      };
      await this.request.new(url, data, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
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
    return (
      <div
        className="items-center text-center"
        style={{ padding: 20, background: "#4070b2", minHeight: "100vh" }}
      >
        <FuseAnimate animation={{ translateY: [0, "100%"] }} duration={600}>
          <Card className="mx-auto w-xl print:w-full print:shadow-none w-half">
            <CardContent className="p-88 print:p-0">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col">
                  <div className="flex items-center print:mb-0">
                    <img
                      className="w-160 print:w-60"
                      style={{ width: 160 }}
                      src="/assets/images/logos/1.png"
                      alt="logo"
                    />
                    <div className={"mx-48 w-px h-128 print:mx-16"} />
                    <div className="max-w-160"></div>
                  </div>
                </div>
                <div>
                  <Typography
                    className="font-ligh mb-16"
                    variant="h4"
                    color="textPrimary"
                  >
                    <Translation>
                      {(t) => <div>{t("customer.faceboock.requstPiece")}</div>}
                    </Translation>
                  </Typography>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Typography
                            className="font-light"
                            variant="h5"
                            color="textPrimary"
                          >
                            <Translation>
                              {(t) => (
                                <div>
                                  {t(
                                    "customer.faceboock.panneIformation.device"
                                  )}
                                </div>
                              )}
                            </Translation>
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            className="font-light"
                            variant="h6"
                            color="textSecondary"
                          >
                            {this.state.appareil}
                          </Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography
                            className="font-light"
                            variant="h5"
                            color="textPrimary"
                          >
                            <Translation>
                              {(t) => (
                                <div>
                                  {t(
                                    "customer.faceboock.panneIformation.panneSource"
                                  )}
                                </div>
                              )}
                            </Translation>
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            className="font-light"
                            variant="h6"
                            color="textSecondary"
                          >
                            {this.state.detailsPanne}
                          </Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-10 print:mt-0">
                <Formsy
                  onValidSubmit={this.handleSubmit}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  className="flex flex-col justify-center w-full"
                >
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.nomFournisseur}
                    type="text"
                    name="nomFournisseur"
                    label={
                      <Translation>
                        {(t) => (
                          <div>{t("customer.faceboock.supplierName")}</div>
                        )}
                      </Translation>
                    }
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.available}
                        onChange={(e) =>
                          this.setState({ available: e.target.checked })
                        }
                        name="available"
                      />
                    }
                    label={
                      <Translation>
                        {(t) => (
                          <div>{t("customer.faceboock.aivalblePice")}</div>
                        )}
                      </Translation>
                    }
                  />
                  {this.state.available ? (
                    <TextFieldFormsy
                      className="mt-8 mb-16 mr-8"
                      value={this.state.prixFournisseur}
                      type="number"
                      name="prixFournisseur"
                      label={
                        <Translation>
                          {(t) => (
                            <div>
                              {t(
                                "customer.faceboock.requestSupplier.piecePrice"
                              )}
                            </div>
                          )}
                        </Translation>
                      }
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
                      required
                    />
                  ) : (
                    <div />
                  )}
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.remarques}
                    type="text"
                    name="remarques"
                    label={
                      <Translation>
                        {(t) => <div>{t("customer.faceboock.notice")}</div>}
                      </Translation>
                    }
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-224 mx-auto mt-16"
                    aria-label="Register"
                    type="submit"
                    disabled={!this.state.isFormValid}
                  >
                    <Translation>
                      {(t) => (
                        <div>{t("customer.faceboock.responseSending")}</div>
                      )}
                    </Translation>
                  </Button>
                </Formsy>
              </div>
              <div
                className="mt-96 print:mt-0 print:px-16"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-24">
                    <img
                      className="w-32"
                      style={{ width: 32 }}
                      src="/assets/images/logos/1.png"
                      alt="logo"
                    />
                  </div>
                  <Typography
                    className="font-medium mb-64"
                    variant="caption"
                    color="textSecondary"
                  >
                    © Trust Services SARL. 2017. All Rights Reserved
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(ProviderForm))
  )
);
