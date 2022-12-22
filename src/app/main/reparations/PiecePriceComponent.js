import React, { Component } from "react";
import Select from "react-select";
import { REP_STATES, REP_LABELS, reparations } from "../../static";
import swal from "sweetalert";
import { withTranslation, Translation, useTranslation } from "react-i18next";

function PiecePriceComponent({ currentPrice, _id, locked,currency }) {
  const { t } = useTranslation();
  const [price, setPrice] = React.useState(currentPrice);
  const updateRep = async (e) => {
    e.preventDefault();
    let prixPiece = e.target.value;
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
        fetch(reparations.update(_id), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("id_token"),
          },
          body: JSON.stringify({ prixPiece }),
        }).then((updated) => {
          if (updated) {
            setPrice(prixPiece);
            setEdit(false);
          }
        });
      } else {
        setEdit(false);
      }
    });
  };
  const ref = React.createRef(null);

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [ref]);
  const [edit, setEdit] = React.useState(false);
  return (
    <div onClick={() => setEdit(true && !locked)}>
      {edit ? (
        <input
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateRep(e);
            }
          }}
          type="number"
          defaultValue={price}
          onBlur={updateRep}
          className={
            "MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputTypeSearch MuiInput-inputTypeSearch"
          }
        />
      ) : (
        <span>
          {price == -1
            ? "Après diagnostic"
            : price == undefined
            ? `0 ${currency}`
            : `${price} ${currency}`}
        </span>
      )}
    </div>
  );
}

export default withTranslation()(PiecePriceComponent);
