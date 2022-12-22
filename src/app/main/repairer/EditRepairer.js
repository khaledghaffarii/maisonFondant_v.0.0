import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import env from "../../static";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import RepairerForm from "./RepairerForm";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});
//
class EditRepairer extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      testCountry:"",
      id:"",
      country:"",
      listCountry:[],
      email: "",
      password: "",
      phone: "",
      boutiqueOptions: [],
      boutique: "",
      boutiqueValidation: false,
      etat: "",
      etatValidation: false,
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
    this.handleChipChange = this.handleChipChange.bind(this);
    this.handleChipChangeEtat = this.handleChipChangeEtat.bind(this);
    this.handleChipChangeCountry=this.handleChipChangeCountry.bind(this);
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
  handleChipChange(value) {
    this.setState({
      boutique: value,
      boutiqueValidation: value !== "" ? true : false,
    });
  }
  handleChipChangeEtat(value) {
    this.setState({
      etat: value,
      etatValidation: value !== "" ? true : false,
    });
  }

  async update() {
    try {
      const repairer = {
        fname: this.state.fname,
        lname: this.state.lname,
        id:this.state.id,
        country:this.state.country.key,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        boutique: this.state.boutique.key,
        etat: this.state.etat.label,
        gouvernorat:this.state.gouvernorat.value?this.state.gouvernorat.value:"",
        delegation:this.state.delegation.value?this.state.delegation.value:"",
        region:this.state.regionList.value?this.state.regionList.value:"",
        city:this.state.cityList.value?this.state.cityList.value:"",
      };

      const url = env.repairers.update(this.props.match.params.id);

      await this.request.update(url, repairer, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/repairer");
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
      const url = env.repairers.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlboutique = env.boutiques.all;
      const boutiques = await this.request.getAll(urlboutique);
      const urlGouvernorats = env.gouvernorats.all;
      const gouvernorats = await this.request.getAll(urlGouvernorats);
      const urlRegion = env.region.all;
      const region = await this.request.getAll(urlRegion);
      this.setState({
        boutiqueOptions: boutiques.data,
        gouvernoratsOptions: gouvernorats.data,
        optionRegion: region.data.data,
      });
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
     
      this.setState({
        fname: response.data.fname,
        lname: response.data.lname,
        id:response.data.hawiya,
        country:countryValue,
        testCountry:countryValue.value,
        regionList:"",
        cityList:"",
        gouvernorat:"",
        delegation:"",
        listCountry:Country.data,
        email: response.data.email,
        phone: response.data.phone,
        boutique: {
          key: response.data.boutique._id,
          value: response.data.boutique._id,
          label: response.data.boutique.name,
        },
        boutiqueOptions: boutiques.data,
        boutiqueValidation: response.data.boutique ? true : false,
        etat: { key: 1, value: 1, label: response.data.etat },
        etatValidation: response.data.etat ? true : false,
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
            returnRoute="/Repairer"
            title={
              <Translation>
                {(t) => <div>{t("repairer.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <RepairerForm
            handleSubmit={this.update}
            state={this.state}
            ButtonText="modifier"
            handleChipChange={this.handleChipChange}
            handleChange={this.handleChange}
            showPassword={localStorage.getItem("AdminOrTeam") == "admin"?true:false}
            updatePassword={localStorage.getItem("AdminOrTeam") == "admin"?false:true}
            handleChipChangeEtat={this.handleChipChangeEtat}
            handleChipChangeCountry={this.handleChipChangeCountry}
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
    withSnackbar(withRouter(EditRepairer))
  )
);
