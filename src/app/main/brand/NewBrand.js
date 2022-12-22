import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import decode from "jwt-decode";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import BrandForm from "./BrandForm";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewBrand extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      file: "",
      deviceList: [],
      country: "",
      listCountry: [],
      optionDevices: [],
      devicesValidation: false,
      description: "",
      tags: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeDevice = this.handleChipChangeDevice.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }
  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };
  handleChipChangeDevice(value) {
    this.setState({
      deviceList: value,
      devicesValidation: true,
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
  handleSubmit = async (e) => {
    let form_data = new FormData();
    form_data.append("name", this.state.name);
    for (var i = 0; i < this.state.country.length; i++) {
      form_data.append("country[]", this.state.country[i].key);
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
    if (this.state.file !== "") {
      form_data.append("file", this.state.file, this.state.file.name);
    }
    try {
      const url = env.brand.new;
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
    }
  };

  async componentDidMount() {
    try {
      const urlDevice = env.device.alldevice;
      const response = await this.request.getAll(urlDevice);
      const urlCountry = env.country.all;
    const Country = await this.request.getAll(urlCountry);
    
      this.setState({
        optionDevices: response.data.data,
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
          <FormHeader returnRoute="/brand" title={this.props.t("brind.add")} />
        }
        content={
          <BrandForm
            handleSubmit={this.handleSubmit}
            handleChipChangeDevice={this.handleChipChangeDevice}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("brind.add")}</div>}</Translation>
            }
            handleChange={this.handleChange}
            fileChangedHandler={this.fileChangedHandler}
            handleChipChangeCountry={this.handleChipChangeCountry}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewBrand)))
);
