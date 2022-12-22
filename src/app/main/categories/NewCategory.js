import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";

import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import CategoryForm from "./CategoryForm";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewCategory extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameArabe: "",
      nameEnglish: "",
      prix: 0,
      parent: "",
      color:[],
      country:"",
      optionParent: [],
      listColor:[],
      listCountry:[],
      description: "",
      descriptionArabe: '',
      descriptionEnglish: '',
      tags: "",
      file: "",
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChipChangeParent = this.handleChipChangeParent.bind(this);
    this.handleChipChangeColor = this.handleChipChangeColor.bind(this);
    this.handleChipChangeCountry=this.handleChipChangeCountry.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }
  fileChangedHandler = (image) => {
    this.setState({ file: image });
  };
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    if (name === "prix" && value > 0) {
      this.setState({
        show: true,
      });
    } else if (value === 0) {
      this.setState({
        show: false,
      });
    }
  }
  handleChipChangeCountry(value) {
    this.setState((state) => {
      return {
        country: value,
      };
    });
  }
  handleChipChangeParent(value) {
    this.setState((state) => {
      return {
        parent: value,
      };
    });
  }
  handleChipChangeColor(value) {
    //console.log("value",value);
    this.setState(state => {
      return {
        color: value
      };
    });
  }
  handleChangeSelect(event) {
    this.setState({
      disponibilite: event.target.value,
    });
  }

  handleSubmit = async (e) => {
    let form_data = new FormData();
    form_data.append("name", this.state.name);
    form_data.append("nameArabe", this.state.nameArabe);
    form_data.append("nameEnglish", this.state.nameEnglish);
    form_data.append("prix", this.state.prix);
    form_data.append("country", this.state.country.key);
    if (this.state.parent !== "") {
      form_data.append("parent", this.state.parent.key);
    }
    if (this.state.color!== "") {
      var colors=[];
      colors= await Promise.all(this.state.color.map(async (obj) => {
        form_data.append("color[]",obj.key);
    }))
  }
    if (this.state.file !== "") {
      form_data.append("file", this.state.file, this.state.file.name);
    }
    form_data.append("description", this.state.description);
    form_data.append('descriptionArabe', this.state.descriptionArabe);
    form_data.append('descriptionEnglish', this.state.descriptionEnglish);
    form_data.append("tags", this.state.tags);
    try {
      const url = env.categories.new;
      await this.request.new(url, form_data, true);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/category");
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
      const urlParent = env.categories.all;
      const parent = await this.request.getAll(urlParent);
      const urlCountry = env.country.all;
      const Country = await this.request.getAll(urlCountry);
      //console.log("color");
      const urlColor = env.productColor.all;
      //console.log("color",urlColor);
      const colorlist = await this.request.getAll(urlColor);
      //console.log("color",colorlist.data);
      this.setState({
    optionParent:parent.data,
    listColor:colorlist.data,
    listCountry:Country.data
          });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(+e.response.data.message, {
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
            returnRoute="/category"
            title={this.props.t("category.addButton")}
          />
        }
        content={
          <CategoryForm
            handleSubmit={this.handleSubmit}
            state={this.state}
            ButtonText={
              <Translation>{(t) => <div>{t("category.add")}</div>}</Translation>
            }
            handleChange={this.handleChange}
            handleChipChangeParent={this.handleChipChangeParent}
            handleChipChangeCountry={this.handleChipChangeCountry}
            handleChipChangeColor={this.handleChipChangeColor}
            fileChangedHandler={this.fileChangedHandler}
            handleChangeSelect={this.handleChangeSelect}
          />
        }
      />
    );
  }
}

export default withTranslation()(withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewCategory))));
