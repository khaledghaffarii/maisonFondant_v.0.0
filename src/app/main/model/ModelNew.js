import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import decode from "jwt-decode";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import ModelForm from "./ModelForm";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewModel extends Component {
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
      colorList: [],
      color: "",
      gammeList: [],
      gamme: "",
      description: "",
      tags: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeBrand = this.handleChipChangeBrand.bind(this);
    this.handleChipChangeDevice = this.handleChipChangeDevice.bind(this);
    this.handleChipChangeGamme = this.handleChipChangeGamme.bind(this);
    this.handleChipChangeColor = this.handleChipChangeColor.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
  }
  fileChangedHandler = (image) => {
    

    this.setState({ file: image });
  };
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
  handleChipChangeGamme(value) {
    this.setState((state) => {
      return {
        gamme: value,
      };
    });
  }
  handleChipChangeColor(value) {
    this.setState((state) => {
      return {
        color: value,
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
    form_data.set("brandList", brand.value);
    form_data.set("deviceList", device.value);
    form_data.set("gammeList", gamme.value);
    for (var i = 0; i < colorLists.length; i++) {
      form_data.append("colorList[]", colorLists[i].value);
    }
    if (this.state.file !== "") {
      form_data.set("file", this.state.file, this.state.file.name);
    }
    form_data.append("description", this.state.description);
    form_data.append("tags", this.state.tags);
    try {
      const url = env.model.new;
      
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
      this.props.history.push("/model");
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
  };

  async componentDidMount() {
    try {
     
      const urlDevice = env.device.alldevice;
      const devices = await this.request.getAll(urlDevice);
      const urlNameColor = env.productColor.all;
      const colors = await this.request.getAll(urlNameColor);
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      this.setState({
        deviceList: devices.data.data,
        //gammeList: gammes.data.data,
        colorList: colors.data,
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
          <FormHeader returnRoute="/model" title={this.props.t("model.add")} />
        }
        content={
          <ModelForm
            handleSubmit={this.handleSubmit}
            handleChipChangeBrand={this.handleChipChangeBrand}
            handleChipChangeDevice={this.handleChipChangeDevice}
            handleChipChangeGamme={this.handleChipChangeGamme}
            handleChipChangeColor={this.handleChipChangeColor}
            handleChipChangeCountry={this.handleChipChangeCountry}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("model.add")}</div>}</Translation>
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
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewModel)))
);
