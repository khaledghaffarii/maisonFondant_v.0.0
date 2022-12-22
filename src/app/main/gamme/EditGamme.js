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
import GammeForm from "./GammeForm";
const styles = (theme) => ({
  layoutRoot: {},
});
class EditGamme extends Component {
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
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }
  handleChipChangeBrand(value) {
    this.setState((state) => {
      return {
        brand: value,
      };
    });
  }
  async handleChipChangeDevice(value) {
    const url = env.brand.brandByDevice;
    const response = await this.request.getById(url, value.key);
    this.setState((state) => {
      return {
        device: value,
        brandList: response.data,
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
  handleChipChangeParent(value) {
    this.setState({
      parent: value,
      parentValidation: value !== "" ? true : false,
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
    const { name, file, brand, device } = this.state;
    let form_data = new FormData();
    form_data.append("name", this.state.name);
    for (var i = 0; i < this.state.country.length; i++) {
      form_data.append("country[]", this.state.country[i].key);
    }
    if (device._id) {
      form_data.append("deviceList", device._id);
    } else {
      form_data.append("deviceList", device.value);
    }
    if (brand._id) {
      form_data.append("brandList", brand._id);
    } else {
      form_data.append("brandList", brand.value);
    }
    if (this.state.file !== "") {
      form_data.append("file", this.state.file,this.state.file.name);
    }
    form_data.append("description", this.state.description);
    form_data.append("tags", this.state.tags);

    try {
      const url = env.gamme.update(this.props.match.params.id);
      await this.request.update(url, form_data, false);
      this.props.enqueueSnackbar(
        <Translation>
        {(t) => <div>{t("stock.edit.error")}</div>}
      </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/gamme");
    } catch (err) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(
          err.response.data.message,
          {
            variant: "error",
          }
        );
      }
    }
  }
  async componentDidMount() {
    try {
      const url = env.gamme.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );

      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
    
      const urlDevice = env.device.alldevice;
      const devices = await this.request.getAll(urlDevice);
      const urlBrand = env.brand.brandByDevice;
      const brand = await this.request.getById(urlBrand, response.data.deviceList._id);
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
      this.setState({
        device:{
          key: response.data.deviceList._id,
          value: response.data.deviceList._id,
          label: response.data.deviceList.nameEnglish,
        },
        deviceList: devices.data.data,
        brand:{
          key: response.data.brandList._id,
          value: response.data.brandList._id,
          label: response.data.brandList.name,
        },
        country: countryValue,
        listCountry: Country.data,
        brandList: brand.data,
        name: response.data.name,
        description: response.data.description,
        tags: response.data.tags,
       
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
            returnRoute="/gamme"
            title={
              <Translation>{(t) => <div>{t("gamme.update")}</div>}</Translation>
            }
          />
        }
        content={
          <GammeForm
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("category.button")}</div>}
              </Translation>
            }
            handleChipChangeDevice={this.handleChipChangeDevice}
            handleChipChangeBrand={this.handleChipChangeBrand}
            handleChange={this.handleChange}
            handleChipChangeParent={this.handleChipChangeParent}
            handleChipChangeCountry={this.handleChipChangeCountry}
            fileChangedHandler={this.fileChangedHandler}
            // handleChangeSelect={this.handleChangeSelect}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditGamme)))
);
