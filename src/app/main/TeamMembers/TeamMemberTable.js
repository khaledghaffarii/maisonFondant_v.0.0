import React, { Component } from "react";
import Request from "../../utils/Request";
import Table from "../sharedComponent/Table";
import env from "../../static";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { withTranslation, Translation } from "react-i18next";
class TeamMemberTable extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    const userType = localStorage.getItem("AdminOrTeam");
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
              alt="img"
              src={`${env.staticFiles}${rowData.picture}`}
              style={{ width: 50, borderRadius: "50%" }}
            />
          ),
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("repairer.firstName")}</div>}
            </Translation>
          ),
          field: "fname",
        },
        {
          title: (
            <Translation>
              {(t) => <div>{t("repairer.lastName")}</div>}
            </Translation>
          ),
          field: "lname",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("repairer.email")}</div>}</Translation>
          ),
          field: "email",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("repairer.phone")}</div>}</Translation>
          ),
          field: "phone",
        },
        {
          title: (
            <Translation>{(t) => <div>{t("teams.teams")}</div>}</Translation>
          ),
          field: "team",
        },
        userType == "admin"? {
              title: (
                <Translation>
                  {(t) => <div>{t("coutry.country")}</div>}
                </Translation>
              ),
              render: (rowData) => <span>{rowData.country?.iso3}</span>,
            }
          : {},
      ],
      data: [],
      selctedRowlength: 0,
      tableRef: React.createRef(),
    };
    this.deleteAdministrator = this.deleteAdministrator.bind(this);
    this.setStateOnDelete = this.setStateOnDelete.bind(this);
  }

  fetchData(query) {
    return new Promise(async (resolve, reject) => {
      let url = env.teamMembers.list + "?";
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
          dataList.push({
            _id: element._id,
            fname: element.fname,
            lname: element.lname,
            email: element.email,
            phone: element.phone,
            role: element.role.name,
            username: element.username,
            team: element.team ? element.team.name : "",
            picture: element.picture,
            country:element.country
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
              {(t) => <div>{t("stock.edit.success")}</div>}
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
  async deleteAdministrator(id) {
    try {
      const url = env.teamMembers.remove(id);
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
            {(t) => <div>{t("teamMember.membre")}</div>}
          </Translation>
        }
        columns={this.state.columns}
        data={this.fetchData.bind(this)}
        routeEdit="/editTeamMember"
        delete={this.deleteAdministrator}
        setStateOnDelete={this.setStateOnDelete}
        showMore="/detailsTeamMember"
        state={this.state}
      />
    );
  }
}
export default withTranslation()(withSnackbar(withRouter(TeamMemberTable)));
