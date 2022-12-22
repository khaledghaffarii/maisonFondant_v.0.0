import React from "react";
import { reparations } from "../../static";
import swal from "sweetalert";
import { withTranslation, Translation, useTranslation } from "react-i18next";

function PriceRepairerComponent({ currentPriceRepairer, _id, locked,currency}) {
  const { t } = useTranslation();
  const [priceRepairer, setPriceRepairer] =
    React.useState(currentPriceRepairer);
  const updateRep = async (e) => {
    e.preventDefault();
    let priceRepairer = e.target.value;
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
          body: JSON.stringify({ priceRepairer }),
        }).then((updated) => {
          if (updated) {
            setPriceRepairer(priceRepairer);
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
          defaultValue={priceRepairer}
          onBlur={updateRep}
          className={
            "MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputTypeSearch MuiInput-inputTypeSearch"
          }
        />
      ) : (
        <span>
          {priceRepairer == -1
            ? "Après diagnostic"
            : priceRepairer == undefined
            ? `0 ${currency}`
            : `${priceRepairer} ${currency}`}
        </span>
      )}
    </div>
  );
}

export default withTranslation()(PriceRepairerComponent);
