import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import RepairerForm from "./RepairerForm";
const styles = (theme) => ({
  layoutRoot: {},
});

class NewRepairer extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      id:"",
      listCountry:[],
      country:  localStorage.getItem("AdminOrTeam") == "admin"
      ? ""
      : {
          key: localStorage.getItem("country"),
          value: localStorage.getItem("country"),
          label: localStorage.getItem("country"),
        },
      testCountry:true,
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChipChange(value) {
    this.setState({
      boutique: value,
      boutiqueValidation: value !== "" ? true : false,
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

  handleChipChangeEtat(value) {
    this.setState({
      etat: value,
      etatValidation: value !== "" ? true : false,
    });
  }

  handleSubmit = async (e) => {
    try {
      console.log('this.state.country.key',this.state.country.key)
      const repairer = {
        fname: this.state.fname,
        lname: this.state.lname,
        id:this.state.id,
        country:this.state.country.key,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        boutique: this.state.boutique.key,
        boutiqueValidation: false,
        etat: this.state.etat.label,
        etatValidation: false,
        gouvernorat:this.state.gouvernorat.value?this.state.gouvernorat.value:"",
        delegation:this.state.delegation.value?this.state.delegation.value:"",
        region:this.state.regionList.value?this.state.regionList.value:"",
        city:this.state.cityList.value?this.state.cityList.value:"",
      };
      
      const url = env.repairers.new;
      await this.request.new(url, repairer, false);

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
  };
  async componentDidMount() {
    try {
      const urlGouvernorats = env.gouvernorats.all;
      const gouvernorats = await this.request.getAll(urlGouvernorats);
      const urlRegion = env.region.all;
      const region = await this.request.getAll(urlRegion);
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      Country.data.map(async(opj)=>{
        if(localStorage.getItem("country")==opj._id){
          var urlBoutique = env.boutiques.allByCountry+ "?";
          urlBoutique += "country=" + opj._id; 
          const boutiques = await this.request.getAll(urlBoutique);

          this.setState({
            boutiqueOptions: boutiques.data,
            testCountry:false
          })
        }
   })
      this.setState({ 
        listCountry:Country.data,
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
            returnRoute="/repairer"
            title={
              <Translation>
                {(t) => <div>{t("repairer.addButton")}</div>}
              </Translation>
            }
          />
        }
        content={
          <RepairerForm
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText="ajouter"
            handleChipChange={this.handleChipChange}
            handleChange={this.handleChange}
            showPassword={true}
            updatePassword={true}
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
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewRepairer)))
);
