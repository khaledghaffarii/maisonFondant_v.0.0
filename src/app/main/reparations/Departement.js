import React, { Component } from "react";
import Select from "react-select";
import { REP_STATES, REP_LABELS, reparations } from "../../static";
import swal from "sweetalert";
import swal2 from "@sweetalert/with-react";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { Badge, Button } from "@material-ui/core";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import { withTranslation, Translation,useTranslation } from "react-i18next";
const DatePickerUI = ({ id, etat, setSelectedState, newState }) => {
  const [dateLivraison, setDateLivraison] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const updateState = () => {
    setLoading(true);
    fetch(reparations.update(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("id_token"),
      },
      body: JSON.stringify({ etat, dateLivraison }),
    })
      .then((updated) => {
        setLoading(false);
        swal2.close();
        if (updated) {
          setSelectedState(newState);
          window.location.reload();
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formsy className="flex flex-col justify-center w-full">
        <DatePicker
          label="Date Livraison"
          inputVariant="outlined"
          value={dateLivraison}
          onChange={setDateLivraison}
          format={"dd/MM/yyyy"}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            className="w-224 mx-auto mt-16"
            aria-label="Annuler"
            onClick={() => swal2.close()}
            style={{ marginRight: 20 }}
            disabled={loading}
          >
            <Translation>
              {(t) => <div>{t("stock.AddDeliveryDate")}</div>}
            </Translation>
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="w-224 mx-auto mt-16"
            aria-label="Ajouter remarque"
            onClick={updateState}
            disabled={loading}
          >
            <Translation>{(t) => <div>{t("stock.cancel")}</div>}</Translation>,
          </Button>
        </div>
      </Formsy>
    </MuiPickersUtilsProvider>
  );
};
function Departement({ _id, etat, locked, props }) {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = React.useState({
    value: etat,
    label: etat,
  });
  const [dateLivraison, setDateLivraison] = React.useState(new Date());

  const suggestionsEtat = [
    {
      key: 0,
      value: "B2B",
      label: "B2B",
    },
    {
      key: 1,
      value: "B2C",
      label: "B2C",
    },
  ];
 
  const update = (newState) => {
   

    swal({
      title: t("stock.sure"),
      text: t("stock.warnning"),
      icon: "warning",
      buttons: {
        cancel: {
          text: t("stock.cancel"),
          value: false,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: t("stock.confirm"),
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        },
      },
      dangerMode: true,
    }).then((result) => {
      if (result) {
        fetch(reparations.update(_id), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("id_token"),
          },
          body: JSON.stringify({ departement: newState.value }),
        }).then((updated) => {
          if (updated) {
            setSelectedState(newState);
          }
        });
      }
    });
  };
  return (
    <div style={{ minWidth: 175 }}>
      <Select
        value={selectedState}
        options={suggestionsEtat}
        onChange={update}
      />
    </div>
  );
}

export default withTranslation()(Departement);
