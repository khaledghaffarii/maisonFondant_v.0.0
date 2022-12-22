import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import decode from "jwt-decode";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import GammeForm from "./GammeForm";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewGamme extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeBrand = this.handleChipChangeBrand.bind(this);
    this.handleChipChangeDevice = this.handleChipChangeDevice.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }
  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };
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
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit = async (e) => {
    const { name, file, brand, device } = this.state;
    let form_data = new FormData();
    form_data.append("name", this.state.name);
    for (var i = 0; i < this.state.country.length; i++) {
      form_data.append("country[]", this.state.country[i].key);
    }
    form_data.append("deviceList", device.value);
    form_data.append("brandList", brand.value);
    if (this.state.file !== "") {
      form_data.append("file", this.state.file, this.state.file.name);
    }
    form_data.append("description", this.state.description);
    form_data.append("tags", this.state.tags);
    try {
      const url = env.gamme.new;
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
      this.props.history.push("/Gamme");
    } catch (err) {
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
      const urlDevice = env.device.alldevice;
      const device = await this.request.getAll(urlDevice);
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      this.setState({
        deviceList: device.data.data,
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
          <FormHeader returnRoute="/brand" title={this.props.t("gamme.add")} />
        }
        content={
          <GammeForm
            handleSubmit={this.handleSubmit}
            handleChipChangeBrand={this.handleChipChangeBrand}
            handleChipChangeDevice={this.handleChipChangeDevice}
            handleChipChangeCountry={this.handleChipChangeCountry}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("brind.add")}</div>}</Translation>
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
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewGamme)))
);
