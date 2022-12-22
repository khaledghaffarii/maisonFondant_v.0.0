import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import React, { Component } from "react";
import Request from "../../utils/Request";
import ArchiveTable from "../sharedComponent/ArchiveTable";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { withRouter } from "react-router-dom";
import env from "../../static";
const styles = (theme) => ({
  layoutRoot: {},
});
class ArchiveProducts extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>{(t) => <div>{t("product.image")}</div>}</Translation>
          ),
          field: "picture",
          render: (rowData) => (
            <img
              alt="product"
              src={`${env.staticFiles}${rowData.picture}`}
              style={{ width: 50, borderRadius: "50%" }}
            />
          ),
        },
        {
          title: (
            <Translation>{(t) => <div>{t("product.name")}</div>}</Translation>
          ),
          field: "name",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("product.price")}</div>}</Translation>
          ),
          field: "prix",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("product.parent.title")}</div>}
            </Translation>
          ),
          field: "parent",
        },
      ],
      data: [],
      selctedRowlength: 0,
    };
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const url = env.products.all;
      const response = await this.request.getAll(url);
      let data = [];
      response.data.forEach((element) => {
        let parentValue = "";
        if (element.parent !== null) {
          parentValue = element.parent.name;
        } else {
          parentValue = (
            <Translation>
              {(t) => <div>{t("category.parent.noParents")}</div>}
            </Translation>
          );
        }
        data.push({
          _id: element._id,
          picture: element.picture,
          name: element.name,
          prix: element.prix,
          parent: parentValue,
        });
      });

      this.setState({
        data: data,
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
  setStateOnDelete(data) {
    this.setState({
      ...this.state,
      data,
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={<FormHeader returnRoute="/product" title="Archive" />}
        content={
          <ArchiveTable
            title="products"
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editProduct"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(ArchiveProducts))
  )
);
