import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import decode from "jwt-decode";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import ProductReparationForm from "./ProductReparationForm";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewReparationProduit extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    const userType = localStorage.getItem("AdminOrTeam");
    this.state = {
      typeReparation: "",
      device: "",
      model: "",
      brand: "",
      testAddColor: false,
      listTypeReparation: [],
      listDevice: [],
      listModel: [],
      colorList: [],
      brandList: [],
      prix: "",
      disponibilite: "",
      prixFournisseur: "",
      listCountry: [],
      listColor: [],
      country: "",
      addCountry: userType == "admin" ? true : false,
      descriptionArabe: "",
      descriptionEnglish: "",
      description: "",
      tags: "",
      file: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
    this.handleChipChangeColor = this.handleChipChangeColor.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChipChangeTypeReparation =this.handleChipChangeTypeReparation.bind(this);
    this.handleChipChangeDevice = this.handleChipChangeDevice.bind(this);
    this.handleChipChangeModel = this.handleChipChangeModel.bind(this);
    this.handleChipChangeBrand = this.handleChipChangeBrand.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  async handleChipChangeBrand(value) {
    let url = env.model.modelByBrandAndDevice + "?";
    url += "brand=" + value.key;
    url += "&device=" + this.state.device.key;
    const response = await this.request.getAll(url);
    this.setState((state) => {
      return {
        brand: value,
        listModel: response.data,
      };
    });
  }
  async handleChipChangeDevice(value) {
    if (this.state.brand != "") {
      let urlModel = env.model.modelByBrandAndDevice + "?";
      urlModel += "brand=" + this.state.brand.key;
      urlModel += "&device=" + value.key;
      const responseModel = await this.request.getAll(urlModel);
      this.setState((state) => {
        return {
          listModel: responseModel.data,
        };
      });
    }
    const url = env.brand.brandByDevice;
    const response = await this.request.getById(url, value.key);
    this.setState((state) => {
      return {
        device: value,
        brandList: response.data,
      };
    });
  }
  handleChipChangeTypeReparation(value) {
    this.setState((state) => {
      return {
        typeReparation: value,
        testAddColor: value.value,
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
    this.setState((state) => {
      return {
        model: value,
        listColor: value.value,
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
  handleChangeSelect(event) {
    this.setState({
      disponibilite: event.target.value,
    });
  }

  async componentDidMount() {
    try {
      const urlParent = env.categories.all;
      const parent = await this.request.getAll(urlParent);

      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);

      const urlTypeReparations = env.reparationType.allReparationType;
      //console.log("color",listTypeReparations);
      const listTypeReparations = await this.request.getAll(urlTypeReparations);
      const urlDevices = env.device.alldevice;
      const listDevices = await this.request.getAll(urlDevices);

      this.setState({
        listCountry: Country.data,
        listTypeReparation: listTypeReparations.data.data,
        listDevice: listDevices.data.data,
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("error", {
          variant: "error",
        });
      }
    }
  }

  handleSubmit = async (e) => {
    const {
      prix,
      country,
      addCountry,
      typeReparation,
      device,
      model,
      brand,
      prixFournisseur,
      colorList,
      disponibilite,
      description,
      descriptionArabe,
      descriptionEnglish,
      tags,
    } = this.state;

    const colorLists = await Promise.all(
      colorList.map(async (obj) => {
        return obj.key;
      })
    );
    try {
      const url = env.productsReparation.new;
      const userCountry = await localStorage.getItem("country");
      const response = await this.request.new(
        url,
        {
          prix,
          country: addCountry ? country.key : userCountry,
          typeReparation: typeReparation.key,
          device: device.key,
          model: model.key,
          brand: brand.key,
          prixFournisseur,
          colorList: colorLists,
          disponibilite,
          description,
          descriptionArabe,
          descriptionEnglish,
          tags,
        },
        false
      );
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );

      this.setState({ id: response.data._id });

      this.props.history.push(`/productReparation`);
    } catch (err) {
      if (err.response) {
        this.props.enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          +err,
          {
            variant: "error",
          }
        );
      }
    }
  };

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
                {(t) => <div>{t("reparation.addButton")}</div>}
              </Translation>
            }
          />
        }
        content={
          <ProductReparationForm
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("reparation.addButton")}</div>}
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
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(NewReparationProduit))
  )
);
