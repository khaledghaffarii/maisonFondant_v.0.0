import React, { Component } from "react";
import Select from "react-select";
import { REP_STATES, REP_LABELS, reparations } from "../../static";
import swal from "sweetalert";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Formsy from "formsy-react";
import moment from "moment";
import { withTranslation, Translation, useTranslation } from "react-i18next";
import { Badge, Button } from "@material-ui/core";
function DateDepot({ date, _id, dateDepot, enqueueSnackbar, locked }) {
  const d = moment(date).format("DD/MM/yyyy");
  const [dateLivraison, setDateLivraison] = React.useState(d);
  const updateRep = async (e) => {
    // e.preventDefault();
    let dateLivraison = moment(e).format("DD/MM/yyyy");
    let dateLivraisonTest = moment(e).format("YYYY/MM/DD");
    let dateDepotTest = moment(dateDepot).format("YYYY/MM/DD");
    if (dateDepotTest > dateLivraisonTest) {
      enqueueSnackbar(
        <Translation>
        {(t) => <div>{t("form.warnningDeposit")}</div>}
      </Translation>,
        {
          variant: "error",
        }
      );
    } else {
      fetch(reparations.update(_id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("id_token"),
        },
        body: JSON.stringify({ dateLivraison: e }),
      }).then((updated) => {
        if (updated) {
          setDateLivraison(dateLivraison);
          setEdit(false);
        }
      });
    }
  };
  const ref = React.createRef(null);

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [ref]);
  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <div onClick={() => setEdit(true && !locked)}>
      {edit ? (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Formsy className="flex flex-col justify-center w-full">
            <DatePicker
              label="Date dépot"
              inputVariant="outlined"
              onClose={() => setEdit(false)}
              onChange={(e) => {
                updateRep(e);
              }}
              className={
                "MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputTypeSearch MuiInput-inputTypeSearch"
              }
            />
          </Formsy>
        </MuiPickersUtilsProvider>
      ) : (
        <span>
          {dateLivraison == undefined ||
          dateLivraison == null ||
          dateLivraison == "Invalid date"
            ? "-- "
            : `${dateLivraison}`}
        </span>
      )}
    </div>
  );
}

export default withTranslation()(DateDepot);
