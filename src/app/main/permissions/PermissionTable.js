import React, { Component } from "react";
import Request from "../../utils/Request";
import env from "../../static";
import Table from "../sharedComponent/Table";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";

class PermissionTable extends Component {
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
        {
          title: (
            <Translation>
              {(t) => <div>{t("permission.method")}</div>}
            </Translation>
          ),
          field: "method",
        },
        { title: "Route", field: "route" },
        { title: "Description", field: "description" },
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.deletePermission = this.deletePermission.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  fetchData(query) {
    return new Promise(async (resolve) => {
      let url = env.permissions.list + "?";
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
  async componentDidMount() {
    try {
      let url = env.permissions.all;

      const result = await this.request.getAll(url);
      this.setState({
        data: result.data,
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
  }
  async deletePermission(id) {
    try {
      const url = env.permissions.remove(id);
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
      console.log(e);
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
        title="Permissions"
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editpermission"
        delete={this.deletePermission}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsPermission"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(PermissionTable)));
