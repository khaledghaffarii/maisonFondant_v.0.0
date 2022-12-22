/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import moment from "moment";
import env, { REP_STATES } from "../../static";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";

import FormHeader from "../sharedComponent/FormHeader";
import ReparationForm from "./ReparationForm";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";
import { CircularProgress } from "@material-ui/core";
import ProductForm from "../Products/ProductForm";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Badge, Button } from "@material-ui/core";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import swal2 from "@sweetalert/with-react";
import { withTranslation, Translation } from "react-i18next";
const DatePickerUI = ({ id, etat, update }) => {
  const [dateLivraison, setDateLivraison] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const updateState = () => {
    setLoading(true);
    update(dateLivraison, setLoading);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formsy className="flex flex-col justify-center w-full">
        <DatePicker
          label="Date Livraison"
          inputVariant="outlined"
          value={dateLivraison}
          onChange={setDateLivraison}
          format={"dd/MM/yyyy"}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            className="w-224 mx-auto mt-16"
            aria-label="Annuler"
            onClick={() => swal2.close()}
            style={{ marginRight: 20 }}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="w-224 mx-auto mt-16"
            aria-label="Ajouter remarque"
            onClick={updateState}
            disabled={loading}
          >
            Ajouter Date Livraison
          </Button>
        </div>
      </Formsy>
    </MuiPickersUtilsProvider>
  );
};
const styles = (theme) => ({
  layoutRoot: {},
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class EditFinancial extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      loading: true,
      productName: "",
      productID: "",
      productsOptions: [],
      etat: "",
      etatValidation: true,
      prix: "",
      prixPiece: "",
      avance: "",
      detailsPanne: "",
      couleurAppareil: "",
      dateLivraison: "",
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
      rappelDateId: undefined,
      remarqueClient: "",
      remarqueClientList: [],
      remarqueAcquisition: "",
      remarqueAcquisitionList: [],
      remarqueSuivi: "",
      remarqueSuiviList: [],
      remarqueSatisfaction: "",
      remarqueSatisfactionList: [],
      remarqueEquipe: "",
      remarqueEquipeList: [],
      remarqueTrustit: "",
      remarqueTrustitList: [],
      HAWB: "",
      COD: "",
      etatLivraison: "",
      remarqueLivraison: "",
      coupon: "",
      showAddProductForm: false,
      product: {
        name: "",
        prix: "",
        prixFournisseur: 0,
        parent: "",
        optionParent: [],
        parentValidation: false,
        couleur: "",
        disponibilite: "",
        description: "",
        tags: "",
        file: "",
      },
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
    this.handleChangeEtat = this.handleChangeEtat.bind(this);
    this.handleChangeProduct = this.handleChangeProduct.bind(this);
    this.handleSubmitProduct = this.handleSubmitProduct.bind(this);
    this.handleChipChangeParentProduct =
      this.handleChipChangeParentProduct.bind(this);
    this.fileChangedHandlerProduct = this.fileChangedHandlerProduct.bind(this);
    this.handleChangeSelectProduct = this.handleChangeSelectProduct.bind(this);
  }
  fileChangedHandlerProduct(image) {
    const { product } = this.state;
    product.file = image;
    this.setState({ product });
  }
  handleChangeProduct(event) {
    const { name, value } = event.target;
    const { product } = this.state;
    product[name] = value;
    this.setState({ product });
  }

  handleChipChangeParentProduct(value) {
    const { product } = this.state;
    product.parent = value;
    product.parentValidation = value !== "" ? true : false;
    this.setState({ product });
  }
  handleChangeSelectProduct(event) {
    const { product } = this.state;
    product.disponibilite = event.target.value;
  }

  async handleSubmitProduct(e) {
    let form_data = new FormData();
    form_data.append("name", this.state.product.name);
    form_data.append("prix", this.state.product.prix);
    form_data.append("prixFournisseur", this.state.product.prixFournisseur);
    if (this.state.product.parent !== "") {
      form_data.append("parent", this.state.product.parent.key);
    }
    if (this.state.product.file !== "") {
      form_data.append(
        "file",
        this.state.product.file,
        this.state.product.file.name
      );
    }
    form_data.append("couleur", this.state.product.couleur);
    form_data.append("disponibilite", this.state.product.disponibilite);
    form_data.append("description", this.state.product.description);
    form_data.append("tags", this.state.product.tags);
    try {
      const url = env.products.new;
      const result = await this.request.new(url, form_data, true);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.setState({
        productID: result.data._id,
        productName: result.data.name,
        category: result.data,
      });
      this.update(false);
    } catch (err) {
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
  async componentDidMount() {
    try {
      const urlParent = env.categories.all;
      const parent = await this.request.getAll(urlParent);
      const { product } = this.state;
      product.optionParent = parent.data;
      this.setState({ product });
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
    try {
      const url = env.reparations.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );

      const urlCentreDepots = env.boutiques.all;
      const centreDepots = await this.request.getAll(urlCentreDepots);

      const urlCentreServices = env.boutiques.all;
      await this.request.getAll(urlCentreServices);

      const urlRepairers = env.repairers.all;
      const repairers = await this.request.getAll(urlRepairers);

      const urlClients = env.clients.all;
      const clients = await this.request.getAll(urlClients);

      const urlGouvernorats = env.gouvernorats.all;
      const gouvernorats = await this.request.getAll(urlGouvernorats);
      this.setState({
        locked: false,
        loading: false,
        code: response.data.code,
        productName: response.data.category.name,
        productID: response.data.category._id,
        productsOptions: [],
        etat: response.data.etat
          ? { key: 1, value: response.data.etat, label: response.data.etat }
          : "",
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
              label:
                response.data.centreDepot.name === "domicile"
                  ? "Récupération à domicile"
                  : response.data.centreDepot.name,
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
        centreRecuperationOptions: centreDepots.data,
        centreRecuperation: response.data.centreRecuperation
          ? {
              key: response.data.centreRecuperation._id,
              value: response.data.centreRecuperation._id,
              label:
                response.data.centreRecuperation.name === "domicile"
                  ? "Livraison à domicile"
                  : response.data.centreRecuperation.name,
            }
          : "",
        estimatedTimeReparation: response.data.estimatedTimeReparation
          ? response.data.estimatedTimeReparation
          : 0,
        estimatedTimeLivraison: response.data.estimatedTimeLivraison
          ? response.data.estimatedTimeLivraison
          : 0,
        numeroSerie: response.data.numeroSerie,
        repairer: {
          key: response.data.repairer ? response.data.repairer._id : "",
          value: response.data.repairer ? response.data.repairer._id : "",
          label: response.data.repairer ? response.data.repairer.fname : "",
        },
        repairerOptions: repairers.data,
        client: response.data.owner
          ? {
              key: response.data.owner._id,
              value: response.data.owner._id,
              label: response.data.owner.fname,
              name: `${response.data.owner.fname} ${response.data.owner.lname}`,
              phone: response.data.owner.phone,
              email: response.data.owner.email,
              adress: response.data.owner.adress,
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
        disponibleA: {
          key: response.data.disponibleA ? response.data.disponibleA._id : "",
          value: response.data.disponibleA ? response.data.disponibleA._id : "",
          label: response.data.disponibleA
            ? response.data.disponibleA.name
            : "",
        },
        disponibleAOptions: centreDepots.data,
        rappelDate: response.data.rappel
          ? response.data.rappel.start
            ? moment(response.data.rappel.start).toDate()
            : ""
          : "",
        rappelDateId: response.data.rappel ? response.data.rappel._id : null,
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
        remarqueTrustitList:
          response.data.remarqueTrustit.length > 0
            ? response.data.remarqueTrustit
            : [],
        gouvernoratsOptions: gouvernorats.data,
        HAWB: response.data.extraData.livraison.HAWB,
        COD: response.data.extraData.livraison.COD,
        etatLivraison: response.data.extraData.livraison.etat,
        remarqueLivraison: response.data.extraData.livraison.remarqueLivraison,
        dateLivraison: response.data.dateLivraison,
        coupon: response.data.coupon,
      });
      if (response.data.centreRecuperation) {
        if (response.data.centreRecuperation.name === "domicile") {
          this.showExtraData();
        }
      }
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
      console.log(e);
    }
  }
  async handleSuggestProducts(value) {
    try {
      if (value && value.length > 2) {
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
      } else {
        await this.setState({
          productsOptions: [],
        });
      }
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
  handleChangeEtat(value) {
    this.setState({
      etat: value,
      etatValidation: this.state.etat !== "" ? true : false,
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
      categoryValidation: this.state.category !== "" ? true : false,
    });
  }

  handleChipChangeCentreDepot(value) {
    this.setState((state) => {
      return {
        centreDepot: value,
      };
    });
    if (value.label === "domicile") {
      this.showExtraData();
    }
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
      clientValidation: this.state.client !== "" ? true : false,
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

  async update(redirect = true) {
    try {
      const user = decode(localStorage.getItem("id_token"));
      const urlClient = env.clients.info;
      const client = await this.request.getById(
        urlClient,
        this.state.client.key
      );
      const reparation = {
        coupon: this.state.coupon,
        dateLivraison: this.state.dateLivraison,
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
        disponibleA: this.state.disponibleA.key
          ? this.state.disponibleA.key
          : 0,
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
        remarqueClient: this.state.remarqueClient
          ? { description: this.state.remarqueClient, owner: user.id }
          : undefined,
        remarqueAcquisition: this.state.remarqueAcquisition
          ? { description: this.state.remarqueAcquisition, owner: user.id }
          : undefined,
        remarqueSuivi: this.state.remarqueSuivi
          ? { description: this.state.remarqueSuivi, owner: user.id }
          : undefined,
        remarqueSatisfaction: this.state.remarqueSatisfaction
          ? { description: this.state.remarqueSatisfaction, owner: user.id }
          : undefined,
        remarqueEquipe: this.state.remarqueEquipe
          ? { description: this.state.remarqueEquipe, owner: user.id }
          : undefined,
        remarqueTrustit: this.state.remarqueTrustit
          ? { description: this.state.remarqueTrustit, owner: user.id }
          : undefined,
      };

      const url = env.reparations.update(this.props.match.params.id);
      const response = await this.request.update(url, reparation, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );

      if (redirect) {
        this.props.history.push("/financial");
      } else {
        this.setState({
          showAddProductForm: false,
        });
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
  addNewProduct() {
    this.setState({
      showAddProductForm: true,
    });
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
            returnRoute="/financial"
            title={`Réparation ${this.state.loading ? "..." : this.state.code}`}
          />
        }
        content={
          this.state.loading ? (
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="secondary" />
              <h1>
                {" "}
                <Translation>
                  {(t) => <div>{t("stock.edit.loading")}</div>}
                </Translation>
              </h1>
            </div>
          ) : (
            <div>
              <ReparationForm
                handleChange={this.handleChange}
                handleSubmit={this.update}
                state={this.state}
                ButtonText="modifier"
                handleChipChange={this.handleChipChange}
                handleChipChangeCategory={this.handleChipChangeCategory}
                handleChipChangeCentreDepot={this.handleChipChangeCentreDepot}
                handleChipChangeCentreService={
                  this.handleChipChangeCentreService
                }
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
                handleChipChangeDisponibilite={
                  this.handleChipChangeDisponibilite
                }
                handleChangeRappelTime={this.handleChangeRappelTime}
                handleChangeEtat={this.handleChangeEtat}
                handleSuggestProducts={this.handleSuggestProducts.bind(this)}
                handleSelect={this.handleSelect.bind(this)}
                ShowEdit={true}
                addNewProduct={this.addNewProduct.bind(this)}
              />
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={this.state.showAddProductForm}
                onClose={() => this.setState({ showAddProductForm: false })}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={this.state.showAddProductForm}>
                  <div className={classes.paper} style={{ width: "60vw" }}>
                    <ProductForm
                      handleSubmit={this.handleSubmitProduct}
                      state={this.state.product}
                      ButtonText="ajouter"
                      handleChange={this.handleChangeProduct}
                      handleChipChangeParent={
                        this.handleChipChangeParentProduct
                      }
                      fileChangedHandler={this.fileChangedHandlerProduct}
                      handleChangeSelect={this.handleChangeSelectProduct}
                    />
                  </div>
                </Fade>
              </Modal>
            </div>
          )
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(EditFinancial))
  )
);
