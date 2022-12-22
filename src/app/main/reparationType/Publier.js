import React, { Component } from "react";
import Select from "react-select";
import { REP_RETOUR, reparationType } from "../../static";
import swal from "sweetalert";
import { withTranslation, Translation, useTranslation } from "react-i18next";
const Publier = ({ _id, publierValue, locked, props }) => {
  const { t } = useTranslation();
  let labelPublierValue = publierValue == true ? "true" : "false";
  const [publier, setPublier] = React.useState({
    value: publierValue,
    label: labelPublierValue,
  });
  let i = 0;
  const suggestionsPublier = Object.keys(REP_RETOUR).map((key) => {
    i++;
    return {
      key: i,
      value: REP_RETOUR[key],
      label: REP_RETOUR[key],
    };
  });
  const update = (newState) => {
    swal({
      title: t("stock.sure"),
      text: t("form.warnning"),
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
        fetch(reparationType.update(_id), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("id_token"),
          },
          body: JSON.stringify({ color: newState.value }),
        }).then((updated) => {
          if (updated) {
            setPublier(newState);
          }
        });
      }
    });
  };
  return (
    <div style={{ minWidth: 175 }}>
      <Select
        isDisabled={locked}
        options={suggestionsPublier}
        value={publier}
        onChange={update}
      />
    </div>
  );
};

export default withTranslation()(Publier);
