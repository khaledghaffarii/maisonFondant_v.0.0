import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";

import env from "../../static";
import { withTranslation, Translation } from "react-i18next";

import ModelForm from "./ModelForm";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditModel extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      file: "",
      country: "",
      listCountry: [],
      brandList: [],
      brand: "",
      deviceList: [],
      device: "",
      colorList: [],
      color: "",
      gammeList: [],
      gamme: "",
      description: "",
      tags: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.handleChipChangeParent = this.handleChipChangeParent.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeBrand = this.handleChipChangeBrand.bind(this);
    // this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChipChangeDevice = this.handleChipChangeDevice.bind(this);
    this.handleChipChangeColor = this.handleChipChangeColor.bind(this);
    this.handleChipChangeGamme = this.handleChipChangeGamme.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }
  async handleChipChangeBrand(value) {
    let urlGamme = env.gamme.gammeByBrandAndDevice + "?";
    urlGamme += "brand=" + value.key;
    urlGamme += "&device=" + this.state.device.key;
    const responseGamme = await this.request.getAll(urlGamme);
    this.setState((state) => {
      return {
        gammeList: responseGamme.data,
        brand: value,
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
  async handleChipChangeDevice(value) {
    if (this.state.brand != "") {
      let urlGamme = env.gamme.gammeByBrandAndDevice + "?";
      urlGamme += "brand=" + this.state.brand.key;
      urlGamme += "&device=" + value.key;
      const responseGamme = await this.request.getAll(urlGamme);
      this.setState((state) => {
        return {
          gammeList: responseGamme.data,
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
  handleChipChangeParent(value) {
    this.setState({
      parent: value,
      parentValidation: value !== "" ? true : false,
    });
  }
  handleChipChangeColor(value) {
    this.setState((state) => {
      return {
        color: value,
      };
    });
  }
  handleChipChangeGamme(value) {
    this.setState((state) => {
      return {
        gamme: value,
      };
    });
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };
  handleChangeSelect(event) {
    this.setState({
      disponibilite: event.target.value,
    });
  }

  async update(e, data, newData) {
    console.log("update");
    const { name, file, brand, device, gamme, color } = this.state;
    let form_data = new FormData();
    let colorLists = [];
    color.forEach((elem) => {
      colorLists.push(elem);
    });
    form_data.set("name", this.state.name);
    for (var i = 0; i < this.state.country.length; i++) {
      form_data.append("country[]", this.state.country[i].key);
    }
    if (device.key) {
      form_data.append("deviceList", device.value);
    } else {
      form_data.append("deviceList", device._id);
    }

    if (brand.key) {
      form_data.append("brandList", brand.value);
    } else {
      form_data.append("brandList", brand._id);
    }

    if (gamme.key) {
      form_data.append("gammeList", gamme.value);
    } else {
      form_data.append("gammeList", gamme._id);
    }

    for (var i = 0; i < colorLists.length; i++) {
      form_data.append("colorList[]", colorLists[i].value);
    }
    if (this.state.file !== "") {
      form_data.append("file", this.state.file, this.state.file.name);
    }
    form_data.append("description", this.state.description);
    form_data.append("tags", this.state.tags);

    try {
      const url = env.model.update(this.props.match.params.id);

      await this.request.update(url, form_data, false);
      this.props.enqueueSnackbar(
        <Translation>{(t) => <div>{t("stock.edit.error")}</div>}</Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/model");
    } catch (err) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      }
    }
  }

  async componentDidMount() {
    try {
      const url = env.model.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      let countryValue={};
      if (response.data.country) {
        //console.log("eee",response.data.colorList)
        countryValue = await Promise.all(response.data.country.map(async (obj) => {
          
          return {
              key: obj._id,
              value: obj._id,
              label: obj.countryName,
          };
      }))
      } else {
        countryValue = "";
      }
      
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      const urlBrand = env.brand.brandByDevice;
      const brand = await this.request.getById(urlBrand, response.data.deviceList._id);
      const urlDevice = env.device.alldevice;
      const devices = await this.request.getAll(urlDevice);
       let urlGamme = env.gamme.gammeByBrandAndDevice + "?";
       urlGamme += "brand=" + response.data.brandList._id;
      urlGamme += "&device=" + response.data.deviceList._id;
      const gamme = await this.request.getAll(urlGamme);
      const urlColor = env.productColor.all;
      const color = await this.request.getAll(urlColor);
      let colorValue = {};
      if (response.data.colorList) {
        colorValue = await Promise.all(
          response.data.colorList.map(async (obj) => {
            return {
              key: obj._id,
              value: obj._id,
              label: (
                <p style={{}}>
                  <b style={{ fontSize: "1.6em" }}>{obj.nameColorEnglish}</b>
                  <b
                    style={{
                      backgroundColor: `${obj.codeColor}`,
                      borderRadius: "50%",
                      display: "inline-block",
                      height: "19px",
                      width: "19px",
                      margin: "0px 0px 0px 10px",
                    }}
                  ></b>
                </p>
              ),
            };
          })
        );
      } else {
        colorValue = "";
      }
      try {//nameEnglish
        this.setState({
          name: response.data.name,
          brand: {
            key: response.data.brandList._id,
            value: response.data.brandList._id,
            label: response.data.brandList.name,
          },
          device: {
            key: response.data.deviceList._id,
            value: response.data.deviceList._id,
            label: response.data.deviceList.nameEnglish,
          },
          gamme: response.data.gammeList?{
            key: response.data.gammeList._id,
            value: response.data.gammeList._id,
            label: response.data.gammeList.name,
          }:"",
          listCountry: Country.data,
          country: countryValue,
          colorList: color.data,
          gammeList: gamme.data,
          brandList: brand.data,
          deviceList: devices.data.data,
          color: colorValue,
          description: response.data.description,
          tags: response.data.tags,
        });
      } catch (e) {
        console.log(e.message);
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
            returnRoute="/model"
            title={
              <Translation>{(t) => <div>{t("model.update")}</div>}</Translation>
            }
          />
        }
        content={
          <ModelForm
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("category.button")}</div>}
              </Translation>
            }
            handleChipChangeGamme={this.handleChipChangeGamme}
            handleChipChangeColor={this.handleChipChangeColor}
            handleChipChangeDevice={this.handleChipChangeDevice}
            handleChipChangeBrand={this.handleChipChangeBrand}
            handleChange={this.handleChange}
            handleChipChangeParent={this.handleChipChangeParent}
            fileChangedHandler={this.fileChangedHandler}
            handleChipChangeCountry={this.handleChipChangeCountry}
            // handleChangeSelect={this.handleChangeSelect}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditModel)))
);
