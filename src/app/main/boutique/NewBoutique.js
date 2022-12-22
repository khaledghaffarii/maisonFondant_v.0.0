import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import BoutiqueForm from "./BoutiqueForm";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
import env from "../../static";
const styles = (theme) => ({
  layoutRoot: {},
});

class NewBoutique extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
        
    const userType = localStorage.getItem("AdminOrTeam");
    //console.log("userCountry",userCountry);
    this.state = {
      name: "",
      nameArabe: "",
      nameEnglish: "",
      testCountry: "",
      email:"",
      companyId:"",
      serviceType:[],
      yearsExperience:"",
      specialities: [],
      typeBoutique: [],
      optionSpecialities: [],
      optionMobility:[],
      listCountry:[],
      country:"",
      addCountry:userType=="admin"?true:false,
      specialitiesValidation: false,
      adress: "",
      latitude: 36.8065,
      longitude: 10.1815,
      phone: "",
      workTime: "",
      startWork: "",
      endWork: "",
      facebookPage: "",
      website: "",
      file: "",
      etat: env.BOUTIQUE_STATE.ACTIVE_VISIBLE,
      optionRegion: [],
      regionList: [],
      optionCity: [],
      cityList: [],
      gouvernorat: "",
      delegation: "",
      gouvernoratsOptions: [],
      delegationsOptions: [],
      regionValidation: false,
      cityValidation: false, 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChange = this.handleChipChange.bind(this);
    this.handleChipChangeOptionMobility = this.handleChipChangeOptionMobility.bind(this);
    this.handleChipChangeTypeBoutique = this.handleChipChangeTypeBoutique.bind(this);
    this.onTimeChangeStartWork = this.onTimeChangeStartWork.bind(this);
    this.onTimeChangeEndWork = this.onTimeChangeEndWork.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.handleChipChangeCountry=this.handleChipChangeCountry.bind(this);
    this.handleEtatChange = this.handleEtatChange.bind(this);
    this.handleChangeGouvernorat = this.handleChangeGouvernorat.bind(this);
    this.handleChangeDelegation = this.handleChangeDelegation.bind(this);
    this.handleChipChangeRegion = this.handleChipChangeRegion.bind(this);
    this.handleChipChangeCity = this.handleChipChangeCity.bind(this);
  }

  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };
  onTimeChangeStartWork(event, time) {
    this.setState({ startWork: time });
  }
  
  async handleChipChangeRegion(value) {
    this.setState((state) => {
      return {
        regionList: value,
        regionValidation: true,
      };
    });
    const url = env.city.info;
    const response = await this.request.getById(url, value.key);
    this.setState({
      optionCity: response.data,
      cityValidation: true,
    });
  }
  async handleChipChangeCity(value) {
    // const url = env.city.info;
    // const response = await this.request.getById(url, this.state.regionList.key);
    // console.log(
    //   "🚀 ~ file: NewClient.js ~ line 120 ~ NewClient ~ handleChipChangeCity ~ response",
    //   response.data
    // );
    this.setState({
      cityList: value,
      cityValidation: true,
    });
  }
  async handleChangeGouvernorat(value) {
     this.setState((state) => {
      return {
        gouvernorat: value,
      };
    });

    const url = env.delegation.info;
    const data = {
      name: value.key,
    };

    const response = await this.request.getById(url, value.key);

    this.setState({
      delegationsOptions: response.data,
    });
  }
  async handleChangeDelegation(value) {
    this.setState((state) => {
      return {
        delegation: value,
      };
    });
  }
  async handleChipChangeCountry(value) {
    var urlBoutique = env.boutiques.allByCountry+ "?";
    urlBoutique += "country=" + value.key;
    const boutiques = await this.request.getAll(urlBoutique);
    

   
    this.setState((state) => {
      return {
        country: value,
        testCountry: value.value,
        boutiqueOptions: boutiques.data,
      };
    });
  }

  onTimeChangeEndWork(event, time) {
    this.setState({ endWork: time });
  }
  setLocation(lat, lng) {
    this.setState({
      latitude: lat,
      longitude: lng,
    });
  }
  handleChipChangeTypeBoutique(value) {
    this.setState({
      typeBoutique: value,
    });
  }
  
  handleChipChangeOptionMobility(value) {
    this.setState({
      serviceType: value,
    });
  }
  handleChipChange(value) {
    this.setState({
      specialities: value,
      specialitiesValidation: true,
    });
  }
  handleEtatChange(value) {
    this.setState({
      etat: value,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit = async (e) => {
    try {
      let form_data = new FormData();
      const userCountry = await localStorage.getItem("country");
      form_data.append("name", this.state.name);
      form_data.append("nameArabe", this.state.nameArabe);
      form_data.append("nameEnglish", this.state.nameEnglish);
      form_data.append("email", this.state.email);
      form_data.append("companyId", this.state.companyId);
      if(this.state.gouvernorat.value){
        form_data.append("gouvernorat", this.state.gouvernorat.value);
      }
      if(this.state.delegation.value){
        form_data.append("delegation", this.state.delegation.value);
      }
      if(this.state.regionList.value){
        form_data.append("region", this.state.regionList.value);
      }
      if(this.state.cityList.value){
        form_data.append("city", this.state.cityList.value);
      }
      let serviceType = [];
      this.state.serviceType.forEach((elem) => {
        serviceType.push(elem.value);
      });
      for (var i = 0; i < serviceType.length; i++) {
        form_data.append("serviceType[]", serviceType[i]);
      }
      form_data.append("yearsExperience", this.state.yearsExperience);
      form_data.append("country",this.state.addCountry?this.state.country.key:userCountry);
      let typeBoutique = [];
      this.state.typeBoutique.forEach((elem) => {
        typeBoutique.push(elem.value);
      });
      for (var i = 0; i < typeBoutique.length; i++) {
        form_data.append("typeBoutique[]", typeBoutique[i]);
      }
      let specialities = [];
      this.state.specialities.forEach((elem) => {
        specialities.push(elem.value);
      });
      for (var i = 0; i < specialities.length; i++) {
        form_data.append("specialities[]", specialities[i]);
      }
      form_data.append("adress", this.state.adress);
      let location = [];
      location.push(Number(this.state.latitude));
      location.push(Number(this.state.longitude));
      for (var j = 0; j < location.length; j++) {
        form_data.append("location[]", location[j]);
      }
      form_data.append("phone", this.state.phone);
      const workTime = `${this.state.startWork} ${this.state.endWork}`;
      form_data.append("workTime", workTime);
      form_data.append("facebookPage", this.state.facebookPage);
      form_data.append("website", this.state.website);
      if (this.state.file !== "") {
        form_data.append("file", this.state.file, this.state.file.name);
      }
      form_data.append("etat", this.state.etat);
      const url = env.boutiques.new;
      await this.request.new(url, form_data, true);
      this.props.enqueueSnackbar( <Translation>
        {(t) => <div>{t("stock.edit.success")}</div>}
      </Translation>, {
        variant: "success",
      });
      this.props.history.push("/boutique");
    } catch (err) {
      if (err.response) {
        this.props.enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar( <Translation>
          {(t) => <div>{t("stock.edit.error")+err}</div>}
        </Translation>,{
          variant: "error",
        });
      }
    }
  };
  async componentDidMount() {
    try {
      
      const urlGouvernorats = env.gouvernorats.all;
      const gouvernorats = await this.request.getAll(urlGouvernorats);
      const urlRegion = env.region.all;
      const region = await this.request.getAll(urlRegion);
      const url = env.specialities.all;
      const response = await this.request.getAll(url);
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      const urlMobility = env.mobility.all;
      const Mobility = await this.request.getAll(urlMobility);
      this.setState({
        optionSpecialities: response.data,
        listCountry:Country.data,
        optionMobility:Mobility.data.data,
        gouvernoratsOptions: gouvernorats.data,
        optionRegion: region.data.data,
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
                {(t) => <div>{t("boutique.addButton")}</div>}
              </Translation>
            }
          />
        }
        content={
          <BoutiqueForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("boutique.add")}</div>}</Translation>
            }
            fileChangedHandler={this.fileChangedHandler}
            handleChipChange={this.handleChipChange}
            handleChipChangeTypeBoutique={this.handleChipChangeTypeBoutique}
            onTimeChangeStartWork={this.onTimeChangeStartWork}
            onTimeChangeEndWork={this.onTimeChangeEndWork}
            handleChipChangeCountry={this.handleChipChangeCountry}
            setLocation={this.setLocation}
            handleEtatChange={this.handleEtatChange}
            handleChipChangeOptionMobility={this.handleChipChangeOptionMobility}
            handleChipChangeRegion={this.handleChipChangeRegion}
            handleChipChangeCity={this.handleChipChangeCity}
            handleChangeGouvernorat={this.handleChangeGouvernorat}
            handleChangeDelegation={this.handleChangeDelegation}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewBoutique)))
);
