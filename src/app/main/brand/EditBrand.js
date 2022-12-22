import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import BrandForm from "./BrandForm";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditBrand extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      file: "",
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
    this.update = this.update.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    // this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChipChangeDevice = this.handleChipChangeDevice.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }

  handleChipChangeDevice(value) {
    this.setState((state) => {
      return {
        deviceList: value,
        devicesValidation: true,
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

  async update(e) {
    let form_data = new FormData();

    form_data.append("name", this.state.name);
    let devices = [];
    this.state.deviceList.forEach((elem) => {
      devices.push(elem.value);
    });
    
    for (var i = 0; i < this.state.country.length; i++) {
      form_data.append("country[]", this.state.country[i].key);
    }
    for (var i = 0; i < devices.length; i++) {
      form_data.append("deviceList[]", devices[i]);
    }
    if (this.state.file !== "") {
      form_data.append("file", this.state.file, this.state.file.name);
    }
    form_data.append("description", this.state.description);
    form_data.append("tags", this.state.tags);
    try {
      const url = env.brand.update(this.props.match.params.id);

      await this.request.update(url, form_data, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/brand");
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
      this.props.enqueueSnackbar(err.response.data.message, {
        variant: "error",
      });
    }
  }

  async componentDidMount() {
    try {
      const url = env.brand.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlDevice = env.device.alldevice;
      const responseDevices = await this.request.getAll(urlDevice);
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
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
      this.setState({
        name: response.data.name,
        device: response.data.deviceList.name,
        country: countryValue,
        listCountry: Country.data,
        optionDevices: responseDevices.data.data,
        deviceList: devices,
        devicesValidation: response.data.specialities ? true : false,
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
            returnRoute="/brand"
            title={
              <Translation>{(t) => <div>{t("brind.update")}</div>}</Translation>
            }
          />
        }
        content={
          <BrandForm
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("category.button")}</div>}
              </Translation>
            }
            handleChipChangeDevice={this.handleChipChangeDevice}
            handleChange={this.handleChange}
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
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditBrand)))
);
