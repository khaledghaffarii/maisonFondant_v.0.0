import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withRouter } from "react-router-dom";
import env from "../../static";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
class TeamTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>{(t) => <div>{t("boutique.name")}</div>}</Translation>
          ),
          field: "name",
        },
        { title: "description", field: "description" },
        {
          title: (
            <Translation>{(t) => <div>{t("coutry.country")}</div>}</Translation>
          ),
          field: "country",
          render: (rowData) => <span>{rowData.country?.iso3}</span>,
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
      let url = env.teams.list + "?";
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
      const result = await this.request.getAll(url);
      resolve({
        data: result.data.data,
        page: Number(result.data.page) - 1,
        totalCount: result.data.totalCount,
      });
    });
  }

  async componentDidMount() {
    try {
      const url = env.teams.all;
      const response = await this.request.getAll(url);
      this.setState({
        data: response.data,
      });
    } catch (e) {
      if (e.response) {
        /*   this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error"
        });*/
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

  async delete(id) {
    try {
      const url = env.teams.remove(id);
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
          <Translation>{(t) => <div>{t("teams.teams")}</div>}</Translation>
        }
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editteam"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsTeam"
        state={this.state}
        // refresh = {this.refresh.bind(this)}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(TeamTable)));
