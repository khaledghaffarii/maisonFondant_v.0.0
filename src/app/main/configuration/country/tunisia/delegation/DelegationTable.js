import React, { Component } from "react";
import Request from "../../../../../utils/Request";
import Table from "../../../../sharedComponent/Table";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import env from "../../../../../static";
import "react-image-lightbox/style.css";
import { withTranslation, Translation } from "react-i18next";

class DelegationTable extends Component {
  request = new Request();

  constructor(props) {
    super(props);
    this.state = {
          columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("Gouvernorate.nameArabe")}</div>}
            </Translation>
          ),
          field: "name_ar",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("Gouvernorate.nameFrench")}</div>}
            </Translation>
          ),
          field: "name_fr",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("Gouvernorate.Gouvernorate")}</div>}
            </Translation>
          ),
          field: "gouvernorat_id.name_fr",
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.delegation.list + "?";
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

  render() {
    return (
      <Table
      updated={false}
        title={
          <Translation>{(t) => <div>{t("Delegation.Delegation")}</div>}</Translation>
        }
        columns={this.state.columns}
        data={this.fetchData}
        type="delegation"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(DelegationTable)));
