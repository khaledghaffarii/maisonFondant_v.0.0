import { withStyles } from "@material-ui/core/styles";

import React, { Component } from "react";
import Request from "../../utils/Request";
//import ArchiveTable from '../sharedComponent/ArchiveTable';
import Table from "../sharedComponent/Table";
import { FusePageCarded } from "@fuse";
import { withSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import { withTranslation, Translation } from "react-i18next";
import FormHeader from "../sharedComponent/FormHeader";
import env from "../../static";

import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  layoutRoot: {},
});
class BlockedClient extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>{(t) => <div>{t("customer.image")}</div>}</Translation>
          ),
          field: "picture",
          render: (rowData) => (
            <img
              alt="client"
              src={`${env.staticFiles}${rowData.picture}`}
              style={{ width: 50, borderRadius: "50%" }}
            />
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.firstName")}</div>}
            </Translation>
          ),
          field: "fname",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.lastName")}</div>}
            </Translation>
          ),
          field: "lname",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("customer.email")}</div>}</Translation>
          ),
          field: "email",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("customer.phone")}</div>}</Translation>
          ),
          field: "phone",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.blocking")}</div>}
            </Translation>
          ),
          field: "unBlock",
          render: (rowData) => this.unBlock(rowData),
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  setStateOnDelete(data) {
    this.setState({
      ...this.state,
      data,
    });
  }
  async unBlockClient(rowData) {
    try {
      const url = env.clients.unBlock(rowData._id);
      await this.request.new(url);
      this.state.tableRef.current.onQueryChange();
      this.props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("stock.edit.success")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
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
  unBlock(rowData) {
    return (
      <Button
        variant="contained"
        color="primary"
        className="w-224 mx-auto mt-16"
        onClick={this.unBlockClient.bind(this, rowData)}
      >
        <Translation>{(t) => <div>{t("customer.blocking")}</div>}</Translation>
      </Button>
    );
  }
  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.clients.allBlocked;

      try {
        const result = await this.request.getAll(url);
        let dataList = [];
        result.data.forEach((element) => {
          const adress = `gouvernorat: ${element.adress.gouvernorat} |delegation: ${element.adress.delegation} |localite: ${element.adress.localite} |codePostal: ${element.adress.codePostal}`;
          dataList.push({
            _id: element._id,
            picture: element.picture,
            fname: element.fname,
            lname: element.lname,
            adress: adress,
            email: element.email,
            username: element.username,
            phone: element.phone,
          });
        });
        resolve({
          data: dataList,
          page: Number(result.data.page) - 1,
          totalCount: result.data.totalCount,
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
        console.log(e);
      }
    });
  }

  async componentDidMount() {
    try {
      const url = env.clients.allBlocked;
      const response = await this.request.getAll(url);
      let dataList = [];
      response.data.forEach((element) => {
        const adress = `gouvernorat: ${element.adress.gouvernorat} |delegation: ${element.adress.delegation} |localite: ${element.adress.localite} |codePostal: ${element.adress.codePostal}`;
        dataList.push({
          _id: element._id,
          picture: element.picture,
          fname: element.fname,
          lname: element.lname,
          adress: adress,
          email: element.email,
          username: element.username,
          phone: element.phone,
        });
      });
      this.setState({
        data: dataList,
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
    console.log("🚀 ~ file: BlockedClient.js ~ line 216 ~ BlockedClient ~ render ~ classes", this.propsclasses)

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <FormHeader
            returnRoute="/client"
            title={this.props.t("customer.customerBlocked")}
          />
        }
        content={
          <Table
            title={this.props.t("customer.customer")}
            columns={this.state.columns}
            data={this.fetchData.bind(this)}
            routeEdit="/editclient"
            delete={this.delete}
            setStateOnDelete={this.setStateOnDelete}
            showMore="/detailsClient"
            state={this.state}
          />
        }
      />
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    withSnackbar(withRouter(BlockedClient))
  )
);
