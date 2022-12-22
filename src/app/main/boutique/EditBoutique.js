import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import BoutiqueForm from "./BoutiqueForm";
import env from "../../static";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditBoutique extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    const userType = localStorage.getItem("AdminOrTeam");
    this.state = {
      name: "",
      nameArabe: "",
      nameEnglish: "",
      email:"",
      companyId:"",
      testCountry: "",
      serviceType:[],
      yearsExperience:"",
      specialities: [],
      typeBoutique: [],
      optionSpecialities: [],
      listCountry:[],
      optionMobility:[],
      country:"",
      addCountry:userType=="admin"?true:false,
      specialitiesValidation: false,
      adress: "",
      latitude: "",
      longitude: "",
      phone: "",
      workTime: "",
      startWork: "",
      endWork: "",
      facebookPage: "",
      website: "",
      file: "",
      etat: {
        key: "",
        label: env.BOUTIQUE_STATE.ACTIVE_VISIBLE,
        value: env.BOUTIQUE_STATE.ACTIVE_VISIBLE,
      }, 
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
    this.update = this.update.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChange = this.handleChipChange.bind(this);
    this.onTimeChangeStartWork = this.onTimeChangeStartWork.bind(this);
    this.handleChipChangeTypeBoutique = this.handleChipChangeTypeBoutique.bind(this);
    this.onTimeChangeEndWork = this.onTimeChangeEndWork.bind(this);
    this.handleChipChangeOptionMobility = this.handleChipChangeOptionMobility.bind(this);
    this.handleChipChangeCountry=this.handleChipChangeCountry.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.handleEtatChange = this.handleEtatChange.bind(this);
    this.handleChangeGouvernorat = this.handleChangeGouvernorat.bind(this);
    this.handleChangeDelegation = this.handleChangeDelegation.bind(this);
    this.handleChipChangeRegion = this.handleChipChangeRegion.bind(this);
    this.handleChipChangeCity = this.handleChipChangeCity.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
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
  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };
  onTimeChangeStartWork(event, time) {
    this.setState({ startWork: time });
  }

  onTimeChangeEndWork(event, time) {
    this.setState({ endWork: time });
  }

  async update() {
    try {
      let form_data = new FormData();
      
      const userCountry = await localStorage.getItem("country");
      form_data.append("name", this.state.name);
      form_data.append("nameArabe", this.state.nameArabe);
      form_data.append("nameEnglish", this.state.nameEnglish);
      form_data.append("email", this.state.email);
      form_data.append("companyId", this.state.companyId);
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
        console.log("typeBoutique[i]",typeBoutique[i])
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
      form_data.append("state", this.state.etat.value);
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
      const url = env.boutiques.update(this.props.match.params.id);
      await this.request.update(url, form_data, true);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
     
      this.props.history.push("/boutique");
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

  async componentDidMount() {
    try {
      const urlGouvernorats = env.gouvernorats.all;
      const gouvernorats = await this.request.getAll(urlGouvernorats);
      const urlRegion = env.region.all;
      const region = await this.request.getAll(urlRegion);
      const url = env.boutiques.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlSpecialities = env.specialities.all;
      const responseSpecialities = await this.request.getAll(urlSpecialities);
      let specialities = [];
      if (response.data.specialities.length > 0) {
        response.data.specialities.forEach((elem) => {
          specialities.push({
            key: elem._id,
            value: elem._id,
            label: elem.name,
          });
        });
      }
      let typeBoutique = [];
      if (response.data.typeBoutique.length > 0) {
        let key=0;
        response.data.typeBoutique.forEach((elem) => {
          typeBoutique.push({
            key: key,
            value: elem,
            label: elem,
          });
          key=key+1;
        });
      }
      const time = response.data.workTime.split(" ");
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      let countryValue;
      if (response.data.country) {
        countryValue = {
          key: response.data.country._id,
          value: response.data.country.iso2,
          label: response.data.country.countryName,
        };
      } else {
        countryValue = "";
      }
      
      let serviceType = [];
      if (response.data.serviceType.length > 0) {
        let key=0;
        response.data.serviceType.forEach((elem) => {
          serviceType.push({
            key: elem._id,
            value: elem._id,
            label: elem.nameEnglish,
          });
          key=key+1;
        });
      }
    
      const urlMobility = env.mobility.all;
      const Mobility = await this.request.getAll(urlMobility);
      
      this.setState({
        name: response.data.name,
        nameArabe: response.data.nameArabe,
        nameEnglish: response.data.nameEnglish,
        email:response.data.email,
        companyId:response.data.companyId,
        serviceType:serviceType,
        yearsExperience:response.data.yearsExperience,
        country:countryValue,
        listCountry:Country.data,
        specialities: specialities,
        typeBoutique:typeBoutique,
        optionSpecialities: responseSpecialities.data,
        specialitiesValidation: response.data.specialities ? true : false,
        adress: response.data.adress,
        latitude: response.data.location.coordinates[0],
        longitude: response.data.location.coordinates[1],
        phone: response.data.phone,
        workTime: response.data.workTime,
        startWork: time[0],
        endWork: time[1],
        facebookPage: response.data.facebookPage,
        website: response.data.website,
        etat: { key: "", label: response.data.etat, value: response.data.etat },
        optionMobility:Mobility.data.data,
        gouvernoratsOptions: gouvernorats.data,
        optionRegion: region.data.data,
        gouvernorat: response.data.gouvernorat
          ? {
              key: response.data.gouvernorat._id,
              value: response.data.gouvernorat._id,
              label: response.data.gouvernorat.name_fr,
            }
          : "",
        delegation: response.data.delegation
          ? {
              key: response.data.delegation._id,
              value: response.data.delegation._id,
              label: response.data.delegation.name_fr,
            }
          : "",
        cityList: response.data.citySaoudia
            ? {
                key: response.data.citySaoudia._id,
                value: response.data.citySaoudia._id,
                label: response.data.citySaoudia.name_en,
              }
            : "",
        regionList: response.data.regionSaoudia
            ? {
                key: response.data.regionSaoudia._id,
                value: response.data.regionSaoudia._id,
                label: response.data.regionSaoudia.name_en,
              }
            : "",
            testCountry:countryValue.value,
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
  handleEtatChange(value) {
    this.setState({
      etat: value,
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
            returnRoute="/boutique"
            title={
              <Translation>
                {(t) => <div>{t("boutique.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <BoutiqueForm
            handleChange={this.handleChange}
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("boutique.edit")}</div>}
              </Translation>
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
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(EditBoutique))
  )
);
