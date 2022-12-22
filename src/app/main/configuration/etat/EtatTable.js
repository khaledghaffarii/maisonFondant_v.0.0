import React, { Component } from "react";
import Request from "../../../utils/Request";
import Table from "../../sharedComponent/Table";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import env from "../../../static";
import "react-image-lightbox/style.css";
import { withTranslation, Translation } from "react-i18next";
class StockTable extends Component {
  request = new Request();

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("state.frenchState")}</div>}
            </Translation>
          ),
          field: "etatFrancais",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("state.arabicState")}</div>}
            </Translation>
          ),
          field: "etatArabe",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("state.englishState")}</div>}
            </Translation>
          ),
          field: "etatEnglish",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("state.frenchDescription")}</div>}
            </Translation>
          ),
          field: "descriptionFrancais",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("state.arabicDescription")}</div>}
            </Translation>
          ),
          field: "descriptionArabe",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("state.englishDescription")}</div>}
            </Translation>
          ),
          field: "descriptionEnglish",
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.delete = this.delete.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.etat.list + "?";
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
          dataList.push({ ...element, id: element._id });
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
      const url = env.etat.remove(id);
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
        deleted={localStorage.getItem("AdminOrTeam") == "admin" ? true : false}
        title={
          <Translation>{(t) => <div>{t("state.state")}</div>}</Translation>
        }
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/etat/edit"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/etat/info"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(StockTable)));
