import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import React, { Component } from "react";
import Request from "../../utils/Request";
import ArchiveTable from "../sharedComponent/ArchiveTable";
import { FusePageCarded } from "@fuse";
import FormHeader from "../sharedComponent/FormHeader";
import { withRouter } from "react-router-dom";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
const styles = (theme) => ({
  layoutRoot: {},
});
class ArchiveCommandes extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>{(t) => <div>{t("stock.image")}</div>}</Translation>
          ),
          field: "picture",
          render: (rowData) => (
            <img
              alt="category"
              src={`${env.staticFiles}${rowData.picture}`}
              style={{ width: 50, borderRadius: "50%" }}
            />
          ),
        },
        {
          title: (
            <Translation>{(t) => <div>{t("supplier.name")}</div>}</Translation>
          ),
          field: "name",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("commandes.price")}</div>}
            </Translation>
          ),
          field: "prix",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("category.category")}</div>}
            </Translation>
          ),
          field: "classCategory",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("category.parent.title")}</div>}
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
      const url = env.categories.all;
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
          classCategory: element.classCategory.name,
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
        header={<FormHeader returnRoute="/category" title="Archive" />}
        content={
          <ArchiveTable
            title={
              <Translation>
                {(t) => <div>{t("category.category")}</div>}
              </Translation>
            }
            columns={this.state.columns}
            data={this.state.data}
            routeEdit="/editCategory"
            setStateOnDelete={this.setStateOnDelete}
          />
        }
      />
    );
  }
}
export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(ArchiveCommandes))
  )
);
