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
import DeviceForm from "./DeviceForm";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditDevice extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      nameArabe: "",
      country: "",
      listCountry: [],
      nameFrench: "",
      nameEnglish: "",
      file: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.handleChipChangeParent = this.handleChipChangeParent.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeCountry = this.handleChipChangeCountry.bind(this);
    // this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleChipChangeParent(value) {
    this.setState({
      parent: value,
      parentValidation: value !== "" ? true : false,
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
  async update(e, data, newData) {
    console.log("update");
    const { nameArabe, nameFrench, nameEnglish, file } = this.state;

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
      const url = env.device.update(this.props.match.params.id);
      await this.request.update(url, form_data, false);

      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
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
  }

  async componentDidMount() {
    try {
      const url = env.device.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
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
      this.setState({
        nameArabe: response.data.nameArabe,
        country: countryValue,
        nameFrench: response.data.nameFrench,
        nameEnglish: response.data.nameEnglish,
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
            returnRoute="/device"
            title={
              <Translation>
                {(t) => <div>{t("device.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <DeviceForm
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("category.button")}</div>}
              </Translation>
            }
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
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditDevice)))
);
