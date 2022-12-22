/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { CardContent, MenuItem } from "@material-ui/core";
import { withSnackbar } from "notistack";

import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { TextFieldFormsy, SelectFormsy, FusePageCarded } from "@fuse";
import TimeField from "react-simple-timefield";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
import FormHeader from "../sharedComponent/FormHeader";
import Formsy from "formsy-react";
import { FuseAnimate } from "@fuse";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class DetailsDilevery extends Component {
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
      remarqueClient: "",
      remarqueAcquisition: "",
      remarqueSuivi: "",
      remarqueSatisfaction: "",
      remarqueEquipe: "",
      HAWB: "",
      COD: "",
      etatLivraison: "",
      remarqueLivraison: "",
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
      
      const urlCategories = env.categories.all;
      const categories = await this.request.getAll(urlCategories);
      const urlCentreDepots = env.boutiques.all;
      const centreDepots = await this.request.getAll(urlCentreDepots);

      const urlCentreServices = env.boutiques.all;
      const centreServices = await this.request.getAll(urlCentreServices);

      const urlRepairers = env.repairers.all;
      const repairers = await this.request.getAll(urlRepairers);

      const urlClients = env.clients.all;
      const clients = await this.request.getAll(urlClients);
      const urlGouvernorats = env.gouvernorats.all;
      const gouvernorats = await this.request.getAll(urlGouvernorats);
      this.setState({
        gouvernoratsOptions: gouvernorats.data,
      });

      this.setState({
        category: response.data.category.name,
        etat: response.data.etat,
        prix: response.data.prix,
        prixPiece: response.data.prixPiece,
        avance: response.data.avance,
        detailsPanne: response.data.detailsPanne,
        couleurAppareil: response.data.couleurAppareil,
        centreDepot: response.data.centreDepot.name,
        centreService: response.data.centreService.name,
        centreRecuperation: response.data.centreRecuperation.name,
        estimatedTimeReparation: response.data.estimatedTimeReparation,
        estimatedTimeLivraison: response.data.estimatedTimeLivraison,
        difficulty: response.data.difficulty,
        numeroSerie: response.data.numeroSerie,
        repairer: response.data.repairer.fname,
        client: response.data.owner.fname,
        gouvernorat: response.data.extraData.adress.gouvernorat,
        delegation: response.data.extraData.adress.delegation,
        localite: response.data.extraData.adress.localite,
        codePostal: response.data.extraData.adress.codePostal,
        indication: response.data.extraData.indication,
        disponibleA: response.data.disponibleA.name,
        rappelDate: response.data.rappel
          ? response.data.rappel.start
          : "no rappel",
        remarqueClient: response.data.remarqueClient[
          response.data.remarqueClient.length - 1
        ]
          ? response.data.remarqueClient[
              response.data.remarqueClient.length - 1
            ].description
          : "no remarqe",
        remarqueAcquisition: response.data.remarqueAcquisition[
          response.data.remarqueAcquisition.length - 1
        ]
          ? response.data.remarqueAcquisition[
              response.data.remarqueAcquisition.length - 1
            ].description
          : "no remarqe",
        remarqueSuivi: response.data.remarqueSuivi[
          response.data.remarqueSuivi.length - 1
        ]
          ? response.data.remarqueSuivi[response.data.remarqueSuivi.length - 1]
              .description
          : "no remarqe",
        remarqueSatisfaction: response.data.remarqueSatisfaction[
          response.data.remarqueSatisfaction.length - 1
        ]
          ? response.data.remarqueSatisfaction[
              response.data.remarqueSatisfaction.length - 1
            ].description
          : "no remarqe",
        remarqueEquipe: response.data.remarqueEquipe[
          response.data.remarqueEquipe.length - 1
        ]
          ? response.data.remarqueEquipe[
              response.data.remarqueEquipe.length - 1
            ].description
          : "no remarqe",
        disponibleAOptions: centreDepots.data,
        HAWB: response.data.extraData.livraison.HAWB,
        COD: response.data.extraData.livraison.COD,
        etatLivraison: response.data.extraData.livraison.etat,
        remarqueLivraison: response.data.extraData.remarqueLivraison,
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
            label="gouvernorat"
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
            label="delegation"
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
            label="localite"
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
            label="codePostal"
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
          <TextFieldFormsy
            label="HAWB"
            name="HAWB"
            value={this.state.HAWB}
            onChange={this.handleChange}
            className="mt-8 mb-16 mr-8"
            margin="normal"
            variant="outlined"
          />
          <TextFieldFormsy
            label="COD"
            name="COD"
            value={this.state.COD}
            onChange={this.handleChange}
            className="mt-8 mb-16 mr-8"
            margin="normal"
            variant="outlined"
          />

          <SelectFormsy
            className="mt-8 mb-16"
            name="etatLivraision"
            label="etat Livraision"
            value="none"
            variant="outlined"
            required
            onChange={this.handleChangeSelect}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            <MenuItem value="fiche envoye">fiche envoye</MenuItem>
            <MenuItem value="retard pickup">retard pickup</MenuItem>
            <MenuItem value="en route">en route</MenuItem>
            <MenuItem value="livre au reparateur">livre au reparateur</MenuItem>
            <MenuItem value="livre au client">livre au client</MenuItem>
            <MenuItem value="fiche envoye">fiche envoye</MenuItem>
            <MenuItem value="recouvert">recouvert</MenuItem>
          </SelectFormsy>
          <TextFieldFormsy
            label="remarque livraison"
            name="remarqueLivraison"
            value={this.state.remarqueLivraison}
            onChange={this.handleChange}
            className="w-full mb-16"
            margin="normal"
            variant="outlined"
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
          <FormHeader returnRoute="/dilevery" title={
            <Translation>
              {(t) => <div>{t("reparation.details")}</div>}
            </Translation>
          }/>
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
                    value={this.state.remarqueClient}
                    onChange={this.handleChange}
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
                    value={this.state.remarqueAcquisition}
                    onChange={this.handleChange}
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
                    value={this.state.remarqueSuivi}
                    onChange={this.handleChange}
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
                            {t("reparation.internalRemark.remarkSatisfaction")}
                          </div>
                        )}
                      </Translation>
                    }
                    name="remarqueSatisfaction"
                    value={this.state.remarqueSatisfaction}
                    onChange={this.handleChange}
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
                          <div>{t("reparation.internalRemark.remarkTeam")}</div>
                        )}
                      </Translation>
                    }
                    name="remarqueEquipe"
                    value={this.state.remarqueEquipe}
                    onChange={this.handleChange}
                    multiline
                    rows="4"
                    className="mt-8 mb-16 mr-8"
                    margin="normal"
                    variant="outlined"
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
    withSnackbar(withRouter(DetailsDilevery))
  )
);
