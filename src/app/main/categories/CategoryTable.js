import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import { withSnackbar } from "notistack";

import { withRouter } from "react-router-dom";
import env from "../../static";
import { withTranslation, Translation } from "react-i18next";
class CategoryTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (
            <Translation>{(t) => <div>{t("category.image")}</div>}</Translation>
          ),
          field: "picture",
          render: (rowData) => (
            <img
              alt="category"
              src={`${env.staticFiles}${rowData.picture}`}
              style={{ width: 50, borderRadius: "50%" }}
            />
          ),
        },
        {
          title: (
            <Translation>{(t) => <div>{t("category.name")}</div>}</Translation>
          ),
          field: "name",
          render: (rowData) => (
            <a target="_blank" href={`/editCategory/${rowData._id}`}>
              <b>Français:</b>
              {rowData.name}
              <br />
              <b>Arabe:</b>
              {rowData.nameArabe}
              <br />
              <b>English:</b>
              {rowData.nameEnglish}
            </a>
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("category.parent.title")}</div>}
            </Translation>
          ),
          field: "parent",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("category.description")}</div>}
            </Translation>
          ),
          field: "description",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("category.tags")}</div>}</Translation>
          ),
          field: "tags",
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
      let url = env.categories.list + "?";
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
          let parentValue = "";
          if (element.parent) {
            parentValue = element.parent.name;
          } else {
            parentValue = (
              <Translation>
                {(t) => <div>{t("category.parent.noParents")}</div>}
              </Translation>
            );
          }

          dataList.push({
            _id: element._id,
            picture: element.picture,
            name: element.name,
            nameArabe: element.nameArabe,
            nameEnglish: element.nameEnglish,
            parent: parentValue,
            description: element.description,
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
  async componentDidMount() {}
  async delete(id) {
    try {
      const url = env.categories.remove(id);
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
            {(t) => <div>{t("category.category")}</div>}
          </Translation>
        }
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editCategory"
        delete={this.delete}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsCategory"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(CategoryTable)));
