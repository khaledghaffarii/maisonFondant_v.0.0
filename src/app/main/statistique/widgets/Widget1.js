import React, { Component } from "react";
import { Card, Typography } from "@material-ui/core";
import { withSnackbar } from "notistack";

import Request from "../../../utils/Request";
import { FuseChipSelect } from "@fuse";
import env from "../../../static";

import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import { withTranslation, Translation } from "react-i18next";
const pdfConverter = require("jspdf");

class Widget1 extends Component {
  request = new Request();
  constructor(props) {
    super(props);
    this.state = {
      dataEn: {},
      dataFr: {},
      data2: {},
      yearReparationPerMois: {
        key: 3,
        value: 3,
        label: new Date().getFullYear(),
      },
      month: { key: 1, value: 1, label: "Janvier" },
      yearReparationPerWeek: {
        key: 1,
        value: 1,
        label: new Date().getFullYear(),
      },
    };
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleChangeYearReparationPerWeek =
      this.handleChangeYearReparationPerWeek.bind(this);
    this.handleChangeYearReparationPerMois =
      this.handleChangeYearReparationPerMois.bind(this);
  }
  async componentDidMount() {
    try {
      const url = env.statistiques.get;
      const urlWeek = env.statistiques.getWeek;
      const dataWeek = {
        year: this.state.yearReparationPerWeek.label,
        month: this.state.month.key,
      };
      const data = {
        year: this.state.yearReparationPerMois.label,
      };
      const response = await this.request.new(url, data, false);
      const responseWeek = await this.request.new(urlWeek, dataWeek, false);
      this.setState({
        dataEn: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "Mai",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "repare",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,0,128)",
              borderColor: "rgb(0,0,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,0,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,0,128)",
              pointHoverBorderColor: "rgb(0,0,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.repare,
            },
            {
              label: "Under diagnostic",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,0)",
              borderColor: "rgb(0,128,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,0)",
              pointHoverBorderColor: "rgb(0,128,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.sousDiagnostic,
            },
            {
              label: "Taken by customer",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,128)",
              borderColor: "rgb(0,128,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,128)",
              pointHoverBorderColor: "rgb(0,128,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.livre,
            },
            {
              label: "Not filed",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,255,0)",
              borderColor: "rgb(0,255,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,255,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,255,0)",
              pointHoverBorderColor: "rgb(0,255,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.NonDepose,
            },
            {
              label: "Transferred for repair",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(255,0,0)",
              borderColor: "rgb(255,0,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(255,0,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(255,0,0)",
              pointHoverBorderColor: "rgb(255,0,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.transfere,
            },
          ],
        },
        dataFr: {
          labels: [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
          ],
          datasets: [
            {
              label: "Réparer",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,0,128)",
              borderColor: "rgb(0,0,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,0,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,0,128)",
              pointHoverBorderColor: "rgb(0,0,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.repare,
            },
            {
              label: "Sous diagnostic",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,0)",
              borderColor: "rgb(0,128,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,0)",
              pointHoverBorderColor: "rgb(0,128,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.sousDiagnostic,
            },
            {
              label: "Prise par le client",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,128)",
              borderColor: "rgb(0,128,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,128)",
              pointHoverBorderColor: "rgb(0,128,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.livre,
            },
            {
              label: "Non déposé",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,255,0)",
              borderColor: "rgb(0,255,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,255,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,255,0)",
              pointHoverBorderColor: "rgb(0,255,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.NonDepose,
            },
            {
              label: "Transféré pour réparation",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(255,0,0)",
              borderColor: "rgb(255,0,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(255,0,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(255,0,0)",
              pointHoverBorderColor: "rgb(255,0,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.transfere,
            },
          ],
        },
        data2En: {
          labels: ["week 1", "week 2", "week 3", "week 4"],
          datasets: [
            {
              label: "Repare",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,0,128)",
              borderColor: "rgb(0,0,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,0,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,0,128)",
              pointHoverBorderColor: "rgb(0,0,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.repare,
            },
            {
              label: "Under diagnosis",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,0)",
              borderColor: "rgb(0,128,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,0)",
              pointHoverBorderColor: "rgb(0,128,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.sousDiagnostic,
            },
            {
              label: "Taken by customer",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,128)",
              borderColor: "rgb(0,128,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,128)",
              pointHoverBorderColor: "rgb(0,128,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.livre,
            },
            {
              label: "Not filed",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,255,0)",
              borderColor: "rgb(0,255,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,255,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,255,0)",
              pointHoverBorderColor: "rgb(0,255,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.NonDepose,
            },
            {
              label: "Transferred for repair",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(255,0,0)",
              borderColor: "rgb(255,0,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(255,0,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(255,0,0)",
              pointHoverBorderColor: "rgb(255,0,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.transfere,
            },
          ],
        },
        data2Fr: {
          labels: ["semaine 1", "semaine 2", "semaine 3", "semaine 4"],
          datasets: [
            {
              label: "Réparer",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,0,128)",
              borderColor: "rgb(0,0,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,0,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,0,128)",
              pointHoverBorderColor: "rgb(0,0,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.repare,
            },
            {
              label: "Sous diagnostic",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,0)",
              borderColor: "rgb(0,128,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,0)",
              pointHoverBorderColor: "rgb(0,128,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.sousDiagnostic,
            },
            {
              label: "Prise par le client",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,128)",
              borderColor: "rgb(0,128,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,128)",
              pointHoverBorderColor: "rgb(0,128,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.livre,
            },
            {
              label: "Non depose",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,255,0)",
              borderColor: "rgb(0,255,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,255,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,255,0)",
              pointHoverBorderColor: "rgb(0,255,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.NonDepose,
            },
            {
              label: "Transfere pour reparation",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(255,0,0)",
              borderColor: "rgb(255,0,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(255,0,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(255,0,0)",
              pointHoverBorderColor: "rgb(255,0,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: responseWeek.data.transfere,
            },
          ],
        },
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error",
        });
      }
    }
  }

  demoFromHTML(event, chart) {
    event.preventDefault();

    let input;
    if (chart === 1) {
      input = window.document.getElementsByClassName("divToPDF")[0];
    } else {
      input = window.document.getElementsByClassName("divToPDF2")[0];
    }

    html2canvas(input)
      .then((canvas) => {
        console.log(canvas);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new pdfConverter("1", "pt");
        pdf.addImage(imgData, "JPEG", 15, 110, 550, 250);
        pdf.save("test.pdf");
      })
      .catch((err) => console.log(err.message));
  }
  async handleChangeYearReparationPerMois(value) {
    await this.setState({
      ...this.state,
      yearReparationPerMois: value,
    });
    try {
      const url = env.statistiques.get;
      const data = {
        year: this.state.yearReparationPerMois.label,
      };
      const response = await this.request.new(url, data, false);
      this.setState({
        data1: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Repare",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,0,128)",
              borderColor: "rgb(0,0,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,0,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,0,128)",
              pointHoverBorderColor: "rgb(0,0,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.repare,
            },
            {
              label: "Sous diagnostic",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,0)",
              borderColor: "rgb(0,128,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,0)",
              pointHoverBorderColor: "rgb(0,128,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.sousDiagnostic,
            },
            {
              label: "Prise par le client",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,128)",
              borderColor: "rgb(0,128,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,128)",
              pointHoverBorderColor: "rgb(0,128,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.livre,
            },
            {
              label: "Non depose",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,255,0)",
              borderColor: "rgb(0,255,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,255,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,255,0)",
              pointHoverBorderColor: "rgb(0,255,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.NonDepose,
            },
            {
              label: "Transfere pour reparation",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(255,0,0)",
              borderColor: "rgb(255,0,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(255,0,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(255,0,0)",
              pointHoverBorderColor: "rgb(255,0,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.transfere,
            },
          ],
        },
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error",
        });
      }
    }
  }
  async handleChangeYearReparationPerWeek(value) {
    await this.setState({
      ...this.state,
      yearReparationPerWeek: value,
    });
    console.log(this.state);
    try {
      const url = env.statistiques.getWeek;
      const data = {
        year: this.state.yearReparationPerWeek.label,
        month: this.state.month.value,
      };
      const response = await this.request.new(url, data, false);
      this.setState({
        data2: {
          labels: ["week 1", "week 2", "week 3", "week 4"],
          datasets: [
            {
              label: "Repare",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,0,128)",
              borderColor: "rgb(0,0,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,0,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,0,128)",
              pointHoverBorderColor: "rgb(0,0,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.repare,
            },
            {
              label: "Sous diagnostic",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,0)",
              borderColor: "rgb(0,128,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,0)",
              pointHoverBorderColor: "rgb(0,128,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.sousDiagnostic,
            },
            {
              label: "Prise par le client",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,128)",
              borderColor: "rgb(0,128,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,128)",
              pointHoverBorderColor: "rgb(0,128,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.livre,
            },
            {
              label: "Non depose",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,255,0)",
              borderColor: "rgb(0,255,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,255,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,255,0)",
              pointHoverBorderColor: "rgb(0,255,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.NonDepose,
            },
            {
              label: "Transfere pour reparation",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(255,0,0)",
              borderColor: "rgb(255,0,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(255,0,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(255,0,0)",
              pointHoverBorderColor: "rgb(255,0,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.transfere,
            },
          ],
        },
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error",
        });
      }
    }
  }
  async handleChangeMonth(value) {
    await this.setState({
      ...this.state,
      month: value,
    });
    try {
      const url = env.statistiques.getWeek;
      const data = {
        year: this.state.yearReparationPerWeek.label,
        month: this.state.month.value,
      };
      const response = await this.request.new(url, data, false);
      this.setState({
        data2: {
          labels: ["week 1", "week 2", "week 3", "week 4"],
          datasets: [
            {
              label: "Repare",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,0,128)",
              borderColor: "rgb(0,0,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,0,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,0,128)",
              pointHoverBorderColor: "rgb(0,0,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.repare,
            },
            {
              label: "Sous diagnostic",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,0)",
              borderColor: "rgb(0,128,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,0)",
              pointHoverBorderColor: "rgb(0,128,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.sousDiagnostic,
            },
            {
              label: "Prise par le client",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,128,128)",
              borderColor: "rgb(0,128,128)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,128,128)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,128,128)",
              pointHoverBorderColor: "rgb(0,128,128)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.livre,
            },
            {
              label: "Non depose",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0,255,0)",
              borderColor: "rgb(0,255,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(0,255,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0,255,0)",
              pointHoverBorderColor: "rgb(0,255,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.NonDepose,
            },
            {
              label: "Transfere pour reparation",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(255,0,0)",
              borderColor: "rgb(255,0,0)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(255,0,0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(255,0,0)",
              pointHoverBorderColor: "rgb(255,0,0)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.transfere,
            },
          ],
        },
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error",
        });
      }
    }
  }

  render() {
    const suggestionsYears = [
      {
        key: 1,
        value: 1,
        label: 2018,
      },
      {
        key: 2,
        value: 2,
        label: 2019,
      },
      {
        key: 3,
        value: 3,
        label: 2020,
      },
      {
        key: 4,
        value: 4,
        label: 2021,
      },
      {
        key: 5,
        value: 5,
        label: 2022,
      },
    ];
    const suggestionsMonths = [
      {
        key: 1,
        value: 1,
        label: "Janvier",
      },
      {
        key: 2,
        value: 2,
        label: "Février",
      },
      {
        key: 3,
        value: 3,
        label: "Mars",
      },
      {
        key: 4,
        value: 4,
        label: "Avril",
      },
      {
        key: 5,
        value: 5,
        label: "Mai",
      },
      {
        key: 6,
        value: 6,
        label: "Juin",
      },
      {
        key: 7,
        value: 7,
        label: "Juillet",
      },
      {
        key: 8,
        value: 8,
        label: "Août",
      },
      {
        key: 9,
        value: 9,
        label: "Septembre",
      },
      {
        key: 10,
        value: 10,
        label: "Octobre",
      },
      {
        key: 11,
        value: 11,
        label: "Novembre",
      },

      {
        key: 12,
        value: 12,
        label: "Decembre",
      },
    ];

    return (
      <div className="w-full">
        <div className="widget w-full p-16 pb-32">
          <Card className="w-full rounded-8 shadow-none border-1">
            <div className="relative p-24 flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <Typography className="h3 sm:h2">
                  {this.props.t("statistique.SparM")}
                </Typography>
              </div>

              <div className="flex flex-row items-center">
                <FuseChipSelect
                  value={this.state.yearReparationPerMois}
                  onChange={this.handleChangeYearReparationPerMois}
                  placeholder="Select  year"
                  textFieldProps={{
                    label: "Years",
                    InputLabelProps: {
                      shrink: true,
                    },
                    variant: "outlined",
                  }}
                  options={suggestionsYears}
                />
                <div>
                  <button
                    onClick={(e) =>
                      console.log("ici") || this.demoFromHTML(e, 1)
                    }
                  >
                    {this.props.t("statistique.PdfF")}
                  </button>
                </div>
              </div>
            </div>
            {this.props.i18n.language === "en" ? (
              <Typography className="divToPDF flex flex-col items-center w-full max-w-xl">
                <Line data={this.state.dataEn} />
              </Typography>
            ) : (
              <Typography className="divToPDF flex flex-col items-center w-full max-w-xl">
                <Line data={this.state.dataFr} />
              </Typography>
            )}
          </Card>
        </div>

        <div className="widget w-full p-16 pb-32">
          <Card className="w-full rounded-8 shadow-none border-1">
            <div className="relative p-24 flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <Typography className="h3 sm:h2">
                  {this.props.t("statistique.SparS")}
                </Typography>
              </div>
              <div className="flex flex-row items-center">
                <FuseChipSelect
                  value={this.state.yearReparationPerWeek}
                  onChange={this.handleChangeYearReparationPerWeek}
                  placeholder="Select  year"
                  textFieldProps={{
                    label: "Years",
                    InputLabelProps: {
                      shrink: true,
                    },
                    variant: "outlined",
                  }}
                  options={suggestionsYears}
                />

                <FuseChipSelect
                  value={this.state.month}
                  onChange={this.handleChangeMonth}
                  placeholder="Select  Month"
                  textFieldProps={{
                    label: "Months",
                    InputLabelProps: {
                      shrink: true,
                    },
                    variant: "outlined",
                  }}
                  options={suggestionsMonths}
                />
                <div>
                  <button
                    onClick={(e) =>
                      console.log("ici") || this.demoFromHTML(e, 2)
                    }
                  >
                    {this.props.t("statistique.PdfF")}
                  </button>
                </div>
              </div>
            </div>
            {this.props.i18n.language === "en" ? (
              <Typography className="divToPDF2 flex flex-col items-center w-full max-w-xl">
                <Line data={this.state.data2En} />
              </Typography>
            ) : (
              <Typography className="divToPDF2 flex flex-col items-center w-full max-w-xl">
                <Line data={this.state.data2Fr} />
              </Typography>
            )}
          </Card>
        </div>
      </div>
    );
  }
}

export default withTranslation()(withSnackbar(Widget1));
