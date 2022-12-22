/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import TextField from "@material-ui/core/TextField";
import { CardContent } from "@material-ui/core";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { TextFieldFormsy } from "@fuse";
import TimeField from "react-simple-timefield";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import Formsy from "formsy-react";
import DateTimePicker from "react-datetime-picker";
import Remarque from "../sharedComponent/Remarque";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
import { FuseAnimate } from "@fuse";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class DetailsReparation extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      categoryOptions: [],
      etat: "",
      prix: "",
      prixPiece: "",
      avance: "",
      detailsPanne: "",
      couleurAppareil: "",
      centreDepot: "",
      centreService: "",
      centreRecuperation: "",
      estimatedTimeReparation: "02:00",
      estimatedTimeLivraison: "02:00",
      difficulty: "",
      numeroSerie: "",
      repairer: "",
      client: "",
      showExtraData: false,
      gouvernorat: "",
      delegation: "",
      localite: "",
      codePostal: "",
      indication: "",
      disponibleA: "",
      rappelDate: "",
      nbreRappel: 0,
      remarqueClientList: [],
      remarqueAcquisitionList: [],
      remarqueSuiviList: [],
      remarqueSatisfactionList: [],
      remarqueEquipeList: [],
    };
  }
  wl;
  showExtraData() {
    this.setState({
      showExtraData: true,
    });
  }
  async componentDidMount() {
    try {
      const url = env.reparations.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );

      this.setState({
        category: response.data.category ? response.data.category.name : "",
        etat: response.data.etat,
        prix: response.data.prix,
        prixPiece: response.data.prixPiece,
        avance: response.data.avance,
        detailsPanne: response.data.detailsPanne,
        couleurAppareil: response.data.couleurAppareil,
        centreDepot: response.data.centreDepot
          ? response.data.centreDepot.name
          : "",
        centreService: response.data.centreService
          ? response.data.centreService.name
          : "",
        centreRecuperation: response.data.centreRecuperation
          ? response.data.centreRecuperation.name
          : "",
        estimatedTimeReparation: response.data.estimatedTimeReparation,
        estimatedTimeLivraison: response.data.estimatedTimeLivraison,
        difficulty: response.data.difficulty,
        numeroSerie: response.data.numeroSerie,
        repairer: response.data.repairer ? response.data.repairer.fname : "",
        client: response.data.owner ? response.data.owner.fname : "",
        gouvernorat: response.data.extraData.adress.gouvernorat,
        delegation: response.data.extraData.adress.delegation,
        localite: response.data.extraData.adress.localite,
        codePostal: response.data.extraData.adress.codePostal,
        indication: response.data.extraData.indication,
        disponibleA: response.data.disponibleA
          ? response.data.disponibleA.name
          : "",
        rappelDate: response.data.rappel ? response.data.rappel.start : null,
        remarqueClientList:
          response.data.remarqueClient.length > 0
            ? response.data.remarqueClient
            : [],
        remarqueAcquisitionList:
          response.data.remarqueAcquisition.length > 0
            ? response.data.remarqueAcquisition
            : [],
        remarqueSuiviList:
          response.data.remarqueSuivi.length > 0
            ? response.data.remarqueSuivi
            : [],
        remarqueSatisfactionList:
          response.data.remarqueSatisfaction.length > 0
            ? response.data.remarqueSatisfaction
            : [],
        remarqueEquipeList:
          response.data.remarqueEquipe.length > 0
            ? response.data.remarqueEquipe
            : [],
        nbreRappel: 1,
      });
      if (response.data.centreRecuperation.name === "domicile") {
        this.showExtraData();
      }
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
    let extraData;
    if (this.state.showExtraData) {
      extraData = (
        <div>
          <TextFieldFormsy
            className="mt-8 mb-16"
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
            className="mt-8 mb-16"
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
            className="mt-8 mb-16"
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
            className="mt-8 mb-16"
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
            value={this.state.indication}
            type="text"
            name="indication"
            label="indication"
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      );
    }
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <FormHeader
            returnRoute="/reparation"
            title={
              <Translation>
                {(t) => <div>{t("reparation.details")}</div>}
              </Translation>
            }
          />
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">
            <FuseAnimate animation="transition.expandIn">
              <CardContent className="flex flex-col items-center justify-center p-32">
                <Formsy className="flex flex-col justify-center w-full">
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.category}
                    type="text"
                    name="category"
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.category")}</div>}
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
                    value={this.state.etat}
                    type="text"
                    name="etat"
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.status")}</div>}
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
                    value={this.state.prix}
                    type="text"
                    name="prix"
                    label={
                      <Translation>
                        {(t) => <div>{t("stock.price")}</div>}
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
                    value={this.state.prixPiece}
                    type="text"
                    name="prixPiece"
                    label={
                      <Translation>
                        {(t) => (
                          <div>
                            {t("customer.faceboock.requestSupplier.piecePrice")}
                          </div>
                        )}
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
                    value={this.state.avance}
                    type="text"
                    name="avance"
                    label={
                      <Translation>
                        {(t) => (
                          <div>
                            {t(
                              "reparation.financialInformation.advancePayment"
                            )}
                          </div>
                        )}
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
                    value={this.state.detailsPanne}
                    type="text"
                    name="Detail panne"
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.panneDetails")}</div>}
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
                    value={this.state.couleurAppareil}
                    type="text"
                    name="couleur appareil"
                    label={
                      <Translation>
                        {(t) => (
                          <div>
                            {t("reparation.deviceInformation.DeviceColor")}
                          </div>
                        )}
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
                    value={this.state.centreDepot}
                    type="text"
                    name="centreDepot"
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.depositCenter")}</div>}
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
                    value={this.state.centreService}
                    type="text"
                    name="centreService"
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.seviceCenter")}</div>}
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
                    value={this.state.centreRecuperation}
                    type="text"
                    name="centreRecuperation"
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.recoveryCenter")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  {extraData}
                  <TextFieldFormsy
                    className="mt-8 mb-16 mr-8"
                    value={this.state.numeroSerie}
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
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.repairer}
                    type="text"
                    name="repairer"
                    label={
                      <Translation>
                        {(t) => <div>{t("repairer.repairer")}</div>}
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
                    value={this.state.client}
                    type="text"
                    name="client"
                    label={
                      <Translation>
                        {(t) => <div>{t("reparation.customer")}</div>}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <section className="w-full my-16">
                    <div style={{ marginRight: 20 }} className="w-full my-16">
                      <TimeField
                        value={this.state.estimatedTimeReparation}
                        input={
                          <TextField
                            label={
                              <Translation>
                                {(t) => (
                                  <div>
                                    {t(
                                      "reparation.repairInformation.estimated"
                                    )}
                                  </div>
                                )}
                              </Translation>
                            }
                            className="w-full my-16"
                            value={this.state.estimatedTimeReparation}
                            variant="outlined"
                          />
                        }
                      />
                    </div>
                  </section>

                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.difficulty}
                    type="text"
                    name="difficulty"
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
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.disponibleA}
                    type="text"
                    name="disponibleA"
                    label={
                      <Translation>
                        {(t) => (
                          <div>
                            {t("reparation.repairInformation.availability")}
                          </div>
                        )}
                      </Translation>
                    }
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <section className="w-full my-16">
                    <div style={{ marginRight: 20 }} className="w-full my-16">
                      <TimeField
                        value={this.state.estimatedTimeLivraison}
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
                            value={this.state.estimatedTimeLivraison}
                            variant="outlined"
                          />
                        }
                      />
                    </div>
                  </section>
                  {this.state.remarqueClientList.length > 0 ? (
                    <Remarque
                      remarqueList={this.state.remarqueClientList}
                      name={"Remarque Client"}
                    />
                  ) : null}
                  {this.state.remarqueAcquisitionList.length > 0 ? (
                    <Remarque
                      remarqueList={this.state.remarqueAcquisitionList}
                      name={"Remarque Acquisition"}
                    />
                  ) : null}
                  {this.state.remarqueSuiviList.length > 0 ? (
                    <Remarque
                      remarqueList={this.state.remarqueSuiviList}
                      name={"Remarque Suivi"}
                    />
                  ) : null}
                  {this.state.remarqueSatisfactionList.length > 0 ? (
                    <Remarque
                      remarqueList={this.state.remarqueSatisfactionList}
                      name={"Remarque satisfaction"}
                    />
                  ) : null}

                  {this.state.remarqueEquipeList.length > 0 ? (
                    <Remarque
                      remarqueList={this.state.remarqueEquipeList}
                      name={"Remarque Equipe"}
                    />
                  ) : null}

                  <section className="w-full my-16">
                    <div style={{ marginRight: 20 }} className="w-full my-16">
                      <DateTimePicker value={this.state.rappelDate} disabled />
                    </div>
                  </section>
                  <TextFieldFormsy
                    className="mt-8 mb-16"
                    value={this.state.nbreRappel}
                    type="number"
                    name="nbreRappel"
                    label={
                      <Translation>
                        {(t) => (
                          <div>
                            {t("reparation.repairInformation.callbackNumber")}
                          </div>
                        )}
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
    withSnackbar(withRouter(DetailsReparation))
  )
);
