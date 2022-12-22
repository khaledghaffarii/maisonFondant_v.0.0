import React, { Component } from "react";
import Request from "../../../utils/Request";
import Table from "../../sharedComponent/Table";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import env from "../../../static";
import "react-image-lightbox/style.css";
import { withTranslation, Translation } from "react-i18next";
class CurrencyTable extends Component {
  request = new Request();

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("currency.nameCurrencyFrench")}</div>}
            </Translation>
          ),
          field: "currencyFrancais",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("currency.nameCurrencyArabic")}</div>}
            </Translation>
          ),
          field: "currencyArabe",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("currency.nameCurrencyEnglish")}</div>}
            </Translation>
          ),
          field: "currencyEnglish",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("currency.AbrevationFrench")}</div>}
            </Translation>
          ),
          field: "abreviationFrancais",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("currency.AbrevationArabic")}</div>}
            </Translation>
          ),
          field: "abreviationArabe",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("currency.AbrevationEnglish")}</div>}
            </Translation>
          ),
          field: "abreviationEnglish",
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
      let url = env.currency.list + "?";
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
      const url = env.currency.remove(id);
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
          <Translation>
            {(t) => <div>{t("currency.currency")}</div>}
          </Translation>
        }
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/currency/edit"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/currency/info"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(CurrencyTable)));
