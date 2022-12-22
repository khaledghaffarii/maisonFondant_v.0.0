import React, { useRef } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useReactToPrint } from "react-to-print";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import { withTranslation, Translation, useTranslation } from "react-i18next";
var Barcode = require("react-barcode");
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 50,
  p: 4,
};

function ComponentToPrint({ currentReparation, props }) {
  const { t } = useTranslation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Container fixed>
   <Box sx={style}>
      <div ref={componentRef} style={{ margin: 30 }}>

        <Grid container spacing={0}>
          <Grid container item spacing={0}>
            <Grid item xs={4}>
              <Paper elevation={0}>
                <img src="./assets/images/logos/LogoTrust.png" width={170} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              {currentReparation.etat == "Nouveau Client" ||
              currentReparation.etat == "Déposé" ? (
                <Paper elevation={0}>
                  <h3> {t("print.receipt")}</h3>
                </Paper>
              ) : (
                <Paper elevation={0}>
                  <h3>
                    <Translation>
                      {(t) => <div>{t("print.interventionFile")}</div>}
                    </Translation>
                  </h3>
                </Paper>
              )}
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={0}>
                {" "}
                <Barcode
                  value={currentReparation.code}
                  height="50"
                  fontSize="12"
                />
              </Paper>
            </Grid>

            <Typography variant="caption" display="block" gutterBottom>
              Date: {moment(new Date()).format("DD/MM/YYYY")}
            </Typography>
          </Grid>
          <Grid container item spacing={1}>
            <Grid item xs={12} style={{ border: "3px" }}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: "auto", border: 3, fontSize: 8 }}
                  size="small"
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        {" "}
                        <Translation>
                          {(t) => <div>{t("print.customerName")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        <Translation>
                          {(t) => <div>{t("commandes.emailRepairer")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        <Translation>
                          {(t) => <div>{t("print.mobileNumber")}</div>}
                        </Translation>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.owner.fname}{" "}
                        {currentReparation.owner.lname}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.owner.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.owner.phone}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container item spacing={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: "auto" }}
                  size="small"
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Code</TableCell>
                      <TableCell colSpan={2}>
                        {" "}
                        <Translation>
                          {(t) => <div>{t("category.category")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell colSpan={2}>
                        {" "}
                        <Translation>
                          {(t) => <div>{t("reparation.device")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell colSpan={2}>
                        {" "}
                        <Translation>
                          {(t) => <div>{t("reparation.model")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell colSpan={2}>
                        {" "}
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.deviceInformation.DeviceColor")}
                            </div>
                          )}
                        </Translation>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.code}
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.arb.length > 1 ? currentReparation.arb[0].name : currentReparation.ReparationProduct?.device?.nameEnglish}
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      {" "}
                      <Typography variant="caption" color="text.secondary">
                        <span>
                          {currentReparation.arb.length > 1
                            ? currentReparation.arb[1].name : currentReparation.ReparationProduct?.brand?.name
                            }
                        </span>
                      </Typography>{" "}
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography variant="caption" color="text.secondary">
                        {" "}
                        <span>
                          {currentReparation.arb.length > 2
                            ? currentReparation.arb[2].name
                            : currentReparation.ReparationProduct?.model?.name}
                        </span>
                      </Typography>{" "}
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography variant="caption" color="text.secondary">
                        
                      {currentReparation.couleurAppareil ? currentReparation.couleurAppareil :currentReparation.Color?.nameColorEnglish}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: "auto" }}
                  size="small"
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        {t("print.failerDetails")} :
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Typography variant="caption" color="text.secondary">
                          {currentReparation.detailsPanne}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={0}>
                {currentReparation.etat == "Nouveau Client" ||
                currentReparation.etat == "Déposé" ? (
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: "auto" }}
                      size="small"
                      aria-label="spanning table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={2}> Accessoires:</TableCell>
                          <TableCell colSpan={2}>
                            ...............................
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                ) : (
                  <>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: "auto" }}
                        size="small"
                        aria-label="spanning table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={3}>
                              <Translation>
                                {(t) => <div>{t("print.statusDenied")}</div>}
                              </Translation>{" "}
                              ({currentReparation.etat})
                            </TableCell>
                            <TableCell colSpan={1}>
                              <Translation>
                                {(t) => <div>{t("stock.price")}</div>}
                              </Translation>
                            </TableCell>
                            <TableCell colSpan={2}>
                              {" "}
                              <Translation>
                                {(t) => <div>{t("print.paymentMethod")}</div>}
                              </Translation>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableRow>
                          <TableCell colSpan={3}>
                            <Paper elevation={0}>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Réparé" size="small" />
                                  }
                                  label="Réparé"
                                  labelPlacement="Réparé"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Irréparable" size="small" />
                                  }
                                  label="Irréparable"
                                  labelPlacement="Irréparable"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Refusée" size="small" />
                                  }
                                  label="Refusée"
                                  labelPlacement="Refusée"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Testée" size="small" />
                                  }
                                  label="Testée"
                                  labelPlacement="Testée"
                                />
                              </FormGroup>
                            </Paper>
                          </TableCell>
                          <TableCell colSpan={1}>
                            {currentReparation.prix == -1
                              ? "-"
                              : currentReparation.prix}{" "}
                            DT{" "}
                          </TableCell>
                          <TableCell colSpan={2}>
                            <Paper elevation={0}>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Espèces" size="small" />
                                  }
                                  label="Espèces"
                                  labelPlacement="Espèces"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Chéque" size="small" />
                                  }
                                  label="Chéque"
                                  labelPlacement="Chéque"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Virement" size="small" />
                                  }
                                  label="Virement"
                                  labelPlacement="Virement"
                                />
                              </FormGroup>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
          {/* <Grid container item spacing={1}>
                        <Grid item xs={12}>
                            <Paper elevation={0} >   <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 'auto' }} aria-label="spanning table">
                                    <TableRow style={{ border: '1px' }} >


                                        <TableCell colSpan={2} >Centre de récuperation</TableCell>

                                        <TableCell >{currentReparation.centreRecuperation.name}</TableCell >


                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={2}>Centre de Dépôt</TableCell >

                                        <TableCell >{currentReparation.centreDepot.name}</TableCell >

                                    </TableRow>

                                </Table>
                            </TableContainer>
                            </Paper>
                        </Grid>

                    </Grid> */}

          <Grid container item spacing={1} columns={16}>
            <Grid item spacing={1} xs={9}>
              {currentReparation.etat == "Nouveau Client" ||
              currentReparation.etat == "Déposé" ? (
                <>
                  <Typography variant="caption" component="div">
                    Diagnostic
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <Translation>
                      {(t) => <div>{t("print.TextDiagnostic")}</div>}
                    </Translation>
                  </Typography>
                  <Typography variant="caption" component="div">
                    <Translation>
                      {(t) => <div>{t("print.Guarantee")}</div>}
                    </Translation>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <Translation>
                      {(t) => <div>{t("print.GuaranteeText")}</div>}
                    </Translation>
                  </Typography>
                </>
              ) : (
                <Box sx={{ height: 100 }}>
                  <Typography variant="caption" color="text.secondary">
                    <Translation>
                      {(t) => <div>{t("print.text2")}</div>}
                    </Translation>
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={3} align="right">
              {currentReparation.etat == "Nouveau Client" ||
              currentReparation.etat == "Déposé" ? (
                <>
                  <Typography variant="button" gutterBottom component="div">
                    <Translation>
                      {(t) => <div>{t("print.customerService")}</div>}
                    </Translation>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    27887889 / 99959797
                  </Typography>
                  <br />
                </>
              ) : (
                ""
              )}
              <br /> <br />
              <Box component="span" sx={{ p: 4, border: "1px dashed grey" }}>
                {t("print.hiddenTrustit")}
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Divider variant="middle" />
        <Grid container spacing={0}>
          <Grid container item spacing={0}>
            <Grid item xs={4}>
              <Paper elevation={0}>
                <img src="./assets/images/logos/LogoTrust.png" width={170} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              {currentReparation.etat == "Nouveau Client" ||
              currentReparation.etat == "Déposé" ? (
                <Paper elevation={0}>
                  <h3> {t("print.receipt")}</h3>
                </Paper>
              ) : (
                <Paper elevation={0}>
                  <h3>
                    <Translation>
                      {(t) => <div>{t("print.interventionFile")}</div>}
                    </Translation>
                  </h3>
                </Paper>
              )}
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={0}>
                {" "}
                <Barcode
                  value={currentReparation.code}
                  height="50"
                  fontSize="12"
                />
              </Paper>
            </Grid>

            <Typography variant="caption" display="block" gutterBottom>
              Date: {moment(new Date()).format("DD/MM/YYYY")}
            </Typography>
          </Grid>
          <Grid container item spacing={1}>
            <Grid item xs={12} style={{ border: "3px" }}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: "auto", border: 3, fontSize: 8 }}
                  size="small"
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        {" "}
                        <Translation>
                          {(t) => <div>{t("print.customerName")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        <Translation>
                          {(t) => <div>{t("commandes.emailRepairer")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        <Translation>
                          {(t) => <div>{t("print.mobileNumber")}</div>}
                        </Translation>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.owner.fname}{" "}
                        {currentReparation.owner.lname}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.owner.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.owner.phone}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container item spacing={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: "auto" }}
                  size="small"
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Code</TableCell>
                      <TableCell colSpan={2}>
                        {" "}
                        <Translation>
                          {(t) => <div>{t("category.category")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell colSpan={2}>
                        {" "}
                        <Translation>
                          {(t) => <div>{t("reparation.device")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell colSpan={2}>
                        {" "}
                        <Translation>
                          {(t) => <div>{t("reparation.model")}</div>}
                        </Translation>
                      </TableCell>
                      <TableCell colSpan={2}>
                        {" "}
                        <Translation>
                          {(t) => (
                            <div>
                              {t("reparation.deviceInformation.DeviceColor")}
                            </div>
                          )}
                        </Translation>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.code}
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography variant="caption" color="text.secondary">
                        {currentReparation.arb.length > 1 ? currentReparation.arb[0].name : currentReparation.ReparationProduct?.device?.nameEnglish}
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      {" "}
                      <Typography variant="caption" color="text.secondary">
                        <span>
                          {currentReparation.arb.length > 1
                            ? currentReparation.arb[1].name : currentReparation.ReparationProduct?.brand?.name
                            }
                        </span>
                      </Typography>{" "}
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography variant="caption" color="text.secondary">
                        {" "}
                        <span>
                          {currentReparation.arb.length > 2
                            ? currentReparation.arb[2].name
                            : currentReparation.ReparationProduct?.model?.name}
                        </span>
                      </Typography>{" "}
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography variant="caption" color="text.secondary">
                        
                      {currentReparation.couleurAppareil ? currentReparation.couleurAppareil :currentReparation.Color?.nameColorEnglish}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: "auto" }}
                  size="small"
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        {t("print.failerDetails")} :
                      </TableCell>
                      <TableCell colSpan={2}>
                        <Typography variant="caption" color="text.secondary">
                          {currentReparation.detailsPanne}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={0}>
                {currentReparation.etat == "Nouveau Client" ||
                currentReparation.etat == "Déposé" ? (
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: "auto" }}
                      size="small"
                      aria-label="spanning table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={2}> Accessoires:</TableCell>
                          <TableCell colSpan={2}>
                            ...............................
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                ) : (
                  <>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: "auto" }}
                        size="small"
                        aria-label="spanning table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={3}>
                              <Translation>
                                {(t) => <div>{t("print.statusDenied")}</div>}
                              </Translation>{" "}
                              ({currentReparation.etat})
                            </TableCell>
                            <TableCell colSpan={1}>
                              <Translation>
                                {(t) => <div>{t("stock.price")}</div>}
                              </Translation>
                            </TableCell>
                            <TableCell colSpan={2}>
                              {" "}
                              <Translation>
                                {(t) => <div>{t("print.paymentMethod")}</div>}
                              </Translation>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableRow>
                          <TableCell colSpan={3}>
                            <Paper elevation={0}>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Réparé" size="small" />
                                  }
                                  label="Réparé"
                                  labelPlacement="Réparé"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Irréparable" size="small" />
                                  }
                                  label="Irréparable"
                                  labelPlacement="Irréparable"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Refusée" size="small" />
                                  }
                                  label="Refusée"
                                  labelPlacement="Refusée"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Testée" size="small" />
                                  }
                                  label="Testée"
                                  labelPlacement="Testée"
                                />
                              </FormGroup>
                            </Paper>
                          </TableCell>
                          <TableCell colSpan={1}>
                            {currentReparation.prix == -1
                              ? "-"
                              : currentReparation.prix}{" "}
                            DT{" "}
                          </TableCell>
                          <TableCell colSpan={2}>
                            <Paper elevation={0}>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Espèces" size="small" />
                                  }
                                  label="Espèces"
                                  labelPlacement="Espèces"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Chéque" size="small" />
                                  }
                                  label="Chéque"
                                  labelPlacement="Chéque"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox name="Virement" size="small" />
                                  }
                                  label="Virement"
                                  labelPlacement="Virement"
                                />
                              </FormGroup>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
          {/* <Grid container item spacing={1}>
                        <Grid item xs={12}>
                            <Paper elevation={0} >   <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 'auto' }} aria-label="spanning table">
                                    <TableRow style={{ border: '1px' }} >


                                        <TableCell colSpan={2} >Centre de récuperation</TableCell>

                                        <TableCell >{currentReparation.centreRecuperation.name}</TableCell >


                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={2}>Centre de Dépôt</TableCell >

                                        <TableCell >{currentReparation.centreDepot.name}</TableCell >

                                    </TableRow>

                                </Table>
                            </TableContainer>
                            </Paper>
                        </Grid>

                    </Grid> */}

          <Grid container item spacing={1} columns={16}>
            <Grid item spacing={1} xs={9}>
              {currentReparation.etat == "Nouveau Client" ||
              currentReparation.etat == "Déposé" ? (
                <>
                  <Typography variant="caption" component="div">
                    Diagnostic
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <Translation>
                      {(t) => <div>{t("print.TextDiagnostic")}</div>}
                    </Translation>
                  </Typography>
                  <Typography variant="caption" component="div">
                    <Translation>
                      {(t) => <div>{t("print.Guarantee")}</div>}
                    </Translation>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <Translation>
                      {(t) => <div>{t("print.GuaranteeText")}</div>}
                    </Translation>
                  </Typography>
                </>
              ) : (
                <Box sx={{ height: 100 }}>
                  <Typography variant="caption" color="text.secondary">
                    <Translation>
                      {(t) => <div>{t("print.text2")}</div>}
                    </Translation>
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={3} align="right">
              {currentReparation.etat == "Nouveau Client" ||
              currentReparation.etat == "Déposé" ? (
                <>
                  <Typography variant="button" gutterBottom component="div">
                    <Translation>
                      {(t) => <div>{t("print.customerService")}</div>}
                    </Translation>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    27887889 / 99959797
                  </Typography>
                  <br />
                </>
              ) : (
                ""
              )}
              <br /> <br />
              <Box component="span" sx={{ p: 4, border: "1px dashed grey" }}>
                {t("print.hiddenTrustit")}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
</Box>
      <Box mt={2}>
        <button onClick={handlePrint}>
          {" "}
          <Translation>
            {(t) => <div>{t("print.PrintThisOut")}</div>}
          </Translation>
        </button>
      </Box>
      
    </Container>
  );
}

export default withTranslation()(ComponentToPrint);
