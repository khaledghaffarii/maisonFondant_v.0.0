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

import ReparationTypeForme from "./ReparationTypeForme";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditReparationType extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      file: "",
      name: "",
      country: "",
      listCountry: [],
      deviceList: [],
      device: "",
      optionDevices: [],
      devicesValidation: false,
      description: "",
      tags: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.update = this.update.bind(this);
    this.handleChipChangeModel = this.handleChipChangeModel.bind(this);
    this.handleChipChangeDevice = this.handleChipChangeDevice.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }

  handleChipChangeModel(value) {
    this.setState((state) => {
      return {
        model: value,
      };
    });
  }
  handleChipChangeDevice(value) {
    this.setState((state) => {
      return {
        deviceList: value,
        devicesValidation: true,
      };
    });
  }
  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleChipChangeCountry(value) {
    this.setState((state) => {
      return {
        country: value,
      };
    });
  }
  handleChangeSelect(event) {
    this.setState({
      disponibilite: event.target.value,
    });
  }

  async update(e, data, newData) {
    console.log("update");
    const { name,  device } = this.state;
    let form_data = new FormData();
    form_data.append("name", this.state.name);
    form_data.append("nameArabe", this.state.nameArabe);
    form_data.append("nameFrench", this.state.nameFrench);
    for (var i = 0; i < this.state.country.length; i++) {
      form_data.append("country[]", this.state.country[i].key);
    }
    form_data.append("nameEnglish", this.state.nameEnglish);
    form_data.append("description", this.state.description);
    form_data.append("tags", this.state.tags);
    let devices = [];
    this.state.deviceList.forEach((elem) => {
      devices.push(elem.value);
    });
    for (var i = 0; i < devices.length; i++) {
      form_data.append("deviceList[]", devices[i]);
    }
    if (this.state.file !== "") {
      form_data.append("file", this.state.file, this.state.file.name);
    }
    try {
      const url = env.reparationType.update(this.props.match.params.id);
      await this.request.update(url, form_data, false);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/reparationType");
    } catch (err) {
      console.log(
        "🚀 ~ file: EditReparationType.js ~ line 113 ~ EditReparationType ~ update ~ err",
        err
      );
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
      const url = env.reparationType.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);

     
      const urlDevice = env.device.alldevice;
      const Devices = await this.request.getAll(urlDevice);
      let devices = [];
      if (response.data.deviceList.length > 0) {
        response.data.deviceList.forEach((elem) => {
          devices.push({
            key: elem._id,
            value: elem._id,
            label: elem.nameEnglish,
          });
        });
      }
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
        device: response.data.deviceList,
        optionDevices: Devices.data.data,
        name: response.data.name,
        deviceList: devices,
        nameArabe: response.data.nameArabe,
        nameFrench: response.data.nameFrench,
        devicesValidation: response.data.specialities ? true : false,
        description: response.data.description,
        tags: response.data.tags,
        listCountry: Country.data,
        country: countryValue,
     
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
            returnRoute="/reparationType"
            title={
              <Translation>
                {(t) => <div>{t("reparationType.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <ReparationTypeForme
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("category.button")}</div>}
              </Translation>
            }
            fileChangedHandler={this.fileChangedHandler}
            handleChipChangeModel={this.handleChipChangeModel}
            handleChipChangeDevice={this.handleChipChangeDevice}
            handleChange={this.handleChange}
            handleChipChangeCountry={this.handleChipChangeCountry}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(EditReparationType))
  )
);
