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
              {(t) => <div>{t("color.nameColorFrench")}</div>}
            </Translation>
          ),
          field: "nameColorFrancais",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("color.nameColorArabic")}</div>}
            </Translation>
          ),
          field: "nameColorArabe",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("color.nameColorEnglish")}</div>}
            </Translation>
          ),
          field: "nameColorEnglish",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("color.codeColor")}</div>}
            </Translation>
          ),
          field: "codeColor",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("color.color")}</div>}</Translation>
          ),
          field: "codeColor",
          render: (rowData) => (
            <div
              style={{
                backgroundColor: `${rowData.codeColor}`,
                borderRadius: "50%",
                display: "inline-block",
                height: "40px",
                width: "40px",
              }}
            />
          ),
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
      let url = env.productColor.list + "?";
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
      const url = env.productColor.remove(id);
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
            {(t) => <div>{t("color.productColor")}</div>}
          </Translation>
        }
        columns={this.state.columns}
        data={this.fetchData}
        routeEdit="/colorProduit/edit"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(StockTable)));
