import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
//import BrindForm from "./BrandForm";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
import DeviceForm from "./DeviceForm";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewDevice extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      nameArabe: "",
      country: "",
      listCountry: [],
      nameFrench: "",
      nameEnglish: "",
      file: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
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
  handleSubmit = async (e) => {
  
    let form_data = new FormData();
    form_data.append("nameArabe", this.state.nameArabe);
    for (var i = 0; i < this.state.country.length; i++) {
      form_data.append("country[]", this.state.country[i].key);
    }
    form_data.append("nameFrench", this.state.nameFrench);
    form_data.append("nameEnglish", this.state.nameEnglish);
  
    if (this.state.file !== "") {
      form_data.append("file", this.state.file, this.state.file.name);
    }

    try {
      const url = env.device.new;
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
      this.props.history.push("/device");
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
    // const urlBrand = env.brand.allBrand;
    //const repairers = await this.request.getAll(urlBrand);
    //console.log('repairers.data'+repairers.data);
    //this.setState({ repairerOptions: repairers.data });
    const urlCountry = env.country.all;
    const Country = await this.request.getAll(urlCountry);
    this.setState({
      listCountry: Country.data,
    });
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
            returnRoute="/device"
            title={this.props.t("device.add")}
          />
        }
        content={
          <DeviceForm
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("device.add")}</div>}</Translation>
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
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewDevice)))
);
