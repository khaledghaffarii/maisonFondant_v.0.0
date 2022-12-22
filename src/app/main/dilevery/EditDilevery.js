import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withSnackbar } from "notistack";
import moment from "moment";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import DileveryForm from "./DileveryForm";
import { withRouter } from "react-router-dom";
import env from "../../static";
import decode from "jwt-decode";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditDilevery extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productID: "",
      productsOptions: [],

      etat: "",
      etatValidation: false,
      prix: "",
      prixPiece: "",
      avance: "",
      detailsPanne: "",
      couleurAppareil: "",
      centreDepot: "",
      centreDepotOptions: [],
      centreService: "",
      centreServiceOptions: [],
      centreRecuperation: "",
      centreRecuperationOptions: [],
      estimatedTimeReparation: "02:00",
      estimatedTimeLivraison: "02:00",
      difficulty: "",
      numeroSerie: "",
      repairer: "",
      repairerOptions: [],
      client: "",
      clientOptions: [],
      clientValidation: false,
      showExtraData: false,
      gouvernoratsOptions: [],
      delegationsOptions: [],
      localitesOptions: [],
      gouvernorat: "",
      delegation: "",
      localite: "",
      codePostal: "",
      indication: "",
      disponibleA: "",
      disponibleAOptions: [],
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
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.handleChipChangeCategory = this.handleChipChangeCategory.bind(this);
    this.handleChipChangeCentreDepot =
      this.handleChipChangeCentreDepot.bind(this);
    this.handleChipChangeCentreService =
      this.handleChipChangeCentreService.bind(this);
    this.handleChipChangeRepairer = this.handleChipChangeRepairer.bind(this);
    this.handleChipChangeClient = this.handleChipChangeClient.bind(this);
    this.handleChipChangeCentreRecuperation =
      this.handleChipChangeCentreRecuperation.bind(this);
    this.onTimeChangeReparation = this.onTimeChangeReparation.bind(this);
    this.onTimeChangeLivraison = this.onTimeChangeLivraison.bind(this);
    this.updateClientOptions = this.updateClientOptions.bind(this);
    this.handleChangeGouvernorat = this.handleChangeGouvernorat.bind(this);
    this.handleChangeDelegation = this.handleChangeDelegation.bind(this);
    this.handleChangeLocalite = this.handleChangeLocalite.bind(this);
    this.handleChipChangeDisponibilite =
      this.handleChipChangeDisponibilite.bind(this);
    this.handleChangeRappelTime = this.handleChangeRappelTime.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeSelectLivraison =
      this.handleChangeSelectLivraison.bind(this);
    this.handleChangeEtat = this.handleChangeEtat.bind(this);
  }
  handleChangeSelectLivraison(event) {
    this.setState({
      etatLivraison: event.target.value,
    });
  }
  handleChangeEtat(value) {
    this.setState({
      etat: value,
      etatValidation: this.state.etat !== "" ? true : false,
    });
  }
  handleChangeSelect(event) {
    this.setState({
      diponibilite: event.target.value,
    });
  }
  showExtraData() {
    this.setState({
      showExtraData: true,
    });
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleChangeRappelTime(date) {
    this.setState({
      rappelDate: date,
    });
  }
  async handleChangeGouvernorat(value) {
    this.setState((state) => {
      return {
        gouvernorat: value,
        delegation: "",
        localite: "",
        codePostal: "",
      };
    });
    try {
      const urlDelegation = env.gouvernorats.info;
      const data = {
        name: value.label,
      };

      const delegations = await this.request.new(urlDelegation, data, false);
      this.setState({
        delegationsOptions: delegations.data.delegations,
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
  async handleChangeDelegation(value) {
    this.setState((state) => {
      return {
        delegation: value,
        localite: "",
        codePostal: "",
      };
    });
    try {
      const urlLocalite = env.delegations.info;
      const data = {
        name: value.label,
      };
      const localites = await this.request.new(urlLocalite, data, false);

      this.setState({
        localitesOptions: localites.data.localites,
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

  async handleChangeLocalite(value) {
    this.setState((state) => {
      return {
        localite: value,
      };
    });
    try {
      const urlLocalite = env.localites.info;
      const data = {
        name: value.label,
      };
      const localite = await this.request.new(urlLocalite, data, false);
      this.setState({
        codePostal: localite.data.codePostal,
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
  handleChipChangeDisponibilite(value) {
    this.setState((state) => {
      return {
        disponibleA: value,
      };
    });
  }

  onTimeChangeReparation(event, time) {
    this.setState({ estimatedTimeReparation: time });
  }
  onTimeChangeLivraison(event, time) {
    this.setState({ estimatedTimeLivraison: time });
  }
  handleChipChangeCentreRecuperation(value) {
    this.setState((state) => {
      return {
        centreRecuperation: value,
      };
    });
    if (value.label === "domicile") {
      this.showExtraData();
    }
  }

  handleChipChangeCategory(value) {
    this.setState({
      category: value,
      prix: value.prix,
      categoryValidation: value !== "" ? true : false,
    });
  }

  handleChipChangeCentreDepot(value) {
    this.setState((state) => {
      return {
        centreDepot: value,
      };
    });
  }
  handleChipChangeCentreService(value) {
    this.setState((state) => {
      return {
        centreService: value,
      };
    });
  }
  handleChipChangeRepairer(value) {
    this.setState((state) => {
      return {
        repairer: value,
      };
    });
  }
  handleChipChangeClient(value) {
    this.setState({
      client: value,
      clientValidation: value !== "" ? true : false,
    });
  }
  async updateClientOptions() {
    try {
      const urlClients = env.clients.all;
      const clients = await this.request.getAll(urlClients);
      this.setState({
        clientOptions: clients.data,
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

  async update() {
    try {
      const user = decode(localStorage.getItem("id_token"));
      const urlClient = env.clients.info;
      const client = await this.request.getById(
        urlClient,
        this.state.client.key
      );
      const reparation = {
        category: this.state.productID,
        etat: this.state.etat.value,
        prix: this.state.prix,
        prixPiece: this.state.prixPiece,
        avance: this.state.avance,
        detailsPanne: this.state.detailsPanne,
        couleurAppareil: this.state.couleurAppareil,
        centreDepot: this.state.centreDepot.key,
        centreService: this.state.centreService.key,
        centreRecuperation: this.state.centreRecuperation.key,
        estimatedTimeReparation: this.state.estimatedTimeReparation,
        difficulty: this.state.difficulty,
        estimatedTimeLivraison: this.state.estimatedTimeLivraison,
        numeroSerie: this.state.numeroSerie,
        repairer: this.state.repairer.key,
        client: this.state.client.key,
        extraData: {
          adress: {
            gouvernorat: this.state.gouvernorat.label,
            delegation: this.state.delegation.label,
            localite: this.state.localite.label,
            codePostal: this.state.codePostal,
          },
          indication: this.state.indication,
          livraison: {
            HAWB: this.state.HAWB,
            COD: this.state.COD,
            etat: this.state.etatLivraison,
            remarqueLivraison: this.state.remarqueLivraison,
          },
        },
        disponibleA: this.state.disponibleA.key,
        rappel:
          this.state.rappelDate || this.state.rappelDate === null
            ? {
                id: this.state.rappelDateId,
                title: `call client: ${client.data.fname} ${client.data.lname} phone: ${client.data.phone} panne: ${this.state.productName}`,
                start: this.state.rappelDate,
                end: this.state.rappelDate,
                owner: user.id,
              }
            : undefined,
        remarqueClient: {
          description: this.state.remarqueClient,
          owner: user.id,
        },
        remarqueAcquisition: {
          description: this.state.remarqueAcquisition,
          owner: user.id,
        },
        remarqueSuivi: {
          description: this.state.remarqueSuivi,
          owner: user.id,
        },
        remarqueSatisfaction: {
          description: this.state.remarqueSatisfaction,
          owner: user.id,
        },
        remarqueEquipe: {
          description: this.state.remarqueEquipe,
          owner: user.id,
        },
      };

      const url = env.deliveries.update(this.props.match.params.id);
      await this.request.update(url, reparation, false);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );

      this.props.history.push("/dilevery");
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

  async handleSuggestProducts(value) {
    try {
      let url = env.products.listSuggestion + "?";
      url += "&search=" + value;
      this.setState({
        productName: value,
        productID: "",
        prix: "",
      });
      const products = await this.request.getAll(url);
      await this.setState({
        productsOptions: products.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
  handleSelect(id, name, prix) {
    this.setState({
      productName: name.toString(),
      productID: id,
      prix: prix,
      productsOptions: [],
    });
  }
  async componentDidMount() {
    try {
      const url = env.deliveries.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );

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
        productName: response.data.category.name,
        productID: response.data.category._id,
        productsOptions: [],
        etat: { key: "1", value: "1", label: response.data.etat },
        etatValidation: response.data.etat ? true : false,
        prix: response.data.prix,
        prixPiece: response.data.prixPiece,
        avance: response.data.avance,
        detailsPanne: response.data.detailsPanne,
        couleurAppareil: response.data.couleurAppareil,
        centreDepot: response.data.centreDepot
          ? {
              key: response.data.centreDepot._id,
              value: response.data.centreDepot._id,
              label: response.data.centreDepot.name,
            }
          : "",
        centreDepotOptions: centreDepots.data,
        centreService: response.data.centreService
          ? {
              key: response.data.centreService._id,
              value: response.data.centreService._id,
              label: response.data.centreService.name,
            }
          : "",
        centreServiceOptions: centreServices.data,
        centreRecuperation: response.data.centreRecuperation
          ? {
              key: response.data.centreRecuperation._id,
              value: response.data.centreRecuperation._id,
              label: response.data.centreRecuperation.name,
            }
          : "",
        estimatedTimeReparation: response.data.estimatedTimeReparation,
        estimatedTimeLivraison: response.data.estimatedTimeLivraison,
        difficulty: response.data.difficulty,
        numeroSerie: response.data.numeroSerie,
        repairer: response.data.repairer
          ? {
              key: response.data.repairer._id,
              value: response.data.repairer._id,
              label: response.data.repairer.fname,
            }
          : "",
        repairerOptions: repairers.data,
        client: response.data.owner
          ? {
              key: response.data.owner._id,
              value: response.data.owner._id,
              label: response.data.owner.fname,
            }
          : "",
        clientValidation: response.data.owner ? true : false,
        clientOptions: clients.data,
        gouvernorat: {
          key: "1",
          value: "2",
          label: response.data.extraData.adress.gouvernorat,
        },
        delegation: {
          key: "2",
          value: "2",
          label: response.data.extraData.adress.delegation,
        },
        localite: {
          key: "3",
          value: "3",
          label: response.data.extraData.adress.localite,
        },
        codePostal: response.data.extraData.adress.codePostal,
        indication: response.data.extraData.indication,
        centreRecuperationOptions: centreDepots.data,
        disponibleA: response.data.disponibleA
          ? {
              key: response.data.disponibleA._id,
              value: response.data.disponibleA._id,
              label: response.data.disponibleA.name,
            }
          : "",
        rappelDate: response.data.rappel
          ? response.data.rappel.start
            ? moment(response.data.rappel.start).toDate()
            : ""
          : "",
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
        remarqueLivraison: response.data.extraData.livraison.remarqueLivraison,
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

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <FormHeader
            returnRoute="/dilevery"
            title={
              <Translation>
                {(t) => <div>{t("reparation.repartionUpdate")}</div>}
              </Translation>
            }
          />
        }
        content={
          <DileveryForm
            handleChange={this.handleChange}
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("speciality.update.button")}</div>}
              </Translation>
            }
            handleChipChange={this.handleChipChange}
            handleChipChangeCategory={this.handleChipChangeCategory}
            handleChipChangeCentreDepot={this.handleChipChangeCentreDepot}
            handleChipChangeCentreService={this.handleChipChangeCentreService}
            handleChipChangeRepairer={this.handleChipChangeRepairer}
            handleChipChangeClient={this.handleChipChangeClient}
            handleChipChangeCentreRecuperation={
              this.handleChipChangeCentreRecuperation
            }
            onTimeChangeReparation={this.onTimeChangeReparation}
            onTimeChangeLivraison={this.onTimeChangeLivraison}
            updateClientOptions={this.updateClientOptions}
            handleChangeGouvernorat={this.handleChangeGouvernorat}
            handleChangeDelegation={this.handleChangeDelegation}
            handleChangeLocalite={this.handleChangeLocalite}
            handleChipChangeDisponibilite={this.handleChipChangeDisponibilite}
            handleChangeSelect={this.handleChangeSelect}
            handleChangeSelectLivraison={this.handleChangeSelectLivraison}
            handleChangeEtat={this.handleChangeEtat}
            handleSuggestProducts={this.handleSuggestProducts.bind(this)}
            handleSelect={this.handleSelect.bind(this)}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(EditDilevery))
  )
);
