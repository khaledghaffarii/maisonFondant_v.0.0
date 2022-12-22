/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import ReparationForm from "./ReparationForm";
import decode from "jwt-decode";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});

class NewReparation extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      reparationProduct: "",
      coupon: "",
      productName: "",
      color:"",
      listColor: [],
      testCountry:localStorage.getItem("AdminOrTeam") == "admin"
      ?true
      :false,
      country:
      localStorage.getItem("AdminOrTeam") == "admin"
        ? ""
        : {
            key: localStorage.getItem("country"),
            value: localStorage.getItem("country"),
            label: localStorage.getItem("country"),
          },
      model: "",
      brand: "",
      listCountry:[],
      listReparation: [],
      listModel: [],
      colorList: [],
      brandList: [],
      productID: "",
      productsOptions: [],
      etat: "Non depose",
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
      rappelDate: undefined,
      remarqueClient: "",
      remarqueClientList: [],
      dateLivraison: "",
      remarqueAcquisition: "",
      remarqueSuivi: "",
      remarqueSatisfaction: "",
      remarqueEquipe: "",
      remarqueTrustit: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.handleChipChangeDisponibilite =this.handleChipChangeDisponibilite.bind(this);
    this.handleChangeRappelTime = this.handleChangeRappelTime.bind(this);
    this.handleChangeEtat = this.handleChangeEtat.bind(this);
    this.handleChipChangeCountry=this.handleChipChangeCountry.bind(this);
    this.handleChipChangeModel = this.handleChipChangeModel.bind(this);
    this.handleChipChangeBrand = this.handleChipChangeBrand.bind(this);
    this.handleChipChangeReparation =this.handleChipChangeReparation.bind(this);
    this.handleChipChangeColor = this.handleChipChangeColor.bind(this);
  }

  showExtraData() {
    this.setState({
      showExtraData: true,
    });
  }
  async handleChipChangeBrand(value) {
    if (this.state.model != "") {
      let url = env.productsReparation.productsReparationByBrandModelAndCountry + "?";
      url += "brand=" + value.key;
      url += "&model=" + this.state.model.key;
      url += "&country=" + this.state.country.key;
      const responseReparation = await this.request.getAll(url);
        this.setState((state) => {
        return {
          listReparation: responseReparation.data,
        };
      });
    }
    let url = env.model.modelByBrand + "?";
    url += "brand=" + value.key;
    const response = await this.request.getAll(url);
    this.setState((state) => {
      return {
        brand: value,
        listModel: response.data,
      };
    });
  }
  handleChipChangeColor(value) {
    //console.log("value",value);
    this.setState((state) => {
      return {
        colorList: value,
      };
    });
  }
  handleChipChangeReparation(value) {
    this.setState((state) => {
      return {
        reparationProduct: value,
      };
    });
  }
  async handleChipChangeModel(value) {
    let url = env.productsReparation.productsReparationByBrandModelAndCountry + "?";
    url += "brand=" + this.state.brand.key;
    url += "&model=" + value.key;
    url += "&country=" + this.state.country.key;
    const response = await this.request.getAll(url);
    this.setState((state) => {
      return {
        model: value,
        listReparation: response.data,
        listColor: value.value,
      };
    });
  }
  handleChangeEtat(value) {
    
    console.log("this.state.etat.value",value);
    this.setState({
      etat: value,
      etatValidation: value !== "" ? true : false,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  async handleChipChangeCountry(value) {
    var urlRepairers = env.repairers.allByCountry+ "?";
    urlRepairers += "country="+value.key;
    const repairers = await this.request.getAll(urlRepairers);
    var urlClients = env.clients.allByCountry+ "?";
    urlClients += "country="+value.key;
    const clients = await this.request.getAll(urlClients);
    var urlCentreDepots = env.boutiques.allByCountry+ "?";
    urlCentreDepots += "country="+value.key;
    const centreDepots = await this.request.getAll(urlCentreDepots);
    var urlCentreServices = env.boutiques.allByCountry+ "?";
    urlCentreServices += "country="+value.key;
    const centreServices = await this.request.getAll(urlCentreServices);
    let centreSerOptions = [];
    centreServices.data.map((elem) => {
      if (elem.name !== "domicile") {
        centreSerOptions.push(elem);
      }
    });

    this.setState({
  centreDepotOptions: centreDepots.data,
  centreServiceOptions: centreSerOptions,
  centreRecuperationOptions: centreDepots.data,
  repairerOptions: repairers.data,
  clientOptions: clients.data,
  disponibleAOptions: centreDepots.data,
    })
 
    if (this.state.model != "") {
      let url = env.productsReparation.productsReparationByBrandModelAndCountry + "?";
      url += "brand=" + this.state.brand.key;
      url += "&model=" + this.state.model.key;
      url += "&country=" + value.key;
      const responseReparation = await this.request.getAll(url);
        this.setState((state) => {
        return {
          listReparation: responseReparation.data,
        };
      });
    }
    this.setState((state) => {
      return {
        country: value,
      };
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

  onTimeChangeReparation(event, time) {
    this.setState({ estimatedTimeReparation: time });
  }
  onTimeChangeLivraison(event, time) {
    this.setState({ estimatedTimeLivraison: time });
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
    if (value.label === "domicile") {
      this.showExtraData();
    }
  }
  handleChipChangeDisponibilite(value) {
    this.setState((state) => {
      return {
        disponibleA: value,
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

  handleSubmit = async (e) => {
    try {
      const user = decode(localStorage.getItem("id_token"));
      const urlClient = env.clients.info;
      const client = await this.request.getById(
        urlClient,
        this.state.client.key
      );
      //console.log("this.state.etat.value",this.state.etat.value);
      const reparation = {
        coupon: this.state.coupon,
        dateLivraison: this.state.dateLivraison,
        reparationProduct: this.state.reparationProduct.key,
        country:this.state.country.key,
        etat: this.state.etat.value,
        prix: this.state.prix,
        prixPiece: this.state.prixPiece,
        avance: this.state.avance,
        detailsPanne: this.state.detailsPanne,
        couleurAppareil: this.state.color.key,
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

      const url = env.reparations.new;
      await this.request.new(url, reparation, false);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/reparation");
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
  };
  async componentDidMount() {
    try {
      const urlCategories = env.products.all;
      const categories = await this.request.getAll(urlCategories);
      const urlGouvernorats = env.gouvernorats.all;
      const gouvernorats = await this.request.getAll(urlGouvernorats);
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      Country.data.map(async(opj)=>{
        if(localStorage.getItem("country")==opj._id){
          var urlRepairers = env.repairers.allByCountry+ "?";
          urlRepairers += "country=" + opj._id;
          const repairers = await this.request.getAll(urlRepairers);
          var urlClients = env.clients.allByCountry+ "?";
          urlClients += "country=" + opj._id;
          const clients = await this.request.getAll(urlClients);
          var urlCentreDepots = env.boutiques.allByCountry+ "?";
          urlCentreDepots += "country=" + opj._id;
          const centreDepots = await this.request.getAll(urlCentreDepots);
          var urlCentreServices = env.boutiques.allByCountry+ "?";
          urlCentreServices += "country=" + opj._id;
          const centreServices = await this.request.getAll(urlCentreServices);
          let centreSerOptions = [];
          centreServices.data.map((elem) => {
            if (elem.name !== "domicile") {
              centreSerOptions.push(elem);
            }
          });
    
          this.setState({
        centreDepotOptions: centreDepots.data,
        centreServiceOptions: centreSerOptions,
        centreRecuperationOptions: centreDepots.data,
        repairerOptions: repairers.data,
        clientOptions: clients.data,
        disponibleAOptions: centreDepots.data,
          })
        }
   })
      const urlBrand = env.brand.allBrand;
      const brand = await this.request.getAll(urlBrand);
      this.setState({
        gouvernoratsOptions: gouvernorats.data,
        listCountry:Country.data,
        brandList:brand.data.data
      });
      let catOptions = [];
      categories.data.map((elem) => {
        if (elem.prix > 0) {
          catOptions.push(elem);
        }
      });
      
      this.setState({
        categoryOptions: catOptions,

      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")+e}</div>}
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
            returnRoute="/reparation"
            title={
              <Translation>
                {(t) => <div>{t("reparation.addButton")}</div>}
              </Translation>
            }
          />
        }
        content={
          <ReparationForm
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("repairer.add")}</div>}</Translation>
            }
            handleChange={this.handleChange}
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
            handleChangeRappelTime={this.handleChangeRappelTime}
            handleChangeEtat={this.handleChangeEtat}
            handleSuggestProducts={this.handleSuggestProducts.bind(this)}
            handleSelect={this.handleSelect.bind(this)}
            handleChipChangeCountry={this.handleChipChangeCountry}
            handleChipChangeModel={this.handleChipChangeModel}
            handleChipChangeBrand={this.handleChipChangeBrand}
            handleChipChangeReparation={this.handleChipChangeReparation}
            handleChipChangeColor={this.handleChipChangeColor}
            ShowEdit={false}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(NewReparation))
  )
);
