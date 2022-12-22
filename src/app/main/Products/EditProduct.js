import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import ProductForm from "./ProductForm";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});

class EditProduct extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameArabe: "",
      nameEnglish: "",
      country:"",
      prix: 0,
      prixFournisseur: 0,
      parent: "",
      optionParent: [],
      listCountry:[],
      parentValidation: false,
      couleur: "",
      disponibilite: "",
      desciption: "",
      descriptionArabe: '',
      descriptionEnglish: '',
      tags: "",
      file: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.handleChipChangeParent = this.handleChipChangeParent.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChipChangeCountry=this.handleChipChangeCountry.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
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
    let form_data = new FormData();
    form_data.append("name", this.state.name);
    form_data.append("nameArabe", this.state.nameArabe);
    form_data.append("nameEnglish", this.state.nameEnglish);
    form_data.append("country", this.state.country.key);
    form_data.append("prix", this.state.prix);
    form_data.append("prixFournisseur", this.state.prixFournisseur);
    if (this.state.parent !== "") {
      form_data.append("parent", this.state.parent.key);
    }
    if (this.state.file !== "") {
      form_data.append("file", this.state.file, this.state.file.name);
    }
    form_data.append("couleur", this.state.couleur);
    form_data.append("disponibilite", this.state.disponibilite);
    form_data.append("description", this.state.description);
    form_data.append('descriptionArabe', this.state.descriptionArabe);
    form_data.append('descriptionEnglish', this.state.descriptionEnglish);
    form_data.append("tags", this.state.tags);

    try {
      const url = env.products.update(this.props.match.params.id);
      await this.request.update(url, form_data, false);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/product");
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
  }

  async componentDidMount() {
    try {
      const url = env.products.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlParent = env.categories.all;
      const parent = await this.request.getAll(urlParent);
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      let countryValue;
      if (response.data.country) {
        countryValue = {
          key: response.data.country._id,
          value: response.data.country._id,
          label: response.data.country.countryName,
        };
      } else {
        countryValue = "";
      }
      let parentValue;
      if (response.data.parent) {
        parentValue = {
          key: response.data.parent._id,
          value: response.data.parent._id,
          label: response.data.parent.name,
        };
      } else {
        parentValue = "";
      }
      this.setState({
        name: response.data.name,
        nameArabe: response.data.nameArabe,
        nameEnglish: response.data.nameEnglish,
        prix: response.data.prix,
        country:countryValue,
        listCountry:Country.data,
        prixFournisseur: response.data.extraData?.prixFournisseur
          ? parseInt(response.data.extraData.prixFournisseur)
          : 0,
        parent: parentValue,
        parentValidation: response.data.parent ? true : false,
        optionParent: parent.data,
        couleur: response.data.couleur,
        disponibilite: response.data.disponibilite,
        description: response.data.description,
        descriptionArabe: response.data.descriptionArabe,
        descriptionEnglish: response.data.descriptionEnglish,
        tags: response.data.tags,
      });

      response.data.prix > 0
        ? this.setState({ show: true })
        : this.setState({ show: false });
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
            returnRoute="/product"
            title={
              <Translation>
                {(t) => <div>{t("product.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <ProductForm
            handleSubmit={this.update}
            state={this.state}
            ButtonText={
              <Translation>
                {(t) => <div>{t("category.button")}</div>}
              </Translation>
            }
            handleChange={this.handleChange}
            handleChipChangeParent={this.handleChipChangeParent}
            handleChipChangeCountry={this.handleChipChangeCountry}
            fileChangedHandler={this.fileChangedHandler}
            handleChangeSelect={this.handleChangeSelect}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditProduct)))
);
