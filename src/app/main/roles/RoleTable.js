import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
import env from "../../static";

class RoleTable extends Component {
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
        { title: "permissions", field: "permissions" },
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
      let url = env.roles.list + "?";
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
          let permissions = [];
          element.permissions.forEach((elem) => {
            permissions.push(elem.name);
            permissions.push(" , ");
          });
          dataList.push({
            _id: element._id,
            name: element.name,
            permissions: permissions,
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

  async componentDidMount() {
    try {
      const url = env.roles.all;
      const result = await this.request.getAll(url);
      let dataList = [];
      result.data.forEach((element) => {
        let permissions = [];
        element.permissions.forEach((elem) => {
          permissions.push(elem.name);
          permissions.push(" , ");
        });
        dataList.push({
          _id: element._id,
          name: element.name,
          permissions: permissions,
        });
      });
      this.setState({
        data: dataList,
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
      console.log(e);
    }
  }
  async delete(id) {
    try {
      const url = env.roles.remove(id);
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
        title="Roles"
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editrole"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsRole"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(RoleTable)));
