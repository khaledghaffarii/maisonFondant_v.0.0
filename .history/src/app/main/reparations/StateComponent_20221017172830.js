import React, { Component } from "react";
import Select from "react-select";
import { REP_STATES, REP_LABELS, reparations } from "../../static";
import swal from "sweetalert";
import swal2 from "@sweetalert/with-react";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {  Button } from "@material-ui/core";
import Formsy from "formsy-react";
import { withTranslation, Translation, useTranslation } from "react-i18next";
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
            <Translation>{(t) => <div>{t("stock.cancel")}</div>}</Translation>,
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="w-224 mx-auto mt-16"
            aria-label="Ajouter remarque"
            onClick={updateState}
            disabled={loading}
          >
            <Translation>
              {(t) => <div>{t("stock.AddDeliveryDate")}</div>}
            </Translation>
          </Button>
        </div>
      </Formsy>
    </MuiPickersUtilsProvider>
  );
};
function StateComponent({ _id, etat, locked }) {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = React.useState({
    value: etat,
    label: etat,
  });
  const [dateLivraison, setDateLivraison] = React.useState(new Date());

  let i = 0;
  const suggestionsEtat = Object.keys(REP_STATES).map((key) => {
    i++;
    return {
      key: i,
      value: REP_STATES[key],
      label: REP_LABELS[key],
    };
  });
  React.useEffect(() => {
  
  }, [dateLivraison]);
  const update = (newState) => {
    swal({
      title: t("stock.sure"),
      text: t("form.warnning"),
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        if (newState.value == REP_STATES.PICKEDUP_BY_CLIENT) {
          swal2({
            text: t("print.textWarning"),
            content: (
              <DatePickerUI
                id={_id}
                etat={newState.value}
                setSelectedState={setSelectedState}
                newState={newState}
              />
            ),
            buttons: {},
          });
        } else {
          fetch(reparations.update(_id), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("id_token"),
            },
            body: JSON.stringify({ etat: newState.value }),
          }).then((updated) => {
            if (updated) {
              setSelectedState(newState);
            }
          });
        }
      }
    });
  };
  return (
    <div style={{ minWidth: 175 }}>
      <Select
        isDisabled={locked}
        options={suggestionsEtat}
        value={selectedState}
        onChange={update}
      />
    </div>
  );
}

export default withTranslation()(StateComponent);