import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";

import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
class ProviderAnswerTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>
              {(t) => <div>{t("supplier.pieceName")}</div>}
            </Translation>
          ),
          field: "nomPiece",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("supplier.panneDetails")}</div>}
            </Translation>
          ),
          field: "detailsPanne",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("supplier.supplierPrice")}</div>}
            </Translation>
          ),
          field: "prixFournisseur",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("supplier.disponibility")}</div>}
            </Translation>
          ),
          field: "disponibilite",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("supplier.notice")}</div>}
            </Translation>
          ),
          field: "remarques",
        },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.delete = this.delete.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.providersAnswer.list + "?";
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
        resolve({
          data: result.data.data,
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

  async componentDidMount() {}

  async delete(id) {
    try {
      const url = env.providersAnswer.remove(id);
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
        actions={[
          (rowData) => ({
            icon: rowData.length > 1 ? "done_all" : "done",
            tooltip: "Accept more",
            onClick: (event, rowData) => {},
          }),
        ]}
        title={
          <Translation>
            {(t) => <div>{t("supplier.responseSupplier")}</div>}
          </Translation>
        }
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editProviderAnswer"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsProviderAnswer"
        changePage={this.fetchData.bind(this)}
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(ProviderAnswerTable)));
