import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { Tabs } from "@yazanaabed/react-tabs";
import Remarque from "../sharedComponent/Remarque";
import { Badge, Button } from "@material-ui/core";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import Request from "../../utils/Request";
import env from "../../static";
import decode from "jwt-decode";
import { withTranslation, Translation } from "react-i18next";
function TabsRemarques(props) {
  const request = new Request();
  const [reparation, setReparation] = useState(null);
  const [remarqueAcquisition, setRemarqueAcquisition] = useState("");
  const [remarqueClient, setRemarqueClient] = useState(null);
  const [remarqueEquipe, setRemarqueEquipe] = useState(null);
  const [remarqueSatisfaction, setRemarqueSatisfaction] = useState(null);
  const [remarqueSuivi, setRemarqueSuivi] = useState(null);
  const [remarqueTrustit, setRemarqueTrustit] = useState(null);
  useEffect(() => {
    setReparation(props.reparation);
  }, [props.reparation]);
  const sendRemarque = async (field, value) => {
    const data = {};
    const user = decode(localStorage.getItem("id_token"));
    data[field] = { description: value, owner: user.id };
    try {
      const result = await request.update(
        env.reparations.update(reparation._id),
        data
      );
      props.enqueueSnackbar(
        <Translation>
          {(t) => <div>{t("speciality.sendNotice")}</div>}
        </Translation>,
        {
          variant: "success",
        }
      );
    } catch (e) {
      if (e.response) {
        props.enqueueSnackbar(e.response.data.message, {
          variant: "error",
        });
      } else {
        props.enqueueSnackbar(
          <Translation>
            {(t) => <div>{t("stock.edit.error")}</div>}
          </Translation>,
          {
            variant: "error",
          }
        );
      }
    }
  };
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
                <Badge
                  badgeContent={reparation.remarqueAcquisition.length}
                  color="secondary"
                >
                  <span style={{ padding: 5 }}>
                    {" "}
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.internalRemark.remarkAcquisition")}
                        </div>
                      )}
                    </Translation>
                  </span>
                </Badge>
              }
            >
              <div
                style={{ padding: 20 }}
                className="flex flex-col justify-center w-full"
              >
                <Remarque
                  remarqueList={reparation.remarqueAcquisition}
                  name="Remarque Acquisition"
                />
                <TextFieldFormsy
                  disabled={props.locked}
                  style={{ width: "100%" }}
                  label={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.internalRemark.remarkAcquisition")}
                        </div>
                      )}
                    </Translation>
                  }
                  name="remarqueAcquisition"
                  value={remarqueAcquisition}
                  onChange={(e) => {
                    setRemarqueAcquisition(e.target ? e.target.value : e);
                  }}
                  multiline
                  rows="4"
                  className="mt-12 mb-12 mr-2"
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Ajouter remarque"
                  onClick={() =>
                    sendRemarque("remarqueAcquisition", remarqueAcquisition)
                  }
                  disabled={props.locked}
                >
                  <Translation>
                    {(t) => (
                      <div>{t("reparation.internalRemark.addRemarke")}</div>
                    )}
                  </Translation>
                </Button>
              </div>
            </Tabs.Tab>
            <Tabs.Tab
              id="tab2"
              title={
                <Badge
                  badgeContent={reparation.remarqueClient.length}
                  color="secondary"
                >
                  <span style={{ padding: 5 }}>
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.customerRemark.customerRemark")}
                        </div>
                      )}
                    </Translation>
                  </span>
                </Badge>
              }
            >
              <div
                style={{ padding: 20 }}
                className="flex flex-col justify-center w-full"
              >
                <Remarque
                  remarqueList={reparation.remarqueClient}
                  name={"Remarque Client"}
                />
                <TextFieldFormsy
                  style={{ width: "100%" }}
                  label={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.customerRemark.customerRemark")}
                        </div>
                      )}
                    </Translation>
                  }
                  name="remarqueClient"
                  value={remarqueClient}
                  onChange={(e) => {
                    setRemarqueClient(e.target ? e.target.value : e);
                  }}
                  multiline
                  rows="4"
                  className="mt-8 mb-16 mr-8"
                  margin="normal"
                  variant="outlined"
                  disabled={props.locked}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Ajouter remarque"
                  onClick={() => sendRemarque("remarqueClient", remarqueClient)}
                  disabled={props.locked}
                >
                  <Translation>
                    {(t) => (
                      <div>{t("reparation.internalRemark.addRemarke")}</div>
                    )}
                  </Translation>
                </Button>
              </div>
            </Tabs.Tab>
            <Tabs.Tab
              id="tab3"
              title={
                <Badge
                  badgeContent={reparation.remarqueEquipe.length}
                  color="secondary"
                >
                  <span style={{ padding: 5 }}>
                    {
                      <Translation>
                        {(t) => (
                          <div>{t("reparation.internalRemark.remarkTeam")}</div>
                        )}
                      </Translation>
                    }
                  </span>
                </Badge>
              }
            >
              <div
                style={{ padding: 20 }}
                className="flex flex-col justify-center w-full"
              >
                <Remarque
                  remarqueList={reparation.remarqueEquipe}
                  name={"Remarque Equipe"}
                />
                <TextFieldFormsy
                  style={{ width: "100%" }}
                  label={
                    <Translation>
                      {(t) => (
                        <div>{t("reparation.internalRemark.remarkTeam")}</div>
                      )}
                    </Translation>
                  }
                  name="remarqueEquipe"
                  value={remarqueEquipe}
                  onChange={(e) => {
                    setRemarqueEquipe(e.target ? e.target.value : e);
                  }}
                  multiline
                  rows="4"
                  className="mt-12 mb-16 mr-12"
                  margin="normal"
                  variant="outlined"
                  disabled={props.locked}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Ajouter remarque"
                  onClick={() => sendRemarque("remarqueEquipe", remarqueEquipe)}
                  disabled={props.locked}
                >
                  <Translation>
                    {(t) => (
                      <div>{t("reparation.internalRemark.addRemarke")}</div>
                    )}
                  </Translation>
                </Button>
              </div>
            </Tabs.Tab>
            <Tabs.Tab
              id="tab4"
              title={
                <Badge
                  badgeContent={reparation.remarqueSatisfaction.length}
                  color="secondary"
                >
                  <span style={{ padding: 5 }}>
                    {" "}
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.internalRemark.remarkSatisfaction")}
                        </div>
                      )}
                    </Translation>
                  </span>
                </Badge>
              }
            >
              <div
                style={{ padding: 20 }}
                className="flex flex-col justify-center w-full"
              >
                <Remarque
                  remarqueList={reparation.remarqueSatisfaction}
                  name={"Remarque Satisfaction"}
                />
                <TextFieldFormsy
                  disabled={props.locked}
                  style={{ width: "100%" }}
                  label={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.internalRemark.remarkSatisfaction")}
                        </div>
                      )}
                    </Translation>
                  }
                  name="remarqueSatisfaction"
                  value={remarqueSatisfaction}
                  onChange={(e) => {
                    setRemarqueSatisfaction(e.target ? e.target.value : e);
                  }}
                  multiline
                  rows="4"
                  className="mt-8 mb-16 mr-8"
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Ajouter remarque"
                  onClick={() =>
                    sendRemarque("remarqueSatisfaction", remarqueSatisfaction)
                  }
                  disabled={props.locked}
                >
                  <Translation>
                    {(t) => (
                      <div>{t("reparation.internalRemark.addRemarke")}</div>
                    )}
                  </Translation>
                </Button>
              </div>
            </Tabs.Tab>
            <Tabs.Tab
              id="tab5"
              title={
                <Badge
                  badgeContent={reparation.remarqueSuivi.length}
                  color="secondary"
                >
                  <span style={{ padding: 5 }}>
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.internalRemark.remarkfollowed")}
                        </div>
                      )}
                    </Translation>
                  </span>
                </Badge>
              }
            >
              <div
                style={{ padding: 20 }}
                className="flex flex-col justify-center w-full"
              >
                <Remarque
                  remarqueList={reparation.remarqueSuivi}
                  name={"Remarque Suivi"}
                />
                <TextFieldFormsy
                  style={{ width: "100%" }}
                  label={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.internalRemark.remarkfollowed")}
                        </div>
                      )}
                    </Translation>
                  }
                  name="remarqueSuivi"
                  value={remarqueSuivi}
                  onChange={(e) => {
                    setRemarqueSuivi(e.target ? e.target.value : e);
                  }}
                  multiline
                  rows="4"
                  className="mt-8 mb-16 mr-8"
                  margin="normal"
                  variant="outlined"
                  disabled={props.locked}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Ajouter remarque"
                  onClick={() => sendRemarque("remarqueSuivi", remarqueSuivi)}
                  disabled={props.locked}
                >
                  <Translation>
                    {(t) => (
                      <div>{t("reparation.internalRemark.addRemarke")}</div>
                    )}
                  </Translation>
                </Button>
              </div>
            </Tabs.Tab>
            <Tabs.Tab
              id="tab6"
              title={
                <Badge
                  badgeContent={reparation.remarqueTrustit.length}
                  color="secondary"
                >
                  <span style={{ padding: 5 }}>
                    {" "}
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.internalRemark.trustitRemark")}
                        </div>
                      )}
                    </Translation>
                  </span>
                </Badge>
              }
            >
              <div
                style={{ padding: 20 }}
                className="flex flex-col justify-center w-full"
              >
                <Remarque
                  remarqueList={reparation.remarqueTrustit}
                  name={"Remarque Trustit"}
                />
                <TextFieldFormsy
                  style={{ width: "100%" }}
                  label={
                    <Translation>
                      {(t) => (
                        <div>
                          {t("reparation.internalRemark.trustitRemark")}
                        </div>
                      )}
                    </Translation>
                  }
                  name="remarqueTrustit"
                  value={remarqueTrustit}
                  onChange={(e) => {
                    setRemarqueTrustit(e.target ? e.target.value : e);
                  }}
                  multiline
                  rows="4"
                  className="mt-8 mb-16 mr-8 wt-12"
                  margin="normal"
                  variant="outlined"
                  disabled={props.locked}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Ajouter remarque"
                  onClick={() =>
                    sendRemarque("remarqueTrustit", remarqueTrustit)
                  }
                  disabled={props.locked}
                >
                  <Translation>
                    {(t) => (
                      <div>{t("reparation.internalRemark.addRemarke")}</div>
                    )}
                  </Translation>
                </Button>
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
export default withTranslation()(withSnackbar(TabsRemarques));
