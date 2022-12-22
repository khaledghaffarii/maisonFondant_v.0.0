import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import ProductReparationForm from "./ProductReparationForm";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditProductReparation extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    
    const userType = localStorage.getItem("AdminOrTeam");
    this.state = {
      typeReparation:"",
      device:"",
      model:"",
      addCountry:userType=="admin"?true:false,
      listTypeReparation:[],
      listDevice:[],
      listModel:[],
      colorList:[],
      prix:"",
      disponibilite:"",
      prixFournisseur:"",
      listCountry:[],
      listColor:[],
      country:"",
      descriptionArabe: '',
      descriptionEnglish: '',
      description: "",
      tags: "",
      file: "",
      brand:"",
      brandList:[],
      testAddColor:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.handleChipChangeCountry=this.handleChipChangeCountry.bind(this);
    this.handleChipChangeColor = this.handleChipChangeColor.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChipChangeTypeReparation=this.handleChipChangeTypeReparation.bind(this);
    this.handleChipChangeDevice=this.handleChipChangeDevice.bind(this);
    this.handleChipChangeModel=this.handleChipChangeModel.bind(this);
    this.handleChipChangeBrand=this.handleChipChangeBrand.bind(this);
  }

  handleChange(event) {
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    }
  
    async  handleChipChangeBrand(value) {
      let url = env.model.modelByBrandAndDevice + "?";
      url+= "brand="+value.key;
      url += "&device="+this.state.device.key;
      const response = await this.request.getAll(url);
      this.setState((state) => {
        return {
          brand: value,
          listModel:response.data
        };
      });
    } 
    async  handleChipChangeDevice(value) {
      if(this.state.brand!=""){
      let urlModel = env.model.modelByBrandAndDevice + "?";
      urlModel+= "brand="+this.state.brand.key;
      urlModel += "&device="+value.key;
      const responseModel = await this.request.getAll(urlModel);
      this.setState((state) => {
        return {
          listModel:responseModel.data
        };
      });
    }
      const url = env.brand.brandByDevice;
      const response = await this.request.getById(
        url,
        value.key
      );
       this.setState((state) => {
        return {
          device: value,
          brandList:response.data
        };
      });
    }
   
    handleChipChangeTypeReparation(value) {
      this.setState((state) => {
        return {
          typeReparation: value,
          testAddColor:value.value
        };
      });
     
      
    }
    handleChipChangeCountry(value) {
      this.setState((state) => {
        return {
          country: value,
        };
      });
    }
    handleChipChangeModel(value) {
      //console.log("value",value);
      this.setState(state => {
        return {
          model: value
        };
      });
    }
    handleChipChangeColor(value) {
      //console.log("value",value);
      this.setState(state => {
        return {
          colorList: value,
       //   listColor:value.value,
        };
      });
    }
    handleChangeSelect(event) {
      this.setState({
        disponibilite: event.target.value,
      });
    }
  
    async componentDidMount() {
      try {
        const url = env.productsReparation.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
        
        const urlCountry = env.country.all;
        const Country = await this.request.getAll(urlCountry);
        const urlColor = env.productColor.all;
        //console.log("color",urlColor);
        const colorlist = await this.request.getAll(urlColor);
        const urlTypeReparations = env.reparationType.allReparationType;
        //console.log("color",listTypeReparations);
        const listTypeReparations = await this.request.getAll(urlTypeReparations);
        const urlDevices = env.device.alldevice;
        const listDevices = await this.request.getAll(urlDevices);
  
        const urlBrand = env.brand.allBrand;
      const responseBrand = await this.request.getAll(urlBrand);
      let urlModel = env.model.modelByBrandAndDevice + "?";
      urlModel+= "brand="+response.data.brand._id;
      urlModel += "&device="+response.data.brand._id;
      const responseModel = await this.request.getAll(urlModel);
      let countryValue;
      if (response.data.country) {
        countryValue = {
          key: response.data.country._id,
          value: response.data.country._id,
          label: response.data.country.countryName,
        };
      } else {
        countryValue = "";
      }   
      let typeReparationValue;
      let testAddColorValue;
      if (response.data.typeReparation) {
        testAddColorValue=response.data.typeReparation.color;
        typeReparationValue = {
          key: response.data.typeReparation._id,
          value: response.data.typeReparation._id,
          label: response.data.typeReparation.name,
        };
      } else {
        testAddColorValue=false;
        typeReparationValue = "";
      }
      let deviceValue;
      if (response.data.device) {
        deviceValue = {
          key: response.data.device._id,
          value: response.data.device._id,
          label: response.data.device.nameEnglish,
        };
      } else {
        deviceValue = "";
      }
      let modelValue;
      if (response.data.model) {
        modelValue = {
          key: response.data.model._id,
          value: response.data.model._id,
          label: response.data.model.name,
        };
      } else {
        modelValue = "";
      }
      let brandValue={};
      if (response.data.brand) {
        brandValue = {
          key: response.data.brand._id,
          value: response.data.brand._id,
          label: response.data.brand.name,
        };
      } else {
        brandValue = "";
      }
      let colorValue={};
      if (response.data.colorList) {
        console.log("eee",response.data.colorList)
        colorValue = await Promise.all(response.data.colorList.map(async (obj) => {
          console.log("aaaaaaa",obj)
          return {
              key: obj._id,
              value: obj._id,
              label: <p style={{}}><b style={{fontSize: "1.6em"}}>{obj.nameColorEnglish}</b><b  style={{ 
                backgroundColor: `${obj.codeColor}`,
                borderRadius: "50%",
                display: "inline-block", height:"19px", width:"19px", margin: "0px 0px 0px 10px"}}></b></p>,
          };
      }))
      } else {
        colorValue = "";
      }   
     // console.log('response.data.model.colorList',response.data.model.colorList);
        this.setState({
          listColor:response.data.model.colorList,
          colorList:colorValue,
          listCountry:Country.data,
          listTypeReparation:listTypeReparations.data.data,
          brandList:responseBrand.data.data,
          listDevice:listDevices.data.data,
          disponibilite: response.data.disponibilite,
          description: response.data.description,
          descriptionArabe: response.data.descriptionArabe,
          descriptionEnglish: response.data.descriptionEnglish,
          tags: response.data.tags,
          prixFournisseur: response.data.prixFournisseur,
          prix: response.data.prix,
          country:countryValue,
          typeReparation:typeReparationValue,
          testAddColor:testAddColorValue,
          device:deviceValue,
          model:modelValue,
          brand:brandValue,
          listModel:responseModel.data    
        });
      } catch (e) {
        if (e.response) {
          this.props.enqueueSnackbar(e.response.data.message, {
            variant: "error",
          });
        } else {
          this.props.enqueueSnackbar(
            "error"+e,
            {
              variant: "error",
            }
          );
        }
      }
    }
  
  async update(e, data, newData) {
   
    try {
      const { prix,country,typeReparation,device,model,brand,prixFournisseur,colorList,disponibilite,description,descriptionArabe,descriptionEnglish,tags } = this.state;
        
      const colorLists = await Promise.all(colorList.map(async (obj) => {
      
      
       return obj.key;
   }))
      const url = env.productsReparation.update(this.props.match.params.id);
      await this.request.update(url, { prix,country:country.key,typeReparation:typeReparation.key,device:device.key,model:model.key,brand:brand.key,prixFournisseur,colorList:colorLists,disponibilite,description,descriptionArabe,descriptionEnglish,tags }, false);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/productReparation");
    } catch (err) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>+err,
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
            returnRoute="/productReparation"
            title={
              <Translation>
                {(t) => <div>{t("product.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <ProductReparationForm
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("category.button")}</div>}
              </Translation>
            }
            handleChange={this.handleChange}
            handleChipChangeCountry={this.handleChipChangeCountry}
            fileChangedHandler={this.fileChangedHandler}
            handleChangeSelect={this.handleChangeSelect}
            handleChipChangeColor={this.handleChipChangeColor}
            handleChipChangeTypeReparation={this.handleChipChangeTypeReparation}
            handleChipChangeDevice={this.handleChipChangeDevice}
            handleChipChangeModel={this.handleChipChangeModel}
            handleChipChangeBrand={this.handleChipChangeBrand}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditProductReparation)))
);