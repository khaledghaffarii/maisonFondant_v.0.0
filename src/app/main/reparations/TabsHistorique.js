import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { Tabs } from "@yazanaabed/react-tabs";
import Historique from "../sharedComponent/Historique";
import { Badge, Button } from "@material-ui/core";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import Request from "../../utils/Request";
import env from "../../static";
import decode from "jwt-decode";
import { withTranslation, Translation, useTranslation } from "react-i18next";
function TabsHistorique(props) {
  const request = new Request();
  const [reparation, setReparation] = useState(null);
  useEffect(() => {
    setReparation(props.reparation);
  }, [props.reparation]);
  return (
    <div>
      {reparation ? (
        <Formsy className="flex flex-col justify-center w-full">
          <Tabs
            activeTab={{
              id: "tab1",
            }}
          >
            <Tabs.Tab
              id="tab1"
              title={
                <Badge color="secondary">
                  <span style={{ padding: 5 }}>
                    <Translation>
                      {(t) => <div>{t("reparation.historicalDelevery")}</div>}
                    </Translation>
                  </span>
                </Badge>
              }
            >
              <div
                style={{ padding: 20 }}
                className="flex flex-col justify-center w-full"
              >
              
                <Historique
                  historiqueList={reparation.historique}
                  name={ <Translation>
                    {(t) => <div>{t("reparation.historical")}</div>}
                  </Translation>}
                />
              </div>
            </Tabs.Tab>
          </Tabs>
        </Formsy>
      ) : (
        <div />
      )}
    </div>
  );
}
export default withTranslation()(withSnackbar(TabsHistorique));
