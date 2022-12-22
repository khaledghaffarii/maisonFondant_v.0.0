import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import env from "../../static";
//import TabsCommandes from "../../TabsCommandes";

import "react-image-lightbox/style.css";
import { withTranslation, Translation } from "react-i18next";
import Publier from "./Publier";
class ReparationTypeTable extends Component {
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
              alt="repartionType"
              src={`${env.staticFiles}${rowData.picture}`}
              style={{ width: 70, borderRadius: "10%" }}
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
              {(t) => <div>{t("device.nemEnglish")}</div>}
            </Translation>
          ),
          field: "name",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("device.nameArabic")}</div>}
            </Translation>
          ),
          field: "nameArabe",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("device.nameFrench")}</div>}
            </Translation>
          ),
          field: "nameFrench",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("device.device")}</div>}</Translation>
          ),
          field: "deviceList",
        },

        {
          title: (
            <Translation>{(t) => <div>{t("product.color")}</div>}</Translation>
          ),

          field: "color",
          render: (rowData) => (
            <Publier
              key={rowData._id}
              publierValue={rowData.color}
              locked={rowData.locked}
              _id={rowData._id}
            />
          ),
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
      let url = env.reparationType.list + "?";
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

        result.data.data.forEach((element) => {
          let devices = [];
          element.deviceList.forEach((elem) => {
            devices.push(elem.nameEnglish);
            devices.push(" , ");
          });

          let devicesValue = "";

          if (element.deviceList.length > 0) {
            devicesValue = devices;
          } else {
            devicesValue == "no option";
          }

          // Object.keys(element.deviceList).forEach((key) => {
          //   device.push(element.deviceList["nameEnglish"]);
          // });
          // deviceValue = new Set(device);

          dataList.push({
            _id: element._id,
            picture: element.picture,
            name: element.name,
            nameArabe: element.nameArabe,
            nameFrench: element.nameFrench,
            deviceList: devicesValue,
            color: element.color,
            description: element.description,
            tags: element.tags,
            country:element.country,
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
        console.log(
          "🚀 ~ file: ReparationTypeTable.js ~ line 108 ~ ReparationTypeTable ~ returnnewPromise ~ e",
          e
        );
      }
    });
  }

  async delete(id) {
    try {
      const url = env.reparationType.remove(id);
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
        title={this.props.t("reparationType.reparationType")}
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/editReparationType"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/reparationTypeDetails"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(ReparationTypeTable)));
