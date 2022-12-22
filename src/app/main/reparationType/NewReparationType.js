import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import decode from "jwt-decode";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";

import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
import ReparationTypeForme from "./ReparationTypeForme";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewReparationType extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      country: "",
      listCountry: [],
      nameArabe: "",
      nameFrench: "",
      file: "",
      model: "",
      deviceList: [],
      optionDevices: [],
      devicesValidation: false,
      device: "",
      description: "",
      tags: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeModel = this.handleChipChangeModel.bind(this);
    this.handleChipChangeDevice = this.handleChipChangeDevice.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }
  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };
  handleChipChangeCountry(value) {
    this.setState((state) => {
      return {
        country: value,
      };
    });
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
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit = async (e) => {
    const { name, model, file, device } = this.state;
    try {
      const url = env.reparationType.new;
      let form_data = new FormData();
      form_data.append("name", this.state.name);
      form_data.append("nameArabe", this.state.nameArabe);
      form_data.append("nameFrench", this.state.nameFrench);
      for (var i = 0; i < this.state.country.length; i++) {
        form_data.append("country[]", this.state.country[i].key);
      }
      if (this.state.file !== "") {
        form_data.append("file", this.state.file, this.state.file.name);
      }
      let devices = [];
      this.state.deviceList.forEach((elem) => {
        devices.push(elem.value);
      });
      for (var i = 0; i < devices.length; i++) {
        form_data.append("deviceList[]", devices[i]);
      }
      form_data.append("description", this.state.description);
      form_data.append("tags", this.state.tags);

      const response = await this.request.new(url, form_data, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.setState({ id: response.data._id });
      this.props.history.push("/ReparationType");
    } catch (err) {
      console.log(err.message)
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
  };

  async componentDidMount() {
    try {
      const urlModel = env.model.allModel;
      const model = await this.request.getAll(urlModel);
      const urlDevice = env.device.alldevice;
      const device = await this.request.getAll(urlDevice);
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      this.setState({
        optionDevices: device.data.data,
        listCountry: Country.data,
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
            returnRoute="/ReparationType"
            title={this.props.t("reparationType.add")}
          />
        }
        content={
          <ReparationTypeForme
            handleSubmit={this.handleSubmit}
            handleChipChangeModel={this.handleChipChangeModel}
            handleChipChangeDevice={this.handleChipChangeDevice}
            handleChipChangeCountry={this.handleChipChangeCountry}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("reparationType.add")}</div>}
              </Translation>
            }
            handleChange={this.handleChange}
            fileChangedHandler={this.fileChangedHandler}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(NewReparationType))
  )
);