import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import CategoryForm from "./CategoryForm";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class EditCategory extends Component {
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
      country:"",
      color:[],
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
    //
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.handleChipChangeParent = this.handleChipChangeParent.bind(this);
    this.handleChipChangeColor = this.handleChipChangeColor.bind(this);
    this.handleChipChangeCountry=this.handleChipChangeCountry.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }
  handleChipChangeParent(value) {
    this.setState((state) => {
      return {
        parent: value,
      };
    });
  }
  handleChipChangeColor(value) {
    this.setState(state => {
      return {
        color: value
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
  handleChipChangeColor(value) {
    this.setState(state => {
      return {
        color: value
      };
    });
  }
  fileChangedHandler = (image) => {
    this.setState({ file: image });
  }
  handleChangeSelect(event) {
    this.setState({
      disponibilite: event.target.value,
    });
  }
  async update() {
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
       // console.log("this.state.color",obj.key);
    }))
   // console.log("this.state.color",this.state.color);
      
    }
    if (this.state.file !== "") {
      form_data.append("file", this.state.file, this.state.file.name);
    }
    form_data.append("desciption", this.state.description);
    form_data.append('descriptionArabe', this.state.descriptionArabe);
    form_data.append('descriptionEnglish', this.state.descriptionEnglish);
    form_data.append("tags", this.state.tags);
    try {
      const url = env.categories.update(this.props.match.params.id);
      await this.request.update(url, form_data, false);
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
      this.props.history.push("/category");
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
  async componentDidMount() {
    try {
      const url = env.categories.info;
      const response = await this.request.getById(
        url,
        this.props.match.params.id
      );
      const urlParent = env.categories.all;
      const parent = await this.request.getAll(urlParent);
      const urlColor = env.productColor.all;
      //console.log("color",urlColor);
      const color = await this.request.getAll(urlColor);
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
      let colorValue={};
      if (response.data.colorList) {
        console.log("eee",response.data.colorList)
        colorValue = await Promise.all(response.data.colorList.map(async (obj) => {
          console.log("aaaaaaa",obj)
          return {
              key: obj._id,
              value: obj._id,
              label: <p style={{}}><b style={{fontSize: "1.6em"}}>{obj.nameColorEnglish}</b><b  style={{ 
                backgroundColor: `${obj.codeColor}`,
                borderRadius: "50%",
                display: "inline-block", height:"19px", width:"19px", margin: "0px 0px 0px 10px"}}></b></p>,
          };
      }))
      } else {
        colorValue = "";
      }   
      this.setState({
        name: response.data.name,
        nameArabe: response.data.nameArabe,
        nameEnglish: response.data.nameEnglish,
        prix: response.data.prix,
        parent: parentValue,
        country:countryValue,
        optionParent: parent.data,
        color:colorValue,
        listColor:color.data,
        listCountry:Country.data,
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
            returnRoute="/category"
            title={
              <Translation>
                {(t) => <div>{t("category.update")}</div>}
              </Translation>
            }
          />
        }
        content={
          <CategoryForm
            handleSubmit={this.update}
            state={this.state}
            ButtonText={  <Translation>
              {(t) => <div>{t("category.button")}</div>}
            </Translation>}
            handleChange={this.handleChange}
            handleChipChangeParent={this.handleChipChangeParent}
            handleChipChangeColor={this.handleChipChangeColor}
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
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(EditCategory))
  )
);
