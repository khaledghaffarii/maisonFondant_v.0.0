import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import env from "../../static";
//import TabsCommandes from "../../TabsCommandes";

import "react-image-lightbox/style.css";
import { withTranslation, Translation } from "react-i18next";
class GammeTable extends Component {
  request = new Request();

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("boutique.picture")}</div>}
            </Translation>
          ),
          field: "picture",
          render: (rowData) => (
            <img
              alt="brand"
              src={`${env.staticFiles}${rowData.picture}`}
              style={{ width: 50, borderRadius: "50%" }}
            />
          ),
        },
        {
          title:"Country",
          field: "country",
          render: (rowData) => (
         <>   {rowData.country?.map((country) => (
              <>{country.iso3 + " "}</>
            ))}</>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("customer.faceboock.customer.name")}</div>}
            </Translation>
          ),
          field: "name",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("device.device")}</div>}</Translation>
          ),
          field: "deviceList",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("brind.brind")}</div>}</Translation>
          ),
          field: "brandList",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("stock.description")}</div>}
            </Translation>
          ),
          field: "description",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("brind.tags")}</div>}</Translation>
          ),
          field: "tags",
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.delete = this.delete.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
    //this.commentsModal = this.commandesModal.bind(this);
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.gamme.list + "?";
      url += "page=" + (query.page + 1);
      url += "&count=" + query.pageSize;
      url += "&search=" + query.search;
      if (query.filters.length > 0) {
        query.filters.forEach((elem) => {
          url += `&filters[]=${elem.column.field},${elem.value}`;
        });
      } else {
        url += "&filters=";
      }
      try {
        const result = await this.request.getAll(url);
        let dataList = [];
        let dataLists = [];

        result.data.data.forEach((element) => {
          let brand = [];
          let brandValues = "";
          let device = [];
          let deviceValue = "";
          if (element.brandList != null) {
            Object.keys(element.brandList).forEach((key) => {
              brand.push(element.brandList["name"]);
            });
            brandValues = new Set(brand);
          } else {
            brandValues = "No option ";
          }
          if (element.deviceList) {
            Object.keys(element.deviceList).forEach((key) => {
              device.push(element.deviceList["nameEnglish"]);
            });
            deviceValue = new Set(device);
          } else {
            deviceValue = "No option";
          }
          dataList.push({
            _id: element._id,
            picture: element.picture,
            name: element.name,
            brandList: brandValues,
            deviceList: deviceValue,
            description: element.description,
            country:element.country,
            tags: element.tags,
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
      }
    });
  }

  async delete(id) {
    try {
      const url = env.gamme.remove(id);
      await this.request.delete(url);
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
  setStateOnDelete(data) {
    this.setState({
      ...this.state,
      data,
    });
  }

  render() {
    return (
      <Table
        deleted={localStorage.getItem("AdminOrTeam") == "admin" ? false : false}
        title={this.props.t("gamme.range")}
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/editGamme"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/gammeDetails"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(GammeTable)));
