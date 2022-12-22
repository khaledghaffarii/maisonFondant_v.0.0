import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import env from "../../static";
//import TabsCommandes from "../../TabsCommandes";
import SimpleModal from "../sharedComponent/SimpleModal";
import "react-image-lightbox/style.css";
import { withTranslation, Translation } from "react-i18next";
class BrandTable extends Component {
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
            <Translation>
              {(t) => (
                <div>{t("customer.faceboock.panneIformation.device")}</div>
              )}
            </Translation>
          ),
          field: "deviceList",
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

  // commandesModal(rowData, list) {
  //   return (
  //     <SimpleModal
  //       list={list._id}
  //       badgeContent={
  //         (rowData.orders || []).length > 0
  //           ? rowData.orders.filter((order) => order.status == "En Attente")
  //               .length
  //           : 0
  //       }
  //       showReparations={<TabsCommandes orders={rowData.orders} />}
  //     />
  //   );
  // }
  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.brand.list + "?";
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
          console.log(
            "🚀 ~ file: BrandTble.js ~ line 127 ~ BrandTable ~ result.data.data.forEach ~ element.description,",
            element
          );
          dataList.push({
            _id: element._id,
            picture: element.picture,
            name: element.name,
            deviceList: devicesValue,
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
        title={this.props.t("brind.brind")}
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/editBrand"
        showMore="/brandDetails"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(BrandTable)));
