import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { FuseChipSelect } from "@fuse";
import BuildIcon from "@material-ui/icons/Build";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import dashboardStyle from "../../../../assets/jss/material-dashboard-react/views/dashboardStyle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Typography from "../../../../components/Typography/Muted";
import GridItem from "../../../../components/Grid/GridItem";
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import Container from "@material-ui/core/Container";
import Table from "../../../../components/Table/Table.jsx";
import Danger from "../../../../components/Typography/Danger.jsx";
import Card from "../../../../components/Card/Card.jsx";
import CardHeader from "../../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../../components/Card/CardIcon.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import CardFooter from "../../../../components/Card/CardFooter.jsx";
import Request from "../../../utils/Request";
import { REP_STATES, REP_LABELS } from "../../../static";
import { statisticChart } from "../../../../variables/charts";
import { statisticChartFr } from "../../../../variables/charts";
import { withTranslation, Translation } from "react-i18next";
import env from "../../../static";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 200,
  },
}));

class Widget2 extends React.Component {
  request = new Request();

  constructor(props) {
    super(props);
    let i = 0;
    const suggestionsEtat = Object.keys(REP_STATES).map((key) => {
      i++;
      return {
        key: i,
        value: REP_STATES[key],
        label: REP_LABELS[key],
      };
    });
    this.state = {
      nbrRep: {},
      nbrTotalFb: {},
      nbrTotal: {},
      nbrCltChatbot: {},
      nbrCategories: {},
      nbrBoutiques: {},
      nbrB2B: {},
      tRepairers: {
        labels: [],
        data: [],
      },
      tRepCat: {
        labels: [],
        data: [],
      },
      tBoutique: {
        labels: [],
        data: [],
      },

      startDate: {
        year: "2017",
        month: "10",
        day: "3",
      },
      endDate: {
        y: new Date().getFullYear(),
        m: new Date().getMonth() + 1,
        d: new Date().getDate(),
      },
      etat: this.props.etat,
      _id: this.props._id,
      suggestionsEtat,
      selectedState: "Réparé",
    };

    this.handleChangedStartDate = this.handleChangedStartDate.bind(this);
    this.handleChangedEndDate = this.handleChangedEndDate.bind(this);
    this.handleChangedData = this.handleChangedData.bind(this);
    this.handleChangedEtat = this.handleChangedEtat.bind(this);
  }

  handleChangedEtat(e) {
    this.setState({
      ...this.state,
      selectedState: e.value,
    });
  }

  handleChangedStartDate(e) {
    this.setState({
      ...this.state,
      startDate: {
        year: new Date(e.target.value).getFullYear(),
        month: new Date(e.target.value).getMonth() + 1,
        day: new Date(e.target.value).getDate(),
      },
    });
  }
  handleChangedEndDate(e) {
    this.setState({
      ...this.state,
      endDate: {
        y: new Date(e.target.value).getFullYear(),
        m: new Date(e.target.value).getMonth() + 1,
        d: new Date(e.target.value).getDate(),
      },
    });
  }

  async componentDidMount() {
    try {
      // const url = 'http://localhost:5000/team-api/v1/statistiques';
      const  url = env.baseUrl+"statistiques";

      const data = {
        year: new Date().getFullYear(),
      };

      this.setState.startDate = {
        year: "2017",
        month: "10",
        day: "3",
      };

      this.setState.endDate = {
        y: new Date().getFullYear(),
        m: new Date().getMonth() + 1,
        d: new Date().getDate(),
      };
      const dataInt = {
        selectedState: "Récupéré par le Client",
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };

      /* get data for global statistique */
      const res0 = await this.request.getCltStat(url, data);
      statisticChart.data.series = [res0.data.CltFB];

      /* get data for boutiques statistique */
      const res1 = await this.request.getStatBoutiques(url, dataInt);
      const tab0 = [];
      const tab1 = [];
      for (var i = 0; i < res1.data.length; i++) {
        tab0[i] = res1.data[i].name;
        tab1[i] = res1.data[i].total;
      }
      this.setState({ tBoutique: { labels: tab0, data: [tab1] } });

      /* get data for count facebook members  */
      const res2 = await this.request.getTotalCltFB(url, dataInt);
      this.setState({ nbrTotalFb: { nbr: res2.data } });

      /* get data for total reparations */
      const res3 = await this.request.getTotal(url, dataInt);
      this.setState({ nbrTotal: { nbr: res3.data } });

      /* get data for chatbot client*/
      const res4 = await this.request.getCltChatbot(url, dataInt);
      this.setState({ nbrCltChatbot: { nbr: res4.data } });

      const res5 = await this.request.getTotalBoutiques(url, dataInt);
      this.setState({ nbrBoutiques: { nbr: res5.data } });

      /* get data for reparation by categories*/
      const res7 = await this.request.getStatRepCat(url, dataInt);
      const tabrepcap0 = [];
      const tabrepcap1 = [];
      for (var i = 0; i < res7.data.length; i++) {
        tabrepcap0[i] = res7.data[i].name;
        tabrepcap1[i] = res7.data[i].total;
      }
      this.setState({ tRepCat: { labels: tabrepcap0, data: [tabrepcap1] } });

      /* get data for Repairers*/
      const res8 = await this.request.getStatReparateurs(url, dataInt);

      const tabRepa0 = [];
      const tabRepa1 = [];
      for (var i = 0; i < res8.data.length; i++) {
        tabRepa0[i] = res8.data[i].fname.concat(" ", res8.data[i].lname);
        tabRepa1[i] = res8.data[i].total;
      }

      this.setState({ tRepairers: { labels: tabRepa0, data: [tabRepa1] } });
    } catch (e) {
      console.log(e);
    }
  }

  async handleChangedData(e) {
    e.preventDefault();
    try {
      //const url = 'http://localhost:5000/team-api/v1/statistiques';
      const  url = env.baseUrl+"statistiques";

      const data = {
        year: new Date().getFullYear(),
      };
      const dataInt = {
        selectedState: this.state.selectedState,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };

      /* get data for global statistique */
      const res0 = await this.request.getCltStat(url, data);
      statisticChart.data.series = [res0.data.CltFB];

      /* get data for boutiques statistique */
      const res1 = await this.request.getStatBoutiques(url, dataInt);
      const tab0 = [];
      const tab1 = [];
      for (var i = 0; i < res1.data.length; i++) {
        tab0[i] = res1.data[i].name;
        tab1[i] = res1.data[i].total;
      }
      this.setState({ tBoutique: { labels: tab0, data: [tab1] } });

      /* get data for count facebook members  */
      const res2 = await this.request.getTotalCltFB(url, dataInt);
      this.setState({ nbrTotalFb: { nbr: res2.data } });

      /* get data for total reparations */

      const res3 = await this.request.getTotal(url, dataInt);
      this.setState({ nbrTotal: { nbr: res3.data } });

      /* get data for chatbot client*/
      const res4 = await this.request.getCltChatbot(url, dataInt);
      this.setState({ nbrCltChatbot: { nbr: res4.data } });

      const res5 = await this.request.getTotalBoutiques(url, dataInt);
      this.setState({ nbrBoutiques: { nbr: res5.data } });

      /* get data for reparation by categories*/
      const res7 = await this.request.getStatRepCat(url, dataInt);
      const tabrepcap0 = [];
      const tabrepcap1 = [];
      for (var i = 0; i < res7.data.length; i++) {
        tabrepcap0[i] = res7.data[i].name;
        tabrepcap1[i] = res7.data[i].total;
      }
      this.setState({ tRepCat: { labels: tabrepcap0, data: [tabrepcap1] } });

      /* get data for Repairers*/
      const res8 = await this.request.getStatReparateurs(url, dataInt);

      const tabRepa0 = [];
      const tabRepa1 = [];
      for (var i = 0; i < res8.data.length; i++) {
        tabRepa0[i] = res8.data[i].fname.concat(" ", res8.data[i].lname);
        tabRepa1[i] = res8.data[i].total;
      }

      this.setState({ tRepairers: { labels: tabRepa0, data: [tabRepa1] } });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    const props = this.props;
    const { classes } = this.props;
    return (
      <Container fixed>
        <div className="w-full">
          <br />
          <br />

          <GridContainer align="center">
            <GridItem xs={12} sm={3} md={3}>
              <div className="flex flex-row items-center">
                <form className={classes.container} noValidate>
                  <TextField
                    id="datedebut"
                    label={
                      <Translation>
                        {(t) => <div>{t("widger2.startDate")}</div>}
                      </Translation>
                    }
                    type="date"
                    variant="outlined"
                    value={moment(
                      new Date(
                        this.state.startDate.year,
                        [this.state.startDate.month - 1],
                        this.state.startDate.day
                      )
                    ).format("YYYY-MM-DD")}
                    onChange={this.handleChangedStartDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <div className="flex flex-row items-center">
                <form className={classes.container} noValidate>
                  <TextField
                    id="datefin"
                    label={
                      <Translation>
                        {(t) => <div>{t("widger2.endDate")}</div>}
                      </Translation>
                    }
                    type="date"
                    variant="outlined"
                    value={moment(
                      new Date(
                        this.state.endDate.y,
                        [this.state.endDate.m - 1],
                        this.state.endDate.d
                      )
                    ).format("YYYY-MM-DD")}
                    onChange={this.handleChangedEndDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <div className="flex flex-row items-center">
                <div style={{ minWidth: 220 }}>
                  <FuseChipSelect
                    options={this.state.suggestionsEtat}
                    value={this.state.selectedState.value}
                    placeholder={
                      <Translation>
                        {(t) => <div>{t("widger2.customerRecovered")}</div>}
                      </Translation>
                    }
                    textFieldProps={{
                      label: (
                        <Translation>
                          {(t) => <div>{t("widger2.status")}</div>}
                        </Translation>
                      ),
                      InputLabelProps: {
                        shrink: true,
                      },
                      variant: "outlined",
                    }}
                    onChange={this.handleChangedEtat}
                  />
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <div className="flex flex-row items-center">
                <Button variant="contained" onClick={this.handleChangedData}>
                  <Translation>
                    {(t) => <div>{t("widger2.searchButton")}</div>}
                  </Translation>
                </Button>
              </div>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <BuildIcon />
                  </CardIcon>
                  <h1 className={classes.cardTitle}>
                    {this.state.nbrTotal.nbr}
                  </h1>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    {" "}
                    <Translation>
                      {(t) => <div>{t("widger2.reparationNumber")}</div>}
                    </Translation>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>

            {/* <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <ChatIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Clients Chatbot</p>
              <h3 className={classes.cardTitle}>+{this.state.nbrCltChatbot.nbr}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                  Updated
                </div>
            </CardFooter>
          </Card>
        </GridItem> */}
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Accessibility />
                  </CardIcon>
                  <p className={classes.cardCategory}></p>
                  <h1 className={classes.cardTitle}>
                    +{this.state.nbrTotalFb.nbr}
                  </h1>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    {" "}
                    <Translation>
                      {(t) => <div>{t("widger2.CustomerFacebookNumber")}</div>}
                    </Translation>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <Store />
                  </CardIcon>
                  <p className={classes.cardCategory}></p>
                  <h1 className={classes.cardTitle}>
                    {this.state.nbrBoutiques.nbr}
                  </h1>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    <Translation>
                      {(t) => <div>{t("widger2.shopNumber")}</div>}
                    </Translation>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card chart>
                <CardHeader color="warning">
                  {props.i18n.language === "en" ? (
                    <ChartistGraph
                      className="ct-chart"
                      data={statisticChart.data}
                      type="Bar"
                      options={statisticChart.options}
                      responsiveOptions={statisticChart.responsiveOptions}
                      listener={statisticChart.animation}
                    />
                  ) : (
                    <ChartistGraph
                      className="ct-chart"
                      data={statisticChartFr.data}
                      type="Bar"
                      options={statisticChartFr.options}
                      responsiveOptions={statisticChartFr.responsiveOptions}
                      listener={statisticChartFr.animation}
                    />
                  )}
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>
                    <Translation>
                      {(t) => <div>{t("widger2.statistic")}</div>}
                    </Translation>
                  </h4>
                  <p className={classes.cardCategory}>
                    <Translation>
                      {(t) => <div>{t("widger2.lastCompany")}</div>}
                    </Translation>
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime />
                    <Translation>
                      {(t) => <div>{t("widger2.statisticRealTime")}</div>}
                    </Translation>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="warning">
                  <h4 className={classes.cardTitleWhite}>
                    <Translation>
                      {(t) => <div>{t("widger2.shopStatistic")}</div>}
                    </Translation>
                  </h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="warning"
                    tableHead={this.state.tBoutique.labels}
                    tableData={this.state.tBoutique.data}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader color="success">
                  <h4 className={classes.cardTitleWhite}>
                    <Translation>
                      {(t) => <div>{t("widger2.repairerStatistic")}</div>}
                    </Translation>
                  </h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="success"
                    tableHead={this.state.tRepairers.labels}
                    tableData={this.state.tRepairers.data}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <Translation>
                      {(t) => <div>{t("widger2.categoryStatistic")}</div>}
                    </Translation>
                  </h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={this.state.tRepCat.labels}
                    tableData={this.state.tRepCat.data}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </Container>
    );
  }
}

Widget2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(
  withStyles(dashboardStyle, useStyles)(Widget2)
);
