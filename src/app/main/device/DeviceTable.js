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
class DeviceTable extends Component {
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
        },{
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
            <Translation>
              {(t) => <div>{t("device.nemEnglish")}</div>}
            </Translation>
          ),
          field: "nameEnglish",
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
      let url = env.device.list + "?";
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
          //  dataList.push({ ...element, id: element._id });
          dataList.push({
            _id: element._id,
            picture: element.picture,
            nameArabe: element.nameArabe,
            nameFrench: element.nameFrench,
            nameEnglish: element.nameEnglish,
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
      }
    });
  }

  async delete(id) {
    try {
      const url = env.device.remove(id);
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
        title={this.props.t("device.device")}
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/editDevice"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/deviceDetails"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(DeviceTable)));
