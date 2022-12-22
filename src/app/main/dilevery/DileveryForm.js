import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, CardContent, MenuItem } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import { TextFieldFormsy, SelectFormsy } from "@fuse";
import TimeField from "react-simple-timefield";
import RightDrawer from "./RightDrawer";
import SearchBar from "../sharedComponent/SearchBar";
import Formsy from "formsy-react";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";

class DileveryForm extends Component {
  constructor(props) {
    super(props);
    this.isFormValid = false;
    this.state = {
      isFormValid: false,
      finalFormValidation: false,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      this.setState({
        finalFormValidation:
          this.isFormValid &&
          nextProps.state.productID !== "" &&
          nextProps.state.etatValidation &&
          nextProps.state.clientValidation,
      });
      this.isFormValid = true;
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

    const suggestionsCentreDepot = props.state.centreDepotOptions.map(
      (item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      })
    );
    const suggestionsCentreService = props.state.centreServiceOptions.map(
      (item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      })
    );
    const suggestionsCentreRecuperation =
      props.state.centreRecuperationOptions.map((item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      }));
    const suggestionsRepairer = props.state.repairerOptions.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.fname,
    }));
    const suggestionsClient = props.state.clientOptions.map((item) => ({
      key: item._id,
      value: item._id,
      label: `${item.fname} ${item.phone}`,
    }));
    const suggestionsGouvernorat = props.state.gouvernoratsOptions.map(
      (item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      })
    );
    const suggestionsDelegation = props.state.delegationsOptions.map(
      (item) => ({
        key: item._id,
        value: item._id,
        label: item.name,
      })
    );
    const suggestionsLocalite = props.state.localitesOptions.map((item) => ({
      key: item._id,
      value: item._id,
      label: item.name,
    }));
    const suggestionsEtat = [
      { key: 1, value: "Prét", label: "Prét" },
      {
        key: 2,
        value: "Appareil Réparé",
        label: "Appareil Réparé",
      },
      {
        key: 3,
        value: "Sous Diagnostic",
        label: "Sous Diagnostic",
      },
      {
        key: 4,
        value: "Appareil Nouveau Client",
        label: "Appareil Nouveau Client",
      },
      {
        key: 5,
        value: "Prise par le client",
        label: "Prise par le client",
      },
      {
        key: 6,
        value: "En cour de Reparation",
        label: "En cour de Reparation",
      },
      {
        key: 7,
        value: "Besoin Pièces de Rechanges",
        label: "Besoin Pièces de Rechanges",
      },
      {
        key: 8,
        value: "Livraison Aramex",
        label: "Livraison Aramex",
      },
      {
        key: 9,
        value: "Réparation Refusée",
        label: "Réparation Refusée",
      },
      {
        key: 10,
        value: "Client Rappelé",
        label: "Client Rappelé",
      },
      {
        key: 11,
        value: "Demande de Livraison",
        label: "Demande de Livraison",
      },
      {
        key: 11,
        value: "Appareil Déposé",
        label: "Appareil Déposé",
      },
      {
        key: 11,
        value: "Appareil Livré au réparateur",
        label: "Appareil Livré au réparateur",
      },
      {
        key: 11,
        value: "Appareil Livré au client",
        label: "Appareil Livré au client’",
      },
      {
        key: 11,
        value: "Appareil Recouvert",
        label: "Appareil Recouvert",
      },
      {
        key: 11,
        value: "Report Paiement",
        label: "Report Paiement",
      },
    ];

    let extraData;
    if (props.state.showExtraData) {
      extraData = (
        <div>
          <FuseChipSelect
            className="w-full my-16"
            value={props.state.gouvernorat}
            onChange={props.handleChangeGouvernorat}
            placeholder="Select  gouvernorat"
            textFieldProps={{
              label: "Gouvenorats",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            options={suggestionsGouvernorat}
          />
          <FuseChipSelect
            className="w-full my-16"
            value={props.state.delegation}
            placeholder="Select delegation"
            textFieldProps={{
              label: "Delegation",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            onChange={props.handleChangeDelegation}
            options={suggestionsDelegation}
          />
          <FuseChipSelect
            className="w-full my-16"
            value={props.state.localite}
            onChange={props.handleChangeLocalite}
            placeholder="Select localite"
            textFieldProps={{
              label: "Localite",
              InputLabelProps: {
                shrink: true,
              },
              variant: "outlined",
            }}
            options={suggestionsLocalite}
          />
          <TextFieldFormsy
            className="mt-8 mb-16 mr-8"
            value={props.state.codePostal}
            type="text"
            name="codePostal"
            label="codePostal"
            onChange={props.handleChange}
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextFieldFormsy
            className="w-full my-16"
            value={props.state.indication}
            type="text"
            name="indication"
            label="indication"
            onChange={props.handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextFieldFormsy
            label="HAWB"
            name="HAWB"
            value={props.state.HAWB}
            onChange={props.handleChange}
            className="mt-8 mb-16 mr-8"
            margin="normal"
            variant="outlined"
          />
          <TextFieldFormsy
            label="COD"
            name="COD"
            value={props.state.COD}
            onChange={props.handleChange}
            className="mt-8 mb-16 mr-8"
            margin="normal"
            variant="outlined"
          />

          <SelectFormsy
            className="mt-8 mb-16"
            name="etatLivraision"
            label="etat Livraision"
            value={props.state.etatLivraison}
            variant="outlined"
            onChange={props.handleChangeSelectLivraison}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            <MenuItem value="pas envoye">pas envoye</MenuItem>
            <MenuItem value="client non confirme">client non confirme</MenuItem>
            <MenuItem value="fiche envoye">fiche envoye</MenuItem>
            <MenuItem value="en route">en route</MenuItem>
            <MenuItem value="retard pickup">retard pickup</MenuItem>
            <MenuItem value="livre au reparateur">livre au reparateur</MenuItem>
            <MenuItem value="livre au client">livre au client</MenuItem>
            <MenuItem value="recouvert">recouvert</MenuItem>
          </SelectFormsy>
          <TextFieldFormsy
            label="remarque livraison"
            name="remarqueLivraison"
            value={props.state.remarqueLivraison}
            onChange={props.handleChange}
            className="w-full mb-16"
            margin="normal"
            variant="outlined"
          />
        </div>
      );
    }
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
              <SearchBar
                suggestions={props.state.productsOptions}
                suggest={props.handleSuggestProducts.bind(this)}
                select={props.handleSelect.bind(this)}
                state={props.state}
              />

              <FuseChipSelect
                className="w-full my-16"
                value={props.state.etat}
                onChange={props.handleChangeEtat}
                placeholder="Select etat"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("reparation.status")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                  required: true,
                }}
                options={suggestionsEtat}
                required
              />

              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.prix}
                label={
                  <Translation>
                    {(t) => <div>{t("stock.price")}</div>}
                  </Translation>
                }
                type="number"
                name="prix"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.prixPiece}
                label={
                  <Translation>
                    {(t) => (
                      <div>
                        {t("customer.faceboock.requestSupplier.piecePrice")}
                      </div>
                    )}
                  </Translation>
                }
                type="number"
                name="prixPiece"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
                className="mt-8 mb-16"
                type="number"
                label={
                  <Translation>
                    {(t) => (
                      <div>
                        {t("reparation.financialInformation.advancePayment")}
                      </div>
                    )}
                  </Translation>
                }
                name="avance"
                value={props.state.avance}
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
              />

              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                label={
                  <Translation>
                    {(t) => <div>{t("reparation.panneDetails")}</div>}
                  </Translation>
                }
                name="detailsPanne"
                type="text"
                multiline
                rowsMax="4"
                value={props.state.detailsPanne}
                onChange={props.handleChange}
                margin="normal"
                helperText="ecrire les details de la panne"
                variant="outlined"
              />
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.couleurAppareil}
                label={
                  <Translation>
                    {(t) => (
                      <div>{t("reparation.deviceInformation.DeviceColor")}</div>
                    )}
                  </Translation>
                }
                name="couleurAppareil"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.centreDepot}
                onChange={props.handleChipChangeCentreDepot}
                placeholder="Select centreDepot"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("reparation.depositCenter")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsCentreDepot}
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.centreService}
                onChange={props.handleChipChangeCentreService}
                placeholder="Select centre service"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("reparation.seviceCenter")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsCentreService}
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.centreRecuperation}
                onChange={props.handleChipChangeCentreRecuperation}
                placeholder="Select centre de recupuration"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("reparation.recoveryCenter")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsCentreRecuperation}
              />
              {extraData}
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.numeroSerie}
                label={
                  <Translation>
                    {(t) => (
                      <div>
                        {t("reparation.deviceInformation.serialNumber")}
                      </div>
                    )}
                  </Translation>
                }
                name="numeroSerie"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.repairer}
                onChange={props.handleChipChangeRepairer}
                placeholder="Select repairer"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("repairer.repairer")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsRepairer}
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.client}
                onChange={props.handleChipChangeClient}
                placeholder="Select client"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("reparation.customer")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsClient}
              />

              <RightDrawer updateClientOptions={props.updateClientOptions} />

              <section className="w-full my-16">
                <div style={{ marginRight: 20 }} className="w-full my-16">
                  <TimeField
                    value={props.state.estimatedTimeReparation}
                    onChange={props.onTimeChangeReparation}
                    input={
                      <TextField
                        label={
                          <Translation>
                            {(t) => (
                              <div>
                                {t("reparation.repairInformation.estimated")}
                              </div>
                            )}
                          </Translation>
                        }
                        className="w-full my-16"
                        value={props.state.estimatedTimeReparation}
                        variant="outlined"
                      />
                    }
                  />
                </div>
              </section>
              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                value={props.state.difficulty}
                label={
                  <Translation>
                    {(t) => (
                      <div>
                        {t(
                          "reparation.repairInformation.difficulttyReparation"
                        )}
                      </div>
                    )}
                  </Translation>
                }
                name="difficulty"
                type="text"
                onChange={props.handleChange}
                margin="normal"
                variant="outlined"
              />
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.disponibleA}
                onChange={props.handleChipChangeDisponibilite}
                placeholder="Select disponibilite"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.repairInformation.availability")}
                        </div>
                      )}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsCentreDepot}
              />
              <section className="w-full my-16">
                <div style={{ marginRight: 20 }} className="w-full my-16">
                  <TimeField
                    value={props.state.estimatedTimeLivraison}
                    onChange={props.onTimeChangeLivraison}
                    input={
                      <TextField
                        label={
                          <Translation>
                            {(t) => (
                              <div>
                                {t(
                                  "reparation.repairInformation.estimatedDelivry"
                                )}
                              </div>
                            )}
                          </Translation>
                        }
                        className="w-full my-16"
                        value={props.state.estimatedTimeLivraison}
                        variant="outlined"
                      />
                    }
                  />
                </div>
              </section>

              <TextFieldFormsy
                label={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.customerRemark.customerRemark")}
                        </div>
                      )}
                    </Translation>
                  }
                name="remarqueClient"
                value={props.state.remarqueClient}
                onChange={props.handleChange}
                multiline
                rows="4"
                className="mt-8 mb-16 mr-8"
                margin="normal"
                variant="outlined"
              />
              <TextField
              label={
                <Translation>
                  {(t) => (
                    <div>
                      {t("reparation.internalRemark.remarkAcquisition")}
                    </div>
                  )}
                </Translation>
              }
                name="remarqueAcquisition"
                value={props.state.remarqueAcquisition}
                onChange={props.handleChange}
                multiline
                rows="4"
                className="mt-8 mb-16 mr-8"
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
              label={
                <Translation>
                  {(t) => (
                    <div>
                      {t("reparation.internalRemark.remarkfollowed")}
                    </div>
                  )}
                </Translation>
              }
                name="remarqueSuivi"
                value={props.state.remarqueSuivi}
                onChange={props.handleChange}
                multiline
                rows="4"
                className="mt-8 mb-16 mr-8"
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
               label={
                <Translation>
                  {(t) => (
                    <div>
                      {t(
                        "reparation.internalRemark.remarkSatisfaction"
                      )}
                    </div>
                  )}
                </Translation>
              }
                name="remarqueSatisfaction"
                value={props.state.remarqueSatisfaction}
                onChange={props.handleChange}
                multiline
                rows="4"
                className="mt-8 mb-16 mr-8"
                margin="normal"
                variant="outlined"
              />
              <TextFieldFormsy
               label={
                <Translation>
                  {(t) => (
                    <div>
                      {t("reparation.internalRemark.remarkTeam")}
                    </div>
                  )}
                </Translation>
              }
                name="remarqueEquipe"
                value={props.state.remarqueEquipe}
                onChange={props.handleChange}
                multiline
                rows="4"
                className="mt-8 mb-16 mr-8"
                margin="normal"
                variant="outlined"
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

export default withTranslation()(withRouter(DileveryForm));
