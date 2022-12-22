import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import env from "../../static";
//import TabsCommandes from "../../TabsCommandes";

import "react-image-lightbox/style.css";
import { withTranslation, Translation } from "react-i18next";
class ModelTable extends Component {
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
            <Translation>{(t) => <div>{t("gamme.range")}</div>}</Translation>
          ),
          field: "gammeList",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("model.nameColor")}</div>}
            </Translation>
          ),
          field: "colorList",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("product.color")}</div>}</Translation>
          ),
          field: "codeColor",
          render: (rowData) =>
            Object.values(rowData.color).map((rowDatas) => {
              return (
                <div
                  style={{
                    backgroundColor: `${rowDatas}`,
                    borderRadius: "50%",
                    display: "inline-block",
                    height: 30,
                    width: 30,
                    margin: 5,
                  }}
                />
              );
            }),
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

    this.fetchData = this.fetchData.bind(this);

    //this.commentsModal = this.commandesModal.bind(this);
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.model.list + "?";
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
          let gamme = [];
          let gammeValue = "";
          let nameColor = [];
          let nameColorValue = "";
          let codeColor = [];
          let codeColorValue = "";

          Object.keys(element.brandList).forEach((key) => {
            brand.push(element.brandList["name"]);
          });
          brandValues = new Set(brand);

          Object.keys(element.deviceList).forEach((key) => {
            device.push(element.deviceList["nameEnglish"]);
          });
          deviceValue = new Set(device);

         

          // Object.keys(element.colorList).forEach((key) => {
          //   nameColor.push(element.colorList[key].nameColorEnglish);
          // });
          // nameColorValue = new Set(nameColor);

          Object.keys(element.colorList).forEach((key) => {
            codeColor.push(element.colorList[key].codeColor);
          });
          element.colorList.forEach((elem) => {
            nameColor.push(elem["nameColorEnglish"]);
            nameColor.push(" , ");
          });

          var setBrand = new Set(brand);
          var setDevice = new Set(device);
          var setNameColor = new Set(nameColor);

          dataList.push({
            _id: element._id,
            picture: element.picture,
            name: element.name,
            brandList: setBrand,
            deviceList: setDevice,
            gammeList: element.gammeList?.name,
            colorList: nameColor,
            color: codeColor,
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

  render() {
    return (
      <Table
        deleted={localStorage.getItem("AdminOrTeam") == "admin" ? false : false}
        title={this.props.t("gamme.range")}
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/editModel"
        showMore="/modelDetails"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(ModelTable)));
