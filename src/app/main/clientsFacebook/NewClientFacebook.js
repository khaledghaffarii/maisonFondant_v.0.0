import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import Request from "../../utils/Request";
import AuthHelperMethods from "../../services/AuthHelperMethods";
import ClientFacebookForm from "./ClientFacebookForm";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class NewClientFacebook extends Component {
  Auth = new AuthHelperMethods();
  request = new Request();

  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const newState = this.state;
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }
  async componentDidMount() {
    try {
      const urlGouvernorats = env.gouvernorats.all;
      const urlClassCategories = env.gouvernorats.all;
      // const urlParent = env.categories.all
      const urlProducts = env.products.all;
      const gouvernorats = await this.request.getAll(urlGouvernorats);
      const classCategories = await this.request.getAll(urlClassCategories);
      const products = await this.request.getAll(urlProducts);
      this.setState({
        gouvernoratsOptions: gouvernorats.data,
        optionClassCategory: classCategories.data,
        productsOption: products.data,
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error",
        });
      }
    }
  }
  handleSelect(id, name, prix) {
    this.setState({
      productName: name.toString(),
      productID: id,
      prix: prix,
      productsOptions: [],
    });
  }
  handleChipChangeParent(value) {
    this.setState((state) => {
      return {
        product: value,
      };
    });
  }
  handleChangeSelect(event) {
    this.setState({
      disponibilite: event.target.value,
    });
  }

  handleSubmit = async (e) => {
    try {
      const url = env.clientFacebook.new;
      let state = this.state;
      state.status = state.status ? state.status.value : 0;
      await this.request.new(url, state, false);
      this.props.enqueueSnackbar("Operation reussi avec succes", {
        variant: "success",
      });
      this.props.history.push("/clientFb");
    } catch (err) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error",
        });
      }
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <FormHeader returnRoute="/clientFb" title={
            <Translation>
              {(t) => (
                <div>
                  {t(
                    "customer.faceboock.addButtonCustomer"
                  )}
                </div>
              )}
            </Translation>
          }/>
        }
        content={
          <ClientFacebookForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleStatusChange={(status) => this.setState({ status })}
            state={this.state}
            ButtonText={
                <Translation>
                  {(t) => (
                    <div>
                      {t(
                        "customer.addButtonCustomer"
                      )}
                    </div>
                  )}
                </Translation>
              }
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(NewClientFacebook))
  )
);
